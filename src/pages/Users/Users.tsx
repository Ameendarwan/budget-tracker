import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@app/components/Table/Table';

import AddUserDialog from './components/AddUserDialog';
import CustomPagination from '@app/components/CustomPagination';
import DeleteUserDialog from './components/DeleteUserDialog';
import Loader from '@app/components/Loader/Loader';
import PaginationInfo from '@app/components/PaginationInfo';
import SVGIcon from '@app/components/SVGIcon';
import { Separator } from '@app/components/Separator/Separator';
import TitleSection from '@app/components/TitleSection';
import { User } from '@app/store/apis/user/types';
import UserFilters from './components/UserFilters';
import { useDebounce } from '@app/hooks/useDebounce';
import { useGetAllUsersQuery } from '@app/store/apis/user';

const Users = () => {
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [editUser, setEditUser] = useState<User | null>(null);
  const [deleteUser, setDeleteUser] = useState<User | null>(null);

  const debouncedSearch = useDebounce(searchValue, 500);

  const { data, isLoading } = useGetAllUsersQuery({ page, limit: 10, search: debouncedSearch, sortField: sortBy });

  if (isLoading) return <Loader isFullPageLoader />;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row flex-wrap items-center justify-between">
        <h4 className="text-[32px] font-semibold text-text">Users</h4>
        <AddUserDialog
          mode={!!editUser ? 'edit' : 'create'}
          setIsOpen={setEditUser}
          isOpen={!!editUser}
          defaultValues={{ ...editUser }}
          id={editUser?._id ?? ''}
        />
      </div>
      {!!deleteUser && <DeleteUserDialog setIsOpen={setDeleteUser} isOpen={!!deleteUser} user={{ ...deleteUser }} />}
      <Separator className="mb-3 bg-border" />
      <div className="rounded-md shadow-md">
        <TitleSection title="Users" className="!px-4">
          <UserFilters
            sortBy={sortBy}
            setSortBy={setSortBy}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
          />
        </TitleSection>
        <Table className="w-full border border-t-0 border-border">
          <TableHeader>
            <TableRow className="bg-[#F7F7F7]">
              {['First Name', 'Last Name', 'Email', 'Number', 'Role'].map(header => (
                <TableHead className="text-sm font-semibold text-text">{header}</TableHead>
              ))}
              <TableHead className="text-right text-sm font-semibold text-text">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.users?.map(user => (
              <TableRow key={user._id} className="bg-white">
                <TableCell className="text-sm text-text">{user.firstName}</TableCell>
                <TableCell className="text-sm text-text">{user.lastName}</TableCell>
                <TableCell className="text-sm text-text">{user.email}</TableCell>
                <TableCell className="text-sm text-text">{user.phoneNumber}</TableCell>
                <TableCell className="text-sm text-text">{user.role}</TableCell>
                <TableCell className="flex flex-row items-center justify-end gap-6 text-right">
                  <SVGIcon icon="trash" className="cursor-pointer" onClick={() => setDeleteUser(user)} />
                  <SVGIcon icon="pencil" className="cursor-pointer" onClick={() => setEditUser(user)} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination */}
        <div className="r flex items-center justify-between border-x bg-white p-4">
          <PaginationInfo total={data?.total ?? 0} page={page} />
          <CustomPagination
            totalPages={data?.totalPages ?? 0}
            page={page}
            onPageChange={setPage}
            className="flex items-center justify-end gap-2 text-text"
          />
        </div>
      </div>
    </div>
  );
};

export default Users;
