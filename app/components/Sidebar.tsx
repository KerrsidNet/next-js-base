"use client";
import { Button, Divider, Tooltip } from "@nextui-org/react";
import Link from "next/link";
import { useState } from "react";
import { FaAngleLeft, FaHome, FaUser } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(true);

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
            <Tooltip
              color="default"
              placement="right"
              content="Home"
              delay={1000}
            >
              <Button
                as={Link}
                isIconOnly
                variant="light"
                href={"/dashboard"}
                className="flex h-10 items-center justify-center"
              >
                <FaHome />
              </Button>
            </Tooltip>
            <Tooltip
              color="default"
              placement="right"
              content="Users"
              delay={1000}
            >
              <Button
                as={Link}
                isIconOnly
                variant="light"
                href={"/dashboard/users"}
                className="flex h-10 items-center justify-center"
              >
                <FaUser />
              </Button>
            </Tooltip>
            <Tooltip
              color="default"
              placement="right"
              content="Users"
              delay={1000}
            >
              <Button
                as={Link}
                isIconOnly
                variant="light"
                href={"/dashboard/users"}
                className="flex h-10 items-center justify-center"
              >
                <FaUser />
              </Button>
            </Tooltip>
            <Tooltip
              color="default"
              placement="right"
              content="Users"
              delay={1000}
            >
              <Button
                as={Link}
                isIconOnly
                variant="light"
                href={"/dashboard/users"}
                className="flex h-10 items-center justify-center"
              >
                <FaUser />
              </Button>
            </Tooltip>
          </>
        ) : (
          <>
            <Button
              as={Link}
              href={"/dashboard"}
              variant="light"
              className="flex h-16 w-full items-center justify-center gap-2"
            >
              <FaHome size={14} />
              Home
            </Button>
            <Button
              as={Link}
              href={"/dashboard/users"}
              variant="light"
              className="flex h-16 w-full items-center justify-center gap-2"
            >
              <FaUser size={14} />
              Users
            </Button>
            <Button
              as={Link}
              href={"/dashboard/users"}
              variant="light"
              className="flex h-16 w-full items-center justify-center gap-2"
            >
              <FaUser size={14} />
              Users
            </Button>
            <Button
              as={Link}
              href={"/dashboard/users"}
              variant="light"
              className="flex h-16 w-full items-center justify-center gap-2"
            >
              <FaUser size={14} />
              Users
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
