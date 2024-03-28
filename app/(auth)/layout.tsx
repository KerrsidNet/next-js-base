import { ThemeSwitcher } from "../components/ThemeSwitcher";

/**
 * AuthLayout component renders a layout with the ThemeSwitcher 
 * in the top right corner and the children component in the center.
 * It is used as the layout for authentication pages.
 */
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