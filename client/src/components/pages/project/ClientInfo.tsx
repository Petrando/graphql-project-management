import { FC } from 'react';
import { FaEnvelope, FaPhone, FaIdBadge } from 'react-icons/fa';
import { Client } from '../../../types';

type tClientInfo = {
    client: Client;
}
const ClientInfo:FC<tClientInfo> = ({ client: {name, email, phone} }) => {
    return (
        <>
            <h5 className='mt-5'>Client Information</h5>
            <ul className='list-group'>
                <li className='list-group-item'>
                    <FaIdBadge className='icon' /> {name}
                </li>
                <li className='list-group-item'>
                    <FaEnvelope className='icon' /> {email}
                </li>
                <li className='list-group-item'>
                    <FaPhone className='icon' /> {phone}
                </li>
            </ul>
        </>
    );
}

export default ClientInfo
