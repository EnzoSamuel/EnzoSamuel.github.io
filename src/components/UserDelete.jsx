import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const UserDelete = ({ deleteUser }) => {
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const removeUser = async () => {
            await deleteUser(id);
            navigate('/');
        };
        removeUser();
    }, [id, navigate, deleteUser]);

    return (
        <div>
            <h1>Eliminar Usuario</h1>
            <p>Eliminando usuario...</p>
        </div>
    );
};

export default UserDelete;
