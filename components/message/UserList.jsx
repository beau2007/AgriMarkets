"use client"
import { useEffect, useState } from 'react';

export default function Users() {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchUsers() {
            try {
                const res = await fetch('/api/users');
                if (!res.ok) {
                    throw new Error('Erreur lors de la récupération des utilisateurs');
                }
                const data = await res.json();
                setUsers(data);
            } catch (err) {
                setError(err.message);
            }
        }

        fetchUsers();
    }, []);

    if (error) return <div>Erreur: {error}</div>;

    return (
        <div>
            <h1>Liste des utilisateurs</h1>
            <ul>
                {users.map(user => (
                    <li key={user.id}>{user.name} - {user.email}</li>
                ))}
            </ul>
        </div>
    );
}
