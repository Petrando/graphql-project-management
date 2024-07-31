export interface Project {
    id?: string;
    name: string;
    description: string;
    status: 'Not Started' | 'In Progress' | 'Completed';
    clientId: string;
}

// Define the Client interface
export interface Client {
    id?: string;
    name: string;
    email: string;
    phone: string;
}