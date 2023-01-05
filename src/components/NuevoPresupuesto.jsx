import { useState } from "react";
import Error from "./Error";

const NuevoPresupuesto = ({
  presupuesto,
  setPresupuesto,
  setValidaPresupuesto,
}) => {
  const [message, setMessage] = useState("");

  const handlePresupuesto = (e) => {
    e.preventDefault();
    if (!presupuesto || presupuesto < 0) {
      setMessage("Presupuesto inválido");
      return;
    }
    setMessage("");
    setValidaPresupuesto(true);
  };
  return (
    <div className="contenedor contenedor-presupuesto sombra">
      <form className="formulario" onSubmit={handlePresupuesto}>
        <div className="campo">
          <label htmlFor="presupuesto">Presupuesto:</label>
          <input
            type="number"
            className="nuevo-presupuesto"
            placeholder="Añade el presupuesto"
            onChange={(e) => setPresupuesto(Number(e.target.value))}
          />
        </div>
        <Error message={message} className="alerta" />
        <input type="submit" value="Añadir" />
      </form>
    </div>
  );
};

export default NuevoPresupuesto;
