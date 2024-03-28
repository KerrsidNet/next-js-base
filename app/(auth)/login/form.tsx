
"use client";
import PNotify from "@/app/components/PNotify";
import "../../globals.css";
import { Button, Card, CardBody, CardFooter, CardHeader, Input } from "@nextui-org/react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { ZodError, z } from "zod";

const schema = z.object({
    email: z.string().email("Invalid email format!"),
    password: z.string().min(1, "Password is required!"),
});

/**
 * LoginForm component handles user login form.
 * 
 * Allows user to enter email and password. 
 * Validates input using Zod schema.
 * Handles form submission using NextAuth signIn.
 * Displays error messages for invalid input.
 * Navigates to /dashboard route on successful login.
 * Shows loading state and error notifications.
 */
export default function LoginForm() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

    const handleEmailChange = (e: { target: { value: string }; }) => {
        setFormData({ ...formData, email: e.target.value });
    };

    const handlePasswordChange = (e: { target: { value: string }; }) => {
        setFormData({ ...formData, password: e.target.value });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFormErrors({});
        try {
            const validatedData = schema.parse(formData);
            setIsLoading(true);
            const response = await signIn("credentials", {
                email: validatedData.email,
                password: validatedData.password,
                redirect: false,
            });
            if (response && !response?.error) {
                router.push("/dashboard");
            } else {
                setIsLoading(false);
                return toast.error(
                    <PNotify
                        title="Error!"
                        icon="fas fa-check"
                        text={response?.error || "An error has occured"}
                    />,
                    {
                        containerId: "bottom-right",
                    },
                );
            }
        } catch (error) {
            if (error instanceof ZodError) {
                const errors: { [key: string]: string } = {};
                error.errors.forEach((err) => {
                    const path = err.path.join(".");
                    errors[path] = err.message;
                });
                setFormErrors(errors);
            } else {
                return toast.error(
                    <PNotify
                        title="Error!"
                        icon="fas fa-check"
                        text={"An error has occured"}
                    />,
                    {
                        containerId: "bottom-right",
                    },
                );
            }
            setIsLoading(false);
        }
    };


    return (
        <>
            <Card
                isBlurred
                className="border-none bg-background/60 dark:bg-default-100/50 min-w-unit-lg p-10"
                shadow="sm"
            >
                <form onSubmit={handleSubmit}>
                    <CardHeader className="flex justify-center items-start p-9">
                        <h1 className="text-2xl">
                            🔐 Hello, please log in.
                        </h1>
                    </CardHeader>
                    <CardBody>
                        <div className="mb-4">
                            <Input
                                type="email"
                                label="Email"
                                isInvalid={!!formErrors["email"]}
                                color={formErrors["email"] ? "danger" : "default"}
                                errorMessage={formErrors["email"]}
                                value={formData.email}
                                onChange={handleEmailChange}
                            />
                        </div>
                        <div className="mb-4">
                            <Input
                                type="password"
                                label="Password"
                                isInvalid={!!formErrors["password"]}
                                color={formErrors["password"] ? "danger" : "default"}
                                errorMessage={formErrors["password"]}
                                value={formData.password}
                                onChange={handlePasswordChange}
                            />
                        </div>
                    </CardBody>
                    <CardFooter className="flex justify-center items-center">
                        <Button isLoading={isLoading} type="submit" color="primary" className="grow">Log In</Button>
                    </CardFooter>
                </form>
            </Card>

        </>
    );
}
