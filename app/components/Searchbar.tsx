import React, { useCallback, useMemo } from "react";
import { Input, Spinner } from "@nextui-org/react";
import { CiSearch } from "react-icons/ci";
import { useSearchParams } from "next/navigation";

// Define the debounce function
const debounce = (func: any, delay: any) => {
    let timeoutId: any;
    return (...args: any) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func(...args);
        }, delay);
    };
};

interface SearchBarProps {
    onSearchChange: (searchQuery: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearchChange }) => {
    const searchParams = useSearchParams().get("search");

    // Define the debounced search function
    const debouncedSearch = useMemo(() => {
        return debounce(onSearchChange, 1000); // Adjust delay as needed
    }, [onSearchChange]);

    // Handle search change with debouncing
    const handleSearchChange = useCallback(
        (value?: string) => {
            debouncedSearch(value || "");
        },
        [debouncedSearch]
    );

    return (
        <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search"
            startContent={<CiSearch />}
            defaultValue={searchParams ?? ""}
            onValueChange={handleSearchChange}
        />
    );
};

export default SearchBar;
