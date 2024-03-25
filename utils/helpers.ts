import { useSession } from "next-auth/react";

export const convertSortOrder = (fullOrder: string): string => {
  if (!fullOrder) return "desc";
  if (fullOrder.toLowerCase() === "ascending") {
    return "asc";
  } else if (fullOrder.toLowerCase() === "descending") {
    return "desc";
  } else {
    // Default to ascending if the input is not recognized
    return "asc";
  }
};

export const getFilteredByRoleItems = (items: any) => {
  const { data: session } = useSession();
  const user = session?.user;
  return items.filter((item: any) =>
    !item.roles || item.roles.includes(user?.role?.name.toLowerCase())
  );
}