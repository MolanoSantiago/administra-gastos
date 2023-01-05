import { isFilledArray } from "../utils/functions";
import Gasto from "./Gasto";

const ListaGastos = ({
  gastos,
  setEditarGasto,
  eliminaGasto,
  filtro,
  gastosFiltrados,
}) => {
  return (
    <div className="contenedor listado-gastos">
      {filtro ? (
        <>
          <h2>{isFilledArray(gastosFiltrados) ? "Gastos" : "Aún no hay gastos de este tipo"}</h2>
          {gastosFiltrados.map((gasto) => (
            <Gasto
              key={gasto.id}
              gasto={gasto}
              setEditarGasto={setEditarGasto}
              eliminaGasto={eliminaGasto}
            />
          ))}
        </>
      ) : (
        <>
        <h2>{
          isFilledArray(gastos) ? "Gastos" : "Aún no hay gastos"
        }</h2>
          {
            gastos.map((gasto) => (
              <Gasto
                key={gasto.id}
                gasto={gasto}
                setEditarGasto={setEditarGasto}
                eliminaGasto={eliminaGasto}
              />
            ))
          }
        </>
      )}
    </div>
  );
};

export default ListaGastos;
