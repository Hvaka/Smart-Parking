# Smart Parking System - Enterprise Version

A simple smart parking enterprise app with:
- Employee / owner login
- Vehicle entry and exit flows
- Active vehicle dashboard
- Parking records and report export
- React frontend and Express backend

## Prerequisites

- Node.js 18+ installed
- npm installed
- Optional: MongoDB running locally on `mongodb://127.0.0.1:27017` or a MongoDB Atlas URI

## Backend Setup

### macOS / Linux

1. Open Terminal.
2. Navigate to the server folder:

```bash
cd /Users/mac/Downloads/smart-parking-enterprise/server
```

3. Install backend dependencies:

```bash
npm install
```

4. Create a `.env` file if you want to use MongoDB Atlas or a custom URI.

Example `.env`:

```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster-name.mongodb.net/parking
PORT=5000
```

5. Start the backend server:

```bash
npm start
```

### Windows (PowerShell or Command Prompt)

1. Open PowerShell or Command Prompt.
2. Navigate to the server folder:

```powershell
cd C:\Users\<YourUser>\Downloads\smart-parking-enterprise\server
```

3. Install backend dependencies:

```powershell
npm install
```

4. Create a `.env` file if needed, using the same content as above.

5. Start the backend server:

```powershell
npm start
```

The backend listens on `http://localhost:5000` by default.

## Frontend Setup

### macOS / Linux

1. Open a new terminal window.
2. Navigate to the client folder:

```bash
cd /Users/mac/Downloads/smart-parking-enterprise/client
```

3. Install frontend dependencies:

```bash
npm install
```

4. Start the Vite development server:

```bash
npm run dev
```

### Windows (PowerShell or Command Prompt)

1. Open PowerShell or Command Prompt.
2. Navigate to the client folder:

```powershell
cd C:\Users\<YourUser>\Downloads\smart-parking-enterprise\client
```

3. Install frontend dependencies:

```powershell
npm install
```

4. Start the Vite development server:

```powershell
npm run dev
```

The UI should open at `http://localhost:5173/` by default. If port `5173` is already in use, Vite will choose the next available port (for example `5174`).

## Login Credentials

Use one of these accounts:

- `admin` / `1234`
- `emp` / `1234`

## Notes

- If MongoDB is not available, the backend may use fallback/mock data for records and active vehicles.
- Make sure the backend is running before using the UI so API requests succeed.
- If you need to run both servers at once, open two separate terminals.

## Recommended Order

### macOS / Linux

```bash
cd /Users/mac/Downloads/smart-parking-enterprise/server && npm install && npm start
```

```bash
cd /Users/mac/Downloads/smart-parking-enterprise/client && npm install && npm run dev
```

### Windows

```powershell
cd C:\Users\<YourUser>\Downloads\smart-parking-enterprise\server; npm install; npm start
```

```powershell
cd C:\Users\<YourUser>\Downloads\smart-parking-enterprise\client; npm install; npm run dev
```

Then open the URL shown by Vite in your browser.

