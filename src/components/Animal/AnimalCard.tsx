import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link} from 'react-router-dom';
import { useParams } from "react-router-dom";
import IAnimalModel from "../../models/Animal";
import ICuidadorModel from "../../models/Cuidador";
import AnimalService from "../../services/AnimalService";
import CuidadorService from "../../services/CuidadorService";

export const AnimalCard = () => {
  const { id, idCuidador}= useParams();

  
  const [animal, setAnimal] = useState<IAnimalModel>();
  const [cuidador, setCuidador] = useState<ICuidadorModel>();
  
  useEffect(() => {
    if (idCuidador)
        {
          CuidadorService.retrieve(+idCuidador)
          .then((response: any) => {
            setCuidador(response.data); //Víncula el resultado del servicio con la función del Hook useState
            //animal!.cuidador = cuidador!;
            //console.log(response.data);
          })
          .catch((e: Error) => {
            console.log(e);
          });
        }
      
        if (id && idCuidador)
        {
          AnimalService.retrieve(+idCuidador, + id)
          .then((response: any) => {
            setAnimal(response.data); //Víncula el resultado del servicio con la función del Hook useState
            //animal!.cuidador = cuidador!;
            //console.log(response.data);
          })
          .catch((e: Error) => {
            console.log(e);
          });
        }
  }, [cuidador, animal, id, idCuidador]);


    return (
      <div>
      { 
        animal ? (
          <div>          
          <h2>{animal.nombre}</h2>
          <p>{animal.raza}</p>
          <ul>
            <li> <strong>Fecha de Nacimiento:</strong>  {animal.fechaNac}</li>
            <li>propocito : {animal.propocito}</li>
          </ul>
          <br />
							<div className="btn-group" role="group">								
                <Link to={`/cuidador/retrieve/${idCuidador}`} className="btn btn-primary">
                    <FaArrowLeft /> Volver
                </Link>
							</div>
          </div>

        ) : 
        ( 
          <h1>No hay un Animal activo</h1>
        )
      }
      </div>
    );
}