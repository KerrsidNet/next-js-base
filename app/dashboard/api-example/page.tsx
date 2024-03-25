"use client"
import GeneralBreadcrumbs from '@/app/components/GeneralBreadcrumbs';
import Table from '@/app/components/Table';
import React, { useState, useEffect } from 'react';

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
        </>
    );
};

export default ApiExample;
