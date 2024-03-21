
"use client"
import "../../globals.css";
import { Button, Card, CardBody, CardFooter, CardHeader, Input } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleEmailChange = (e: { target: { value: string }; }) => {
        setFormData({ ...formData, email: e.target.value });
    };

    const handlePasswordChange = (e: { target: { value: string }; }) => {
        setFormData({ ...formData, password: e.target.value });
    };

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        console.log("Email:", formData.email);
        console.log("Password:", formData.password);
        router.push("/dashboard");
    };

    return (
        <>
            <Card
                isBlurred
                className="border-none bg-background/60 dark:bg-default-100/50 w-1/4 p-10"
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
                                value={formData.email}
                                onChange={handleEmailChange}
                            />
                        </div>
                        <div className="mb-4">
                            <Input
                                type="password"
                                label="Password"
                                value={formData.password}
                                onChange={handlePasswordChange}
                            />
                        </div>
                    </CardBody>
                    <CardFooter className="flex justify-center items-center">
                        <Button type="submit" color="primary" className="grow">Log In</Button>
                    </CardFooter>
                </form>
            </Card>
        </>
    );
}
