import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AgregarTask } from "../../redux/Actions"
import Task from "../Tasks/Task"


const validate = ({nombre, descripcion})=>{
    const errors ={}
    
    if (nombre.length > 25) errors.nombre = 'You exceeded Max. Number of characters' 
    if (descripcion.length > 150) errors.descripcion = 'You exceeded Max. Number of characters'
    
    return errors
    }

const HomePage = () =>{

    const dispatch = useDispatch();
    const tareas = useSelector(state => state.Tasks)
    const [form, setForm] = useState({
        nombre: '',
        categoria: '',
        estado: 'Pendiente',
        descripcion:''
    })
    
    const [errors, setErrors] = useState({
        nombre: '',
        categoria: '',
        estado: 'Pendiente',
        descripcion:''
    })

    const handleInputform = (event) => {
        const name = event.target.name
        const value = event.target.value

        setForm({
            ...form,
            [name]: value
        })

        setErrors(validate({
            ...form,
            [name]: value
        }))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(AgregarTask({nombre: form.nombre, categoria: form.categoria, estado: form.estado, descripcion: form.descripcion}))
        setForm({
            nombre: '',
            categoria: '',
            estado: 'Pendiente',
            descripcion:''
        })
    }


    return(

        <div>
            <div>
            {tareas?.map(tarea =>{
                return <Task
                nombre={tarea.nombre}
                categoria ={tarea.categoria}
                estado ={tarea.estado}
                descripcion={tarea.descripcion}/>
            })}
            </div>
            <h1>Agrega una Tarea</h1>
            <form onSubmit={handleSubmit}>
            <div> 
                <label htmlFor="nombre">Nombre: </label>
                <input type="text" name="nombre" value={form.nombre} onChange={handleInputform}/> {errors.nombre? <p>{errors.nombre}</p>:""}
            </div>
            <div> 
                <label htmlFor="categoria">Categoria: </label>
                <input type="text" name="categoria" value={form.categoria} onChange={handleInputform}/>
            </div>
            <div> 
                <label htmlFor="descripcion">Descripcion: </label>
                <input type="text" name="descripcion" value={form.descripcion} onChange={handleInputform}/> {errors.descripcion? <p>{errors.descripcion}</p>:""}
            </div>
            <div>
                <button type="submit" disabled={errors.nombre||errors.categoria||errors.descripcion||!form.nombre||!form.categoria||!form.descripcion}>Crear Tarea</button>
            </div>
            </form>
        </div>
    )
}

export default HomePage