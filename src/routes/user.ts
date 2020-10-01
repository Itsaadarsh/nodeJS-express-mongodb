import express from 'express';
import User from '../models/user';
const router = express.Router();

router.get(
  '/:username/:email',
  (req: express.Request, res: express.Response, _next: express.NextFunction) => {
    const uname = req.params.username;
    const uemail = req.params.email;
    res.send(`
  <h1>User created ${uname} ${uemail}</h1>
  <form  method='POST'>
  <input type="hidden" value="${uname}" name="username">
  <input type="hidden" value="${uemail}" name="useremail">
  <button type='submit'>lets go</button>
  </form>
  `);
  }
);

router.post(
  '/:username/:email',
  async (req: express.Request, res: express.Response, _next: express.NextFunction) => {
    const username = req.body.username;
    const email = req.body.useremail;
    const user = new User(username, email);
    await user.save();
    res.redirect('/');
  }
);

export default module.exports = { router };
