const apiURL = 'https://dev-connect-rest-api.herokuapp.com';
export const environment = {
  production: false,
  signup: `${apiURL}/user/register`,
  login: `${apiURL}/auth/signIn`,
  project: `${apiURL}/project`,
  projectMember:`${apiURL}/project-detail`,
  member:`${apiURL}/project/addMember`,
  getmember:`${apiURL}/project/members`,
  todo:`${apiURL}/todo`,
  chat:`${apiURL}/chat/group`,
  chatsAll:`${apiURL}`,
  chatPost:`${apiURL}/chat`,
};
