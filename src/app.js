import express from 'express';
import routes from './routes.js';
//import path from 'path';

const app = express();

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(express.static('view'))

app.use(routes)

export default app 