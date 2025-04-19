import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getHomework, getStudents, getStudentHomeworks } from '../api';

const HomeworkDetail = () => {
  const { id } = useParams();
  const [homework, setHomework] = useState(null);
  const [students, setStudents] = useState([]);
  const [studentHomeworks, setStudentHomeworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const homeworkData = await getHomework(id);
        setHomework(homeworkData);
        
        const studentsData = await getStudents();
        setStudents(studentsData);
        
        // Get the status of this homework for all students
        // For a real app, we'd have an endpoint to get this directly
        // Here we'll fetch for each student and combine
        const studentHomeworkPromises = studentsData.map(async (student) => {
          try {
            const homeworks = await getStudentHomeworks(student.id);
            const thisHomework = homeworks.find(hw => hw.id.toString() === id);
            return {
              studentId: student.id,
              studentName: student.name,
              ...thisHomework
            };
          } catch (err) {
            console.error(`Error fetching homework for student ${student.id}:`, err);
            return null;
          }
        });
        
        const results = await Promise.all(studentHomeworkPromises);
        setStudentHomeworks(results.filter(Boolean));
        
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch homework details. Please try again later.');
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <div className="loading">Loading homework details...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!homework) {
    return <div className="not-found">Homework not found</div>;
  }

  // Calculate completion statistics
  const totalStudents = studentHomeworks.length;
  const completedCount = studentHomeworks.filter(sh => sh.status === 'completed').length;
  const inProgressCount = studentHomeworks.filter(sh => sh.status === 'in-progress').length;
  const notStartedCount = totalStudents - completedCount - inProgressCount;
  
  // Calculate average grade for completed assignments
  const completedWithGrades = studentHomeworks.filter(sh => sh.grade && sh.status === 'completed');
  const averageGrade = completedWithGrades.length 
    ? Math.round(completedWithGrades.reduce((sum, sh) => sum + sh.grade, 0) / completedWithGrades.length) 
    : 'N/A';

  return (
    <div className="homework-detail-page">
      <div className="card">
        <div className="card-header">
          <h1>{homework.title}</h1>
        </div>
        <div className="card-body">
          <p>{homework.description}</p>
          <p>
            <strong>Due Date:</strong> {new Date(homework.due_date).toLocaleDateString()}
          </p>
          
          <div style={{ marginTop: '2rem' }}>
            <h2>Completion Status</h2>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
              <div className="card" style={{ flex: 1, padding: '1rem', textAlign: 'center' }}>
                <h3>{completedCount}</h3>
                <p>Completed</p>
              </div>
              <div className="card" style={{ flex: 1, padding: '1rem', textAlign: 'center' }}>
                <h3>{inProgressCount}</h3>
                <p>In Progress</p>
              </div>
              <div className="card" style={{ flex: 1, padding: '1rem', textAlign: 'center' }}>
                <h3>{notStartedCount}</h3>
                <p>Not Started</p>
              </div>
              <div className="card" style={{ flex: 1, padding: '1rem', textAlign: 'center' }}>
                <h3>{averageGrade}</h3>
                <p>Average Grade</p>
              </div>
            </div>
          </div>
          
          <div style={{ marginTop: '2rem' }}>
            <h2>Student Progress</h2>
            <table className="table">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Status</th>
                  <th>Submission Date</th>
                  <th>Grade</th>
                </tr>
              </thead>
              <tbody>
                {studentHomeworks.map((sh) => (
                  <tr key={sh.studentId}>
                    <td>
                      <Link to={`/students/${sh.studentId}`} className="list-item-link">
                        {sh.studentName}
                      </Link>
                    </td>
                    <td>
                      <span className={`badge ${
                        sh.status === 'completed' ? 'badge-success' : 
                        sh.status === 'in-progress' ? 'badge-warning' : 'badge-primary'
                      }`}>
                        {sh.status}
                      </span>
                    </td>
                    <td>
                      {sh.submission_date 
                        ? new Date(sh.submission_date).toLocaleDateString() 
                        : 'Not submitted'}
                    </td>
                    <td>{sh.grade || 'Not graded'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div style={{ marginTop: '2rem' }}>
            <Link to="/homeworks" className="btn btn-primary">
              Back to All Homeworks
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeworkDetail;