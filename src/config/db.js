const mongoose = require('mongoose');

const dbConnection = async () => {
  try {
    await mongoose.connect('mongodb://stylopm:test99@ac-fxdkwvr-shard-00-00.wpih3we.mongodb.net:27017,ac-fxdkwvr-shard-00-01.wpih3we.mongodb.net:27017,ac-fxdkwvr-shard-00-02.wpih3we.mongodb.net:27017/test?replicaSet=atlas-2bkdmf-shard-0&ssl=true&authSource=admin');
    console.log('run DB');
  } catch (e) {
    console.log('error connection');
    console.log(e);
    throw new Error('Error al conectar a la DB');
  }
};

module.exports = { dbConnection };
    
    
  
  
