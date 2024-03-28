import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react"
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, PromiseLikeOfReactNode, Key } from "react";

/**
 * Renders Breadcrumbs component with array of breadcrumb items
 * 
 * @param {Object[]} items - Array of breadcrumb item objects 
 * @param {string} items[].href - Link for breadcrumb item
 * @param {string} items[].color - Color for breadcrumb item
 * @param {string|number|boolean|ReactElement} items[].name - Display name for breadcrumb item
 * 
 * @returns {ReactElement} Breadcrumbs component
 */
const GeneralBreadcrumbs = ({ items }: any) => {
    return (
        <div className="pb-5 pt-3">
            <Breadcrumbs>
                {items.map((item: { href: string | undefined; color: any; name: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | null | undefined; }, index: Key | null | undefined) => (
                    <BreadcrumbItem key={index} href={item.href} color={item?.color || 'foreground'}>
                        {item.name}
                    </BreadcrumbItem>
                ))}
            </Breadcrumbs>
        </div>
    )
}

export default GeneralBreadcrumbs;