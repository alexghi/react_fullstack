const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mysql = require('mysql2/promise');

// Configuration
const config = {
  port: process.env.PORT || 5002,
  db: {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'student_user',
    password: process.env.DB_PASSWORD || 'student_password',
    database: process.env.DB_NAME || 'student_management',
    port: process.env.DB_PORT || 3306,
  }
};

// Database connection setup
let pool;
const initializeDB = async () => {
  try {
    pool = mysql.createPool({
      ...config.db,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });
    
    // Verify connection
    await pool.query('SELECT 1');
    console.log('✅ Database connected successfully');
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    process.exit(1); // Exit if we can't connect to the database
  }
};

// Express app setup
const setupApp = () => {
  const app = express();
  
  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(morgan('dev'));
  
  // Attach DB to requests
  app.use((req, res, next) => {
    req.db = pool;
    next();
  });

  // Basic routes
  app.get('/ping', (_, res) => res.json({ message: 'pong' }));
  
  app.get('/health', (_, res) => {
    res.json({ 
      status: 'ok',
      server: true,
      timestamp: new Date().toISOString()
    });
  });
  
  app.get('/db-health', async (_, res) => {
    try {
      await pool.query('SELECT 1');
      res.json({
        status: 'ok',
        database: true,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      res.status(503).json({
        status: 'error',
        database: false,
        message: error.message,
        timestamp: new Date().toISOString()
      });
    }
  });

  // API routes
  app.use('/api', require('./routes'));

  // Error handler
  app.use((err, req, res, next) => {
    console.error('❌ Error:', err.message);
    res.status(500).json({
      status: 'error',
      message: err.message || 'Internal server error'
    });
  });

  return app;
};

// Start server
const startServer = async () => {
  try {
    await initializeDB();
    const app = setupApp();
    
    app.listen(config.port, () => {
      console.log(`✅ Server running on port ${config.port}`);
    });

    // Graceful shutdown
    process.on('SIGINT', async () => {
      console.log('\n🛑 Shutting down gracefully...');
      await pool.end();
      console.log('✅ Database connections closed');
      process.exit(0);
    });

  } catch (error) {
    console.error('❌ Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();