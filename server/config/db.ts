import mongoose from 'mongoose';
const colors = require('colors');

const connectDb = async (): Promise<void> => {
    if (!process.env.MONGO_URI) {
        throw new Error('MONGO_URI is not defined in environment variables');
    }

    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            dbName: 'graphql_proj_management',
        });

        console.log(`MongoDB connected: ${conn.connection.host}`/*.cyan.underline.bold*/);
    } catch (error) {
        console.error(`Error: ${error}`);
        process.exit(1);
    }
};

module.exports = connectDb;
