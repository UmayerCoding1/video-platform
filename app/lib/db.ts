import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URL!;

if (!MONGODB_URI) {
    throw new Error('Plase define mongo uri in env variables');
}

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = {conn: null, promise: null}
}


export async function connectToDatabase() {
    if (cached.conn) {
        return cached.conn
    }

    if(!cached.promise){
        const opts = {
            bufferCommands: true,
            maxPoolSize: 10
        }
        mongoose.connect(MONGODB_URI, opts)
        .then(() => mongoose.connection)
    }

    try {
        cached.promise = await cached.promise 
    } catch (error) {
       cached.promise = null;
       throw error; 
    }

    return cached.conn;
}