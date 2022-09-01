import ICuidadorModel from "./Cuidador";


export default interface IAnimalModel {
    id?: number | null,
    nombre: string,
    fechaNac: string,
    raza: string,
    propocito: string,
    cuidador: ICuidadorModel | null
}