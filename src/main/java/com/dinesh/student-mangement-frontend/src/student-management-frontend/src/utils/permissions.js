export const hasRole = (role) => {
  return role === "ADMIN";
};

export const hasAnyRole = (user, roles = []) => {
  return roles.includes(user?.role);
};

export const isAdmin = (role) => {
  return role === "ADMIN";
};

export const isUser = (role) => {
  return role === "USER";
};