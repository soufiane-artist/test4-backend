const mongoose =require('mongoose')



const DB = ()=>{
    mongoose.connect(process.env.MONGODB)
    .then(() => console.log('Connected!'))
    .catch((error) => console.error('Connection error: ', error));
}

module.exports = DB