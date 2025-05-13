import * as fs from "fs";
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function objectToString(obj) {
  const keyValuePairs = Object.entries(obj).map(([key, value]) => {
    return `"${key}": ${value}`;
  });
  return `{ ${keyValuePairs.join(', ')} }`;
}

const pluginsDirectoryPath = path.join(__dirname, '..', 'src', 'app', 'plugins');
const pluginsIndexPath = path.join(pluginsDirectoryPath,'index.ts');
//La parte del file con gli import dei vari plugin
let pluginImports = '';

//La lista di cartelle presente nella directory plugins
const plugins = fs.readdirSync(pluginsDirectoryPath).filter( file => {
  return fs.statSync(path.join(pluginsDirectoryPath,file)).isDirectory()
})

const pluginIndex = {}
plugins.forEach(pluginFolder => {

  const pluginFolderPath = path.join(pluginsDirectoryPath,pluginFolder)
  let pluginName = pluginFolder
  let className = ""

  fs.readdirSync(pluginFolderPath).forEach(file => {
    const filePath = path.join(pluginFolderPath, file);
    //prelevo la classe del componente
    if(file.endsWith('.component.ts')){
      const content = fs.readFileSync(filePath, 'utf8');
      const classMatch = content.match(/export\s+class\s+(\w+)/);

      if(classMatch){
        className = classMatch[1].replace(/'/g, "");
      }
    }

    //Se presente, estraggo da config.json il nome del plugin.
    if (file === 'config.json'){
      const content = fs.readFileSync(filePath, 'utf8');
      const config = JSON.parse(content);
      pluginName = config.name;
    }
  })

  pluginIndex[pluginName] = className;
  pluginImports += `import {${className}} from "./${pluginFolder}/${pluginFolder}.component";\n`
})

const pluginIndexFile = `
${pluginImports}
export const pluginIndex = ${objectToString(pluginIndex)}
`;
fs.writeFile(pluginsIndexPath, pluginIndexFile, function (err) {
  if (err) {
    throw console.error(err);
  } else {
    console.log(`Angular index.ts file generated correctly at ${pluginsIndexPath} \n`);
  }
});




