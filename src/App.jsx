import React, { useState } from "react";
import { nanoid } from "nanoid";

function App() {
  const [tarea, setTarea] = useState("");
  const [tareas, setTareas] = useState([]);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [id, setId] = useState("");
  const [error, setError] = useState(null);

  const agregarTarea = (e) => {
    e.preventDefault();
    if (!tarea.trim()) {
      setError("Ingrese una tarea");
      return;
    }
    console.log(tarea);

    setTareas([...tareas, { id: nanoid(), nombreTarea: tarea }]);
    console.log(tareas);
    setTarea("");
    setError(null);
  };

  const eliminarTarea = (id) => {
    const arrayFiltrado = tareas.filter((item) => item.id !== id);
    setTareas(arrayFiltrado);
  };

  const editar = (item) => {
    setModoEdicion(true);
    setTarea(item.nombreTarea);
    setId(item.id);
  };

  const editarTarea = (e) => {
    e.preventDefault();
    if (!tarea.trim()) {
      setError("Ingrese una tarea");
      return;
    }

    const arrayEditado = tareas.map((item) =>
      item.id === id ? { id: id, nombreTarea: tarea } : item
    );

    setTareas(arrayEditado);
    setModoEdicion(false);
    setTarea("");
    setId("");
    setError(null);
  };

  return (
    <>
      <div className="bg-dark">
        <h2 className="text-center text-light p-4">NOTAS 2.0</h2>
      </div>
      <div className="container mt-5">
        <hr />

        <div className="row">
          <div className="col-8">
            <h4 className="text-center">Lista de tareas</h4>
            <ul className="list-group ">
              {tareas.length === 0 ? (
                <li className="list-group-item">No hay tareas</li>
              ) : (
                tareas.map((item) => (
                  <li className="list-group-item" key={item.id}>
                    <span className="lead">{item.nombreTarea}</span>
                    <button
                      className="btn btn-sm btn-danger float-end mx-2"
                      onClick={() => eliminarTarea(item.id)}
                    >
                      Eliminar
                    </button>
                    <button
                      className="btn btn-sm btn-warning float-end"
                      onClick={() => editar(item)}
                    >
                      Editar
                    </button>
                  </li>
                ))
              )}
            </ul>
          </div>
          <div className="col-4">
            <h4 className="text-center">
              {modoEdicion ? "Editar Tarea" : "Agregar Tarea"}
            </h4>

            <form onSubmit={modoEdicion ? editarTarea : agregarTarea}>
              {error ? <span className="text-danger">{error}</span> : null}

              <input
                type="text"
                className="form-control mb-2 mt-1"
                placeholder="Ingrese Tarea"
                onChange={(e) => setTarea(e.target.value)}
                value={tarea}
              />

              {modoEdicion ? (
                <button className="btn btn-warning col-12" type="submit">
                  Editar
                </button>
              ) : (
                <button className="btn btn-dark col-12" type="submit">
                  Agregar
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
