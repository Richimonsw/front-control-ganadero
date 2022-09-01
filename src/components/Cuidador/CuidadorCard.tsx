import { useEffect, useState } from "react";
import { FaArrowLeft} from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useParams } from "react-router-dom";
import ICuidadorModel from "../../models/Cuidador";
import CuidadorService from "../../services/CuidadorService";
import { AnimalList } from "../Animal/AnimalList";

export const CuidadorCard = () => {
  const { id }= useParams();

  const [cuidador, setCuidador] = useState<ICuidadorModel>();

  useEffect(() => {
    if (id)
    {
      CuidadorService.retrieve(+id)
      .then((response: any) => {
        setCuidador(response.data); //Víncula el resultado del servicio con la función del Hook useState
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });        
    }
  }, [id]);

    return (
      <div>
      { 
        cuidador ? (
          <div>          
          <h2>{cuidador.nombre}</h2>
          <p>{cuidador.apellido}</p>
          <ul>
            <li> <strong>Cedula:</strong>  {cuidador.cedula}</li>
            <li> <strong>Email:</strong>{cuidador.email}</li>
            <li> <strong>Telefono:</strong>{cuidador.telefono}</li>
          </ul>
          <AnimalList idCuidador={cuidador.id!} />
          <br />
							<div className="btn-group" role="group">								
                <Link to={"/cuidador"} className="btn btn-primary">
                    <FaArrowLeft /> Volver
                </Link>

							</div>
          </div>

        ) : 
        ( 
          <h1>No hay un Animales activo</h1>
        )
      }
      </div>
    );
}