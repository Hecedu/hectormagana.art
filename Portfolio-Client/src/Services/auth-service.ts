import axios from "axios";

const authenticateUser = async (token: string): Promise<string> => {
  const res = (await axios.post('/api/Auth/Authenticate', {idToken: token})).data.authToken;
  return res;
};
const logoutUser = async (token: string) => {
  await axios.delete(`/api/Auth/InvalidateBearerToken?bearer=${token}`)
};

const authService = {
  authenticateUser,
  logoutUser
};

export default authService;
