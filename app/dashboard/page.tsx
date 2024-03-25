"use client"

import GeneralBreadcrumbs from "../components/GeneralBreadcrumbs";

const Dashboard = () => {

    return (
        <div>
            <GeneralBreadcrumbs
                items={[
                    {
                        name: "Dashboard",
                        href: "/dashboard",
                    },
                ]}
            />
        </div>
    )
}

export default Dashboard;