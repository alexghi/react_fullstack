const express = require('express');
const router = express.Router();

// Route to get all students
router.get('/students', async (req, res, next) => {
  try {
    const [rows] = await req.db.query('SELECT * FROM students ORDER BY name');
    res.json(rows);
  } catch (err) {
    next(err);
  }
});

// Route to get a specific student by ID
router.get('/students/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const [rows] = await req.db.query('SELECT * FROM students WHERE id = ?', [id]);
    
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Student not found' });
    }
    
    res.json(rows[0]);
  } catch (err) {
    next(err);
  }
});

// Route to get all homework assignments
router.get('/homework', async (req, res, next) => {
  try {
    const [rows] = await req.db.query('SELECT * FROM homework ORDER BY due_date');
    res.json(rows);
  } catch (err) {
    next(err);
  }
});

// Route to get a specific homework by ID
router.get('/homework/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const [rows] = await req.db.query('SELECT * FROM homework WHERE id = ?', [id]);
    
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Homework not found' });
    }
    
    res.json(rows[0]);
  } catch (err) {
    next(err);
  }
});

// Route to get all homework for a specific student
router.get('/students/:id/homework', async (req, res, next) => {
  try {
    const { id } = req.params;
    
    // First check if student exists
    const [studentRows] = await req.db.query('SELECT id FROM students WHERE id = ?', [id]);
    if (studentRows.length === 0) {
      return res.status(404).json({ error: 'Student not found' });
    }
    
    // Get all homework with status for this student
    const [rows] = await req.db.query(`
      SELECT h.id, h.title, h.description, h.due_date, 
             sh.status, sh.grade, sh.submission_date
      FROM homework h
      JOIN student_homework sh ON h.id = sh.homework_id
      WHERE sh.student_id = ?
      ORDER BY h.due_date
    `, [id]);
    
    res.json(rows);
  } catch (err) {
    next(err);
  }
});

// Route to update homework status for a student
router.put('/students/:studentId/homework/:homeworkId', async (req, res, next) => {
  try {
    const { studentId, homeworkId } = req.params;
    const { status, grade } = req.body;
    
    // Update the homework status
    const [result] = await req.db.query(`
      UPDATE student_homework
      SET status = ?, 
          grade = ?,
          submission_date = CASE WHEN ? = 'completed' AND submission_date IS NULL THEN NOW() ELSE submission_date END
      WHERE student_id = ? AND homework_id = ?
    `, [status, grade, status, studentId, homeworkId]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Student homework assignment not found' });
    }
    
    // Get the updated record
    const [rows] = await req.db.query(
      'SELECT * FROM student_homework WHERE student_id = ? AND homework_id = ?',
      [studentId, homeworkId]
    );
    
    res.json(rows[0]);
  } catch (err) {
    next(err);
  }
});

module.exports = router;