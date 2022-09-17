import express from 'express';

import * as Middleware from './middleware';
import * as Routes from './routes';


const PORT = process.env.PORT || 3333;

/**
 * @constant {express.Application}
 */
const app = express();

/**
 * @constructs express.Application Middleware
 */
Middleware.configure(app);


/**
 * @constructs express.Application Routes
 */
Routes.init(app);

/**
 * sets port 3000 to default or unless otherwise specified in the environment
 */
app.set('port', PORT);

/**
 * @exports {express.Application}
 */
export default app;
