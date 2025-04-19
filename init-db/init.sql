-- Create students table
CREATE TABLE IF NOT EXISTS students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL
);

-- Create homework table
CREATE TABLE IF NOT EXISTS homework (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    due_date DATE
);

-- Create student_homework table for relationships
CREATE TABLE IF NOT EXISTS student_homework (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT,
    homework_id INT,
    status VARCHAR(20) DEFAULT 'assigned',
    grade INT,
    submission_date DATETIME,
    UNIQUE(student_id, homework_id),
    FOREIGN KEY (student_id) REFERENCES students(id),
    FOREIGN KEY (homework_id) REFERENCES homework(id)
);

-- Insert students data
INSERT INTO students (name, email) VALUES
('Adrian CHISĂLIȚĂ', 'adi.chisdalita@gmail.com'),
('Alina CONSTANTIN', 'alinaconstantin1366@gmail.com'),
('Andra RUSU', 'andra.rusua@gmail.com'),
('Anton SZILAGYI', '4everlg@gmail.com'),
('Cristian ȚIC', 'cristi.tic88@gmail.com'),
('Cristiano SILVA', 'cristiano.py@gmail.com'),
('Eduard SUFRAGIU', 'sufragiu.eduard.04@gmail.com'),
('Ionela SPIRIDON', 'ionela.spiridon45@gmail.com'),
('Mario IANCU', 'mariobogdaniancu@gmail.com'),
('Oana COLCERIU', 'colceriuoana@gmail.com'),
('Patrick CRIȘAN', 'crisanpatrick@gmail.com'),
('Ramona COPACI', 'copaciramona@gmail.com'),
('Robert DENEȘ', 'denesrobertrobi@gmail.com'),
('Sergiu GHERGHEL', 'gherghelsergiu70@gmail.com'),
('Teodora CIUBUC', 'teodoraciubuc889@gmail.com'),
('Titus CRĂCIUN', 'tituscraciun@gmail.com'),
('Cristian BOGDAN', 'ccbogdan.2001@gmail.com');

-- Insert sample homework assignments
INSERT INTO homework (title, description, due_date) VALUES
('JavaScript Basics', 'Complete exercises on variables, conditionals, and loops', '2025-05-01'),
('React Components', 'Create a simple React application with at least 3 components', '2025-05-10'),
('Database Design', 'Design a database schema for an e-commerce application', '2025-05-15'),
('Node.js API', 'Build a RESTful API with Node.js and Express', '2025-05-20'),
('Full-Stack Project', 'Develop a full-stack application using the MERN stack', '2025-06-01');

-- Assign homework to all students 
INSERT INTO student_homework (student_id, homework_id, status)
SELECT s.id, h.id, 'assigned'
FROM students s
CROSS JOIN homework h;

-- Mark some homework as completed for demo purposes
UPDATE student_homework
SET status = 'completed', 
    submission_date = DATE_SUB(NOW(), INTERVAL 1 DAY),
    grade = FLOOR(RAND() * 3 + 7)  -- nota random intre 7-10
WHERE MOD((student_id + homework_id), 3) = 0;  -- marcam cateva teme ca fiind complete