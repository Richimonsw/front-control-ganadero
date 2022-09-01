import { ChangeEvent, useEffect, useState } from "react";
import { FaArrowLeft, FaSave } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import ICuidadorModel from "../../models/Cuidador";
import IAnimalModel from "../../models/Animal";
import CuidadorService from "../../services/CuidadorService";
import AnimalService from "../../services/AnimalService";

export const AnimalForm = () => {

  const { id, idCuidador }= useParams();
  let navigate = useNavigate();


//Model vacío
const initialAnimalModel : IAnimalModel = {
    id: null,
    nombre: "",
    fechaNac: "",
    raza: "",
    propocito: "",
    cuidador : null    
};

//Hooks para gestionar el modelo
const [animal, setAnimal] = useState<IAnimalModel>(initialAnimalModel);
const [cuidador, setCuidador] = useState<ICuidadorModel>();

//Escucha los cambios en cada control Input y los asigna a los valores del Modelo
const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setAnimal({ ...animal, [name]: value });
};

useEffect(() => {
  if (idCuidador)
  {
    CuidadorService.retrieve(+idCuidador)
    .then((response: any) => {
      setCuidador(response.data); //Víncula el resultado del servicio con la función del Hook useState      
      console.log(response.data);
    })
    .catch((e: Error) => {
      console.log(e);
    });
  }

  if (id && idCuidador)
  {
    AnimalService.retrieve(+idCuidador, +id)
    .then((response: any) => {
      setAnimal(response.data); //Víncula el resultado del servicio con la función del Hook useState
      animal.cuidador = cuidador!;
      console.log(response.data);
    })
    .catch((e: Error) => {
      console.log(e);
    });
  }

},[id, idCuidador]);

const saveAnimal = () => {        
  if(animal.id !== null)
  {
    AnimalService.update(animal)
    .then((response: any) => {
      navigate(`/cuidador/retrieve/${cuidador!.id}`);
      console.log(response.data);
    })
    .catch((e: Error) => {
      console.log(e);
    });
  }
  else
  {
    animal.cuidador = cuidador!;
      AnimalService.create(animal)
      .then((response: any) => {    
        navigate(`/cuidador/retrieve/${cuidador!.id}`);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }
};

return ( //JSX
	<div className="submit-form">				
		<div>
				{ animal.id !== null ? (<h1>Actualizado el animal {animal.nombre}</h1>) : (<h1>Registro de nuevo animal</h1>) }            
        { cuidador ? (<h3>{cuidador.nombre} </h3>) : (<h3>N/A</h3>) }
						<div className="form-group">
						<label htmlFor="nombre">Nombre</label>
            <input
              type="text"
							placeholder="Ingrese el nombre del animal"
              className="form-control"
              id="nombre"
              required
              value={animal.nombre}
              onChange={handleInputChange}
              name="nombre"
            />
						<label htmlFor="fechaNac">Fecha de nacimiento</label>
            <input						
              type="text"
              className="form-control"
							placeholder="Ingrese la fecha de nacimiento del animal"
              id="fechaNac"
              required
              value={animal.fechaNac}
              onChange={handleInputChange}
              name="fechaNac"
            />
						<label htmlFor="raza">Raza</label>
            <input						
              type="text"
              className="form-control"
							placeholder="Ingrese la raza del animal"
              id="raza"
              required
              value={animal.raza}
              onChange={handleInputChange}
              name="raza"
            />
            <label htmlFor="propocito">Propocito</label>
            <input						
              type="text"
              className="form-control"
							placeholder="Ingrese eñ propocito del animal"
              id="propocito"
              required
              value={animal.propocito}
              onChange={handleInputChange}
              name="propocito"
            />
			
						<br />
							<div className="btn-group" role="group">								
                <Link to={`/cuidador/retrieve/${idCuidador}`} className="btn btn-primary">
                    <FaArrowLeft /> Volver
                </Link>
								<button type="button" onClick={saveAnimal} className="btn btn-success">
                  <FaSave />Guardar
                </button>
							</div>
						</div>
					</div>				
			</div>        
    );
}

