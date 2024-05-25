const express = require("express");
const morgan = require("morgan");

const app = express();

app.use(express.json()); // Middleware to parse JSON data

const logger = morgan(function (tokens, req, res) {
  // default tiny format
  const items = [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, "content-length"),
    "-",
    tokens["response-time"](req, res),
    "ms",
  ].join(" ");

  return items + (req.method === "POST" ? ` ${JSON.stringify(req.body)}` : "");
});

app.use(logger); // Middleware to log requests

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/info", (request, response) => {
  response.send(
    "<p>Phonebook has info for " +
      persons.length +
      " people</p>" +
      "<p>" +
      new Date() +
      "</p>"
  );
});

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((p) => p.id === id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).end(); // 404 Not Found
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);

  response.status(204).end(); // 204 No Content
});

const generateId = () => {
  const randomId = Math.floor(Math.random() * 1000000);
  return randomId;
};

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.name || !body.number) {
    // 400 Bad Request
    return response.status(400).json({
      error: "name and/or number missing.",
    });
  }

  if (persons.find((p) => p.name === body.name)) {
    return response.status(400).json({
      error: "name already exists in the phonebook.",
    });
  }

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number,
  };

  persons = persons.concat(person);
  response.json(person);
});

const PORT = 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
