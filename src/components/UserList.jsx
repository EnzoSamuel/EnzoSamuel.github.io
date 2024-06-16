import React from 'react';
import { Link } from 'react-router-dom';

const UserList = ({ users }) => {
    return (
        <ul>
            {users.map((user, index) => (
                <li key={index}>
                    {user.name} - {user.email}
                    <Link className="btn-link violet" to={`/users/${user.id}`}>Ver Detalles</Link>
                    <Link className="btn-link violet" to={`/edit/${user.id}`}>Editar</Link>
                    <Link className="btn-link red" to={`/delete/${user.id}`}>Eliminar</Link>
                </li>
            ))}
        </ul>
    );
};

export default UserList;