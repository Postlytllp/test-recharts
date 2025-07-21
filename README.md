# test-recharts

This example demonstrates a simple full stack app that retrieves Recharts JSX snippets from MongoDB and renders them in the browser.

## Setup

1. **Install dependencies**

   ```bash
   # Backend
   npm install express mongodb cors

   # Frontend
   cd client
   npm install
   ```

2. **Run the backend**

   ```bash
   node server.js
   ```

3. **Run the frontend**

   ```bash
   cd client
   npm start
   ```

The React app fetches a snippet from the `/api/snippet/:name` endpoint and displays it using `react-live`.
