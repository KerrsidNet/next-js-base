/**
 * sidebarItems - An array of sidebar item objects to render in the sidebar.
 * Each item contains a label, icon, href, tooltip for accessibility, 
 * and a roles array indicating which user roles should see this item.
 */
// sidebarItems.js
import { FaHome, FaUser } from "react-icons/fa";

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
    roles: ['admin','user'],
  },
  // Add more sidebar items as needed
];

export default sidebarItems;