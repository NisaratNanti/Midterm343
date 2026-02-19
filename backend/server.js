const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Ensure logs folder exists when running locally/container
const logsDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logsDir)) {
  try { fs.mkdirSync(logsDir, { recursive: true }); } catch (e) { }
}

function accessLog(entry) {
  const file = path.join(logsDir, 'access.log');
  const line = `[${new Date().toISOString()}] ${entry}\n`;
  try { fs.appendFileSync(file, line); } catch (e) { console.error('log error', e); }
}

app.get('/api/demo', (req, res) => {
  const payload = {
    message: 'demo',
    time: new Date().toISOString(),
    git: process.env.GIT_COMMIT || null,
    docker: !!process.env.IN_DOCKER || false
  };
  accessLog(`${req.ip} ${req.method} ${req.originalUrl}`);
  res.json(payload);
});

// error handler
app.use((err, req, res, next) => {
  console.error(err);
  accessLog(`ERROR ${err.message}`);
  res.status(500).json({ error: 'internal server error' });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
