"use client"
import { useState } from 'react';
import {
    Navbar as NextNavBar,
    NavbarContent,
    NavbarItem,
    Avatar,
    Dropdown,
    DropdownTrigger,
    DropdownItem,
    DropdownMenu,
    Button,
    NavbarBrand
} from "@nextui-org/react";
import { ThemeSwitcher } from './ThemeSwitcher';
import { useRouter } from 'next/navigation';

const Navbar = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const router = useRouter();

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleLogout = () => {
        router.push('/login');
    };

    return (
        <NextNavBar maxWidth='full' isBordered>
            <NavbarBrand>
                Company Name
            </NavbarBrand>
            <NavbarContent as="div" justify="end">
                <NavbarItem>
                    <ThemeSwitcher />
                </NavbarItem>
                <Dropdown placement="bottom-end">
                    <DropdownTrigger>
                        <Button isIconOnly color='primary' variant='ghost' className='rounded-full'>
                            <Avatar
                                isBordered
                                className="transition-transform"
                                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                            />
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu>
                        <DropdownItem
                            key='key1'
                            color='default'
                            onClick={handleLogout}
                        >
                            Log out
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </NavbarContent>
        </NextNavBar>
    );
}

export default Navbar;