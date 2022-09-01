import { showAlert, showErrorAlert } from "../common/alerts";
import http from "../http-common";
import IUserTokenModel from "../models/Token";
import IUserModel from "../models/Usuario";

const login = async (data: IUserModel) => {    
  const url : string = `/users/login`;
  await http.post<IUserTokenModel>(url, data).then((response)=> {
    console.log(response);
    localStorage.setItem("token", response.data.token);
    showAlert('¡Correcto!', 'Usuario acreditado');
  }).catch((err) => {
    console.error(err);
    showErrorAlert('¡Error!', 'El Usuario no pudo inicial');
  });  
};

const UserService = {
  login
};

export default UserService;