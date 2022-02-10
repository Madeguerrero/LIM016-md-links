import color from "chalk"; //import styles from "ansi-styles";

const linksTotal = link => link.length; //


const linksUnique = link => new set(link.map(elem => elem.href)).length; //encontramos la cantidad de links unicos


const linksRotos = link => link.filter(e => e.ok === "Fail").length; // funcion para encontrar las rutas rotas


const help = `
╔══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╗
║                                                 ${color.cyan("HELP")}                                                ║
╠══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╣
║ ${color.cyan("--validate")}                            Muestra el link, el texto, la ruta, el status y el mensaje.   ║
╠══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╣
║ ${color.cyan("--stats")}                               Muestra el total de links y los links únicos.                 ║
╠══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╣
║ ${color.cyan("--stats --validate")}                    Muestra los links totales, únicos y rotos.                    ║
╚══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╝
 ${color.yellow(`Utilice esta estructura: md-links <ruta> <comando> para ejecutar el cli.
 Pero también puedes escribir solo md-links <ruta> y obtendrás el enlace, su texto y su archivo.`)}`;
export { linksTotal, linksUnique, linksRotos, help };