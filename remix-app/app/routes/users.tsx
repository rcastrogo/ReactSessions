import { type FetcherSubmitOptions } from "react-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { User } from "~/models/User";
import { submitIntent, useSPAData } from "../hooks/useSPAData";
import type { BaseActionData, action as usersAction } from "~/api/users.server";
import LoadingComponent, { IndeterminateProgressBar } from "../components/app/Loading";
import useAlertManager from "../hooks/useAlert";
import { useIsHydrated } from "../hooks/useIsHydrated";
import { DialogLayout } from "../components/app/DialogLayout";
import { Button } from "../components/ui/button";
import UserForm, { USER_FORM_ID } from "../dialogs/UserForm";
import { createMap, getSafeFormData } from "../lib/utils";
import type { Role } from "../models/Role";
import { TablaPaginada, type ActionButtonProps } from "../components/app/Table";
import { Input } from "../components/ui/input";
import { Mail, Printer, User as UserIcon } from "lucide-react";
import { ALERT_TYPE, type AlertMessage } from "../components/app/AlertMessageComponent";
import { t } from "i18next";
import { MENU_SEPARATOR_KEY } from "../components/app/TableMenu";

type UsersActionType = Awaited<ReturnType<typeof usersAction>>;

const SUBMIT_ACTION_ROUTE = '/api/users';
const SUBMIT_POST_OPTIONS: FetcherSubmitOptions = { method: "post", action: SUBMIT_ACTION_ROUTE };

