import { useSession } from "next-auth/react";

/**
 * Converts a sort order string to 'asc' or 'desc'.
 * 
 * @param fullOrder - The full sort order string.
 * @returns The normalized sort order string ('asc' or 'desc').
 */
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

/**
 * Filters a list of items by user role, returning only items that match the 
 * user's role. Uses the NextAuth session to get the current user role.
 * @param items - The list of items to filter
 * @returns The filtered list of items
 */
export const getFilteredByRoleItems = (items: any) => {
  const { data: session } = useSession();
  const user: any = session?.user;
  return items.filter((item: any) =>
    !item.roles || item.roles.includes(user?.role?.name.toLowerCase())
  );
}