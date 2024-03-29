import React, { Suspense, useMemo, useReducer } from "react";
import {
  Table as NextTable,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Spinner,
  Pagination,
  Button,
} from "@nextui-org/react";
import { BiPlus } from "react-icons/bi";
import SearchBar from "./Searchbar";

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
  sortDescriptor?: any;
  onSortChange?: (sortDescriptor: any) => void;
}

const initialState = {
  topContent: null,
  bottomContent: null,
};

type ActionType = { type: "SET_TOP_CONTENT" | "SET_BOTTOM_CONTENT"; payload: any };

const reducer = (state: typeof initialState, action: ActionType) => {
  switch (action.type) {
    case "SET_TOP_CONTENT":
      return { ...state, topContent: action.payload };
    case "SET_BOTTOM_CONTENT":
      return { ...state, bottomContent: action.payload };
    default:
      return state;
  }
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
  sortDescriptor,
  onSortChange
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useMemo(() => {
    const topContent = (
      <div className="flex flex-col gap-4">
        <div className="flex items-end justify-between gap-3">
          {hasSearchBar && (
            <Suspense>
              <SearchBar onSearchChange={value => onSearchChange(value)} />
            </Suspense>
          )}
          {addMore && (
            <Button color="primary" onClick={addMore} endContent={<BiPlus />}>
              Add New
            </Button>
          )}
        </div>
      </div>
    );
    dispatch({ type: "SET_TOP_CONTENT", payload: topContent });
  }, [hasSearchBar, addMore, onSearchChange]);

  useMemo(() => {
    const bottomContent = pages > 0 ? (
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
    dispatch({ type: "SET_BOTTOM_CONTENT", payload: bottomContent });
  }, [pages, page, onPageChange, isLoading]);

  return (
    <NextTable
      color="primary"
      isStriped
      classNames={{
        table:
          (data && !data.length) || isLoading
            ? "min-h-[420px]"
            : "min-h-[180px]",
      }}
      topContent={state.topContent}
      bottomContent={state.bottomContent}
      sortDescriptor={sortDescriptor}
      onSortChange={onSortChange}
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
        {data.map((item: any, index: any) => (
          <TableRow key={item?.id || index}>
            {columns.map((column) => (
              <TableCell key={column.key}>
                {column.cell ? column.cell(item) : item[column.key as keyof typeof item]}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </NextTable>
  );
};


export default Table;
