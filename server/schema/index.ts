const { 
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull,
    GraphQLEnumType,
 } = require("graphql")
 import mongoose, { Document } from 'mongoose';

 import Project from '../models/Project';
 import Client from '../models/Client';

interface ProjectDocument extends Document {
    name: string;
    description: string;
    status: 'Not Started' | 'In Progress' | 'Completed';
    clientId: mongoose.Schema.Types.ObjectId;
}

// Define the Client interface
interface ClientDocument extends Document {
    name: string;
    email: string;
    phone: string;
}

const ProjectType = new GraphQLObjectType({
    name: "Project",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        status: { type: GraphQLString },
        client: {
            type: ClientType,
            resolve(parent: any, args: undefined) {
                return Client.findById(parent.clientId)
            }
        }
    })
})

const ClientType = new GraphQLObjectType({
    name: "Client",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        phone: { type: GraphQLString },
    })
})

const query = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        projects: {
            type: new GraphQLList(ProjectType),
            resolve(parent: any, args: undefined) {
                return Project.find();//projects
            },
        },
        project: {
            type: ProjectType,
            args: { id: { type: GraphQLID } },
            resolve(parent: any, args:{ id:string }) {
                return Project.findById(args.id);//projects.find(proj => proj.id === args.id)
            },
        },
        clients: {
            type: new GraphQLList(ClientType),
            resolve(parent: any, args: undefined) {
                return Client.find();//clients
            },
        },
        client: {
            type: ClientType,
            args: { id: { type: GraphQLID } },
            resolve(parent: any, args: { id: string }) {
                return Client.findById(args.id);//clients.find(client => client.id === args.id)
            },
        },
    },
});

// Mutations
const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        // Add a client
        addClient: {
            type: ClientType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                email: { type: new GraphQLNonNull(GraphQLString) },
                phone: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve(parent: any, args: { name: string, email: string, phone: string }) {
                const client = new Client({
                    name: args.name,
                    email: args.email,
                    phone: args.phone,
                });
        
                return client.save();
            },
        },
        
        // Delete a client
        deleteClient: {
            type: ClientType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) },
            },
            async resolve(parent: any, args: { id: string }) {                
                const result = await Project.deleteMany({ clientId: args.id });

                //console.log(`${result.deletedCount} projects deleted`);
                        
                return Client.findByIdAndDelete(args.id);
            },
        },
        // Add a project
        addProject: {
            type: ProjectType,
            args: {
            name: { type: new GraphQLNonNull(GraphQLString) },
            description: { type: new GraphQLNonNull(GraphQLString) },
            status: {
                type: new GraphQLEnumType({
                    name: 'ProjectStatus',
                    values: {
                        new: { value: 'Not Started' },
                        progress: { value: 'In Progress' },
                        completed: { value: 'Completed' },
                    },
                }),
                defaultValue: 'Not Started',
            },
            clientId: { type: new GraphQLNonNull(GraphQLID) },
            },
            resolve(
                parent: any, 
                args: { 
                    name: string, description: string, status:'Not Started' | 'In Progress' | 'Completed', clientId: string 
                }) {
                const project = new Project({
                    name: args.name,
                    description: args.description,
                    status: args.status,
                    clientId: args.clientId,
                });
        
                return project.save();
            },
        },
        // Delete a project
        deleteProject: {
            type: ProjectType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) },
            },
            resolve(parent: any, args: { id: string }) {
                return Project.findByIdAndDelete(args.id);
            },
        },
        // Update a project
        updateProject: {
            type: ProjectType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) },
                name: { type: GraphQLString },
                description: { type: GraphQLString },
                status: {
                    type: new GraphQLEnumType({
                        name: 'ProjectStatusUpdate',
                        values: {
                            new: { value: 'Not Started' },
                            progress: { value: 'In Progress' },
                            completed: { value: 'Completed' },
                        },
                    }),
                },
            },
            resolve(parent: any, args: { id: string, name: string, description: string, status: 'Not Started' | 'In Progress' | 'Completed' }) {
                return Project.findByIdAndUpdate(
                    args.id,
                    {
                        $set: {
                            name: args.name,
                            description: args.description,
                            status: args.status,
                        },
                    },
                    { new: true }
                );
            },
        },
        
    },
});

module.exports = new GraphQLSchema({
    query,
    mutation,
});