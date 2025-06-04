export const handleLogout = () => {
  const currentLocation = window.location.pathname;

  if (currentLocation !== '/login') {
    window.location.href = '/login';
  }

  return Promise.reject();
};
