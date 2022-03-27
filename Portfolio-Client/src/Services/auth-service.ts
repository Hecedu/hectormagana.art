import axios from "axios";
import User from "../Models/user";

const authUrl = "/api/auth";

const authenticateUser = async (token: string): Promise<string> => {
  const res = (await axios.post('/api/Auth/authenticate', {idToken: token})).data.authToken;
  return res.data;
};

const authService = {
  authenticateUser
};

export default authService;
