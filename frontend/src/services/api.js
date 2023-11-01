import instance from "../utils/axiosCustomize";

export const callLogin = (email, password) => {
  const jsonData = {
    email: email,
    password: password
  }
  return instance.post("/user/login", jsonData);
};

export const callRegister = (email, name, phone, password, address) => {
  const jsonData = {
    email: email,
    name: name,
    phone: phone,
    password: password,
    address: address
  }
  return instance.post("/user/register", jsonData);
};
