import { useState, FC } from 'react';
import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';
import { DELETE_CLIENT } from '../../../mutations/clientMutations';
import { GET_CLIENTS } from '../../../queries/clientQueries';
import { GET_PROJECTS } from '../../../queries/projectQueries';
import ClientRow from './ClientRow';
import Spinner from '../../Spinner';
import { Client } from '../../../types';

const defaultClient:Client = {
    id: "", name: "", email: "", phone: ""
}

export default function Clients() {
    const [idToDelete, setIdToDelete] = useState("")    
    const { loading, error, data } = useQuery(GET_CLIENTS);

    if (loading) return <Spinner />;
    if (error) return <p>Something Went Wrong</p>;
    
    const clientToDelete = data.clients.find((d: Client) => { return d.id === idToDelete})
    console.log(clientToDelete)
    return (
        <>
        {!loading && !error && (
            <table className='table table-hover mt-3'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {data.clients.map((client:Client) => (
                        <ClientRow key={client.id} client={client} setIdToDelete={setIdToDelete} />
                    ))}
                </tbody>
            </table>
        )}       
        <DeleteClientDialog 
            close={()=>{setIdToDelete("")}} 
            client={clientToDelete?clientToDelete:defaultClient} 
        />        
        </>
    );
}

type tDeleteDialog = {
    close: () => void;
    client: Client;
}

const DeleteClientDialog: FC<tDeleteDialog> = ({ close, client }) => {
    const [deleteClient] = useMutation(DELETE_CLIENT, {
        variables: { id: client.id },
        refetchQueries: [{ query: GET_CLIENTS }, { query: GET_PROJECTS }],
        // update(cache, { data: { deleteClient } }) {
        //   const { clients } = cache.readQuery({ query: GET_CLIENTS });
        //   cache.writeQuery({
        //     query: GET_CLIENTS,
        //     data: {
        //       clients: clients.filter((client) => client.id !== deleteClient.id),
        //     },
        //   });
        // },
    }); 
    return (
        <div className="modal fade" id='deleteClientModal' tabIndex={-1}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Just to make sure...</h5>
                        <button 
                            type="button" 
                            className="btn-close" 
                            data-bs-dismiss="modal" 
                            aria-label="Close"
                            onClick={close}
                        ></button>
                    </div>
                    <div className="modal-body">
                        <h4>Delete {client.name}?</h4>
                    </div>
                    <div className="modal-footer">
                        <button 
                            type="button" 
                            className="btn btn-secondary" 
                            data-bs-dismiss="modal"
                            onClick={()=>{
                                deleteClient()
                                close()
                            }}
                        >
                            Delete
                        </button>
                        <button 
                            type="button" 
                            className="btn btn-primary"
                            data-bs-dismiss="modal"
                            onClick={close}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
