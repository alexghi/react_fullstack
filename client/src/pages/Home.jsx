import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-page">
      <div className="card">
        <div className="card-header">
          <h1>Student Management System</h1>
        </div>
        <div className="card-body">
          <p className="card-text">
            Welcome to the Student Management System! This application helps teachers and students
            manage homework assignments and track progress.
          </p>
          
          <div style={{ marginTop: '2rem' }}>
            <h2>Quick Navigation</h2>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1rem' }}>
              <Link to="/students" className="btn btn-primary">
                View Students
              </Link>
              <Link to="/homeworks" className="btn btn-primary">
                View Homeworks
              </Link>
            </div>
          </div>
          
          <div style={{ marginTop: '2rem' }}>
            <h2>Features</h2>
            <ul style={{ listStyleType: 'disc', marginLeft: '2rem' }}>
              <li>View a complete list of students</li>
              <li>Manage homework assignments</li>
              <li>Track student progress on assignments</li>
              <li>Grade completed assignments</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;