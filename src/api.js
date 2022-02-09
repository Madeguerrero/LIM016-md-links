/* -------- ingresando a la ruta(path) ----------- */
//import { error } from "console";
import * as fs from "fs";
import * as path from "path";
import { Remarkable } from "remarkable";
let md = new Remarkable();
import { JSDOM } from "jsdom";
import fetch from "node-fetch";

/* -------- preguntando si la ruta existe ---------- */
let rutaDeArchivos =
  "/Users/madeleine/Desktop/MD-Links/LIM016-md-links/pruebas/prueba1/archivo.txt";
let ruta2 = "/Users/madeleine/Desktop/MD-Links/LIM016-md-links/prueba/";

const archivoExiste = fs.existsSync(rutaDeArchivos);
if (fs.existsSync(rutaDeArchivos)) {
  //console.log("1,la Ruta si existe");
} else {
  //console.error("la Ruta no existe");
}
/* --------- averiguando si la ruta es absoluta?, y convirtiendola a absoluta --------- */
const rutaEsAbsolutaAndConvirtiendola = function (ruta) {
  if (path.isAbsolute(ruta)) {
    return ruta;
  } else {
    return path.resolve(ruta);
  }
};
console.log("2", rutaEsAbsolutaAndConvirtiendola(process.argv[2]));
//console.log(process.argv);

/* --------- averiguando si es un directorio -------- */
const rutaEsDirectorio = (ruta) => {
  return fs.lstatSync(ruta).isDirectory();
};
//console.log("3", `La ruta ${rutaEsDirectorio ? "es" : "no es"} un directorio `);

/* ---------- recorriendo si es un archivo ----------- */
const rutaTieneArchivos = function (ruta) {
  return fs.statSync(ruta).isFile();
};
//console.log("4",`La ruta ${rutaTieneArchivos ? "tiene" : "no tiene"} archivos `);
//console.log(rutasDeLinks(process.argv[2]));

/* --------- recorriendo el directorio recursivamente y extrayendo su extension ----------- */
const leyendoDirectorio = (ruta) => {
  let arrayDirectorio = []; // array vacio-aqui se guardaran las rutas completas

  if (rutaEsDirectorio(ruta)) {
    const leerDirectorio = fs.readdirSync(ruta); //leyendo el directorio
    leerDirectorio.map((elemento) => {
      const subRuta = path.join(ruta, elemento); // uniendo rutas

      if (rutaEsDirectorio(subRuta)) {
        return arrayDirectorio.push(leyendoDirectorio(subRuta)); //haciendo un empuje al array y utilizamos recursividad
      }
      if (path.extname(subRuta) === ".md") {
        //extrayendo archivos con extension .md
        return arrayDirectorio.push(subRuta);
      }
    });
  } else {
    arrayDirectorio.push(ruta); //aqui guardamos en el array la ruta de los archivos.
  }
  return arrayDirectorio.flat(); // utilizando el metodo flat para regresar el array en una version aplanada
};
let rutaConvertidaEnAbsoluta = rutaEsAbsolutaAndConvirtiendola(process.argv[2]);
//console.log("5", leyendoDirectorio(rutaConvertidaEnAbsoluta)); //devolvemos el resultado en consola que contiene los argumentos

/* ---------- leer los archivos y averiguando si contiene link, los convertimos en Html y retomamos una arreglo de objectos --------- */
const rutasDeLinks = (rutaConvertidaEnAbsoluta) => {
  let arrayLinks = [];
  const leerArchivo = fs.readFileSync(rutaConvertidaEnAbsoluta, "utf-8"); //lectura del archivo y los unificamos
  const convirtiendoloArchivoEnHtml = md.render(leerArchivo); // renderizamos los archivos(convertimos a html);
  const archivoEnFormatoHtml = new JSDOM(convirtiendoloArchivoEnHtml); // analiza el html
  const extrayendoEtiqueta =
    archivoEnFormatoHtml.window.document.querySelectorAll("a"); // extraemos todas las etiquetas "a"
  extrayendoEtiqueta.forEach((e) => {
    //recorremos por el archivo convertido en html
    arrayLinks.push({
      href: e.toString(),
      text: e.textContent.slice(0, 50),
      file: rutaConvertidaEnAbsoluta,
    });
  });
  return arrayLinks;
};

/* --------- uniendo los arreglos de objectos (lectura de un directorio) --------- */
const arraysDeObjectosDeLinks = (rutas) => {
  let arraysObjectosLinks = [];
  rutas.forEach((e) => {
    arraysObjectosLinks.push(rutasDeLinks(e));
  });
  return arraysObjectosLinks.flat();
};

//console.log("6", arraysDeObjectosDeLinks(leyendoDirectorio(process.argv[2])));

/* ----------- Peticiones HTTP que devuelvan una promesa,el status ------- */
const httpStatus = (arrayDeObjectos) => {
  const arrayLinksStatus = arrayDeObjectos.map((e) =>
    fetch(e.href)
      .then((res) => ({
        // aplicamos fetch a cada url
        href: e.href,
        text: e.text,
        file: e.file,
        status: res.status,
        ok: res.status >= 200 && res.status < 300 ? "Ok" : "Fail", // utilizamos operadores ternarios
      }))
      .catch((err) => ({
        href: e.href,
        text: e.text.slice(0, 50),
        file: e.file,
        status: 500,
        message: err,
        ok: "Fail",
      }))
  );
  return Promise.all(arrayLinksStatus);
};
//httpStatus(arraysDeObjectosDeLinks(leyendoDirectorio(process.argv[2])))
//.then((res) => console.log(res))
//.catch((err) => console.log(error));

export {
  archivoExiste,
  rutaEsAbsolutaAndConvirtiendola,
  rutaEsDirectorio,
  rutaTieneArchivos,
  leyendoDirectorio,
  rutasDeLinks,
  arraysDeObjectosDeLinks,
  httpStatus,
};
