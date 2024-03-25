"use client";
import Table from "@/app/components/Table";
import DeleteConfirmationModal from "@/app/components/users/deleteConfirmationModal";
import AddEditModal from "@/app/components/users/addEditModal";
import "@/app/globals.css";
import { Tooltip } from "@nextui-org/react";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import { useEffect, useState } from "react";
import { getUsers } from "../../api/users/route";
import GeneralBreadcrumbs from "@/app/components/GeneralBreadcrumbs";

interface User {
  id: number | string;
  email: string;
  summary?: string | null;
  name?: string | null;
}

interface ModalSettings {
  isOpenAddEdit: boolean;
  isOpenDelete: boolean;
  currentEntry: User | null;
}

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [modalSettings, setModalSettings] = useState<ModalSettings>({
    isOpenAddEdit: false,
    isOpenDelete: false,
    currentEntry: null,
  });
  const pageSize = 5;

  const appendQueriesToUrl = (
    queries: { key: string; value: string | number }[],
  ) => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    queries.map((query) => {
      urlSearchParams.set(query.key, query.value.toString());
    });
    window.history.replaceState(null, "", "?" + urlSearchParams.toString());
  };

  const getUrlQueryElement = (key: string) => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    return urlSearchParams.get(key) || "";
  };

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const userData = await getUsers({
        search: getUrlQueryElement("search"),
        page: Number(getUrlQueryElement("page")) ?? 1,
        pageSize: pageSize,
      });
      setUsers(userData.users);
      setTotalPages(userData.totalPages);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const init = async () => {
      appendQueriesToUrl([
        { key: "page", value: getUrlQueryElement("page") || 1 },
      ]);
      setCurrentPage(Number(getUrlQueryElement("page")));
      await fetchUsers();
    };
    init();
  }, []);

  const handleAddEditModal = (id?: string) => {
    const userToEdit = users.find((user) => user.id === id);
    setModalSettings((prevState) => ({
      ...prevState,
      isOpenAddEdit: true,
      currentEntry: userToEdit ?? null,
    }));
  };

  const handleAddEdit = async () => {
    await fetchUsers();
  };

  const handleDeleteModal = (id: string) => {
    const userToDelete = users.find((user) => user.id === id);
    if (userToDelete) {
      setModalSettings((prevState) => ({
        ...prevState,
        isOpenDelete: true,
        currentEntry: userToDelete,
      }));
    }
  };

  const handleDelete = () => {
    fetchUsers();
  };

  const handleModalClose = () => {
    setModalSettings((prevState) => ({
      ...prevState,
      isOpenAddEdit: false,
      isOpenDelete: false,
    }));
  };

  const handleOnSearch = async (value: string) => {
    const queries = [
      {
        key: "search",
        value: value,
      },
    ];
    appendQueriesToUrl(queries);
    await fetchUsers();
  };

  const handlePageChange = async (page: number) => {
    setCurrentPage(page);
    appendQueriesToUrl([{ key: "page", value: page.toString() }]);
    await fetchUsers();
  };

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
          { key: "name", label: "NAME", allowsSorting: false },
          { key: "email", label: "EMAIL", allowsSorting: false },
          { key: "summary", label: "SUMMARY", allowsSorting: false },
          {
            key: "actions",
            label: "ACTIONS",
            className: "text-end",
            cell: (rowData) => (
              <div className="flex items-center gap-5">
                <Tooltip content="Edit">
                  <span
                    className="cursor-pointer text-center text-base text-blue-500 hover:text-blue-300 dark:text-white dark:hover:text-blue-500"
                    onClick={() => handleAddEditModal(rowData.id)}
                  >
                    <FaPencilAlt />
                  </span>
                </Tooltip>
                <Tooltip content="Delete">
                  <span
                    className="cursor-pointer text-center text-base text-red-500 hover:text-red-300 dark:text-white dark:hover:text-red-500"
                    onClick={() => handleDeleteModal(rowData.id)}
                  >
                    <FaTrash />
                  </span>
                </Tooltip>
              </div>
            ),
          },
        ]}
        isLoading={isLoading}
        hasSearchBar
        addMore={() => handleAddEditModal()}
        data={users}
        page={currentPage}
        pages={totalPages}
        onSearchChange={handleOnSearch}
        onPageChange={handlePageChange}
      />
      {modalSettings.isOpenAddEdit && (
        <AddEditModal
          isOpen={modalSettings.isOpenAddEdit}
          onOpenChange={handleModalClose}
          currentEntry={modalSettings.currentEntry}
          onUpdateUser={handleAddEdit}
        />
      )}
      {modalSettings.isOpenDelete && (
        <DeleteConfirmationModal
          isOpen={modalSettings.isOpenDelete}
          onConfirm={handleDelete}
          onClose={handleModalClose}
          currentEntry={modalSettings.currentEntry}
        />
      )}
    </>
  );
}
