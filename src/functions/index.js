import * as api from "../api";
export const getUsers = async () => {
  try {
    const { data } = await api.getUsers();
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const createUser = async (todo) => {
  try {
    const { data } = await api.createUser(todo);
    return data;
  } catch (error) {
    console.log(error);
  }
};
