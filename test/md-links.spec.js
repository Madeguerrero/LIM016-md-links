import mdLinks from "..md-links.js";

describe("funcion md-links", () => {
  it("deberia devolver un mensaje que diga que la ruta no existe", () => {
    const resultPath = mdLinks("/prueba1/archivoDePrueba.md");
    resultPath.then((res) => expect(res).toEqual("La Ruta no Existe"));
  });
  it("deberia devolver un array de objectos(href,text,file)", () => {
    const output = [
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
    ];
    const result = mdLinks(
      '/Users/madeleine/Desktop/MD-Links/LIM016-md-links/pruebas/prueba1/archivo.md"',
      { validate: false }
    );
    return result.then((res) => {
      expect(res).toEquaal(output);
    });
  });
  it("deberia retornar un array de objectos con status ", () => {
    const StatusLinks = [
      {
        href: "https://www.youtube.com/watch?v=Lub5qOmY4JQ",
        text: "recurso",
        file: "/Users/madeleine/Desktop/MD-Links/LIM016-md-links/README.md",
        status: 200,
        ok: "Ok",
      },
      {
        href: "https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/",
        text: "Array - MDN",
        file: "/Users/madeleine/Desktop/MD-Links/LIM016-md-links/README.md",
        status: 200,
        ok: "Ok",
      },
      {
        href: "about:blank#10-achicando-el-problema",
        text: "10. Achicando el problema",
        file: "/Users/madeleine/Desktop/MD-Links/LIM016-md-links/README.md",
        status: 500,
        message: "TypeError:",
        ok: "Fail",
      },
    ];
    return mdLinks(
      "/Users/madeleine/Desktop/MD-Links/LIM016-md-links/README.md",
      { validate: true }
    ).then((res) => expect(res).toEquaal(StatusLinks));
  });
});
