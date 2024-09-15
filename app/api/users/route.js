
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const res = await fetch('http://localhost:3001/api/users', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!res.ok) {
            throw new Error('Erreur lors de la récupération des utilisateurs');
        }

        const users = await res.json();
        return NextResponse.json(users, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
