const mongoose = require('mongoose'); 

const dbconnect = () => { 
    mongoose.set('strictQuery', true) 
    mongoose.connect('mongodb://localhost:27017/fashionLineDB', { 
        useNewUrlParser: true,                 
        useUnifiedTopology: true,             
      })
      .then(() => {
        console.log('conectado a MongoDB');
      })
      .catch(err => {
        console.error('error al conectar a MongoDB', err);
      });
}

module.exports = dbconnect


