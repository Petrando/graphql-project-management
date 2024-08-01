import { FC } from "react"
import { FaTrash } from 'react-icons/fa';
import { Client  } from '../../../types';

type tClientRow = {
    client: Client;
    setIdToDelete: (id: string) => void;
}

const ClientRow:FC<tClientRow> = ({ client: {id, name, email, phone}, setIdToDelete }) => {        

    return (
        <tr key={id}>
            <td>{name}</td>
            <td>{email}</td>
            <td>{phone}</td>
            <td>
                <button className='btn btn-danger btn-sm'
                    data-bs-toggle='modal'
                    data-bs-target='#deleteClientModal'
                    onClick={()=>{setIdToDelete(id as string)}}
                >
                <FaTrash />
                </button>
                
            </td>
        </tr>
    );
}

export default ClientRow
