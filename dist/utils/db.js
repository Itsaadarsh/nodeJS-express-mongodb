const MongoClient = require('mongodb').MongoClient;
MongoClient.connect('mongodb+srv://aadi:rootadmin@cluster0.b7dxw.mongodb.net/test?retryWrites=true&w=majority', { useUnifiedTopology: true }, (err, client) => {
    if (err)
        return console.error(err);
    console.log('Connected to Database');
});
//# sourceMappingURL=db.js.map