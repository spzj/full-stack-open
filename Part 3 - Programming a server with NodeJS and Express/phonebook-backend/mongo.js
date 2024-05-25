const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const databaseName = "phonebook";
const password = encodeURIComponent(process.argv[2]);
const url = `mongodb+srv://admin:${password}@main.wtubw9d.mongodb.net/${databaseName}?retryWrites=true&w=majority&appName=main`;

const name = process.argv[3];
const number = process.argv[4];

mongoose.set("strictQuery", false);

mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

if (name && number) {
  const person = new Person({
    name: name,
    number: number,
  });

  person.save().then((result) => {
    console.log(`added ${name} number ${number} to phonebook`);
    mongoose.connection.close();
  });
} else {
  Person.find({}).then((result) => {
    console.log("phonebook:")
    result.forEach((p) => {
      console.log(`${p.name} ${p.number}`);
    });
    mongoose.connection.close();
  });
}
