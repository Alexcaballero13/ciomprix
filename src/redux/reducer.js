import { ADDTASK, REMOVETASK, UPDATETASK, SEARCHTASK, SEARCHCATEGORY, SEARCHSTATE } from "./Actions-type";

const storedTasks = JSON.parse(localStorage.getItem('Tasks'));

const initialState = {
    Tasks: storedTasks || []
};

const tasksReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADDTASK:
            const newTask = { ...action.payload };
            const newTasks = [...state.Tasks, newTask];
            localStorage.setItem('Tasks', JSON.stringify(newTasks));
            return {
                ...state,
                Tasks: newTasks
            };

        case REMOVETASK:
            const updatedTasks1 = state.Tasks.filter(obj => obj.nombre !== action.payload);
            localStorage.setItem('Tasks', JSON.stringify(updatedTasks1));
            return {
                ...state,
                Tasks: updatedTasks1
            };

            case UPDATETASK:
                const taskToUpdateIndex = state.Tasks.findIndex(obj => obj.nombre === action.payload.nombre);
                if (taskToUpdateIndex === -1) {

                    return state;
                }
                const updatedTask = { ...state.Tasks[taskToUpdateIndex], ...action.payload };
                const updatedTasks = [...state.Tasks];
                updatedTasks[taskToUpdateIndex] = updatedTask;
                localStorage.setItem('Tasks', JSON.stringify(updatedTasks));
                return {
                    ...state,
                    Tasks: updatedTasks
                };

        case SEARCHTASK:
            const filtered = state.Tasks.filter(obj => obj.nombre === action.payload);
            return {
                ...state,
                Tasks: filtered
            };

        case SEARCHCATEGORY:
            const filteredbycategory = state.Tasks.filter(obj => obj.categoria === action.payload);
            return {
                ...state,
                Tasks: filteredbycategory
            };

        case SEARCHSTATE:
            const filteredbystate = state.Tasks.filter(obj => obj.estado === action.payload);
            return {
                ...state,
                Tasks: filteredbystate
            };

        default:
            return { ...state };
    }
};

export default tasksReducer;