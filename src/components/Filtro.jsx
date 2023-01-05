import { useState, useEffect } from "react";

const Filtro = ({filtro, setFiltro}) => {
  return (
    <div className="filtros sombra contenedor">
      <form>
        <div className="campo">
          <label>Filtrar gastos</label>
          <select value={filtro} onChange={(e) => setFiltro(e.target.value)}>
            <option value="">-- Todos --</option>
            <option value="ahorro">Ahorro</option>
            <option value="comida">Comida</option>
            <option value="casa">Casa</option>
            <option value="salud">Salud</option>
            <option value="suscripciones">Suscripciones</option>
            <option value="ocio">Ocio</option>
            <option value="varios">Gastos varios</option>
          </select>
        </div>
      </form>
    </div>
  );
};

export default Filtro;
