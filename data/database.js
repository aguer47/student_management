const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let database;

const initDb = (callback) => {
  if (database) {
    console.log('Database already initialized');
    return callback(null, database);
  }

  const connectionString =
    process.env.MONGODB_URI ||
    process.env.MONGODB_URL ||
    process.env.DATABASE_URL ||
    process.env.MONGODB_LOCAL_URI ||
    'mongodb://127.0.0.1:27017/student_management';

  const options = {
    serverSelectionTimeoutMS: 30000,
    connectTimeoutMS: 30000,
    tls: connectionString.startsWith('mongodb+srv://') || connectionString.startsWith('mongodb://') && connectionString.includes('ssl=true'),
  };

  MongoClient.connect(connectionString, options)
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