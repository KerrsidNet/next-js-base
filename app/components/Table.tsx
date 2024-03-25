"use client";
import React, { useCallback, useMemo, useState } from "react";
import {
  Table as NextTable,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Spinner,
  Input,
  Pagination,
  Button,
} from "@nextui-org/react";
import { CiSearch } from "react-icons/ci";
import { useSearchParams } from "next/navigation";
import { BiPlus } from "react-icons/bi";

// Define the debounce function
const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

interface TableProps {
  columns: {
    key: string;
    label: string;
    className?: string;
    allowsSorting?: boolean;
    cell?: (rowData?: any) => React.ReactNode;
  }[];
  onSearchChange: (searchQuery: string) => Promise<any>;
  onPageChange: (page: number) => void;
  data: any;
  hasSearchBar?: boolean;
  addMore?: () => void;
  pages: number;
  page: number;
  isLoading: boolean;
}

const getKeyValue = (obj: any, key: string) => {
  return obj[key];
};

const Table: React.FC<TableProps> = ({
  columns,
  pages,
  page,
  data,
  hasSearchBar,
  addMore,
  isLoading,
  onSearchChange,
  onPageChange,
}) => {
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
    [debouncedSearch],
  );

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-end justify-between gap-3">
          {hasSearchBar && (
            <Input
              isClearable
              className="w-full sm:max-w-[44%]"
              placeholder="Search"
              startContent={<CiSearch />}
              defaultValue={searchParams ?? ""}
              onValueChange={handleSearchChange}
            />
          )}
          {addMore && (
            <Button color="primary" onClick={addMore} endContent={<BiPlus />}>
              Add New
            </Button>
          )}
        </div>
      </div>
    );
  }, [searchParams, handleSearchChange]);

  const bottomContent = useMemo(() => {
    return pages > 0 ? (
      <div className="flex w-full justify-center">
        <Pagination
          isCompact
          showControls
          showShadow
          isDisabled={isLoading}
          color="primary"
          page={page}
          total={pages}
          onChange={onPageChange}
        />
      </div>
    ) : null;
  }, [page, pages, onPageChange, isLoading]);

  return (
    <NextTable
      //TODO add this back when adding bulk actions
      // selectionMode="multiple"
      color="primary"
      isStriped
      classNames={{
        table:
          (data && !data.length) || isLoading
            ? "min-h-[420px]"
            : "min-h-[180px]",
      }}
      topContent={topContent}
      bottomContent={bottomContent}
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn allowsSorting={column.allowsSorting} key={column.key}>
            {column.label}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody
        isLoading={isLoading}
        loadingContent={<Spinner>Loading...</Spinner>}
        items={isLoading ? [] : data}
        className="min-h-[400px]"
        emptyContent={isLoading ? "" : "No rows to display"}
      >
        {(item) => (
          <TableRow key={item?.id}>
            {columns.map((column) => (
              <TableCell key={column.key}>
                {column.cell
                  ? column.cell(item)
                  : getKeyValue(item, column.key)}
              </TableCell>
            ))}
          </TableRow>
        )}
      </TableBody>
    </NextTable>
  );
};

export default Table;
