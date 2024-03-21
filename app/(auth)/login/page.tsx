
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import LoginForm from "./form";

export default async function Login() {
    const session = await getServerSession();
    if (session) {
        redirect('/dashboard');
    }

    return <LoginForm />
}
