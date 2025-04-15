'use client';

import { ChevronDown, ChevronRight } from 'lucide-react';
import { FC, useEffect, useMemo, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  useSidebar,
} from '@app/components/Sidebar/Sidebar';
import { SidebarItem, SidebarWrapperProps } from './types';
import auth, { ALLOWED_ROLES } from '@app/utils/auth';

import React from 'react';
import SVGIcon from '@app/components/SVGIcon';
import TopBar from '@app/components/TopBar';
import logoImage from '@app/assets/logo.png';
import logoText from '@app/assets/logo-text.svg';
import { paths } from '@app/routes/Routes.utils';

const sidebarItems: SidebarItem[] = [
  {
    title: 'Analysis',
    path: paths.analysis,
    icon: <SVGIcon icon="analysis" />,
    activeIcon: <SVGIcon icon="analysis" color="fill-white" />,
    children: [],
    allowedRoles: [ALLOWED_ROLES.admin, ALLOWED_ROLES.user],
  },
  {
    title: 'Users',
    path: paths.users,
    icon: <SVGIcon icon="users" />,
    activeIcon: <SVGIcon icon="users" color="fill-white" />,
    children: [],
    allowedRoles: [ALLOWED_ROLES.admin],
  },
  {
    title: 'Expenses',
    path: paths.expenses,
    icon: <SVGIcon icon="expense" />,
    activeIcon: <SVGIcon icon="expense-active" />,
    children: [],
    allowedRoles: [ALLOWED_ROLES.admin, ALLOWED_ROLES.user],
  },
  {
    title: 'Logout',
    path: paths.home,
    icon: <SVGIcon icon="logout" />,
    activeIcon: <SVGIcon icon="logout" color="fill-white" />,
    children: [],
    allowedRoles: [ALLOWED_ROLES.admin, ALLOWED_ROLES.user],
  },
];

const SidebarWrapper: FC<SidebarWrapperProps> = ({ children, hideSidebar }) => {
  const { state, isMobile } = useSidebar();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({});

  const userRole = auth.getUserRole() ?? '';

  useEffect(() => {
    const token = auth.token();
    if (!token) {
      <Navigate replace to={paths.signIn} />;
    } else {
      setIsAuthenticated(true);
    }
  }, [navigate]);

  const toggleSection = (title: string) => {
    setOpenSections(prev => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  const handleSelectItem = (item: SidebarItem) => {
    toggleSection(item.title);
    navigate(item.path);
  };

  const isExpanded = useMemo(() => state === 'expanded', [state]);

  const filteredItems = useMemo(() => {
    return sidebarItems.filter(item => item.allowedRoles.includes(userRole));
  }, [userRole]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex w-full flex-row">
      <Sidebar collapsible={isExpanded ? 'offcanvas' : 'icon'} className={hideSidebar ? '!hidden w-0' : ''}>
        <SidebarHeader className="cursor-pointer border-b py-7">
          <div className={`relative flex w-full flex-row items-center ${!isExpanded && 'justify-center'}`}>
            {!isExpanded && (
              <div className="transition-opacity duration-300">
                <img
                  src={logoImage}
                  className="cursor-pointer"
                  alt="Logo"
                  width={41}
                  height={34}
                  onClick={() => navigate(paths.analysis)}
                />
              </div>
            )}
            {isExpanded && (
              <div className="flex items-center gap-2 pl-3">
                <img
                  src={logoImage}
                  className="cursor-pointer"
                  alt="Logo"
                  width={41}
                  height={34}
                  onClick={() => navigate(paths.analysis)}
                />
                <img src={logoText} alt="Logo Text" width={156} height={21} />
              </div>
            )}
          </div>
        </SidebarHeader>

        <SidebarContent className="px-5 pt-4">
          <SidebarMenu className={`flex flex-col justify-center gap-3 ${!isExpanded && !isMobile && 'items-center'}`}>
            {filteredItems.map((item, index) => (
              <SidebarMenuItem
                key={index}
                className={`hover:!rounded-md ${!isExpanded && 'w-[36px]'} hover:!bg-primary hover:!text-white ${pathname === item.path ? 'rounded-md bg-primary text-white' : ''}`}>
                <SidebarMenuButton
                  className="hover:!rounded-md hover:!bg-primary hover:!text-white"
                  onClick={() => handleSelectItem(item)}>
                  {pathname === item.path ? item.activeIcon : item.icon}
                  <span
                    className={`text-md font-medium ${pathname === item.path ? 'text-white' : 'text-secondaryText'}`}>
                    {item.title}
                  </span>
                  {item.children.length > 0 &&
                    (openSections[item.title] ? (
                      <ChevronDown className="ml-auto h-4 w-4" />
                    ) : (
                      <ChevronRight className="ml-auto h-4 w-4" />
                    ))}
                </SidebarMenuButton>

                {item.children.length > 0 && openSections[item.title] && (
                  <div className="">
                    {item.children.map((child, idx) => (
                      <SidebarMenuItem key={idx}>
                        <SidebarMenuButton>{child.title}</SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </div>
                )}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>

        <SidebarSeparator />
      </Sidebar>

      <div className="flex h-screen w-full flex-col overflow-hidden">
        <TopBar />
        <main className="flex-1 overflow-y-auto bg-[#ECF1F2] px-6 pt-2">{children}</main>
      </div>
    </div>
  );
};

export default SidebarWrapper;
