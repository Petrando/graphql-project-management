import { FC } from "react"
import { FaTrash } from 'react-icons/fa';
import { useMutation } from '@apollo/client';
import { DELETE_CLIENT } from '../../../mutations/clientMutations';
import { GET_CLIENTS } from '../../../queries/clientQueries';
import { GET_PROJECTS } from '../../../queries/projectQueries';
import { Client  } from '../../../types';

type tClientRow = {
    client: Client;
}

const ClientRow:FC<tClientRow> = ({ client: {id, name, email, phone} }) => {
    const [deleteClient] = useMutation(DELETE_CLIENT, {
        variables: { id: id },
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
        <tr>
            <td>{name}</td>
            <td>{email}</td>
            <td>{phone}</td>
            <td>
                <button className='btn btn-danger btn-sm' onClick={() => {deleteClient()}}>
                <FaTrash />
                </button>
            </td>
        </tr>
    );
}

export default ClientRow