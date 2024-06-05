const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

const employees = [
  {
    name: "pedro",
    status: "inativo",
    role: "123",
    id: "03d2"
  }
];

app.get('/api/employees', (req, res) => {
  res.json({ employees });
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
