import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem
} from "@/components/ui/sidebar";
import {useAuth} from "@/context/auth-context";
import {AlertCircle, BarChart3, FileText, LayoutDashboard, Package, Settings, Users} from "lucide-react";
import {UserMenu} from "@/components/common/auth-context-client";

interface NavItem {
    title: string
    icon: React.ReactNode
    href: string
    entity?: string // Changed from permissions to entity
}

export function DashboardSidebar() {
    const {user} = useAuth();

    console.log(user);

    const navigationItems: NavItem[] = [
        {
            title: "Overview",
            icon: <LayoutDashboard className="h-4 w-4" />,
            href: "/dashboard",
            entity: "user", // Example entity
        },
        {
            title: "Inventory",
            icon: <Package className="h-4 w-4"/>,
            href: "/dashboard/inventory",
            entity: "product", // Example entity
        },
        {
            title: "Customers",
            icon: <Users className="h-4 w-4" />,
            href: "/dashboard/customers",
            entity: "customer", // Example entity
        },
        {
            title: "Prescriptions",
            icon: <FileText className="h-4 w-4" />,
            href: "/dashboard/prescriptions",
            entity: "prescription", // Example entity
        },
        {
            title: "Invoices",
            icon: <FileText className="h-4 w-4" />,
            href: "/dashboard/invoices",
            entity: "invoice", // Example entity
        },
        {
            title: "Reports",
            icon: <BarChart3 className="h-4 w-4" />,
            href: "/dashboard/reports",
            entity: "report", // Example entity
        },
        {
            title: "Alerts",
            icon: <AlertCircle className="h-4 w-4" />,
            href: "/dashboard/alerts",
            entity: "alert", // Example entity
        },
    ]

    const visibleItems = navigationItems.filter(({entity}) => {
        if (!entity) return true; // item visible to everyone
        if (!user || !user.permissions) return false;

        // Check if the user has any permission for the given entity
        return user.permissions.some((permission) =>
            permission.startsWith(`${entity}:`)
        );
    });

    return (
        <Sidebar variant="sidebar">
            <SidebarHeader className="border-b border-sidebar-border">
                <div className="flex items-center gap-2 px-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-sidebar-primary">
                        <span className="text-xs font-bold text-sidebar-primary-foreground">Rx</span>
                    </div>
                    <span
                        className="font-semibold text-sidebar-foreground group-data-[collapsible=icon]:hidden">Pharmacy</span>
                </div>
            </SidebarHeader>


            <SidebarContent>
                <SidebarMenu>
                    {visibleItems.map((item) => (
                        <SidebarMenuItem key={item.href}>
                            <SidebarMenuButton asChild tooltip={item.title}>
                                <a href={item.href} className="flex items-center gap-2">
                                    {item.icon}
                                    <span>{item.title}</span>
                                </a>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarContent>

            <SidebarFooter className="border-t border-sidebar-border">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild tooltip="Settings">
                            <a href="#" className="flex items-center gap-2 text-primary-foreground">
                                <Settings className="h-4 w-4"/>
                                <span>Settings</span>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
                <div className="flex items-center justify-between px-2 py-2 border-t border-sidebar-border">
                    <div className="text-xs text-sidebar-foreground/70">
                        <p className="font-medium">{user?.username}</p>
                        <p className="capitalize">{user?.userType}</p>
                    </div>
                    <UserMenu/>
                </div>
            </SidebarFooter>
        </Sidebar>
    )
}