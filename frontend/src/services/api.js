import instance from "../utils/axiosCustomize";

export const callLogin = (email, password) => {
  const jsonData = {
    email: email,
    password: password
  }
  return instance.post("/user", jsonData);
};

export const callRegister = (name, email, phoneNumber, password) => {
  const jsonData = {
    name: name,
    email: email,
    phoneNumber: phoneNumber,
    password: password
  }
  return instance.post("/user/register", jsonData);
};
