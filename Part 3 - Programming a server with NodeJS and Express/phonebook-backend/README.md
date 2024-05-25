# Phonebook

A basic react web phonebook application to add, filter, update, delete persons from an Express.js server. The app is deployed on render, and can be tested [here](https://phonebook-backend-1rqy.onrender.com/).

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
- Number exists in phonebook
- Number contains characters other than digits [0-9], dash [-], plus [+] and parentheses [()]

<img src="dist/error_notification.jpg" alt="Phonebook Error Notification" width="1200px" height="auto" />

**Success:**

- Add new person
- Name exists in phonebook -> Update number for existing person
- Delete persons

<img src="dist/success_notification.jpg" alt="Phonebook Success Notification" width="1200px" height="auto" />

# Backend

The backend server is built with Express.js.

## Information
<img src="dist/backend-info.jpg" alt="Phonebook Backend Information" width="400px" height="auto" />

## Resources
<img src="dist/backend-persons.jpg" alt="Phonebook Backend Persons" width="400px" height="auto" />

Single resource can be located by id.

<img src="dist/backend-persons-1.jpg" alt="Phonebook Backend Persons by Id" width="400px" height="auto" />
