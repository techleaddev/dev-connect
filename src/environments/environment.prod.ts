export const apiUrl = 'https://dev-connect-rest-api.herokuapp.com';

export const environment = {
  production: false,

  signin: `${apiUrl}/auth/signIn`,
  signup: `${apiUrl}/user/register`,
  users: `${apiUrl}/user`,
  project: `${apiUrl}/project`,
  member: `${apiUrl}/project`,
  deleteMember: `${apiUrl}/project-detail/member`,
  status: `${apiUrl}/project`,
  tag: `${apiUrl}/project`,
  todo: `${apiUrl}/todo`,
  chat: `${apiUrl}/chat`,
};
