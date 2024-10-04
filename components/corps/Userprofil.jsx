import { useEffect, useState } from 'react';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('/api/users', {
          method: 'GET',
          headers: {
            'Authorization': 'YOUR_USER_ID_HERE', // Remplacez par l'ID de l'utilisateur ou un token
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setUser(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchUser();
  }, []);

  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <h2>User Profile</h2>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone}</p>
      {/* Ajoutez d'autres informations que vous souhaitez afficher */}
    </div>
  );
};

export default UserProfile;
