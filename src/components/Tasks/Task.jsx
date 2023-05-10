import { useState } from 'react'
import { borrarTarea, modificarTarea } from "../../redux/Actions"
import { useDispatch } from 'react-redux'

const Task = ({ nombre, categoria, estado, descripcion }) => {
    
    const dispatch = useDispatch()
    const [isChecked, setIsChecked] = useState(false);
    const [editar, setEditar] = useState(false)
    const cardClasses = `card m-2 ${isChecked ? 'bg-success text-light border-success' : ''}`;
    const [nuevaTarea, setNuevaTarea] = useState({
        nombre,
        categoria,
        estado,
        descripcion
    })


    const handleBorrar = () => {
        dispatch(borrarTarea(nombre))
    }


    const handleChange = (e) => {
        const { name, value } = e.target
        setNuevaTarea({ ...nuevaTarea, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(modificarTarea({ nombre: nombre, categoria: nuevaTarea.categoria, estado: estado, descripcion: nuevaTarea.descripcion }))
        setEditar(false)
    }

    const handleModificar = () => {
        setEditar(true)
    }

    const handleCheckbox = (event) => {
        setIsChecked(!isChecked);
        const checked = event.target.checked
        const value = event.target.value

        if (checked === true) {
            dispatch(modificarTarea({ nombre, categoria, estado: value, descripcion }))
        }
        if (checked === false) {
            dispatch(modificarTarea({ nombre, categoria, estado: 'Pendiente', descripcion }))
        }
    }

    if (editar) {
        return (
            <form onSubmit={handleSubmit} className="d-flex flex-wrap justify-content-between align-items-center">
                <div className="form-group">
                    <label htmlFor="categoria" className="font-sans-serif text-dark">Categoría:</label>
                    <input type="text" name="categoria" value={nuevaTarea.categoria} onChange={handleChange} className="form-control bg-light" />
                </div>
                <div className="form-group">
                    <label htmlFor="descripcion" className="font-sans-serif text-dark">Descripción:</label>
                    <textarea name="descripcion" value={nuevaTarea.descripcion} onChange={handleChange} className="form-control bg-light"></textarea>
                </div>
                <button type="submit" className="btn btn-outline-success align-self-end">Aplicar cambios</button>
            </form>
        )
    }

    return (

        <div className={cardClasses}>
            <div className="card m-2">
                <div className="card-body bg-light">
                    <h1 className="card-title text-dark font-sans-serif">{nombre}</h1>
                    <h3 className="font-sans-serif text-dark">{categoria}</h3>
                    <h4 className="font-sans-serif text-dark">{estado}</h4>
                    <h7 className="card-text text-secondary font-sans-serif">{descripcion}</h7>
                    <div className="d-flex flex-wrap justify-content-between mt-2">
                        <div className="form-check">
                            <label className="font-sans-serif text-dark">Finalizada</label>
                            <input type="checkbox" value="Finalizada" onChange={handleCheckbox} className='form-check-input' />
                        </div>
                        <div>
                            <button className="btn btn-outline-danger" onClick={handleBorrar}>Eliminar tarea</button>
                        </div>
                        <div>
                            <button className="btn btn-outline-info" onClick={handleModificar}>Modificar tarea</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Task