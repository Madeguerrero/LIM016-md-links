#!/usr/bin/env node

import mdLinks from "./md-links.js";
import { linksTotal, linksUnique, linksRotos, help } from "./option";
import color from "chalk";
import process from "process";
import figlet from "figlet";
import chalk from "chalk";
const argv = process.argv;

//empieza con una animacion md-links
console.log(
  chalk.magenta(
    figlet.textSync("MD-LINKS", {
      font: "Ghost",
      horizontalLayout: "full",
    })
  )
);

//agregamos un tiempo para que se ejecute las funciones despues de la animacion
setTimeout(() => {
  if (argv.length === 1) {
    mdLinks(argv[0], { validate: false })
      .then((resul) =>
        resul.forEach((element) =>
          console.log(
            ` ${element.href} ${color.green(element.text)} ${color.yellow(
              element.file
            )}`
          )
        )
      )
      .catch((err) => console.log(err));
  }

  if (argv.length === 2) {
    if (argv[1] === "--validate") {
      mdLinks(argv[0], { validate: true }).then((res) => {
        res.forEach((elemento) => {
          console.log(
            `${elemento.href} ${color.green(elemento.text)} ${color.yellow(
              elemento.file
            )} ${color.green(elemento.status)} ${color.yellow(
              elemento.message
            )} ${color.yellow(elemento.ok)}`
          );
        });
        if (argv[1] === "--stats") {
          mdLinks(argv[0], { validate: true }).then((res) => {
            console.log(`Total: ${color.yellow(linksTotal(res))}`);
            console.log(`Unique: ${color.yellow(linksUnique(res))}`);
          });
        }
        if (argv[1] === "--help") {
          console.log(help);
        } else {
          console.log(
            color.redBright(
              'Lo siento, el comando ingresado no existe. Prueba con el comando "--help" '
            )
          );
        }
      });
    }
  }

  if (argv.length === 3) {
    if (
      (argv[1] === "--validate" && argv[2] === "--stats") ||
      (argv[1] === "--stats" && argv[2] === "--validate")
    ) {
      mdLinks(argv[0], { validate: true }).then((res) => {
        console.log(`Total: ${color.yellow(linksTotal(res))}`);
        console.log(`Unique: ${color.yellow(linksUnique(res))}`);
        let statusText = []; //creamos un array vacio para guardarlos status y me los muestre despues con el mensaje de error
        res.map((elemento) => {
          statusText.push(elemento.message);
        });
        console.log(`Broken: ${color.yellow(linksRotos(res))}`);
      });
    } else {
      console.log(
        color.redBright(
          'Lo siento,el comando ingresado no existe. Prueba con el comando "--help"'
        )
      );
    }
  }
}, 1000);
