const fs = require("fs").promises;

(async () => {
  const configOverride = {
    main: "index.js",
    types: "index.d.ts",
    scripts: undefined,
  };
  const packageString = await fs.readFile("package.json", "utf8");
  const readmeString = await fs.readFile("README.md", "utf8");

  const modulesString = await fs.readFile("modules.md", "utf8");
  const packageConfig = JSON.parse(packageString);

  const resolvedDocs = `${readmeString}\n${modulesString}`
    .replace(/\nDefined in:.*\n/gm, "")
    .replace(/modules\.md/gm, "README.md")
    .replace(
      `# ${packageConfig.name} - v${packageConfig.version}`,
      `# Exports - v${packageConfig.version}`
    );
  const releaseConfig = Object.assign(packageConfig, configOverride);

  await fs.writeFile(
    "dist/package.json",
    JSON.stringify(releaseConfig, null, "\t"),
    "utf8"
  );
  await fs.writeFile(
    "dist/README.md",
    resolvedDocs,
    "utf8"
  );

  await fs.copyFile("LICENSE", "dist/LICENSE");
})();
