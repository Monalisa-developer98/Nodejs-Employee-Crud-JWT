const mongoose = require('mongoose')
// const dbUrl = `${process.env.MONGO_URL}/${process.env.DB_NAME}`;
const dbUrl = 'mongodb+srv://monalisamahanta98:F4IWKErysUgiDVby@employeecrud.zjeou.mongodb.net/employeelist';

const connectDB = async()=>{
    try {
        const conn = await mongoose.connect(dbUrl);
        console.info(`MongoDB connected: ${conn.connection.host} `)
    } catch(error){
        console.log(error);
        console.info(`Error while connecting to DB, ${error}`);
        process.exit(1);
    }
}

module.exports = connectDB