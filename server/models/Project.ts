import mongoose, { Schema, Document } from 'mongoose';

interface IProject extends Document {
    name: string;
    description: string;
    status: 'Not Started' | 'In Progress' | 'Completed';
    clientId: mongoose.Schema.Types.ObjectId;
}

const ProjectSchema: Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['Not Started', 'In Progress', 'Completed'],
        required: true,
    },
    clientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client',
        required: true,
    },
});

const Project = mongoose.model<IProject>('Project', ProjectSchema);
export default Project;
