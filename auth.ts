/**
 * Authenticates the request and checks user permissions before calling the 
 * provided handler function. Checks if the user is authenticated via a session.
 * If not, returns an error. Fetches the user's permissions from the database.
 * Checks if the user has the required permission (passed as functionName). 
 * If not, returns an error. Finally calls the handler function if all checks pass.
*/
import { getServerSession } from "next-auth";

import prisma from "@/lib/prisma";
import authOptions from "./app/api/auth/[...nextauth]/authOptions";

export const withAuthentication = (
    handler: Function,
    functionName: string
) => async (...args: any[]) => {
    try {
        // Check if user is authenticated
        const session: any = await getServerSession(authOptions);
        if (!session) {
            return { error: true, message: "Unauthorized" }; // Return error object
        }

        // Query backend to fetch user's permissions
        const user = await prisma.user.findUnique({
            where: { id: session?.user?.id },
            include: { role: { include: { permissions: true } } }
        });

        // Check if the user has the necessary permission (function name)
        const hasPermission = user?.role?.permissions.some(
            (permission: { name: string }) => permission.name === functionName
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