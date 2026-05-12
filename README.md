🗄️ UserBase — Node.js + MySQL User Management App
A backend web application that connects Node.js & Express to a live MySQL database, featuring bulk fake data seeding, dynamic EJS views, and RESTful routes for managing users.


✨ Features

🏠 Home page — Displays live total user count from MySQL
👥 All Users page — Table view of every user in the database
✏️ Edit username — Update a user's username with password verification
🌱 Bulk data seeding — Insert 100+ fake users in one script using Faker.js
🔐 Password check — User must confirm current password before editing
🔄 Method Override — PATCH support via HTML forms


🛣️ REST Routes
MethodRouteDescriptionGET/Home — show total user countGET/usersList all users from DBGET/user/:id/editShow edit form for a userPATCH/user/:idUpdate username (with password verify)

🗂️ Project Structure
userbase/
│
├── views/
│   ├── home.ejs            # Total user count
│   ├── showusers.ejs       # All users table
│   └── edit.ejs            # Edit username form
│
├── index.js                # Express app + all routes
├── initDB.js               # Bulk fake data seed script
└── package.json

🛠️ Built With
TechnologyUsageNode.jsRuntime environmentExpress.jsWeb framework & routingMySQL2MySQL database driver for NodeEJSServer-side templatingFaker.jsFake user data generationmethod-overridePATCH via HTML formspathCross-platform path resolution

🧠 Concepts Covered

Connecting Node.js to MySQL using mysql2
Running raw SQL queries from Express routes (SELECT, INSERT, UPDATE)
Bulk INSERT with parameterized queries to prevent injection
Fake data seeding with @faker-js/faker
req.params & req.body for route-level data
Password verification before allowing DB updates
EJS templating with loops (<% for...of %>) for dynamic tables
POST-redirect-GET pattern with res.redirect()


🚀 Getting Started
1. Clone the repo
2. Install dependencies
bashnpm install
3. Set up MySQL
Open MySQL CLI and run:
sqlCREATE DATABASE delta_app;
USE delta_app;

CREATE TABLE user (
  id VARCHAR(100) PRIMARY KEY,
  username VARCHAR(50),
  email VARCHAR(100),
  password VARCHAR(100)
);
4. Update DB credentials
In both index.js and initDB.js, update:
jsconst connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'delta_app',
  password: 'your_password'  // ← change this
});
5. Seed fake data
bashnode initDB.js
6. Start the server
bashnode index.js
7. Open in browser
http://localhost:8080

⚠️ Important Notes

Passwords are stored as plain text — this is a learning project only. Use bcrypt for real apps.
SQL queries use string interpolation for simplicity — switch to prepared statements for production to prevent SQL injection.
Data persists in MySQL even after server restart — unlike the in-memory array approach in previous projects.


🔮 Future Improvements

 Add bcrypt password hashing
 Switch to prepared statements / parameterized queries
 Add user registration & login (sessions/JWT)
 Add DELETE route for removing users
 Style UI with CSS / Bootstrap
 Deploy with Railway + PlanetScale

Made with ❤️ by Rishav Raj
