import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5002/api'
});

// API functions for students
export const getStudents = async () => {
  try {
    const response = await api.get('/students');
    return response.data;
  } catch (error) {
    console.error('Error fetching students:', error);
    throw error;
  }
};

export const getStudent = async (id) => {
  try {
    const response = await api.get(`/students/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching student ${id}:`, error);
    throw error;
  }
};

// API functions for homework
export const getHomeworks = async () => {
  try {
    const response = await api.get('/homework');
    return response.data;
  } catch (error) {
    console.error('Error fetching homeworks:', error);
    throw error;
  }
};

export const getHomework = async (id) => {
  try {
    const response = await api.get(`/homework/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching homework ${id}:`, error);
    throw error;
  }
};

// API functions for student homework
export const getStudentHomeworks = async (studentId) => {
  try {
    const response = await api.get(`/students/${studentId}/homework`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching homeworks for student ${studentId}:`, error);
    throw error;
  }
};

export const updateStudentHomework = async (studentId, homeworkId, data) => {
  try {
    const response = await api.put(`/students/${studentId}/homework/${homeworkId}`, data);
    return response.data;
  } catch (error) {
    console.error(`Error updating homework ${homeworkId} for student ${studentId}:`, error);
    throw error;
  }
};