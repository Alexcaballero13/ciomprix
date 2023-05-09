import { ADDTASK, REMOVETASK, UPDATETASK } from "./Actions-type";

export const AgregarTask = (order) => {
    return ({ type: ADDTASK, payload: order })
}

export const borrarTarea = (order) => {
    return ({ type: REMOVETASK, payload: order })
}

export const modificarTarea = (order) => {
    return ({ type: UPDATETASK, payload: order })
}