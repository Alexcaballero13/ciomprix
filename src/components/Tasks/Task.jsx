import { useState } from 'react'
import { borrarTarea, modificarTarea } from "../../redux/Actions"
import { useDispatch } from 'react-redux'

const Task = ({nombre, categoria, estado, descripcion}) => {
  const dispatch = useDispatch()

  const handleBorrar = () => {
    dispatch(borrarTarea(nombre))
  }

  const [editar, setEditar] = useState(false)
  const [nuevaTarea, setNuevaTarea] = useState({
    nombre,
    categoria,
    estado,
    descripcion
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setNuevaTarea({ ...nuevaTarea, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(modificarTarea({nombre: nombre, categoria: nuevaTarea.categoria, estado: estado, descripcion: nuevaTarea.descripcion}))
    setEditar(false)
  }

  const handleModificar = () => {
    setEditar(true)
  }

  const handleCheckbox = (event) => {
    const checked = event.target.checked
    const value = event.target.value

    if ( checked === true ){
        dispatch(modificarTarea({nombre, categoria, estado: value, descripcion}))
    }
    if (checked === false){
        dispatch(modificarTarea({nombre, categoria, estado: 'Pendiente', descripcion}))
    }
  }

  if (editar) {
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <label>Categoría:</label>
          <input type="text" name="categoria" value={nuevaTarea.categoria} onChange={handleChange} />
          <label>Descripción:</label>
          <textarea name="descripcion" value={nuevaTarea.descripcion} onChange={handleChange}></textarea>
          <button type="submit">Aplicar cambios</button>
        </form>
      </div>
    )
  }

  return (
    <div>
        <label>Finalizada</label>
        <input type="checkbox" value= 'Finalizada' onChange={handleCheckbox}/>
      <button onClick={handleBorrar}>Eliminar tarea</button>
      <button onClick={handleModificar}>Modificar tarea</button>
      <h1>{nombre}</h1>
      <h2>{categoria}</h2>
      <h3>{estado}</h3>
      <h3>{descripcion}</h3>
    </div>
  )
}

export default Task