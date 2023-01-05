import CerrarModal from "../assets/cerrar.svg";
import { useState, useEffect } from "react";
import Error from "./Error";
import { isFilledObject } from "../utils/functions";

const Modal = ({
  setModal,
  animarModal,
  setAnimarModal,
  guardaGasto,
  editarGasto,
  setEditarGasto
}) => {
  const [nombre, setNombre] = useState("");
  const [cantidad, setCantidad] = useState(0);
  const [tipo, setTipo] = useState("");
  const [id, setId] = useState("")
  const [fecha, setFecha] = useState("")

  const [message, setMessage] = useState("");

  const handleModal = () => {
    setAnimarModal(false);
    setTimeout(() => {
      setModal(false);
    }, 500);
    setEditarGasto({})
  };
  const handleGasto = (e) => {
    e.preventDefault();
    if ([nombre, cantidad, tipo].includes("")) {
      setMessage("Todos los campos son requeridos");
      setTimeout(() => {
        setMessage("");
      }, 3000);
      return;
    }
    guardaGasto({ nombre, cantidad, tipo, id, fecha });
    setAnimarModal(false);
    setTimeout(() => {
      setModal(false);
    }, 500);
    setEditarGasto({})
  };
  useEffect(() => {
    if (isFilledObject(editarGasto)) {
      setNombre(editarGasto.nombre);
      setCantidad(editarGasto.cantidad);
      setTipo(editarGasto.tipo);
      setId(editarGasto.id)
      setFecha(editarGasto.fecha)
    }
  }, []);
  return (
    <div className="modal">
      <div className="cerrar-modal">
        <img src={CerrarModal} alt="Cierra modal" onClick={handleModal} />
      </div>
      <form
        className={`formulario ${animarModal ? "animar" : "cerrar"}`}
        onSubmit={handleGasto}
      >
        {isFilledObject(editarGasto) ? (
          <legend>Editar Gasto</legend>
        ) : (
          <legend>Nuevo Gasto</legend>
        )}
        <Error message={message} className="alerta" />
        <div className="campo">
          <label htmlFor="nombre">Nombre de Gasto:</label>
          <input
            type="text"
            value={nombre}
            id="nombre"
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div className="campo">
          <label htmlFor="cantidad">Cantidad de Gasto:</label>
          {cantidad === 0 ? (
            <input
              type="number"
              placeholder="$ 0,00"
              id="cantidad"
              onChange={(e) => setCantidad(Number(e.target.value))}
            />
          ) : (
            <input
              type="number"
              value={cantidad}
              id="cantidad"
              onChange={(e) => setCantidad(Number(e.target.value))}
            />
          )}
        </div>
        <div className="campo">
          <label htmlFor="tipo">Tipo de Gasto:</label>
          <select
            name="tipo"
            id="tipo"
            onChange={(e) => setTipo(e.target.value)}
            value={tipo}
          >
            <option value="">-- Seleccionar --</option>
            <option value="ahorro">Ahorro</option>
            <option value="comida">Comida</option>
            <option value="casa">Casa</option>
            <option value="salud">Salud</option>
            <option value="suscripciones">Suscripciones</option>
            <option value="ocio">Ocio</option>
            <option value="varios">Gastos varios</option>
          </select>
        </div>
        {isFilledObject(editarGasto) ? (
          <input type="submit" value="Guardar cambios" />
        ) : (
          <input type="submit" value="Añadir gasto" />
        )}
      </form>
    </div>
  );
};

export default Modal;
