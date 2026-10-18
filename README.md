Hostel outpass system

This is our interdisciplinary project. It is a web app to manage hostel outpasses online instead of using paper slips. A student applies for an outpass, the warden approves or rejects it, and the security guard scans the QR code of the approved pass at the gate.

What it does

- Login for 3 roles: student, warden and security
- Student can apply for an outpass (reason, from date, to date) and see if it is pending, approved or rejected
- Once approved, the student gets a QR code for the pass
- Warden can see all requests, approve or reject them, and add new users
- Warden dashboard also has a pie chart of the pass status
- Security can scan the QR code with the camera and check if the pass is valid
- Every scan is saved in a log which warden and security can view

Tech used

- Frontend: React, Vite, Tailwind CSS, Axios, React Router, Recharts
- QR: qrcode.react (to make the code) and html5-qrcode (to scan it)
- Backend: Node.js, Express
- Database: MongoDB (Mongoose)
- Auth: JWT and bcryptjs

Folder structure


Client/           React frontend
  src/
    components/   ProtectedRoute, QRScanner, Sidebar
    pages/        Login, StudentDashboard, WardenDashboard, SecurityDashboard
    services/     api.js (axios setup)
server/           Express backend
  middleware/     authMiddleware.js, roleMiddleware.js
  models/         User.js, Outpass.js, Log.js
  routes/         authRoutes.js, outpassRoutes.js, userRoutes.js
  server.js


How to run it

You need Node.js and a MongoDB database (local or MongoDB Atlas).

1. Clone the repo

git clone https://github.com/adithyant24cs-hue/INTERDISCIPLINARY_PROJECT.git
cd INTERDISCIPLINARY_PROJECT

2. Install the packages for both folders

cd server
npm install
cd ../Client
npm install

3. Make a `.env` file inside the `server` folder

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=any_secret_string
PORT=1000

4. Build the frontend. The server serves the built files from `Client/dist`, so this step is needed.

cd Client
npm run build

5. Start the server

cd ../server
node server.js

Now open http://localhost:10000 in the browser.

Note: the frontend calls the API using `/api`, so it works when opened through the Express server. If you run `npm run dev` for the client, you will have to add a proxy for `/api` in `vite.config.js`.

Adding the first user

Users can only be created by a warden from the app, so the first warden has to be added manually in the database. First make a hashed password:

cd server
node -e "console.log(require('bcryptjs').hashSync('yourpassword', 10))"

Then in mongosh:
db.users.insertOne({
  studentId: "warden01",
  password: "paste the hash here",
  role: "warden"
})


After that login as the warden and create the student and security accounts from the dashboard.

API routes

Everything except login needs the token in the header (`Authorization: Bearer <token>`).

POST /api/auth/login              login (studentId, password)

POST /api/outpass/create          student   - apply for outpass
GET  /api/outpass/                student, warden - get passes
PUT  /api/outpass/approve/:id     warden    - approve
PUT  /api/outpass/reject/:id      warden    - reject
POST /api/outpass/verify          security  - verify scanned QR
GET  /api/outpass/logs            security, warden - scan logs

POST /api/users/create            warden    - create user
GET  /api/users/                  warden    - list users
```

Database

- User: studentId, password (hashed), role
- Outpass: studentId, reason, fromDate, toDate, status, qrCode, createdAt
- Log: studentId, reason, fromDate, toDate, scannedAt


Things we can add later

- Token expiry
- Make a pass invalid after it is scanned once
- Email or SMS notification when a pass is approved
- Parent approval
- Check that the dates are valid when applying
- Student details like name, room number and department

Team

- Adithya N T:adithyant24cs-hue
- Aryan Shaswat:arayan-main027Hostel
-Ashish
