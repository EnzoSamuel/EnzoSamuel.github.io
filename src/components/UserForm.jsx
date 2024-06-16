import React, { useState } from 'react';

const UserForm = ({ addUser }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

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

        const newUser = { name, email };
        addUser(newUser);
        setName('');
        setEmail('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Nombre:
                <input type="text" value={name} onChange={(event) => setName(event.target.value)} />
            </label>
            {nameError && <p style={{ color: 'red' }}>{nameError}</p>}
            <label>
                Email:
                <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
            </label>
            <button type="submit" className="btn-add-user">Agregar usuario</button>
        </form>
    );
};

export default UserForm;