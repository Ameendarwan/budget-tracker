import { Avatar, AvatarFallback, AvatarImage } from '@app/components/Avatar/Avatar';
import { LogOut, User2 } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@app/components/Popover/Popover';

import SVGIcon from '../SVGIcon';
import TimeAgo from '../TimeAgo';
import auth from '@app/utils/auth';
import { paths } from '@app/routes/Routes.utils';
import { useGetNotificationsQuery } from '@app/store/apis/notification';
import { useNavigate } from 'react-router-dom';
import { useSidebar } from '../Sidebar/Sidebar';

const TopBar = () => {
  const navigate = useNavigate();
  const { state, setOpen, isMobile, toggleSidebar } = useSidebar();

  const userId = auth.getDecodedToken()?.id ?? '';

  const { data } = useGetNotificationsQuery({ userId });

  const handleLogout = () => {
    auth.clearToken();
    navigate(paths.signIn);
  };

  const getSVGIcon = (icon: string) => {
    switch (icon) {
      case 'success':
        return <SVGIcon icon="success-notify" />;
      case 'error':
        return <SVGIcon icon="error-notify" />;
      case 'info':
        return <SVGIcon icon="info-notify" />;
    }
  };

  return (
    <div className="flex h-[90px] w-full flex-row items-center justify-between border-b px-6">
      <SVGIcon
        className="cursor-pointer"
        icon="menu"
        onClick={() => (isMobile ? toggleSidebar() : setOpen(state === 'expanded' ? false : true))}
      />
      <div className="relative flex flex-row items-center gap-8">
        <Popover>
          <PopoverTrigger asChild>
            <span className="relative">
              <SVGIcon className="cursor-pointer" icon="notification" />
            </span>
          </PopoverTrigger>
          <PopoverContent
            side="bottom"
            align="end"
            sideOffset={15}
            className="w-80 space-y-2 rounded-[12px] border-none p-2 !shadow-custom">
            {data?.map(n => (
              <div key={n._id} className="flex items-start gap-3 rounded-xl p-3 transition hover:bg-gray-100">
                <div className="mt-1">{getSVGIcon(n.type)}</div>
                <div className="text-sm">
                  <p className="text-[13px] font-medium text-[#464646]">{n.title}</p>
                  <p className="text-[13px] text-[#464646]">{n.message}</p>
                  <TimeAgo date={n.createdAt} className="!mt-2 block text-xs text-[#667085]" />
                </div>
              </div>
            ))}
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Avatar className="cursor-pointer">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback className="text-base text-white">AD</AvatarFallback>
            </Avatar>
          </PopoverTrigger>
          <PopoverContent
            side="bottom"
            align="end"
            sideOffset={12}
            className="w-72 rounded-2xl border-none p-4 !shadow-custom">
            <div className="mb-4 flex items-center gap-4">
              <div className="flex h-[42px] w-[42px] items-center justify-center rounded-full bg-rose-200 text-lg font-medium text-white">
                A
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800">Ameen Darwan</p>
                <p className="text-sm text-gray-500">ameen.darwan@gmail.com</p>
              </div>
            </div>
            <div className="border-t border-gray-200 pt-2">
              <span
                onClick={() => navigate(paths.profile)}
                className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-2 text-sm text-gray-700 hover:bg-gray-100">
                <User2 className="h-4 w-4" />
                Profile
              </span>
              <span
                onClick={handleLogout}
                className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-2 text-sm text-gray-700 hover:bg-gray-100">
                <LogOut className="h-4 w-4" />
                Logout
              </span>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default TopBar;
