import instance from "../../utils/axiosCustomize";

export const callLogin = (email, password) => {
  const jsonData = {
    email: email,
    password: password,
  };
  return instance.post("/user/login", jsonData);
};

export const callRegister = (email, name, phone, password, address) => {
  const jsonData = {
    email: email,
    name: name,
    phone: phone,
    password: password,
    address: address,
  };
  return instance.post("/user/register", jsonData);
};

export const callFetchAccount = () => {
  return instance.get("/user");
};

export const callChangeAvatar = (formData) => {
  return instance.patch("/user/image", formData, {
    headers: {
      "Content-Type": "multipart/form-data", // Đặt kiểu dữ liệu thành multipart/form-data
    },
  });
};

export const callChangeName = (name) => {
  console.log("call this name: ", name, " " + typeof name);
  const formattedName = String(name);
  console.log(">>>url :", `/user/name/${formattedName}`, "and ", formattedName);
  return instance.patch(`/user/name/${name}`);
};

export const callChangeAddress = (address) => {
  return instance.patch(`/user/address/${address}`);
};

export const callChangePhone = (phone) => {
  return instance.patch(`/user/phone/${phone}`);
};

export const callChangePassword = (oldPassword, newPassword) => {
  const data = {
    old: oldPassword,
    new: newPassword,
  };
  const jsonData = JSON.stringify(data);
  console.log(jsonData);
  return instance.patch("user/password", jsonData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
