import { useEffect, useState } from "react";
import type { User } from "~/models/User";
import AutoComplete from "~/components/app/Autocomplete";
import { t } from "i18next";
import type { Role } from "../models/Role";

type ComboOption = { value: string | number; label: string };
export const USER_FORM_ID = 'user-data-form-dialog';

interface UserFormProps {
  user?: Partial<User>;
  lineManagers?: User[];
  roles?: Role[];
  accessTypes?: ComboOption[];
  projects?: string[];
}

export default function UserForm({
  user,
  lineManagers = [],
  roles = [],
  accessTypes = [
    { value: "User", label: "User" },
    { value: "Admin", label: "Admin" },
    { value: "Mentor", label: "Mentor" },
  ],
  projects = [],
}: UserFormProps) {
  const [target, setTarget] = useState<Partial<User>>(user ?? {});

  return (
    <form
      id={USER_FORM_ID}
      method="post"
      className="p-4 bg-white dark:bg-gray-900 shadow-md space-y-3 transition-colors"
    >
     {/* DAS */}
      <div>
        <label
          htmlFor="das"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          DAS
        </label>
        <input type="hidden" id="id" name="id" value={target.id} />
        <input
          id="das"
          name="das"
          type="text"
          defaultValue={target.das ?? ""}
          className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter das"
        />
      </div>

      {/* Full Name */}
      <div>
        <label
          htmlFor="full_name"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          Full Name
        </label>
        <input type="hidden" id="id" name="id" value={target.id} />
        <input
          id="full_name"
          name="full_name"
          type="text"
          defaultValue={target.full_name ?? ""}
          className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter full name"
        />
      </div>

      {/* Email */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          defaultValue={target.email ?? ""}
          className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="example@domain.com"
        />
      </div>

      {/* Project */}
      <div>
        <label
          htmlFor="project"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          Project
        </label>
        <AutoComplete
          key={user?.id ?? 'none'}
          id="project"
          name="project"
          type="text"
          maxLength={255}
          placeholder={t('management.create.project-placeholder')}
          defaultValue={user?.project || ''}
          className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClear={() => console.log('AutoCompleteControl.onClear')}
          onItemSelected={item => console.log(item)}
          renderItem={item => <span>{item.value}</span>}
          searchAction="./"
          searchIntent=""
          searchResults={10000}
          searchLength={2}
          searchDataSource={projects
            .map((name: string) => {
              return { label: name, value: name };
            })
            .sort()}
        />
      </div>

      {/* Line Manager */}
      <div>
        <label
          htmlFor="line_manager"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          Line Manager
        </label>
        <select
          id="line_manager"
          name="line_manager"
          defaultValue={target.line_manager ?? ""}
          className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select a manager</option>
          {lineManagers.map((m) => (
            <option key={m.id} value={m.id}>
              {m.full_name}
            </option>
          ))}
        </select>
      </div>

      {/* Aspiring Role */}
      <div>
        <label
          htmlFor="aspiring_role"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          Aspiring Role
        </label>
        <select
          id="aspiring_role"
          name="aspiring_role"
          defaultValue={target.aspiring_role ?? ""}
          className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >

          {roles.map((r) => (
            <option key={r.id} value={r.id || ''}>
              {r.name.ES}
            </option>
          ))}
        </select>
      </div>

      {/* Access Type */}
      <div>
        <label
          htmlFor="access_type"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          Access Type
        </label>
        <select
          id="access_type"
          name="access_type"
          defaultValue={target.access_type ?? ""}
          className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select access type</option>
          {accessTypes.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
      </div>
    </form>
  );
}
