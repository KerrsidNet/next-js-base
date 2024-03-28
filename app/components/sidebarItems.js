/**
 * sidebarItems - An array of sidebar item objects to render in the sidebar.
 * Each item contains a label, icon, href, tooltip for accessibility, 
 * and a roles array indicating which user roles should see this item.
 */
// sidebarItems.js
import { FaArchive, FaHome, FaUser } from "react-icons/fa";

/**
 * sidebarItems - An array of sidebar item objects to render in the sidebar.
 * Each item contains a label, icon, href, tooltip for accessibility, 
 * and a roles array indicating which user roles should see this item.
 */
export const sidebarItems = [
  {
    label: "Dashboard",
    icon: FaHome,
    href: "/dashboard",
    tooltip: "Home",
    roles: ['admin', 'user']
  },
  {
    label: "Users",
    icon: FaUser,
    href: "/dashboard/users",
    tooltip: "Users",
    roles: ['admin', 'user'],
  },
  {
    label: "Fetch example",
    icon: FaArchive,
    href: "/dashboard/api-example",
    tooltip: "Example of fetching external data",
    roles: ['admin', 'user'],
  }
];

export default sidebarItems;