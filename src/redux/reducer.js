import { ADDTASK, REMOVETASK, UPDATETASK } from "./Actions-type";

const initialState = {
    Tasks:[]
}

const tasksReducer = (state = initialState, action) =>{
    switch (action.type) {
        case ADDTASK:
            return{
                ...state,
                Tasks: [...state.Tasks, { ...action.payload }]
            }

        case REMOVETASK:
            return{
                ...state,
                Tasks: state.Tasks.filter(obj => obj.nombre !== action.payload)
            }

            case UPDATETASK:
                const taskToUpdateIndex = state.Tasks.findIndex(obj => obj.nombre === action.payload.nombre);
                if (taskToUpdateIndex === -1) {
                  // Si no se encuentra la tarea, no se hace nada
                  return state;
                }
                const updatedTask = { ...state.Tasks[taskToUpdateIndex], ...action.payload };
                const updatedTasks = [...state.Tasks];
                updatedTasks[taskToUpdateIndex] = updatedTask;
                return {
                  ...state,
                  Tasks: updatedTasks,
                };

            default:
                return {...state};
    }
}

export default tasksReducer;