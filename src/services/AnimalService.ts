import { showAlert, showErrorAlert } from "../common/alerts";
import http from "../http-common";
import IAnimalModel from "../models/Animal";

const create = async (data: IAnimalModel) => {    
  console.log(data);
    const url : string = `/cuidador/${data.cuidador!.id}/animal`;
    http.post<IAnimalModel>(url, data).then((response)=> {
      console.log(response);
      showAlert('¡Correcto!', 'Animal agregado correctamente');
    }).catch((err) => {
      console.error(err);
      showErrorAlert('¡Error!', 'El animal no pudo ser agregada');
    });
};

const retrieve = async (idCuidador: number, id : number) => {
  return await http.get<IAnimalModel>(`/cuidador/${idCuidador}/animal/${id}`);
};

const update = async (data: IAnimalModel) => {     
  const url : string = `/cuidador/${data.cuidador!.id}/animal/${data.id}`; 
  http.put<IAnimalModel>(url, data).then((response) => {
    console.log(response);
    showAlert('¡Correcto!','Animal actualizada correctamente');
  }).catch((err) => {
    console.error(err);
    showErrorAlert('¡Error!', 'El animal no pudo ser actualizada');
  });       
};

const remove = async (data: IAnimalModel) => {
  const url : string = `/cuidador/${data.cuidador!.id}/animal/${data.id}`;  
  http.delete<string>(url).then((response) =>{
    console.log(response);
    showAlert('¡Correcto!','Animal eliminado correctamente');
  }).catch((err)=>{
    console.error(err);
    showErrorAlert('¡Error!', 'El animal no pudo ser eliminada');
  });
};

const list = async (idCuidador: number) => {
  const url : string = `/cuidador/${idCuidador}/animal`;  
  return await http.get<Array<IAnimalModel>>(url);
};

const listc = async (idCuidador: number, id : number) => {
  const url : string = `/cuidador/${idCuidador}/animal/${id}/chequeo`;  
  return await http.get<Array<IAnimalModel>>(url);
};

const AnimalService = {
  create,
  retrieve,
  update,
  remove,
  list,
  listc

};
export default AnimalService;