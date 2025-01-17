import colors from "colors";

const linksTotal = (link) => link.length; //

const linksUnique = (link) => new Set(link.map((elem) => elem.href)).size; //encontramos la cantidad de links unicos

const linksRotos = (link) => link.filter((e) => e.ok === "Fail").length; // funcion para encontrar las rutas rotas

const help = `
╔══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╗
║                                                 ${colors.cyan(
  "HELP"
)}                                                ║
╠══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╣
║ ${colors.cyan(
  "--validate"
)}                            Muestra el link, el texto, la ruta, el status y el mensaje.   ║
╠══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╣
║ ${colors.cyan(
  "--stats"
)}                               Muestra el total de links y los links únicos.                 ║
╠══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╣
║ ${colors.cyan(
  "--stats --validate"
)}                    Muestra los links totales, únicos y rotos.                    ║
╚══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╝
 ${colors.yellow(`Utilice esta estructura: md-links <ruta> <comando> para ejecutar el cli.
 Pero también puedes escribir solo md-links <ruta> y obtendrás el enlace, su texto y su archivo.`)}`;
export { linksTotal, linksUnique, linksRotos, help };
