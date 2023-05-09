import { ADDTASK, REMOVETASK, UPDATETASK, SEARCHTASK, SEARCHCATEGORY, SEARCHSTATE } from "./Actions-type";

export const AgregarTask = (order) => {
    return ({ type: ADDTASK, payload: order })
}

export const borrarTarea = (order) => {
    return ({ type: REMOVETASK, payload: order })
}

export const modificarTarea = (order) => {
    return ({ type: UPDATETASK, payload: order })
}

export const buscarTask = (order) => {
    return ({ type: SEARCHTASK, payload: order })
}

export const buscarTaskcategoria = (order) => {
    return ({ type: SEARCHCATEGORY, payload: order })
}

export const filtroEstado = (order) => {
    return ({ type: SEARCHSTATE, payload: order })
}