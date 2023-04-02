import fs from "node:fs";
import path from "node:path";
import semver from "semver";

const getFilesFromDir = (dirname) => {
  const cjsDirList = fs.readdirSync(dirname, { withFileTypes: true });
  return cjsDirList.filter((dirent) => dirent.isFile()).map(({ name }) => name);
};

const getBasename = (name) => path.basename(name, path.extname(name));
const shallowCopy = (source, destination) => {
  try {
    fs.copyFileSync(source, destination, fs.constants.COPYFILE_EXCL);
  } catch (error) {
    if (error.code !== "EEXIST") throw error;
  }
};
const getMinorVersion = (ver) => {
  const { major, minor } = semver.coerce(ver);
  return `${major}.${minor}`;
};

const main = async () => {
  const packageString = fs.readFileSync("package.json", "utf8");
  const { typesVersions, scripts, ...packageConfig } =
    JSON.parse(packageString);

  const legacyTypes = Object.keys(typesVersions).map((filter) => [
    filter,
    `types-v${filter.replace(/<=/, "")}`,
  ]);

  const tsVersion = getMinorVersion(packageConfig.devDependencies.typescript);

  const configOverride = {
    main: "./index.js",
    module: "./index.mjs",
    types: "./index.d.ts",
    exports: getFilesFromDir("dist/esm")
      .map(getBasename)
      .filter((name) => name !== "index")
      .reduce(
        (res, name) =>
          Object.assign(res, {
            [`./${name}`]: {
              types: `./${name}.d.ts`,
              import: `./${name}.mjs`,
              default: `./${name}.js`,
            },
          }),
        {
          ".": {
            types: "./index.d.ts",
            import: "./index.mjs",
            default: "./index.js",
          },
          "./package.json": "./package.json",
        }
      ),
    typesVersions: Object.fromEntries(
      legacyTypes.map(([filter, dir]) => [filter, { "*": [`${dir}/*`] }])
    ),
  };

  const releaseConfig = Object.assign(packageConfig, configOverride);

  legacyTypes.forEach(([, dir]) =>
    getFilesFromDir("dist/types").forEach((name) =>
      shallowCopy(`dist/types/${name}`, `dist/${dir}/${name}`)
    )
  );

  getFilesFromDir("dist/esm")
    .map(getBasename)
    .forEach((name) =>
      fs.renameSync(`dist/esm/${name}.js`, `dist/${name}.mjs`)
    );

  getFilesFromDir("dist/cjs").forEach((name) =>
    fs.renameSync(`dist/cjs/${name}`, `dist/${name}`)
  );

  getFilesFromDir("dist/types").forEach((name) =>
    fs.renameSync(`dist/types/${name}`, `dist/${name}`)
  );

  fs.writeFileSync(
    "dist/package.json",
    JSON.stringify(releaseConfig, null, "\t"),
    "utf8"
  );

  fs.copyFileSync("LICENSE", "dist/LICENSE");
  fs.copyFileSync("README.md", "dist/README.md");
};

main();
