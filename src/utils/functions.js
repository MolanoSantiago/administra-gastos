export const randomId = () => {
  const random = Math.random().toString(36).substring(2);
  const date = Date.now().toString(36);
  return random + date;
};

export const formatDate = (fecha) => {
  const newDate = new Date(fecha);
  const options = {
    year: "numeric",
    month: "long",
    day: "2-digit",
  };
  return newDate.toLocaleDateString("es-CO", options);
};

export const formatPresupuesto = (cantidad) => {
  return cantidad.toLocaleString("es-CO", {
    style: "currency",
    currency: "COP",
  });
};

export const isFilledObject = (obj) => {
  return Object.keys(obj).length !== 0;
};

export const isFilledArray = (arr) => {
  return arr.length !== 0;
};
