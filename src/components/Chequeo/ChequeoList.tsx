import { FaPen, FaEye, FaTrash, FaPlus } from "react-icons/fa";
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import AnimalService from "../../services/AnimalService";
import IAnimalModel from "../../models/Animal";

type AppProps = {
  idAnimal : number;
}
export const ChequeoList = (props: AppProps) => {

    //Hook: Define un atributo y la función que lo va a actualizar
    const [chequeo, setChequeo] = useState<Array<IAnimalModel>>([]);
    
    //Hook para llamar a la Web API
    useEffect(() => {
              listCuidador();
      });

      const listCuidador = () => {
        AnimalService.list(props.idAnimal)
        .then((response: any) => {
          setChequeo(response.data);
          console.log(response.data);
        })
        .catch((e: Error) => {
          console.log(e);
        });
      }
   
    return ( 
        <div className='list row'>
            <h1>Chequeos</h1>
            <div className='col-md-12'>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Fecha de chequeo</th>
                            <th>Observaciones</th>
                            <th>
                              <Link to={"/cuidador/ "+ props.idAnimal  +"/animal/create"} className="btn btn-success">
                                  <FaPlus /> Agregar
                              </Link>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {chequeo && chequeo.map((Animal, index) => (                          
                            <tr key={index}>
                                <td>{++index}</td>
                                <td>{Animal.nombre}</td>
                                <td>{Animal.raza}</td>
                                <td>
                        
                                <div className="btn-group" role="group">
                                <Link to={"/cuidador/" + props.idAnimal + "/animal/retrieve/"+ Animal.id} className="btn btn-warning">
                                    <FaEye /> Ver
                                  </Link>                                  
                                  <Link to={"/cuidador/" + props.idAnimal + "/animal/update/"+ Animal.id} className="btn bbtn-primary">
                                      <FaPen /> Editar
                                  </Link>
                                  <button className="btn btn-danger">
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