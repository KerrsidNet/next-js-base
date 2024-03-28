
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import LoginForm from "./form";

/**
 * Default export that handles login page rendering.
 * 
 * Checks if there is an existing session and redirects to /dashboard if so.
 * Otherwise, renders the <LoginForm> component.
 */
export default async function Login() {
    const session = await getServerSession();
    if (session) {
        redirect('/dashboard');
    }

    return <LoginForm />
}
