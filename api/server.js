import { join } from 'path';
import { pathToFileURL } from 'url';

export default async function handler(req, res) {
  try {
    const indexPath = join(process.cwd(), 'dist', 'ssr', 'index.js');
    const quasarServer = await import(pathToFileURL(indexPath).href);

    // According to your error, 'handler' exists as an export.
    // Let's grab it directly.
    const render = quasarServer.handler;

    // Logic check: In some environments, the export is nested or needs to be called
    if (typeof render !== 'function') {
      // If 'handler' isn't a function, maybe it's inside 'app'?
      // Quasar's 'app' is the Express instance.
      if (quasarServer.app && typeof quasarServer.app === 'function') {
         return quasarServer.app(req, res);
      }
      throw new Error(`Handler is type ${typeof render}. App is type ${typeof quasarServer.app}`);
    }

    // Execute the Quasar render
    return render(req, res);
  } catch (error) {
    console.error('Vercel Execution Error:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: error.message,
      exports: Object.keys(quasarServer || {}) // Confirms what we see
    });
  }
}