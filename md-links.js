/* -------- ingresando a la ruta(path) ----------- */
//import { error } from "console";
import * as fs from "fs";
import * as path from "path";
import { Remarkable } from "remarkable";
let md = new Remarkable();
import { JSDOM } from "jsdom";
//import fetch from "node-fetch";

/* -------- preguntando si la ruta existe ---------- */
let rutaDeArchivos =
  "/Users/madeleine/Desktop/MD-Links/LIM016-md-links/pruebas/prueba1/archivo.txt";
let ruta2 = "/Users/madeleine/Desktop/MD-Links/LIM016-md-links/prueba/";

const archivoExiste = fs.existsSync(rutaDeArchivos);
if (fs.existsSync(rutaDeArchivos)) {
  //console.log("la Ruta si existe");
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
//console.log(rutaEsAbsolutaAndConvirtiendola(process.argv[2]));
//console.log(process.argv);

/* --------- averiguando si es un directorio -------- */
const rutaEsDirectorio = (ruta) => {
  return fs.lstatSync(ruta).isDirectory();
};
//console.log(`La ruta ${rutaEsDirectorio ? "es" : "no es"} un directorio `);

/* ---------- recorriendo si es un archivo ----------- */
const rutaTieneArchivos = function (ruta) {
  return fs.statSync(ruta).isFile();
};
//console.log(rutaTieneArchivos(rutaConvertidaEnAbsoluta));
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
//console.log(leyendoDirectorio(rutaConvertidaEnAbsoluta)); //devolvemos el resultado en consola que contiene los argumentos

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
rutasDeLinks(rutaConvertidaEnAbsoluta); // llamamos a la funcion

/* ----------- Peticiones HTTP que devuelvan una promesa,el status ------- */
/*const httpStatus = (objectosLinks) => {
 const */

//console.log(rutasDeLinks(process.argv[2]));
