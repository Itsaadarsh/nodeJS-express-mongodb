import express from 'express';
import bodyParser from 'body-parser';
import homeRouter from './routes/shop';
import adminData from './routes/admin';
// import errorRoute from './controllers/error';
// import userRoute from './routes/user';
import { MongoClient } from 'mongodb';

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('dist'));

// app.use('/user', userRoute.router);

app.use('/admin', adminData.router);

app.use(homeRouter);

// app.use(errorRoute.error404);

async function connectionDB() {
  try {
    const client = await MongoClient.connect(
      'mongodb+srv://aadi:rootadmin@cluster0.b7dxw.mongodb.net/test?retryWrites=true&w=majority',
      { useUnifiedTopology: true }
    );
    console.log('Connected to Database');
    const db = client.db();
    app.listen(8080), console.log('Listening at 8080');
    return db;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export const getDb = connectionDB();
