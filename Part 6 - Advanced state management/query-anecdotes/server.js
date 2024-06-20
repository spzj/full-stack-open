import jsonServer from 'json-server';

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

const validator = (request, response, next) => {
  console.log();

  const { content } = request.body;
  const minLength = 5;
  if (request.method === 'POST' && (!content || content.length <  minLength)) {
    return response.status(400).json({
      error: `anecdotes must have at least ${ minLength} characters`,
    });
  } else {
    next();
  }
};

server.use(middlewares);
server.use(jsonServer.bodyParser);
server.use(validator);
server.use(router);

server.listen(3001, () => {
  console.log('JSON Server is running');
});
