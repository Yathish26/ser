# Simple Node Server

This repository contains a minimal Node.js HTTP server using the built-in `http` module.

Usage

This repository now uses Express and includes middleware (helmet, cors, morgan) and example routes.

1. Install dependencies and start the server:

```bash
npm install
npm start
```

2. Verify it is running:

```bash
curl http://localhost:3000/
# Hello from Express server!

curl http://localhost:3000/status
# { "status": "ok", "pid": 12345 }

POST example (JSON echo):

```bash
curl -s -X POST http://localhost:3000/echo -H "Content-Type: application/json" -d '{"foo":"bar"}'
# { "received": { "foo": "bar" } }
```
```

Change the port by setting the `PORT` environment variable:

```bash
PORT=4000 npm start
```
