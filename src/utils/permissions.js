export const ROLES = {
    SUPER_ADMIN: 'super_admin',
    ACCOUNTANT: 'accountant',
    SUPPORT: 'support_staff',
  };
  
  // Which roles can access which modules
  export const PERMISSIONS = {
    users: [ROLES.SUPER_ADMIN],
    orders: [ROLES.SUPER_ADMIN, ROLES.SUPPORT],
    accounts: [ROLES.SUPER_ADMIN, ROLES.ACCOUNTANT],
    reports: [ROLES.SUPER_ADMIN, ROLES.ACCOUNTANT],
  };
  
  // Check if a role has access to a module
  export function hasAccess(role, moduleKey) {
    if (!role || !moduleKey) return false;
    return PERMISSIONS[moduleKey]?.includes(role) || false;
  }
  