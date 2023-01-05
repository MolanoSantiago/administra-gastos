import { formatDate, formatPresupuesto } from "../utils/functions";
import IconoAhorro from "../assets/icono_ahorro.svg";
import IconoCasa from "../assets/icono_casa.svg";
import IconoComida from "../assets/icono_comida.svg";
import IconoGastos from "../assets/icono_gastos.svg";
import IconoOcio from "../assets/icono_ocio.svg";
import IconoSalud from "../assets/icono_salud.svg";
import IconoSuscripciones from "../assets/icono_suscripciones.svg";
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
} from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";

const dictIcons = {
  ahorro: IconoAhorro,
  casa: IconoCasa,
  comida: IconoComida,
  varios: IconoGastos,
  ocio: IconoOcio,
  salud: IconoSalud,
  suscripciones: IconoSuscripciones,
};

const Gasto = ({ gasto, setEditarGasto , eliminaGasto }) => {
  const { id, nombre, cantidad, tipo, fecha } = gasto;
  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction onClick={() => setEditarGasto(gasto) }>
        Editar
      </SwipeAction>
    </LeadingActions>
  );
  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction onClick={() => eliminaGasto(id)} destructive={true}>
        Eliminar
      </SwipeAction>
    </TrailingActions>
  );
  return (
    <SwipeableList>
      <SwipeableListItem
        leadingActions={leadingActions()}
        trailingActions={trailingActions()}
      >
        <div className="gasto sombra">
          <div className="contenido-gasto">
            <img src={dictIcons[tipo]} alt="Icono del gasto" />
            <div className="descripcion-gasto">
              <p className="categoria">{tipo}</p>
              <p className="nombre-gasto">{nombre}</p>
              <p className="fecha-gasto">
                Agregado el: <span>{formatDate(fecha)}</span>
              </p>
            </div>
          </div>
          <p className="cantidad-gasto">{formatPresupuesto(cantidad)}</p>
        </div>
      </SwipeableListItem>
    </SwipeableList>
  );
};

export default Gasto;
