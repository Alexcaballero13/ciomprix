import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AgregarTask, buscarTask, buscarTaskcategoria, filtroEstado } from "../../redux/Actions"
import Task from "../Tasks/Task"


const validate = ({ nombre, descripcion }) => {
    const errors = {}

    if (nombre.length > 25) errors.nombre = 'You exceeded Max. Number of characters'
    if (descripcion.length > 150) errors.descripcion = 'You exceeded Max. Number of characters'

    return errors
}

const HomePage = () => {


    const dispatch = useDispatch();
    const tareas = useSelector(state => state.Tasks)


    const [Taskname, setTaskname] = useState('')
    const [Taskcategoria, setTaskcategoria] = useState('')
    const [form, setForm] = useState({
        nombre: '',
        categoria: '',
        estado: 'Pendiente',
        descripcion: ''
    })

    const [errors, setErrors] = useState({
        nombre: '',
        categoria: '',
        estado: 'Pendiente',
        descripcion: ''
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
        dispatch(AgregarTask({ nombre: form.nombre, categoria: form.categoria, estado: form.estado, descripcion: form.descripcion }))
        setForm({
            nombre: '',
            categoria: '',
            estado: 'Pendiente',
            descripcion: ''
        })
    }

    const handleFilterbyName = (event) => {
        const value = event.target.value
        setTaskname(value)
    }

    const handleFilterbycategoria = (event) => {
        const value = event.target.value
        setTaskcategoria(value)
    }

    const handleFilterbyEstado = (event) => {
        dispatch(filtroEstado(event.target.value))
    }

    return (

        <body className="fondo">


            <div>
                <div class="container my-5">
                    <div class="row">
                        <div class="col-12">
                            <h1 class="text-center display-2 fw-bold">Lista de tareas</h1>
                        </div>
                    </div>

                </div>
                <div className="d-flex justify-content-center mx-auto">
                    <div className="p-4">
                        <div className="d-flex align-items-center mb-3">
                            <label className="me-2">Filtro Nombre:</label>
                            <input type="text" value={Taskname} onChange={handleFilterbyName} className="form-control me-2 bg-light" />
                            <button onClick={() => dispatch(buscarTask(Taskname))} className="btn btn-primary">Buscar</button>
                        </div>

                        <div className="d-flex align-items-center mb-3">
                            <label className="me-2">Filtro Categoria:</label>
                            <input type="text" value={Taskcategoria} onChange={handleFilterbycategoria} className="form-control me-2 bg-light" />
                            <button onClick={() => dispatch(buscarTaskcategoria(Taskcategoria))} className="btn btn-primary">Buscar</button>
                        </div>

                        <div className="d-flex align-items-center">
                            <label className="me-2">Filtro estado:</label>
                            <select name="select" onChange={handleFilterbyEstado} className="form-select me-2 bg-light">
                                <option value="Pendiente">Pendiente</option>
                                <option value="Finalizada">Finalizada</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="container-fluid">
                    <div className="mx-auto m-5 d-flex flex-wrap justify-content-center align-items-center">
                        {tareas?.map(tarea => {
                            return (
                                <div className="col-12 col-md-4 mb-3">
                                    <Task
                                        nombre={tarea.nombre}
                                        categoria={tarea.categoria}
                                        estado={tarea.estado}
                                        descripcion={tarea.descripcion} />
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-lg-6 col-md-8 col-sm-12">
                            <h1>Agrega una Tarea</h1>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="nombre" className="form-label">Nombre:</label>
                                    <input type="text" name="nombre" className="form-control bg-light" value={form.nombre} onChange={handleInputform} />
                                    {errors.nombre ? <p>{errors.nombre}</p> : ""}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="categoria" className="form-label">Categoria:</label>
                                    <input type="text" name="categoria" className="form-control bg-light" value={form.categoria} onChange={handleInputform} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="descripcion" className="form-label">Descripcion:</label>
                                    <input type="text" name="descripcion" className="form-control bg-light" value={form.descripcion} onChange={handleInputform} />
                                    {errors.descripcion ? <p>{errors.descripcion}</p> : ""}
                                </div>
                                <div>
                                    <button type="submit" className="btn btn-primary" disabled={errors.nombre || errors.categoria || errors.descripcion || !form.nombre || !form.categoria || !form.descripcion}>Crear Tarea</button>
                                </div>
                            </form>
                            <div className="mt-3"></div>
                        </div>
                    </div>
                </div>
            </div>


        </body>
    )
}

export default HomePage