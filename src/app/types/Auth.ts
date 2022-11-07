export type TypeSignup = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
};
export type TypeLogin = {
  email: string;
  password: string;
};
export type TypeLoginResponse = {
  token: string;
};
export type TypeSignupResponse = {
  token: string;
};
