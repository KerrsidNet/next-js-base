import { Divider } from "@nextui-org/react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex h-screen w-full">
            <Sidebar />
            <Divider orientation="vertical" />
            <div className="flex flex-col w-full">
                <Navbar />
                <div className="overflow-auto flex-1 p-5">{children}</div>
            </div>
        </div>
    );
};

export default DashboardLayout;
