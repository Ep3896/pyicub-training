import {writeFile} from "fs";

import('dotenv').then((dotenv) => {
    dotenv.config();
}).catch((error) => {
    console.error('Failed to load dotenv:', error);
});
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Configure Angular `environment.ts` file path
const targetPath = path.join(__dirname, '..', 'src', 'environments', 'environment.ts');
const apiScheme = process.env['PYICUB_API_PROXY_SCHEME'] || 'http'
const apiHost = process.env['PYICUB_API_PROXY_HOST'] || 'localhost'
const apiPort = process.env['PYICUB_API_PROXY_PORT'] || '9001';

// `environment.ts` file structure
const envConfigFile = `
export const environment = {
    apiScheme: '${apiScheme}',
    apiHost: '${apiHost}',
    apiPort: '${apiPort}',
}
`;
writeFile(targetPath, envConfigFile, function (err) {
    if (err) {
        console.error(err);
        throw err;
    } else {
        console.log(`Angular environment.ts file generated correctly at ${targetPath} \n`);
    }
});
