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
    expect(rutaEsAbsolutaAndConvirtiendola("README.md")).toEqual(
      "/Users/madeleine/Desktop/MD-Links/LIM016-md-links/README.md"
    );
  });
});

describe("rutaEsDirectorio", () => {
  it("deberia devolver vedadero si la ruta es un directorio", () => {
    expect(
      rutaEsDirectorio("/Users/madeleine/Desktop/MD-Links/LIM016-md-links")
    ).toBeTruthy;
  });
  it("deberia devolver falso si la ruta no es un directorio", () => {
    expect(
      rutaEsDirectorio(
        "/Users/madeleine/Desktop/MD-Links/LIM016-md-links/pruebas/prueba1/archivo.txt"
      )
    ).toBeFalsy;
  });
});

describe("rutaTieneArchivos", () => {
  it("deberia retornar verdadero si la ruta tiene un archivo", () => {
    expect(
      rutaTieneArchivos(
        "/Users/madeleine/Desktop/MD-Links/LIM016-md-links/pruebas/enlaces.md"
      )
    ).toBeTruthy;
  });
  it("deberia retornar falso si la ruta no tiene archivos", () => {
    expect(
      rutaTieneArchivos(
        "/Users/madeleine/Desktop/MD-Links/LIM016-md-links/pruebas"
      )
    ).toBeFalsy;
  });
});

describe("filtrando los archivos .md", () => {
  it("deberia recorrer la ruta y devolver un array con los archivos .md ", () => {
    expect(
      leyendoDirectorio(
        "/Users/madeleine/Desktop/MD-Links/LIM016-md-links/pruebas/prueba1"
      )
    ).toEqual([
      "/Users/madeleine/Desktop/MD-Links/LIM016-md-links/pruebas/prueba1/archivo.md",
    ]);
  });
});

describe("arraysDeObjectosDeLinks", () => {
  it("deberia retornar un array de objectos con información del link (href,text,file)", () => {
    const rutaArray = [
      {
        href: "https://jestjs.io/",
        text: "Jest",
        file: "/Users/madeleine/Desktop/MD-Links/LIM016-md-links/pruebas/prueba1/archivo.md",
      },
      {
        href: "https://www.w3schools.com/",
        text: "Jest",
        file: "/Users/madeleine/Desktop/MD-Links/LIM016-md-links/pruebas/prueba1/archivo.md",
      },
      {
        href: "https://desarrolloweb.com/",
        text: "Jest",
        file: "/Users/madeleine/Desktop/MD-Links/LIM016-md-links/pruebas/prueba1/archivo.md",
      },
      {
        href: "https://www.pipsnacks.com/404",
        text: "enlace roto",
        file: "/Users/madeleine/Desktop/MD-Links/LIM016-md-links/pruebas/prueba1/archivo.md",
      },
    ];
    expect(
      arraysDeObjectosDeLinks(
        leyendoDirectorio(
          "/Users/madeleine/Desktop/MD-Links/LIM016-md-links/pruebas/prueba1"
        )
      )
    ).toEqual(rutaArray);
  });
});

describe("status de los links", () => {
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
        href: "https://docs.npmjs.com/getting-started/publishing-npm-packages",
        text: "Crear módulos en Node.js",
        file: "/Users/madeleine/Desktop/MD-Links/LIM016-md-links/README.md",
        status: 200,
        ok: "Ok",
      },
      {
        href: "https://nodejs.org/api/fs.html#fs_fs_readfile_path_options_callback",
        text: "Leer un archivo",
        file: "/Users/madeleine/Desktop/MD-Links/LIM016-md-links/README.md",
        status: 200,
        ok: "Ok",
      },
    ];
    const element = await httpStatus(links);
    expect(element).toStrictEqual(linksStatus);
  });
});
