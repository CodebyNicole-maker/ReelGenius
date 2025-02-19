import Auth from '../utils/auth';

const retrieveUser = async (userId: number) => {
  try {
    const response = await fetch(`/api/users/${userId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Auth.getToken()}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error('Invalid user API response, check network tab!');
    }

    return data;
  } catch (err) {
    console.log('Error from data retrieval:', err);
    return null; // Return null if there's an error
  }
};

export { retrieveUser };
