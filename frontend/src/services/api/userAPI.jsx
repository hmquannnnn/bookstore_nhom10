import instance from "../../utils/axiosCustomize";
import imageUrlConfig from "../imageUrlConfig";

export const callLogin = (email, password) => {
  const req = {
    email: email,
    password: password,
  };
  return instance.post("/user/login", req);
};

export const callRegister = (email, name, phone, password, address) => {
  const req = {
    email: email,
    name: name,
    phone: phone,
    password: password,
    address: address,
  };
  return instance.post("/user/register", req);
};

export const callFetchAccount = async () => {
  // return instance.get("/user");

  //config image url
  const res = await instance.get("/user");
  res.image_url = imageUrlConfig(res.image_url);
  return res;
};

export const callChangeAvatar = (imageFile) => {
  return instance.post("/user/image", imageFile);
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
