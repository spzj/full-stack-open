# full-stack-open

A monorepository of react web applications developed during the University of Helsinki's online self-paced web development course, [Full Stack Open][FSO]. 


As the applications are hosted on [Render]'s free instance that spins down after 15 minutes of inactivity, it might take a few minutes for the service to spin back up to view the demos. The screenshots of the applications can be found in the README linked in the repositories below.

| Project | Description | Repository | Demo |
|:--------|:-------|:-----------|:-----|
| Bloglist | Create, Read, Update and Delete blogs with token-based authorisation for users. MERN stack. | [Frontend][B-FE], [Backend][B-B] | [Demo][B-D] |
| Phonebook | Search, Create, Read, Update and Delete contacts. MERN stack. | [Frontend][PB-FE], [Backend][PB-BE] | [Demo][PB-D] |
| Countries | Search for a country's information and 3-day weather forecast, fetched from REST APIs. | [Frontend][C-FE], [Backend][C-BE] | [Demo][C-D]|
| Anecdotes | View and vote for random software engineering anecdotes. | [Code][A-C] | |

## Tech Stack

<a href="https://www.javascript.com/" title="JavaScript"><img src="public/JavaScript.svg" height="36" width="auto" /></a>
<a href="https://reactjs.org/" title="React"><img src="public/React.svg" height="36" width="auto" /></a>
<a href="https://developer.mozilla.org/en-US/docs/Glossary/HTML5" title="HTML5"><img src="public/HTML5.svg" height="36" width="auto" /></a>
<a href="https://developer.mozilla.org/en-US/docs/Web/CSS/" title="CSS3"><img src="public/CSS3.svg" height="36" width="auto" /></a>
<a href="https://tailwindcss.com/" title="Tailwind CSS"><img src="public/Tailwind CSS.svg" height="36" width="auto" /></a>
<a href="https://git-scm.com/" title="Git"><img src="public/Git.svg" height="36" width="auto" /></a>
<a href="https://www.mongodb.com/" title="MongoDB"><img src="public/MongoDB.svg" height="36" width="auto" /></a>

<a href="https://vitejs.dev/" title="Vite.js"><img src="public/Vite.js.svg" height="36" width="auto" /></a>
<a href="https://nodejs.org/" title="Node.js"><img src="public/Node.js.svg" height="36" width="auto" /></a>
<a href="https://nodemon.io/" title="Nodemon"><img src="public/Nodemon.svg" height="36" width="auto" /></a>
<a href="https://expressjs.com/" title="Express"><img src="public/Express.svg" height="36" width="auto" /></a>
<a href="https://mongoosejs.com/" title="Mongoose.js"><img src="public/Mongoose.js.svg" height="36" width="auto" /></a>
<a href="https://www.postman.com/" title="Postman"><img src="public/Postman.svg" height="36" width="auto" /></a>
<a href="https://playwright.dev/" title="Playwright"><img src="public/Playwright.svg" height="36" width="auto" /></a>

## [Bloglist][B-FE]

A MERN stack application with token-based authentication to share blogs as a user, styled with CSS Modules. State management with React Query and Context, and app routing with React Router.

<img src="./public/bloglist_demo.gif" alt="Bloglist Demo">

## [Countries][C-FE]

Search for a country's information and weather forecast for the next 3 days, styled with CSS Modules.

<img src="./public/countries_demo.gif" alt="Countries Demo">

## [Phonebook][PB-FE]

A MERN stack application to manage your contacts, styled with Tailwind CSS.

<img src="./public/phonebook_demo.gif" alt="Phonebook Demo">

[A-C]: https://github.com/spzj/full-stack-open/tree/main/Part%206%20-%20Advanced%20state%20management/query-anecdotes
[B-B]: https://github.com/spzj/full-stack-open/tree/main/Part%204%20-%20Testing%20Express%20servers_user%20administration/bloglist
[B-D]: https://bloglist-7jd4.onrender.com/
[B-FE]: https://github.com/spzj/full-stack-open/tree/main/Part%207%20-%20React%20router_custom%20hooks_styling%20app%20with%20CSS%20and%20webpack/bloglist-frontend
[C-FE]: https://github.com/spzj/full-stack-open/tree/main/Part%202%20-%20Communicating%20with%20server/countries
[C-BE]: https://github.com/spzj/full-stack-open/tree/main/Part%202%20-%20Communicating%20with%20server/countries-backend
[C-D]: https://countries-c2ak.onrender.com/
[FSO]: https://fullstackopen.com/en/
[PB-FE]: https://github.com/spzj/full-stack-open/tree/main/Part%202%20-%20Communicating%20with%20server/phonebook
[PB-BE]: https://github.com/spzj/full-stack-open/tree/main/Part%203%20-%20Programming%20a%20server%20with%20NodeJS%20and%20Express/phonebook-backend
[PB-D]: https://phonebook-backend-1rqy.onrender.com
[Render]: https://render.com/
