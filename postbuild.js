import fs from "node:fs";
import path from "node:path";

const getFallbackTsVersions = () => {
  return fs
    .readdirSync("dist", { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory() && /^types-v/.test(dirent.name))
    .map((dirent) => dirent.name.replace(/^types-v/, ""))
    .sort();
};

const getFilesFromDir = (dirname) => {
  return fs
    .readdirSync(dirname, { withFileTypes: true })
    .filter((dirent) => dirent.isFile())
    .map(({ name }) => name);
};

const getBasename = (name) => path.basename(name, path.extname(name));

const main = async () => {
  const packageString = fs.readFileSync("package.json", "utf8");
  const { scripts, ...packageConfig } = JSON.parse(packageString);
  const legacyVersions = getFallbackTsVersions();
  const legacyTypesEnt = (fn) =>
    Object.fromEntries(
      legacyVersions.map((tsVer) => [`types@<=${tsVer}`, fn(`types-v${tsVer}`)])
    );
  const configOverride = {
    main: "./esm/index.js",
    types: "./esm/index.d.ts",
    exports: {
      ".": {
        require: {
          ...legacyTypesEnt((legacyDir) => `./cjs/${legacyDir}/index.d.ts`),
          types: `./cjs/index.d.ts`,
          default: `./cjs/index.js`,
        },
        default: {
          ...legacyTypesEnt((legacyDir) => `./esm/${legacyDir}/index.d.ts`),
          types: `./esm/index.d.ts`,
          default: `./esm/index.js`,
        },
      },
      "./*": {
        require: {
          ...legacyTypesEnt((legacyDir) => `./cjs/${legacyDir}/*.d.ts`),
          types: `./cjs/*.d.ts`,
          default: `./cjs/*.js`,
        },
        default: {
          ...legacyTypesEnt((legacyDir) => `./esm/${legacyDir}/*.d.ts`),
          types: `./esm/*.d.ts`,
          default: `./esm/*.js`,
        },
      },
    },
    typesVersions: Object.fromEntries(
      legacyVersions.map((tsVer) => [
        `<=${tsVer}`,
        {
          "esm/*": [`esm/types-v${tsVer}/*`],
          "cjs/*": [`cjs/types-v${tsVer}/*`],
        },
      ])
    ),
  };

  legacyVersions.forEach((tsVer) => {
    const legacyDir = `types-v${tsVer}`;
    ["esm", "cjs"].forEach((moduleType) => {
      fs.mkdirSync(`dist/${moduleType}/${legacyDir}`);
      getFilesFromDir(`dist/${moduleType}`)
        .filter((name) => path.extname(name) === ".ts")
        .forEach((name) =>
          fs.copyFileSync(
            `dist/${moduleType}/${name}`,
            `dist/${moduleType}/${legacyDir}/${name}`
          )
        );
      getFilesFromDir(`dist/${legacyDir}`).forEach((name) =>
        fs.copyFileSync(
          `dist/${legacyDir}/${name}`,
          `dist/${moduleType}/${legacyDir}/${name}`
        )
      );
    });
  });

  fs.writeFileSync(
    "dist/package.json",
    JSON.stringify({ ...packageConfig, ...configOverride }, null, "\t"),
    "utf8"
  );

  fs.writeFileSync(
    "dist/esm/package.json",
    JSON.stringify(
      { name: `${packageConfig.name}/esm`, type: "module" },
      null,
      "\t"
    ),
    "utf8"
  );

  fs.writeFileSync(
    "dist/cjs/package.json",
    JSON.stringify(
      { name: `${packageConfig.name}/cjs`, type: "commonjs" },
      null,
      "\t"
    ),
    "utf8"
  );

  fs.copyFileSync("LICENSE", "dist/LICENSE");
  fs.copyFileSync("README.md", "dist/README.md");
};

main();
