import { showAlert, showErrorAlert } from "../common/alerts";
import http from "../http-common";
import ICuidadorModel from "../models/Cuidador";

const create = async (data: ICuidadorModel) => {    
  const url : string = `/cuidador`;
  http.post<ICuidadorModel>(url, data).then((response)=> {
    console.log(response);
    showAlert('¡Correcto!', 'Cuidador agregado correctamente');
  }).catch((err) => {
    console.error(err);
    showErrorAlert('¡Error!', 'El Cuidador no pudo ser agregado');
  });  
};

const retrieve = async (id: number) => {
    return http.get<ICuidadorModel>(`/cuidador/${id}`);
};

const update = async (data: ICuidadorModel) => {
  const url : string = `/cuidador/${data.id}`;
  http.put<ICuidadorModel>(url, data).then((response)=> {
    console.log(response);
    showAlert('¡Correcto!', 'Cuidador actualizado correctamente');
  }).catch((err) => {
    console.error(err);
    showErrorAlert('¡Error!', 'El Cuidador no pudo ser actualizado');
  }); 
};

const remove = async (id: number) => {
  const url : string = `/cuidador/${id}`;
  http.delete<string>(url).then((response)=> {
    console.log(response);
    showAlert('¡Correcto!', 'Cuidador eliminado correctamente');
  }).catch((err) => {
    console.error(err);
    showErrorAlert('¡Error!', 'El Cuidador no pudo ser eliminado');
  });
};


const list = async (page: number, size: string, sort? : String) => {
  const urlRequest : string = "/cuidador/" + page + "/" + size ;
  console.log(urlRequest);
  return await http.get<Array<ICuidadorModel>>(urlRequest);
};

const count = async () =>  {  
  const response = await http.get<number>("/cuidador/count");
  return response.data;
};

const CuidadorService = {
  create,
  retrieve,
  update,
  remove,
  list,
  count

};
export default CuidadorService;