# Phonebook

A basic react web phonebook application to add, filter, update, delete persons from a MongoDB server, built with Express.js and Node.js. The app is deployed on Render, and can be tested [here](https://phonebook-backend-1rqy.onrender.com/).

<img src="dist/app.jpg" alt="Phonebook Web Application" width="1200px" height="auto" />

# Frontend

## Filter Persons

Persons in the phonebook can be filtered by name in a case-insensitive manner.
<img src="dist/app_filter.jpg" alt="Phonebook Filter Function" width="1200px" height="auto" />

## Non-persistent Notifications for New Person Submissions

**Errors:**

- Empty name field
- Empty number field
- Both name and number field empty
- Name with less than 3 characters
- Number with less than 8 digits, and not following the format of {2 or 3 digits}-{remaining digits} e.g. 082-012345

<img src="dist/error_notification.jpg" alt="Phonebook Error Notification" width="1200px" height="auto" />

**Success:**

- Add new person
- Name exists in phonebook -> Window confirmation to update number for existing person -> Update number
- Delete persons

<img src="dist/success_notification.jpg" alt="Phonebook Success Notification" width="1200px" height="auto" />

# Backend

The backend server was initially a Express.js server, then recoded to connect to a MongoDB database.

## Information
<img src="dist/backend-info.jpg" alt="Phonebook Backend Information" width="400px" height="auto" />

## Resources
<img src="dist/backend-persons.jpg" alt="Phonebook Backend Persons" width="400px" height="auto" />

Single resource can be located by id.

<img src="dist/backend-persons-1.jpg" alt="Phonebook Backend Persons by Id" width="400px" height="auto" />
