import express from 'express';
import bodyParser from 'body-parser';
// import homeRouter from './routes/shop';
// import adminData from './routes/admin';
// import errorRoute from './controllers/error';
// import userRoute from './routes/user';
import mongoConnect from './utils/db';

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('dist'));

// app.use('/user', userRoute.router);

// app.use('/admin', adminData.router);

// app.use(homeRouter);
app.get('/', (_req, res, _next) => {
  res.send(`<h1>Hey Mofos</h1>`);
});
// app.use(errorRoute.error404);

mongoConnect((client: any) => {
  console.log(client);
  app.listen(8080), console.log('Listening at 8080');
});
