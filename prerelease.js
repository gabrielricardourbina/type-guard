const fs = require('fs').promises;

(async() => {
	const configOverride = { main: 'index.js', types: 'index.d.ts', scripts: undefined };
	const packageString = await fs.readFile('package.json', 'utf8');
	const packageConfig = JSON.parse(packageString);
	const releaseConfig = Object.assign(packageConfig, configOverride);

	await fs.writeFile('dist/package.json', JSON.stringify(releaseConfig, null, "\t"), 'utf8');
	await fs.copyFile("LICENSE", "dist/LICENSE");
	await fs.copyFile("README.md", "dist/README.md");
})();
