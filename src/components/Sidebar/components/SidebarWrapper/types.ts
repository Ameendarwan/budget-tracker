export interface SidebarWrapperProps {
  hideSidebar?: boolean;
  children: React.ReactNode;
}

export interface SidebarItem {
  title: string;
  path: string;
  icon: JSX.Element;
  activeIcon: JSX.Element;
  children: SidebarItem[];
  allowedRoles: string[];
}