export default function UsersPage() {
  const { error, success, question, loading, close, showMessage } = useAlertManager();
  const hydrated = useIsHydrated();
  const { data, fetcher, isLoading } = useSPAData<UsersActionType>(SUBMIT_ACTION_ROUTE);
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [target, setTarget] = useState<User>();
  const [projects, setProjects] = useState<string[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [lineManagers, setLineManagers] = useState<User[]>([]);

  const [openUserDialog, setOpenUserDialog] = useState(false);
  const callbacksRef = useRef<{
    created?: (user: User) => void;
    updated?: (user: User) => void;
    deleted?: () => void;
  }>({});

  // ==========================================================
  // Datos de la carga inicial disponible
  // ==========================================================
  useEffect(() => {
    if (!data) return;
    if (data.intent !== "init") return;
    if (data.message) error(data.message, 'Error de backend');
    if (data.projects) setProjects(data.projects);
    if (data.roles) setRoles(data.roles);
    if (data.lineManagers) setLineManagers(data.lineManagers);
  }, [data]);

  // ==================================================================
  // Respuestas CRUD disponibles
  // ==================================================================
  useEffect(() => {
    if (!data) return;
    if (data.intent === "init") return;
    close();
    switch (data.status) {
      case "results":
        setUsers(data.users || []);
        break;
      case "created":
        callbacksRef.current.created?.(data.user);
        break;
      case "updated":
        callbacksRef.current.updated?.(data.user);
        break;
      case "deleted":
        callbacksRef.current.deleted?.();
        break;
      case "error":
        error(data.message, 'Error de backend');
        break;
    }
  }, [data]);

  function handleSearch() {
    loading(<LoadingComponent message={t('general.action.loading-data')} />);
    setUsers([]);
    submitIntent(fetcher, SUBMIT_ACTION_ROUTE, "search", { q: query });
  }

  function handleCreate(callback: (target: User) => void) {
    callbacksRef.current.created = callback;
    setTarget({ id: 0 });
    setOpenUserDialog(true);
  }

  function handleEdit(target: User, callback: (target: User) => void) {
    callbacksRef.current.updated = callback;
    setTarget(target);
    setOpenUserDialog(true);
  }

  function handleDelete(ids: (string | number)[], callback: () => void) {
    callbacksRef.current.deleted = callback;
    submitIntent(fetcher, SUBMIT_ACTION_ROUTE, "delete", { id: ids[0] });
    loading(<LoadingComponent message="Borrando usuarios" />);
  }

  function handleCustomsActions(action: string, data: any) {
    if (action == 'reload-data') handleSearch();
    else {
      const message = {
        message: <>{action} <IndeterminateProgressBar increment={15} /></>,
        delay: 0,
        type: ALERT_TYPE.error,
        title: 'handleCustomsActions'
      } as AlertMessage;
      showMessage(message);
    }
  }

  function handleCancelEditUser() {
    setTarget(undefined);
    setOpenUserDialog(false);
  }

  function handleSaveUser() {
    const form = document.forms.namedItem(USER_FORM_ID);
    if (form) {
      const data = getSafeFormData(new FormData(form));
      if (target?.id)
        submitIntent(fetcher, SUBMIT_ACTION_ROUTE, "update", data);
      else
        submitIntent(fetcher, SUBMIT_ACTION_ROUTE, "create", data);
    }
    setTarget(undefined);
    setOpenUserDialog(false);
  }

  // Memoriza los mapas solo cuando cambian sus fuentes
  const rolesNameMap = useMemo(() => createMap(roles, 'id', 'name.ES'), [roles]);
  const usersNameMap = useMemo(() => createMap(users, 'id', 'full_name'), [users]);
  const nameResolver = useCallback(
    (id: number | null | undefined, target: Record<string, any>) => target[id || 0] ?? '',
    []
  );

  if (!hydrated) return <LoadingComponent message={t('general.action.loading-data')} />


  const table_config = {
    columns:
      [
        {
          key: 'id',
          title: 'Id',
          sorter: 'id',
          className: 'w-[20px]',
        },
        {
          key: 'das',
          title: 'Das',
          resolver: 'das',
          sorter: 'das',
          className: 'w-[20px]',
        },
        {
          key: 'full_name',
          title: 'Nombre',
          resolver: (u: User) => (<><span>{u.full_name}</span><br></br><span className="italic text-muted-foreground">{u.email}</span></>),
          sorter: 'full_name',
          className: 'w-rest',
        },
        {
          key: 'access_type',
          title: 'Tipo',
          resolver: 'access_type',
          sorter: 'access_type',
        },
        {
          key: 'project',
          title: 'Proyecto',
          resolver: 'project',
          sorter: 'project',
          className: 'w-1/4',
        },
        {
          key: 'line_manager',
          title: 'Mentor',
          resolver: (u: User) => nameResolver(u.line_manager, usersNameMap),
          sorter: (a: User, b: User) => String(nameResolver(a.line_manager, usersNameMap)).localeCompare(String(nameResolver(b.line_manager, usersNameMap))),
          className: 'w-1/4',
        },
        {
          key: 'aspiring_role',
          title: 'Role',
          resolver: (u: User) => nameResolver(u.aspiring_role, rolesNameMap),
          sorter: (a: User, b: User) => String(nameResolver(a.aspiring_role, rolesNameMap)).localeCompare(String(nameResolver(b.aspiring_role, rolesNameMap))),
          className: 'min-w-[200px] text-gray-500 [&[data-slot="table-head"]]:!text-white dark:[&[data-slot="table-head"]]:!text-white',
        },
      ],
    handlers: {
      onCreate: handleCreate,
      onEdit: handleEdit,
      onDelete: handleDelete,
      onCustomAction: handleCustomsActions,
    },
    menuButtons: [
      {
        label: 'Enviar Correo',
        key: 'send-email',
        onClick: () => success('Enviar Correo'),
        icon: <Mail />,
        show: "both"
      },
      {
        label: 'Imprimir informe',
        key: 'print',
        onClick: () => success('Imprimir'),
        icon: <Printer />,
        show: "menu"
      },
      {
        label: 'Ver perfil del usuario',
        key: 'view-profile',
        onClick: () => success('Perfil de usuario'),
        icon: <UserIcon />,
        show: "button"
      },
      {
        label: '',
        key: MENU_SEPARATOR_KEY,
        show: "menu"
      },
      {
        label: 'Exportar',
        key: 'menu-export',
        show: "menu"
      }
    ] as ActionButtonProps[]
  }

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-bold">Gestión de usuarios</h1>

      <div className="flex gap-2">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar usuario..."
          className="border px-2 py-1 flex-1 rounded"
        />
        <Button
          variant="ghost"
          type="button"
          onClick={() => handleSearch()}
          className="bg-blue-600 text-white px-3 py-1 rounded"
        >
          Buscar
        </Button>
      </div>

      <TablaPaginada
        id="user-table"
        dataSource={users}
        initialPageSize={10}
        entity="Usuarios"
        title="Usuarios"
        enableDoubleClickEdit={true}
        columns={table_config.columns}
        actionHandlers={table_config.handlers}
        buttons={table_config.menuButtons}
        waitingForRows={isLoading && data?.intent == 'search'}
      />

      <DialogLayout
        open={openUserDialog}
        onOpenChange={setOpenUserDialog}
        size="xl"
        title="Creación de usuario"
        description="Introduce los datos del usuarios y pulsa guardar."
        footer={
          <>
            <Button variant="outline" onClick={() => handleCancelEditUser()}>
              Cancel
            </Button>
            <Button onClick={() => handleSaveUser()}>Save</Button>
          </>
        }
      >
        <UserForm user={target} projects={projects} roles={roles} lineManagers={lineManagers} />
      </DialogLayout>

    </div>
  );
}
