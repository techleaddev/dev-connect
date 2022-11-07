
const apiUrl = 'https://dev-connect-rest-api.herokuapp.com'

export const environment = {
  production: true,

  signin: `${apiUrl}/auth/signIn`,
  signup: `${apiUrl}/user/register`,
  project: `${apiUrl}/project`
};
