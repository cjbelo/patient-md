export const isAuthed = () => !!localStorage.getItem("token");

export const login = (email: string, token = "demo-token") => {
  localStorage.setItem("token", token);
  localStorage.setItem("email", email);
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("email");
};
