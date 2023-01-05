import { useState, useEffect } from "react";
import Header from "./components/Header";
import IconoNuevoGasto from "./assets/nuevo-gasto.svg";
import Modal from "./components/Modal";
import { isFilledObject, randomId } from "./utils/functions";
import GastosJSON from "./gastos.json"; // Archivo JSON para almacenar los gastos
import ListaGastos from "./components/ListaGastos";
import Filtro from "./components/Filtro";

function App() {
  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem("presupuesto")) ?? 0
  );
  const [validaPresupuesto, setValidaPresupuesto] = useState(false);

  const [modal, setModal] = useState(false);
  const [animarModal, setAnimarModal] = useState(false);

  const [gastos, setGastos] = useState(
    localStorage.getItem("gastos")
      ? JSON.parse(localStorage.getItem("gastos"))
      : []
  );

  const [editarGasto, setEditarGasto] = useState({});

  const [filtro, setFiltro] = useState("");

  const [gastosFiltrados, setGastosFiltrados] = useState([]);

  const handleNuevoGasto = () => {
    setModal(true);
    setEditarGasto({});
    setTimeout(() => {
      setAnimarModal(true);
    }, 500);
  };

  // useEffect(() => {
  //   setGastos(GastosJSON);
  // }, []);

  useEffect(() => {
    localStorage.setItem("presupuesto", presupuesto ?? 0);
  }, [presupuesto]);

  useEffect(() => {
    localStorage.setItem("gastos", JSON.stringify(gastos) ?? []);
  }, [gastos]);

  useEffect(() => {
    const presupuestoLS = Number(localStorage.getItem("presupuesto")) ?? 0;
    if (presupuestoLS > 0) {
      setValidaPresupuesto(true);
    }
  }, []);

  useEffect(() => {
    if (isFilledObject(editarGasto)) {
      setModal(true);
      setTimeout(() => {
        setAnimarModal(true);
      }, 500);
    }
  }, [editarGasto]);

  useEffect(() => {
    if (filtro) {
      const gastosFiltrados = gastos.filter((gasto) => gasto.tipo === filtro);
      setGastosFiltrados(gastosFiltrados)
    }
  }, [filtro]);

  const guardaGasto = (gasto) => {
    if (gasto.id) {
      const gastosActualizados = gastos.map((gastoState) =>
        gastoState.id === gasto.id ? gasto : gastoState
      );
      setGastos(gastosActualizados);
    } else {
      gasto.id = randomId();
      gasto.fecha = Date.now();
      setGastos([...gastos, gasto]);

      GastosJSON.push(gasto); //Añade gasto nuevo al JSON
    }
    setModal(false);
    setTimeout(() => {
      setAnimarModal(false);
    }, 500);
  };

  const eliminaGasto = (id) => {
    const gastosActualizados = gastos.filter((gasto) => gasto.id !== id);
    setGastos(gastosActualizados);
  };
  return (
    <div className={modal ? "fijar" : ""}>
      <Header
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        validaPresupuesto={validaPresupuesto}
        setValidaPresupuesto={setValidaPresupuesto}
        gastos={gastos}
        setGastos={setGastos}
      />
      {validaPresupuesto && (
        <>
          <main>
            <Filtro filtro={filtro} setFiltro={setFiltro} />
            <ListaGastos
              gastos={gastos}
              setEditarGasto={setEditarGasto}
              eliminaGasto={eliminaGasto}
              filtro={filtro}
              gastosFiltrados={gastosFiltrados}
            />
          </main>
          <div className="nuevo-gasto">
            <img
              src={IconoNuevoGasto}
              alt="Nuevo gasto"
              onClick={handleNuevoGasto}
            />
          </div>
        </>
      )}
      {modal && (
        <Modal
          setModal={setModal}
          animarModal={animarModal}
          setAnimarModal={setAnimarModal}
          guardaGasto={guardaGasto}
          editarGasto={editarGasto}
          setEditarGasto={setEditarGasto}
        />
      )}
    </div>
  );
}

export default App;
