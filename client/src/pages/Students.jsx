import React, { useState, useEffect, useContext, createContext } from "react";
import { Link } from "react-router-dom";
import { getStudents } from "../api";
import { MyContext } from "../contexts/MyContext";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const c = useContext(MyContext)

  console.log(c)

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const data = await getStudents();
        setStudents(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch students. Please try again later.");
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  if (loading) {
    return <div className="loading">Loading students...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <>
      <div className="students-page">
        <h1>Students</h1>
        <div className="card">
          <div className="card-body">
            <p>Total students: {students.length}</p>
            <div className="list-group">
              {students.map((student) => (
                <div key={student.id} className="list-group-item">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <h3>{student.name}</h3>
                      <p>{student.email}</p>
                    </div>
                    <Link
                      to={`/students/${student.id}`}
                      className="btn btn-primary"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Students;
