import { ChangeEvent, useEffect, useState } from "react";
import { FaArrowLeft, FaSave } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import ICuidadorModel from "../../models/Cuidador";
import CuidadorService from "../../services/CuidadorService";

export const CuidadorForm = () => {
	
  const { id }= useParams();
  let navigate = useNavigate();

    //Model vacío
    const initialCuidadorModel : ICuidadorModel = {
        id: null,
        nombre: "",
        apellido: "",
        cedula: "",
        email: "",
        telefono: ""
    };

    //Hooks para gestionar el modelo
    const [cuidador, setCuidador] = useState<ICuidadorModel>(initialCuidadorModel);
    
    //Escucha los cambios en cada control Input y los asigna a los valores del Modelo
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setCuidador({ ...cuidador, [name]: value });
    };

    

  const saveCuidador = () => {        
    if(cuidador.id !== null)
    {
      CuidadorService.update(cuidador)
      .then((response: any) => {
        navigate("/cuidador");
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
    }
    else
    {
      CuidadorService.create(cuidador)
        .then((response: any) => {    
          navigate("/cuidador");
          console.log(response.data);
        })
        .catch((e: Error) => {
          console.log(e);
        });
    }
  };

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


		return ( //JSX
			<div className="submit-form">				
					<div>
						{ cuidador.id !== null ? (<h1>Actualizado Cuidador {cuidador.nombre}</h1>) : (<h1>Registro de nuevo Cuidador</h1>) }            
						<div className="form-group">
						<label htmlFor="nombre">Nombre</label>
            <input
              type="text"
							placeholder="Ingrese el nombre del Cuidador"
              className="form-control"
              id="nombre"
              required
              value={cuidador.nombre}
              onChange={handleInputChange}
              name="nombre"
            />
						<label htmlFor="apellido">Apellido</label>
            <input						
              type="text"
              className="form-control"
							placeholder="Ingrese el apellido del Cuidador"
              id="apellido"
              required
              value={cuidador.apellido}
              onChange={handleInputChange}
              name="apellido"
            />
						<label htmlFor="cedula">Cedula</label>
            <input						
              type="number"
              className="form-control"
              id="cedula"
							max="10"
							min="1"
              required
              value={cuidador.cedula}
              onChange={handleInputChange}
              name="cedula"
            />
						<label htmlFor="email">email</label>
            <input						
              type="text"
              className="form-control"
              id="email"
              value={cuidador.email}
              onChange={handleInputChange}
              name="email"
            />
						<label htmlFor="telefono">Telefono</label>
            <input						
              type="number"
              className="form-control"
              id="telefono"				
              max="10 "		
							min="1"
              required
              value={cuidador.telefono}
              onChange={handleInputChange}
              name="telefono"
            />
						<br />
							<div className="btn-group" role="group">								
                <Link to={"/cuidador"} className="btn btn-primary">
                    <FaArrowLeft /> Volver
                </Link>
								<button type="button" onClick={saveCuidador} className="btn btn-success">
                  <FaSave />Guardar
                </button>
							</div>
						</div>
					</div>				
			</div>        
    );

}