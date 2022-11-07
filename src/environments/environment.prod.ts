const apiURL = 'https://dev-connect-rest-api.herokuapp.com';
export const environment = {
  production: false,
  signup: `${apiURL}/user/register`,
  login: `${apiURL}/auth/signIn`,
  project: `${apiURL}/project`,
};
