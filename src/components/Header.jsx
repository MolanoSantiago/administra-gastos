import ControlPresupuesto from "./ControlPresupuesto";
import NuevoPresupuesto from "./NuevoPresupuesto";

const Header = ({
  presupuesto,
  setPresupuesto,
  validaPresupuesto,
  setValidaPresupuesto,
  gastos,
  setGastos
}) => {
  return (
    <header>
      <h1>Control de Gastos</h1>
      {validaPresupuesto ? (
        <ControlPresupuesto presupuesto={presupuesto} setPresupuesto={setPresupuesto} gastos={gastos} setGastos={setGastos} setValidaPresupuesto={setValidaPresupuesto}/>
      ) : (
        <NuevoPresupuesto
          presupuesto={presupuesto}
          setPresupuesto={setPresupuesto}
          setValidaPresupuesto={setValidaPresupuesto}
        />
      )}
    </header>
  );
};

export default Header;
