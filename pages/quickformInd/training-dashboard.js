import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function TrainingDashboard() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('currentUser');
    if (!userData) {
      router.push('/login');
      return;
    }
    setUser(JSON.parse(userData));
  }, [router]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Training Dashboard</h1>
      <p>Welcome, <strong>{user.displayName || user.username}</strong></p>
      <div>
        {/* Add your training dashboard content here */}
        <p>This is the training dashboard page for {user.username}</p>
      </div>
    </div>
  );
}