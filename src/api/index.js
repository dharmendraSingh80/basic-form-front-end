import axios from "axios";
// const url = "http://localhost:5000/user";
import { url } from "../App";

export const getUsers = async () => await axios.get(url);
export const createUser = async (user) => await axios.post(url, user);
