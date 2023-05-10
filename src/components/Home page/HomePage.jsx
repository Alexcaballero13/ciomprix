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
                        <input type="text" value={Taskname} onChange={handleFilterbyName} className="form-control me-2" />
                        <button onClick={() => dispatch(buscarTask(Taskname))} className="btn btn-primary">Buscar</button>
                    </div>

                    <div className="d-flex align-items-center mb-3">
                        <label className="me-2">Filtro Categoria:</label>
                        <input type="text" value={Taskcategoria} onChange={handleFilterbycategoria} className="form-control me-2" />
                        <button onClick={() => dispatch(buscarTaskcategoria(Taskcategoria))} className="btn btn-primary">Buscar</button>
                    </div>

                    <div className="d-flex align-items-center">
                        <label className="me-2">Filtro estado:</label>
                        <select name="select" onChange={handleFilterbyEstado} className="form-select me-2">
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
  <h1>Agrega una Tarea</h1>
  <form onSubmit={handleSubmit}>
    <div class="mb-3">
      <label for="nombre" class="form-label">Nombre:</label>
      <input type="text" name="nombre" value={form.nombre} onChange={handleInputform} class="form-control" />
      {errors.nombre ? <p class="form-text">{errors.nombre}</p> : ""}
    </div>
    <div class="mb-3">
      <label for="categoria" class="form-label">Categoria:</label>
      <input type="text" name="categoria" value={form.categoria} onChange={handleInputform} class="form-control" />
    </div>
    <div class="mb-3">
      <label for="descripcion" class="form-label">Descripcion:</label>
      <input type="text" name="descripcion" value={form.descripcion} onChange={handleInputform} class="form-control" />
      {errors.descripcion ? <p class="form-text">{errors.descripcion}</p> : ""}
    </div>
    <div class="mb-3">
      <button type="submit" disabled={errors.nombre || errors.categoria || errors.descripcion || !form.nombre || !form.categoria || !form.descripcion} class="btn btn-primary">Crear Tarea</button>
    </div>
  </form>
</div>
        </div>
    )
}

export default HomePage