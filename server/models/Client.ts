import mongoose, { Schema, Document } from 'mongoose';

interface IClient extends Document {
    name: string;
    email: string;
    phone: string;
}

const ClientSchema: Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
});

const Client = mongoose.model<IClient>('Client', ClientSchema);
export default Client;
