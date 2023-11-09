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

export const callFetchAccount = () => {
  return instance.get("/user");
};

// export const callChangeAvatar = () => {
//   return instance.put("/user/image");
// }

export const callChangeAvatar = (formData) => {
  return instance.put("/user/image", formData, {
    headers: {
      "Content-Type": "multipart/form-data", // Đặt kiểu dữ liệu thành multipart/form-data
    },
  });
};

// export default { callLogin, callRegister, callFetchAccount };
