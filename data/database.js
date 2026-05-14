const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let database;

const initDb = (callback) => {
  if (database) {
    console.log('Database already initialized');
    return callback(null, database);
  }

  const connectionString = process.env.MONGODB_URI || process.env.MONGODB_URL;
  if (!connectionString) {
    return callback(new Error('Missing MongoDB connection string in environment variables'));
  }

  MongoClient.connect(connectionString)
    .then((client) => {
      database = client;
      callback(null, database);
    })
    .catch((err) => {
      callback(err);
    });
};

const getDb = () => {
  if (!database) {
    throw Error('Database not initialized');
  }
  return database;
};

module.exports = {
  initDb,
  getDb
};