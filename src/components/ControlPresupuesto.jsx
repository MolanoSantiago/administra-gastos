import { formatPresupuesto } from "../utils/functions";
import { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css"

const ControlPresupuesto = ({ presupuesto, setPresupuesto, gastos, setGastos, setValidaPresupuesto}) => {
  const [gastado, setGastado] = useState(0)
  const [disponible, setDisponible] = useState(0)
  const [porcentaje, setPorcentaje] = useState(0)
  useEffect(() => {
    const totalGastado = gastos.reduce((Total, Gasto) => Gasto.cantidad + Total, 0)
    const totalDisponible = presupuesto - totalGastado
    const totalPorcentaje = (( (presupuesto - totalDisponible) / presupuesto) * 100 ).toFixed(2)
    setGastado(totalGastado)
    setDisponible(totalDisponible)
    setTimeout(() => {
      setPorcentaje(totalPorcentaje)
    }, 800)
  }, [gastos]);
  const handleResetApp = () => {
    const result = confirm("¿Desea resetear los gastos y el presupuesto registrado?")
    if(result) {
      setGastos([])
      setPresupuesto(0)
      setValidaPresupuesto(false)
    }
  }
  return (
    <div className="contenedor sombra contenedor-presupuesto dos-columnas">
      <div>
        <CircularProgressbar value={porcentaje} text={`${porcentaje}% gastado`} styles={buildStyles({
          pathColor: porcentaje > 100 ? '#b91c1c' : '#3b82f6',
          trailColor: "#F5F5F5",
          textColor: porcentaje > 100 ? '#b91c1c' : '#3b82f6'
        })}/>
      </div>
      <div className="contenido-presupuesto">
        <button className="reset-app" type="button" onClick={handleResetApp}>
          Resetear App
        </button>
        <p>
          <span>Presupesto: </span>
          {formatPresupuesto(presupuesto)}
        </p>
        <p className={`${disponible < 0 && "negativo"}`}>
          <span>Disponible: </span>
          {formatPresupuesto(disponible)}
        </p>
        <p id="gastado">
          <span>Gastado: </span>
          {formatPresupuesto(gastado)}
        </p>
      </div>
    </div>
  );
};

export default ControlPresupuesto;
