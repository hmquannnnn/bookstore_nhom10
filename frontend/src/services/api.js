import instance from "../utils/axiosCustomize";

export const callLogin = (email, password) => {
  return instance.post(/*`/user?email=${email}&password=${password}`*/ "user", { email, password });
};

export const callRegister = (name, email, phoneNumber, password) => {
  return instance.post(/*`/user?email=${email}&password=${password}`*/ "user", {
    name,
    email,
    phoneNumber,
    password,
  });
};
