# Phonebook

A basic react web phonebook application to add, filter, update, delete persons from a json-server.

<img src="public/app.jpg" alt="Phonebook Web Application" width="1200px" height="auto" />

## Filter Persons

Persons in the phonebook can be filtered by name in a case-insensitive manner.
<img src="public/app_filter.jpg" alt="Phonebook Filter Function" width="1200px" height="auto" />

## Non-persistent Notifications for New Person Submissions

**Errors:**

- Empty name field
- Empty number field
- Both name and number field empty
- Number exists in phonebook
- Number contains characters other than digits [0-9], dash [-], plus [+] and parentheses [()]

<img src="public/error_notification.jpg" alt="Phonebook Error Notification" width="1200px" height="auto" />

**Success:**

- Add new person
- Name exists in phonebook -> Update number for existing person
- Delete persons

<img src="public/success_notification.jpg" alt="Phonebook Success Notification" width="1200px" height="auto" />
