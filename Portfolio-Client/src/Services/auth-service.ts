import axios from "axios";

const authenticateUser = async (token: string): Promise<string> => {
  const res = (await axios.post('/api/Auth/authenticate', {idToken: token})).data.authToken;
  return res.data;
};

const authService = {
  authenticateUser
};

export default authService;
