import {
  archivoExiste,
  rutaEsAbsolutaAndConvirtiendola,
  rutaEsDirectorio,
  rutaTieneArchivos,
  leyendoDirectorio,
  arraysDeObjectosDeLinks,
  httpStatus,
} from "../src/api.js";

describe("averiguando si la ruta existe", () => {
  it("deberia ser una función", () => {
    expect(typeof archivoExiste).toBe("function");
  });
  it("debe devolver verdadero si la ruta existe", () => {
    expect(
      archivoExiste(
        "/Users/madeleine/Desktop/MD-Links/LIM016-md-links/README.md"
      )
    ).toBeTruthy;
  });
  it("debe devolver falso si la ruta no existe", () => {
    expect(
      archivoExiste(
        "/Users/madeleine/Desktop/MD-Links/LIM016-md-links/rutanoexiste.js"
      )
    ).toBeFalsy;
  });
});

describe("rutaEsAbsolutaAndConvirtiendola", () => {
  it("deberia ser una función", () => {
    expect(typeof rutaEsAbsolutaAndConvirtiendola).toBe("function");
  });
  it("deberia retornar verdadero si la ruta es absoluta", () => {
    expect(
      rutaEsAbsolutaAndConvirtiendola(
        "/Users/madeleine/Desktop/MD-Links/LIM016-md-links"
      )
    ).toBeTruthy;
  });
  it("deberia retornar falso si la ruta no es absoluta", () => {
    expect(rutaEsAbsolutaAndConvirtiendola("MD-Links")).toBeFalsy;
  });
  it("deberia retornar la ruta relativa convertida a absoluta", () => {
    expect(rutaConvertidaEnAbsoluta("MD-Links")).toBe(
      "\\Users\\madeleine\\Desktop\\MD-LINKS"
    );
  });
});

describe("rutaEsDirectorio", () => {
  it("deberia ser una función", () => {
    expect(typeof rutaEsDirectorio).toBe("function");
  });
  it("deberia devolver vedadero si la ruta es un directorio", () => {
    expect(
      rutaEsDirectorio("/Users/madeleine/Desktop/MD-Links/LIM016-md-links")
    ).toBeTruthy;
  });
  it("deberia devolver falso si la ruta no es un directorio", () => {
    expect(rutaEsDirectorio("archivo.txt")).toBeFalsy;
  });
});

describe("rutaTieneArchivos", () => {
  it("deberia ser una function", () => {
    expect(typeof rutaTieneArchivos).toBe("function");
  });
  it("deberia retornar verdadero si la ruta es un archivo", () => {
    expect(
      rutaTieneArchivos(
        "/Users/madeleine/Desktop/MD-Links/LIM016-md-links/pruebas/prueba1/archivo.txt"
      )
    ).toBeTruthy;
  });
  it("deberia retornar falso si la ruta no es un archivo", () => {
    expect(
      rutaTieneArchivos(
        "/Users/madeleine/Desktop/MD-Links/LIM016-md-links/pruebas"
      )
    ).toBeFalsy;
  });
});

describe("filtrando los archivos .md", () => {
  it("deberia ser una function", () => {
    expect(typeof leyendoDirectorio).toBe("function");
  });
  it("deberia devolver un array con los archivos .md ", () => {
    expect(leyendoDirectorio("LIM016-md-links")).toEqual([
      "/Users/madeleine/Desktop/MD-Links/LIM016-md-links/README.md",
    ]);
  });
});

describe("arraysDeObjectosDeLinks", () => {
  it("deberia ser una function", () => {
    expect(typeof arraysDeObjectosDeLinks).toBe("function");
  });
  it("deberia retornar un array de objectos con información del link (href,text,file)", () => {
    const rutaArray = [
      {
        href: "https://www.npmjs.com/",
        text: "Sitio oficial de npm (en inglés)",
        file: "/Users/madeleine/Desktop/MD-Links/LIM016-md-links/README.md",
      },
    ];
    expect(
      arraysDeObjectosDeLinks(
        "/Users/madeleine/Desktop/MD-Links/LIM016-md-links/README.md"
      )
    ).toEqual(rutaArray);
  });
});

describe("status de los links", () => {
  it("deberia ser una function", () => {
    expect(typeof httpStatus).toBe("function");
  });
  it("deberia retornar un array con informacion de link (href,text,file,status,mensaje,ok)", async () => {
    const links = [
      {
        href: "https://docs.npmjs.com/getting-started/publishing-npm-packages",
        text: "Crear módulos en Node.js",
        file: "/Users/madeleine/Desktop/MD-Links/LIM016-md-links/README.md",
      },
      {
        href: "https://nodejs.org/api/fs.html#fs_fs_readfile_path_options_callback",
        text: "Leer un archivo",
        file: "/Users/madeleine/Desktop/MD-Links/LIM016-md-links/README.md",
      },
    ];
    const linksStatus = [
      {
        href: "https://nodejs.org/api/fs.html#fs_fs_readfile_path_options_callback",
        text: "Leer un archivo",
        file: "/Users/madeleine/Desktop/MD-Links/LIM016-md-links/README.md",
        status: 200,
        ok: "Ok",
      },
      {
        href: "https://docs.npmjs.com/getting-started/publishing-npm-packages",
        text: "Crear módulos en Node.js",
        file: "/Users/madeleine/Desktop/MD-Links/LIM016-md-links/README.md",
        status: 200,
        ok: "Ok",
      },
    ];
    const element = await httpStatus(links);
    expect(element).toEqual(linksStatus);
  });
});
