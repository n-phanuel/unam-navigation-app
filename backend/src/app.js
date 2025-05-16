
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

const events = [
  { id: 1, name: "Computer Science Seminar", location: "Lab 205", time: "2025-05-15T10:30" },
  { id: 2, name: "Health Awareness Day", location: "Main Hall", time: "2025-05-16T09:00" },
  { id: 3, name: "Job Fair", location: "Auditorium", time: "2025-05-17T12:00" },
  { id: 4, name: "Engineering Workshop", location: "ENG Block A", time: "2025-05-18T14:00" },
  { id: 5, name: "Maths Exam", location: "Room 301", time: "2025-05-19T08:00" }
];

app.get('/events', (req, res) => {
  res.json(events);
});

app.get('/navigation', (req, res) => {
  const { from, to } = req.query;
  res.json({
    from,
    to,
    route: [`Start at ${from}`, `Walk straight`, `Arrive at ${to}`]
  });
});

app.listen(5000, () => console.log('Backend running on http://localhost:5000'));
