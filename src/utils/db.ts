import mongodb from 'mongodb';

const mgDB = mongodb.MongoClient;

const mongoConnect = (callback: Function) => {
  mgDB
    .connect('mongodb+srv://aadi:rootadmin@cluster0.b7dxw.mongodb.net/<dbname>?retryWrites=true&w=majority')
    .then(client => {
      console.log('Connected to MongoDB');
      callback(client);
    })
    .catch(console.error);
};

export default module.exports = mongoConnect;
