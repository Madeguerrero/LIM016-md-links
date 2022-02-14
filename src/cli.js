#!/usr/bin/env node
import { mdLinks } from "./md-links.js";
import { linksTotal, linksUnique, linksRotos, help } from "../src/option.js";
import color from "chalk";
import process from "process";
import figlet from "figlet";
import chalk from "chalk";
const [, , ...args] = process.argv; //lee desde el 2

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
  if (args.length === 1) {
    console.log(args[0]);
    mdLinks(args[0], {
      validate: false,
    })
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

  if (args.length === 2) {
    if (args[1] === "--validate") {
      mdLinks(args[0], {
        validate: true,
      }).then((res) => {
        res.forEach((elemento) => {
          console.log(
            `${elemento.href} ${color.green(elemento.text)} ${color.yellow(
              elemento.file
            )} ${color.green(elemento.status)} ${color.yellow(
              elemento.message
            )} ${color.yellow(elemento.ok)}`
          );
        });

        if (args[1] === "--stats") {
          mdLinks(args[0], {
            validate: true,
          }).then((res) => {
            console.log(`Total: ${color.yellow(linksTotal(res))}`);
            console.log(`Unique: ${color.yellow(linksUnique(res))}`);
          });
        }

        if (args[1] === "--help") {
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

  if (args.length === 3) {
    if (
      (args[1] === "--validate" && args[2] === "--stats") ||
      (args[1] === "--stats" && args[2] === "--validate")
    ) {
      mdLinks(args[0], {
        validate: true,
      }).then((res) => {
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
