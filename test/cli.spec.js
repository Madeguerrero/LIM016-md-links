import { linksTotal, linksUnique, linksRotos } from "../src/option.js";

const prueba = [
  {
    href: "https://nodejs.org/api/fs.html#fs_fs_readfile_path_options_callback",
    text: "Leer un archivo",
    file: "/Users/madeleine/Desktop/MD-Links/LIM016-md-links/README.md",
    status: 200,
    ok: "Ok",
  },
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

describe("linksTotal", () => {
  it("Debería ser una función", () => {
    expect(typeof linksTotal).toBe("function");
  });
  it("deberia devolver el total de los links", () => {
    expect(linksTotal(prueba)).toBe(4);
  });
});

describe("linksUnique", () => {
  it("Debería ser una función", () => {
    expect(typeof linksUnique).toBe("function");
  });
  it("deberia devolver el total de los links unicos", () => {
    expect(linksUnique(prueba)).toEqual(4);
  });
});

describe("linksRotos", () => {
  it("Debería ser una función", () => {
    expect(typeof linksRotos).toBe("function");
  });
  it("deberia devolver el total de los links que estan rotos", () => {
    expect(linksRotos(prueba)).toBe(1);
  });
});
