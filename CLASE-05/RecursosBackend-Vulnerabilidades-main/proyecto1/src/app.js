import express from 'express';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
import viewsRouter from './routes/views.router.js';
import sessionsRouter from './routes/sessions.router.js';

const app = express();

//! Dependencia no utilizada bcrypt 

app.engine('handlebars',handlebars.engine());
app.set('views',`${__dirname}/views`);
app.set('view engine','handlebars');

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use('/',viewsRouter);
app.use('/api/sessions',sessionsRouter);

//! Variable expuesta - usar PORT en .env
app.listen(8080,()=>console.log(`Listening on PORT 8080`))