import axios from "../../utils/axiosCustomize";

export const callLogin = ( email, password) => {
    return axios.post('url api ', {email, password});
}

export const callRegister = () => {

}

