require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');

const PORT = process.env.PORT || 3000;

const app = express();

// Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
const getName = () => {
  // Support both `name` and `NAME` as env variable keys
  return process.env.name || process.env.NAME || 'User';
};

app.get('/', (req, res) => {
  const name = getName();
  res.type('text/plain').send(`Hello ${name}!\n`);
});

app.get('/status', (req, res) => {
  res.json({ status: 'ok', pid: process.pid });
});

app.post('/echo', (req, res) => {
  const payload = req.body;
  res.json({ received: payload });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

const server = app.listen(PORT, () => {
  console.log(`Express server listening on http://localhost:${PORT}`);
});

// Graceful shutdown
const shutdown = () => {
  console.log('Shutting down server...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
  // Force exit after a timeout in case connections hang
  setTimeout(() => process.exit(1), 10_000);
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

module.exports = app; // Export for tests if needed
