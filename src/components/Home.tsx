import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { showAlert } from '../common/alerts';
import IUserModel from '../models/Usuario';
import UserService from '../services/UserService';


const initialUserModel: IUserModel = {
  name: "",
  password: ""
};

export const Home = () => {

  let navigate = useNavigate();

  const [user, setUser] = useState<IUserModel>(initialUserModel);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
};

  const loginUser = () =>{
    UserService.login(user)
    .then((response: any)=>{
      if(user.name! && user.password!){
        navigate("/cuidador");
        setUser(response.data);
      }else{
        showAlert('¡Incorrecto!', 'Usuario no tiene acceso');
      }
        
    })
    .catch((e:Error)=>{
      console.log(e);
    });
 }

      return (
        <div className="container mt-5 ">
    <div className="row d-flex justify-content-center">
        <div className="col-md-6">
            <div className="card px-5 py-5" id="form1">
                <div className="form-data" v-if="!submitted">
                    <div className="forms-inputs mb-4"> <span>Usuario</span> 
                    <input 
                        type="text" 
                        v-model="text" 
                        className="form-control" 
                        id="name" 
                        value={user.name}
                        onChange={handleInputChange}
                        name="name"
                    />
                    </div>
                    <div className="forms-inputs mb-4"> <span>Password</span> 
                    <input 
                      type="password" 
                      v-model="password" 
                      className="form-control" 
                      id="password"
                      value={user.password}
                      onChange={handleInputChange}
                      name="password"
                    />
                    </div>
                    <div className="mb-3"> 
                    <button type="button" onClick={loginUser} className="btn btn-success">Entrar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
      );
};