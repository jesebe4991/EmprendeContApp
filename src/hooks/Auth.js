// auth.js
export const checkAuth = () => {
  const user = localStorage.getItem('user');
  if (!user) {
    throw new Response("Unauthorized", { status: 401 });
  }

  const token = JSON.parse(user).token;
  const { exp } = JSON.parse(atob(token.split('.')[1]));
  if (Date.now() >= exp * 1000) {
    localStorage.removeItem('user');
    throw new Response("Unauthorized", { status: 401 });
  }
  return true;
};
