import instance from "../utils/axiosCustomize";

export const callLogin = (email, password) => {
  return instance.get(`/user?email=${email}&password=${password}`);
};

export const callRegister = () => {
    
}

