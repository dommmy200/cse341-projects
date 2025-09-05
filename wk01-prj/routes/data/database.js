const MongoClient = require('mongodb').MongoClient;

let database;

const initDatabase = (callback) => {
    if (database) {
        console.log('Database is already initialized!');
        return callback(null, database);
    }
    MongoClient.connect(process.env.MONGO_URL)
    .then((client) => {
        database = client;
        return callback(null, database);
    })
    .catch((err) => {
        callback(err)
    });
        
}

const getDatabase = () => {
    if (!database) {
        throw new Error("Database is not initialized!");
    }
    return database;
}

module.exports = { initDatabase, getDatabase};