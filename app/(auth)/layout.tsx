import { ThemeSwitcher } from "../components/ThemeSwitcher";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center">
            <div className="absolute top-4 right-4">
                <ThemeSwitcher />
            </div>
            {children}
        </div>
    )
}

export default AuthLayout;