import jwt from 'jsonwebtoken';
import { createUser, emptyUsers } from './fixture';

describe('Logout route', () => {
  let token;

  before(done => {
    app.db.sequelize.sync().then(() => {
      done();
    });
  });

  beforeEach(done => {
    createUser().then(user => {
      token = jwt.sign({ id: user.id }, app.get('jwtSecret'));
      done();
    });
  });

  afterEach(done => {
    emptyUsers().then(() => done());
  });

  it('should logout user', done => {
    request.get('/logout')
      .set('Authorization', `JWT ${token}`)
      .expect(401)
      .end(err => done(err));
  });
});
