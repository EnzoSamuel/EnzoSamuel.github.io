import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const UserDetails = () => {
    const [user, setUser] = useState({});
    const { id } = useParams();

    useEffect(() => {
        fetchUserDetails();
    }, [id]);

    const fetchUserDetails = async () => {
        try {
            const response = await fetch(`https://664fc9c7ec9b4a4a602fd685.mockapi.io/Users/${id}`);
            const data = await response.json();
            setUser(data);
        } catch (error) {
            console.error('Error en la solicitud: ', error);
        }
    };

    return (
        <div className="details-container">
            <h1>Detalles de Usuario</h1>
            <p>ID: {user.id}</p>
            <p>Nombre: {user.name}</p>
            <p>Email: {user.email}</p>
            <Link to={`/delete/${user.id}`} className="btn btn-delete">Eliminar Usuario</Link>
            <Link to={`/edit/${user.id}`} className="btn">Editar Usuario</Link>
            <Link to={`/`} className="btn">Volver</Link>
        </div>
    );
};

export default UserDetails;
