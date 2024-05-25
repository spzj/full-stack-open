require("dotenv").config();

const cors = require("cors");
const express = require("express");
const morgan = require("morgan");

const Person = require("./models/person");

const app = express();
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

app.use(cors()); // Middleware to allow cross-origin requests
app.use(express.json()); // Middleware to parse JSON data
app.use(express.static("dist")); // Middleware to serve static files from dist directory
app.use(logger); // Middleware to log requests

// app.get("/info", (request, response) => {
//   response.send(
//     "<p>Phonebook has info for " +
//       persons.length +
//       " people</p>" +
//       "<p>" +
//       new Date() +
//       "</p>"
//   );
// });

app.get("/api/persons", (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

app.get("/api/persons/:id", (request, response) => {
  Person.findById(request.params.id).then((person) => {
    response.json(person);
  });
});

// app.delete("/api/persons/:id", (request, response) => {
//   const id = Number(request.params.id);
//   persons = persons.filter((person) => person.id !== id);

//   response.status(204).end(); // 204 No Content
// });

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.name || !body.number) {
    // 400 Bad Request
    return response.status(400).json({ error: "name or number missing" });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save().then((savedPerson) => {
    response.json(savedPerson);
  });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
