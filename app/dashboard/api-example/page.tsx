"use client"
import GeneralBreadcrumbs from '@/app/components/GeneralBreadcrumbs';
import Table from '@/app/components/Table';
import React, { useState, useEffect, Suspense } from 'react';

/**
 * ApiExample is a React component that fetches and displays paginated data from an API.
 * 
 * It uses the useState and useEffect hooks to manage state and fetch data on mount.
 * 
 * The component fetches data from the Pokemon API, stores it in the data state variable, 
 * and displays it in a paginated table using the react-table component.
 * 
 * It implements pagination by slicing the data array based on the currentPage and pageSize.
 * 
 * It also allows searching and changing pages by calling the handleOnSearchChange and 
 * handlePageChange handlers passed to the Table component.
 * 
 * Overall, this is a reusable data fetching and display component that handles loading state,
 * pagination, and search.
 */
const ApiExample = () => {
    // State variable to store the data from the API
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const pageSize = 5;

    // Effect hook to fetch data from the API when the component mounts
    useEffect(() => {
        // Function to fetch data from the API
        const fetchData = async () => {
            if (data && !data?.length) {
                try {
                    setIsLoading(true);
                    // Make a GET request to the API endpoint
                    const response = await fetch('https://pokeapi.co/api/v2/pokemon');

                    // Check if the response is successful
                    if (!response.ok) {
                        throw new Error('Failed to fetch data');
                    }

                    // Parse the JSON response
                    const jsonData = await response.json();

                    // Update the state variable with the fetched data
                    setTotalPages(jsonData.results.length / pageSize);
                    setData(jsonData.results);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
                setIsLoading(false);
            }
        };

        // Call the fetchData function
        fetchData();
    }, []); // Empty dependency array to ensure the effect runs only once

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    // Paginate the data based on the current page
    const paginatedData = data.slice(startIndex, endIndex);

    const handleOnSearchChange = async (searchQuery: string) => {
        alert('searching');
    }
    const handlePageChange = async (page: number) => {
        setCurrentPage(page);
    }

    return (
        <>
            <GeneralBreadcrumbs
                items={[
                    {
                        name: "Dashboard",
                        href: "/dashboard",
                    },
                    {
                        name: "Users",
                        href: "/dashboard/users",
                    },
                ]}
            />
            <Suspense>
                <Table
                    columns={[
                        {
                            key: 'name',
                            label: 'Name',
                            allowsSorting: true,
                        },
                        {
                            key: 'url',
                            label: 'Url',
                            allowsSorting: false,
                        },
                    ]}
                    isLoading={isLoading}
                    hasSearchBar
                    data={paginatedData}
                    page={currentPage}
                    pages={totalPages}
                    onSearchChange={handleOnSearchChange}
                    onPageChange={handlePageChange}
                />
            </Suspense>
        </>
    );
};

export default ApiExample;
