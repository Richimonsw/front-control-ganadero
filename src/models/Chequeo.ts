import ICuidadorModel from "./Cuidador"

export default interface IChequeoModel {
    id?: number | null,
    fechaCheq: string,
    observaciones: string,
    cuidador: ICuidadorModel | null
}
