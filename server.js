
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Temporary storage for helpdesk tickets
let tickets = [];
let nextId = 1;

// Check whether the backend is running
app.get("/", (req, res) => {
  res.json({ message: "Student Helpdesk API is running" });
});

// Create a new helpdesk ticket
app.post("/tickets", (req, res) => {
  const { studentName, issue, description } = req.body;

  if (!studentName || !issue || !description) {
    return res.status(400).json({
      error: "Please provide all required fields."
    });
  }

  const ticket = {
    id: nextId++,
    studentName,
    issue,
    description,
    status: "Open"
  };

  tickets.push(ticket);

  res.status(201).json({
    message: "Ticket created successfully",
    ticket
  });
});

// Get all helpdesk tickets
app.get("/tickets", (req, res) => {
  res.json(tickets);
});

app.listen(PORT, () => {
  console.log(`Helpdesk API running on port ${PORT}`);
});
