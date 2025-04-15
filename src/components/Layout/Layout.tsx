import { FC, ReactNode, useMemo } from 'react';

import { SidebarProvider } from '../Sidebar/Sidebar';
import SidebarWrapper from '../Sidebar/components/SidebarWrapper';
import { paths } from '@app/routes/Routes.utils';
import { useLocation } from 'react-router-dom';

export interface LayoutProps {
  children: ReactNode;
}
const Layout: FC<LayoutProps> = ({ children }) => {
  const { pathname } = useLocation();
  const hideSidebar = useMemo(() => [paths.profile].includes(pathname), [pathname]);

  return (
    <SidebarProvider hideSidebar={hideSidebar}>
      <SidebarWrapper hideSidebar={hideSidebar}>{children}</SidebarWrapper>
    </SidebarProvider>
  );
};

export default Layout;
