import { getServerSession } from "next-auth";
import { authOptions } from "./app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";

export const withAuthentication = (
    handler: Function,
    functionName: string
) => async (...args: any[]) => {
    try {
        // Check if user is authenticated
        const session = await getServerSession(authOptions);
        if (!session) {
            return { error: true, message: "Unauthorized" }; // Return error object
        }

        // Query backend to fetch user's permissions
        const user = await prisma.user.findUnique({
            where: { id: session.user.id },
            include: { role: { include: { permissions: true } } }
        });

        // Check if the user has the necessary permission (function name)
        const hasPermission = user?.role?.permissions.some(
            permission => permission.name === functionName
        );

        if (!hasPermission) {
            return {
                error: true,
                message: `Insufficient permissions for ${functionName}`
            };
        }

        // Call the original handler function with the provided arguments
        return await handler(...args);
    } catch (error) {
        // Handle authentication errors
        console.error("Authentication error:", error);
        return { error: true, message: "Unauthorized" }; // Return error object
    }
};