import { FaPen, FaTrash, FaPlus, FaEye } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import IAnimalModel from '../../models/Animal';
import AnimalService from "../../services/AnimalService";
import Swal from "sweetalert2";
import { showAlert, showErrorAlert } from "../../common/alerts";


type AppProps = {
  idCuidador : number;
}  

export const AnimalList = (props: AppProps) => {

    //Hook: Define un atributo y la función que lo va a actualizar
    const [animal, setAnimal] = useState<Array<IAnimalModel>>([]);
    //Hook para llamar a la Web API
    useEffect(() => {
      AnimalService.list(props.idCuidador)
      .then((response: any) => {
        setAnimal(response.data); //Víncula el resultado del servicio con la función del Hook useState
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });         
      }, [props.idCuidador]);  

      const removeAnimal = (data: IAnimalModel) => {
        Swal.fire({
            title: '¿Desea eliminar el animal?',
            showDenyButton: true,
            confirmButtonText: 'Si',
            denyButtonText: 'No',
          }).then((result) => {            
            if (result.isConfirmed) {
              AnimalService.remove(data)
              .then((response: any) => {              
                showAlert('¡Correcto!', 'Animal eliminado correctamente');
                console.log(response.data);
              })
              .catch((e: Error) => {
                showErrorAlert('¡Error!', 'Error al intentar borrar el animal');
                console.log(e);
              });      
            }
          });        
    };

  
    return ( 
        <div className='list row'>
            <h1>Animales</h1>
            <div className='col-md-12'>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nombre</th>
                            <th>Fecha de nacimiento</th>
                            <th>Raza</th>
                            <th>Propocito</th>
                            <th>
                              <Link to={"/cuidador/" + props.idCuidador + "/animal/create"} className="btn btn-success">
                                  <FaPlus /> Agregar
                              </Link>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {animal && animal.map((Animal, index) => (                          
                            <tr key={index}>
                                <td>{index+1}</td>
                                <td>{Animal.nombre}</td>
                                <td>{Animal.fechaNac}</td>
                                <td>{Animal.raza}</td>
                                <td>{Animal.propocito}</td>
                                <td>
                                <div className="btn-group" role="group">
                              
                                  <Link to={"/cuidador/" + props.idCuidador + "/animal/retrieve/" + Animal.id} className="btn btn-primary">
                                      <FaEye /> ver
                                  </Link>
                                  <Link to={"/cuidador/" + props.idCuidador + "/animal/update/" + Animal.id} className="btn btn-primary">
                                      <FaPen /> Editar
                                  </Link>
                                  <Link to={"/cuidador/" + props.idCuidador + "/animal/retrieve/" + Animal.id + "/chequeo/list"} className="btn btn-primary">
                                      <FaEye /> Chequeo
                                  </Link>
                                  <button className="btn btn-danger" onClick={() => removeAnimal(Animal)}>
                                    <FaTrash /> Eliminar
                                  </button>
                                </div>
                                    
                                </td>
                            </tr>                        
                        ))}
                    </tbody>
                </table>
            </div>            
        </div>
     );
}