<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Volunteer-Verse - README</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      max-width: 900px;
      margin: auto;
      padding: 20px;
      line-height: 1.6;
    }
    code {
      background: #f4f4f4;
      padding: 2px 6px;
      border-radius: 4px;
      font-family: monospace;
    }
    pre {
      background: #f4f4f4;
      padding: 10px;
      overflow-x: auto;
      border-left: 4px solid #ccc;
    }
    h1, h2 {
      color: #2c3e50;
    }
    a {
      color: #3498db;
    }
  </style>
</head>
<body>

  <h1>🌍 Volunteer-Verse</h1>

  <p><strong>Volunteer-Verse</strong> is a full-stack MERN (MongoDB, Express, React, Node.js) web application that connects volunteers with opportunities to contribute to various causes and events.</p>

  <h2>🛠️ Technologies Used</h2>
  <ul>
    <li><strong>Frontend:</strong> React</li>
    <li><strong>Backend:</strong> Node.js, Express.js</li>
    <li><strong>Database:</strong> MongoDB</li>
    <li><strong>Others:</strong> Mongoose, Axios, etc.</li>
  </ul>

  <h2>📦 Installation & Setup Guide</h2>

  <h3>1. Prerequisites</h3>
  <p>Make sure the following are installed:</p>
  <ul>
    <li><a href="https://nodejs.org/" target="_blank">Node.js</a> (v14 or later)</li>
    <li><a href="https://www.mongodb.com/try/download/community" target="_blank">MongoDB</a></li>
  </ul>

  <h3>2. Clone the Repository</h3>
  <pre>
git clone https://github.com/gunavardhanlomada/Volunteer-Verse
cd Volunteer-Verse
  </pre>

  <h3>3. Install Dependencies</h3>

  <p><strong>Frontend (Client):</strong></p>
  <pre>
cd client
npm install
  </pre>

  <p><strong>Backend (Server):</strong></p>
  <pre>
cd ../server
npm install
  </pre>

  <h3>4. Start the Application</h3>
  <p>Ensure MongoDB is running locally, then execute:</p>
  <pre>
cd ..          # Go back to project root
npm install    # Install any root-level dependencies (if any)
npm start      # Start the server
  </pre>

  <h2>🔍 Notes</h2>
  <ul>
    <li>The backend server typically runs on <code>http://localhost:5000/</code></li>
    <li>The frontend React app usually runs on <code>http://localhost:3000/</code></li>
    <li>Make sure MongoDB is running on the default port <code>27017</code> or update the MongoDB URI in the configuration.</li>
  </ul>

  <h2>🤝 Contributing</h2>
  <p>Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.</p>

  <h2>📄 License</h2>
  <p>This project is open-source and available under the <a href="https://github.com/gunavardhanlomada/Volunteer-Verse/blob/main/LICENSE" target="_blank">MIT License</a>.</p>

</body>
</html>
