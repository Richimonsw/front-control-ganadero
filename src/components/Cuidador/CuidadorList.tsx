import { FaPen, FaEye, FaTrash, FaPlus } from "react-icons/fa";
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import ICuidadorModel from '../../models/Cuidador';
import CuidadorService from "../../services/CuidadorService";
import Swal from "sweetalert2";
import ReactPaginate from "react-paginate";
import { showAlert, showErrorAlert } from "../../common/alerts";
import "../../App.css";


export const CuidadorList = () => { 

    //Hook: Define un atributo y la función que lo va a actualizar
    const [cuidador, setCuidador] = useState<Array<ICuidadorModel>>([]);
    const [itemsCount, setItemsCount] = useState<number>(0);
    const [pageCount, setPageCount] = useState<number>(0);
    const [itemsPerPage] = useState<string>('5');
    const [numberPage, setNumberPage] = useState<number>(0);

    useEffect(() => {
      CuidadorService.count().then((response: any) =>{        
        let itemsCount = response;
        setItemsCount(itemsCount);
        setPageCount(Math.ceil(itemsCount/ +itemsPerPage));
        console.log(response);
      }).catch((e : Error)=> {
        console.log(e);
      });      
    },[itemsPerPage]);

    useEffect(() => {
      CuidadorService.list(numberPage, itemsPerPage)
         .then((response: any) => {
           setCuidador(response.data); //Víncula el resultado del servicio con la función del Hook useState           
           console.log(response.data);
         })
         .catch((e: Error) => {
           console.log(e);
         });          
    },[itemsPerPage, numberPage, itemsCount]); 

    const handlePageClick = (event: any) => {        
      setNumberPage(event.selected);                         
    };


    const removeCuidador = (id: number) => {
      Swal.fire({
          title: '¿Desea eliminar el cuidador?',
          showDenyButton: true,
          confirmButtonText: 'Si',
          denyButtonText: 'No',
        }).then((result) => {            
          if (result.isConfirmed) {
              CuidadorService.remove(id)
              .then((response: any) => {
                let updatedItemsCount = itemsCount - 1;
                setItemsCount(updatedItemsCount);
                setPageCount(Math.ceil(updatedItemsCount/ +itemsPerPage));
                showAlert('¡Correcto!', 'Cuidador eliminado correctamente');                  
              })
              .catch((e: Error) => {
                showErrorAlert('¡Error!', 'Error al intentar borrar el Cuidador');
                console.log(e);
              });      
          }
        });        
   };

    return ( 
      <div className='list row'>
            <h1>Hay {itemsCount} cuidadores</h1><div className='col-md-12'>
        <table className='table'>
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Cedula</th>
              <th>Email</th>
              <th>Telefono</th>
              <th>
                <Link to={"/cuidador/create"} className="btn btn-success">
                  <FaPlus /> Agregar
                </Link>
              </th>
              <th>
              </th>
            </tr>
          </thead>
          <tbody>
            {cuidador && cuidador.map((Cuidador, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{Cuidador.nombre}</td>
                <td>{Cuidador.apellido}</td>
                <td>{Cuidador.cedula}</td>
                <td>{Cuidador.email}</td>
                <td>{Cuidador.telefono}</td>
                <td></td>
                <td colSpan={2}>

                  <div className="btn-group" role="group">
                    <Link to={"/cuidador/retrieve/" + Cuidador.id} className="btn btn-warning">
                      <FaEye /> Ver
                    </Link>
                    <Link to={"/cuidador/update/" + Cuidador.id} className="btn btn-primary">
                      <FaPen /> Editar
                    </Link>

                    <button className="btn btn-danger" onClick={() => removeCuidador(Cuidador.id!)}>
                      <FaTrash /> Eliminar
                    </button>
                  </div>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="container">
          <ReactPaginate
            activeClassName="page-item active"
            pageLinkClassName="page-link"
            containerClassName="pagination"
            previousLinkClassName="page-link"
            nextLinkClassName="page-link"
            previousClassName="page-item"
            nextClassName="page-item"
            breakLabel="..."
            nextLabel=">>"
            pageClassName="page-item"
            onPageChange={handlePageClick}
            pageCount={pageCount}
            previousLabel="<<" />
        </div>
      </div>         
    </div>
     );
}