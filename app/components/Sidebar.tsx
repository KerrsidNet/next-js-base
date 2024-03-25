"use client";
import { Button, Divider, Tooltip } from "@nextui-org/react";
import Link from "next/link";
import { useState } from "react";
import { FaAngleLeft, FaHome, FaUser } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import sidebarItems from "./sidebarItems"
import { getFilteredByRoleItems } from "@/utils/helpers";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(true);
  const filteredSidebarItems = getFilteredByRoleItems(sidebarItems);
  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div
      className={`flex h-full flex-col items-center justify-center text-black transition-all duration-300  dark:text-white ${collapsed ? "w-16" : "w-52"}`}
    >
      <div className="flex h-16 w-full items-center justify-center">
        <Button
          variant="light"
          radius="none"
          onClick={toggleSidebar}
          className="flex h-full w-full items-center justify-center"
        >
          {collapsed ? (
            <RxHamburgerMenu size={25} />
          ) : (
            <>
              <FaAngleLeft size={25} />
            </>
          )}
        </Button>
      </div>
      <Divider />
      <div className="flex w-full flex-1 flex-col items-center justify-start gap-5 p-2">
        {collapsed ? (
          <>
            {filteredSidebarItems.map((item: any, index: any) => (
              <Tooltip
                key={index}
                color="default"
                placement="right"
                content={item.tooltip}
                delay={1000}
              >
                <Button
                  as={Link}
                  isIconOnly
                  variant="light"
                  href={item.href}
                  className="flex h-10 items-center justify-center"
                >
                  <item.icon size={14} />
                </Button>
              </Tooltip>
            )
            )}
          </>
        ) : (
          <>
            {filteredSidebarItems.map((item: any, index: any) => (
              <Button
                key={index}
                as={Link}
                href={item.href}
                variant="light"
                className="flex h-16 w-full items-center justify-start gap-2"
              >
                <item.icon size={14} />
                {item.label}
              </Button>
            )
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
