import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getStudent, getStudentHomeworks, updateStudentHomework } from '../api';

const StudentDetail = () => {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [homeworks, setHomeworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const studentData = await getStudent(id);
        setStudent(studentData);
        
        const homeworksData = await getStudentHomeworks(id);
        setHomeworks(homeworksData);
        
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch student details. Please try again later.');
        setLoading(false);
      }
    };

    fetchStudentData();
  }, [id]);

  const handleStatusChange = async (homeworkId, newStatus) => {
    try {
      await updateStudentHomework(id, homeworkId, { status: newStatus });
      
      // Update the local state to reflect the change
      setHomeworks(prevHomeworks => 
        prevHomeworks.map(hw => 
          hw.id === homeworkId ? { ...hw, status: newStatus } : hw
        )
      );
    } catch (err) {
      console.error('Error updating homework status:', err);
    }
  };

  if (loading) {
    return <div className="loading">Loading student details...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!student) {
    return <div className="not-found">Student not found</div>;
  }

  return (
    <div className="student-detail-page">
      <div className="card">
        <div className="card-header">
          <h1>{student.name}</h1>
          <p>{student.email}</p>
        </div>
        <div className="card-body">
          <h2>Assigned Homework</h2>
          
          {homeworks.length === 0 ? (
            <p>No homework assignments yet.</p>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Due Date</th>
                  <th>Status</th>
                  <th>Grade</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {homeworks.map((homework) => (
                  <tr key={homework.id}>
                    <td>
                      <Link to={`/homeworks/${homework.id}`} className="list-item-link">
                        {homework.title}
                      </Link>
                    </td>
                    <td>{new Date(homework.due_date).toLocaleDateString()}</td>
                    <td>
                      <span className={`badge ${
                        homework.status === 'completed' ? 'badge-success' : 
                        homework.status === 'in-progress' ? 'badge-warning' : 'badge-primary'
                      }`}>
                        {homework.status}
                      </span>
                    </td>
                    <td>{homework.grade || 'Not graded'}</td>
                    <td>
                      <div className="btn-group">
                        {homework.status !== 'completed' && (
                          <button 
                            className="btn btn-success"
                            onClick={() => handleStatusChange(homework.id, 'completed')}
                          >
                            Mark Completed
                          </button>
                        )}
                        {homework.status !== 'in-progress' && homework.status !== 'completed' && (
                          <button 
                            className="btn btn-warning"
                            onClick={() => handleStatusChange(homework.id, 'in-progress')}
                          >
                            Mark In Progress
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          
          <div style={{ marginTop: '2rem' }}>
            <Link to="/students" className="btn btn-primary">
              Back to All Students
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDetail;