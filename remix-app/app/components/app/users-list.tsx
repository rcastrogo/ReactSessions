import { useState } from 'react';
import type { User } from '../../models/User';


interface UserListProps {
  users: User[];
  selectedUserId?: string;
  onSelect?: (user: User | undefined) => void;
}

function UserTable({
  title,
  users,
  selectable,
  selectedUser,
  onSelect,
}: {
  title: string;
  users: User[];
  selectable?: boolean;
  selectedUser?: User;
  onSelect?: (user: User) => void;
}) {
  return (
    <div className="flex-1">
      <h2 className="mb-1 text-center text-lg font-semibold text-gray-800 dark:text-gray-100">
        {title}
      </h2>
      <div className="relative h-[300px] overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <div className="sticky top-0 z-10 flex items-center border-b border-gray-200 bg-gray-50 px-3 py-2 text-sm font-semibold dark:border-gray-700 dark:bg-gray-900">
          <span className="w-12 flex-shrink-0 text-center">ID</span>
          <span className="flex-1">Nombre</span>
          <span className="w-20 flex-shrink-0 text-center">Rol</span>
          <span className="w-20 flex-shrink-0 text-center">Acceso</span>
          <span className="w-12 flex-shrink-0 text-center">Manager</span>
        </div>

        {users.length > 0 ? (
          users
            .sort((a, b) => a.id - b.id)
            .map((u: User) => (
              <div
                key={u.id}
                role={selectable ? 'button' : undefined}
                tabIndex={selectable ? 0 : undefined}
                onClick={() => selectable && onSelect?.(u)}
                onKeyDown={e => {
                  if (!selectable) return;
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelect?.(u);
                  }
                }}
                className={`flex items-center border-b border-gray-100 px-3 py-2 text-sm transition-colors duration-150 last:border-none ${
                  selectable ? 'cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700' : ''
                } ${selectedUser?.id === u.id ? 'bg-gray-200 dark:bg-gray-700' : ''} `}
              >
                <span className="w-12 text-center">{u.id}</span>
                <span className="flex-1 truncate">{u.full_name}</span>
                <span className="w-20 truncate text-center">{u.aspiring_role}</span>
                <span className="w-20 truncate text-center">{u.access_type}</span>
                <span className="w-12 text-center">{u.line_manager ?? '-'}</span>
              </div>
            ))
        ) : (
          <div className="px-3 py-4 text-sm text-gray-500 italic dark:text-gray-400">
            No hay usuarios
          </div>
        )}
      </div>
    </div>
  );
}

export default function UserList({ users, selectedUserId, onSelect }: UserListProps) {
  const [selectedUser, setSelectedUser] = useState<User | undefined>(
    users.find((u: User) => String(u.id) === selectedUserId)
  );

  const dependents = users.filter(u => u.line_manager === (selectedUser?.id || -1));

  return (
    <div className="w-full">
      <div className="flex flex-col items-start gap-6 md:flex-row">
        <UserTable
          title="Todos los usuarios"
          users={users}
          selectable
          selectedUser={selectedUser}
          onSelect={(u: User) => {
            setSelectedUser(u);
            onSelect?.(u);
          }}
        />
        <UserTable
          title="Dependientes"
          users={dependents}
          selectable
          onSelect={(u: User) => {
            setSelectedUser(u);
            onSelect?.(u);
          }}
        />
      </div>
    </div>
  );
}
