import * as api from "./api.js";

export const mdLinks = (path, options = {}) => {
  return new Promise((resolve, reject) => {
    if (!api.archivoExiste(path)) {
      //Nos devuelve un resultado booleano(true)
      reject("La ruta no existe");
    }

    const rutaAbsoluta = api.rutaEsAbsolutaAndConvirtiendola(path);

    if (!api.leyendoDirectorio(rutaAbsoluta)) {
      // negamos la funcion y nos devuelve true
      reject("No se encontraron archivos md");
    }

    const todosLosLinks = api.arraysDeObjectosDeLinks(
      api.leyendoDirectorio(rutaAbsoluta)
    );

    if (todosLosLinks.length === 0) {
      //si la longitud del link es igual a 0 nos retorna un error
      reject("No se encontaron Links");
    }

    if (options.validate) {
      api.httpStatus(todosLosLinks).then((statusLinks) => resolve(statusLinks));
    } else {
      resolve(todosLosLinks);
    }
  });
};
