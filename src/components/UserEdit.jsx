import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const UserEdit = ({ updateUser }) => {
    const [user, setUser] = useState({});
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetchUserDetails();
    }, [id]);

    const fetchUserDetails = async () => {
        try {
            const response = await fetch(`https://664fc9c7ec9b4a4a602fd685.mockapi.io/Users/${id}`);
            const data = await response.json();
            setUser(data);
            setName(data.name);
            setEmail(data.email);
        } catch (error) {
            console.error('Error en la solicitud: ', error);
        }
    };

    const handleUpdate = async () => {
        let valid = true;

        if (!name.trim()) {
            setNameError('El nombre no puede estar vacío');
            valid = false;
        } else {
            setNameError('');
        }

        if (!email.includes('@')) {
            setEmailError('El email debe contener el signo "@"');
            valid = false;
        } else {
            setEmailError('');
        }

        if (!valid) return;

        try {
            const response = await fetch(`https://664fc9c7ec9b4a4a602fd685.mockapi.io/Users/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email }),
            });
            if (response.ok) {
                const updatedUser = await response.json();
                updateUser(updatedUser);
                navigate(`/users/${id}`);
            } else {
                console.error('Error al actualizar usuario');
            }
        } catch (error) {
            console.error('Error en la solicitud: ', error);
        }
    };

    return (
        <div className="details-container">
            <h1>Editar Usuario</h1>
            <label>Nombre: </label>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            {nameError && <p style={{ color: 'red' }}>{nameError}</p>}
            <br />
            <label>Email: </label>
            <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            {emailError && <p style={{ color: 'red' }}>{emailError}</p>}
            <br />
            <button onClick={handleUpdate}>Actualizar</button>
        </div>
    );
};

export default UserEdit;
