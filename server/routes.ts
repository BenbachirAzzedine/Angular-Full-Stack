import * as express from 'express';

import CatController from './controllers/CatController';
import DogController from './controllers/DogController';
import UserController from './controllers/UserController';
// import cat from './models/cat';
// import dog from './models/dog';
// import user from './models/user';

export default function routes(app) {

  const router = express.Router();

  const cat = new CatController();
  const dog = new DogController();
  const user = new UserController();

  // cats
  router.route('/cats').get(cat.getAll);
  router.route('/cats/count').get(cat.count);
  router.route('/cat').post(cat.insert);
  router.route('/cat/:id').get(cat.get);
  router.route('/cat/:id').put(cat.update);
  router.route('/cat/:id').delete(cat.delete);

  // dogs
  router.route('/dogs').get(dog.getAll);
  router.route('/dogs/count').get(dog.count);
  router.route('/dog').post(dog.insert);
  router.route('/dog/:id').get(dog.get);
  router.route('/dog/:id').put(dog.update);
  router.route('/dog/:id').delete(dog.delete);

  // users
  router.route('/login').post(user.login);
  router.route('/users').get(user.getAll);
  router.route('/users/count').get(user.count);
  router.route('/user').post(user.insert);
  router.route('/user/:id').get(user.get);
  router.route('/user/:id').put(user.update);
  router.route('/user/:id').delete(user.delete);

  // Apply the routes to our application with the prefix /api
  app.use('/api', router);

}
