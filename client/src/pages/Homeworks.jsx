import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getHomeworks } from '../api';

const Homeworks = () => {
  const [homeworks, setHomeworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHomeworks = async () => {
      try {
        const data = await getHomeworks();
        setHomeworks(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch homeworks. Please try again later.');
        setLoading(false);
      }
    };

    fetchHomeworks();
  }, []);

  if (loading) {
    return <div className="loading">Loading homeworks...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="homeworks-page">
      <h1>Homeworks</h1>
      <div className="card">
        <div className="card-body">
          <p>Total homeworks: {homeworks.length}</p>
          <div className="list-group">
            {homeworks.map((homework) => (
              <div key={homework.id} className="list-group-item">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h3>{homework.title}</h3>
                    <p>{homework.description}</p>
                    <p>
                      <strong>Due Date:</strong>{' '}
                      {new Date(homework.due_date).toLocaleDateString()}
                    </p>
                  </div>
                  <Link to={`/homeworks/${homework.id}`} className="btn btn-primary">
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homeworks;