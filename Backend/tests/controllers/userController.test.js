const request = require('supertest');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../../model/db');
const app = require('../../index'); 

describe('User Authentication API', () => {
  // Mock user data for testing
  const userData = {
    username: 'testuser',
    email: 'test@example.com',
    password: 'testpassword',
  };

  // Mock JWT secret
  const mockSecret = 'todo_app_demo';

  // Mock bcrypt hash
  jest.spyOn(bcrypt, 'hash').mockImplementation((password, saltRounds, callback) => {
    callback(null, 'mockhashedpassword');
  });

  // Mock JWT sign
  jest.spyOn(jwt, 'sign').mockReturnValue('mocktoken');

  // Mock database query
  const mockDbQuery = jest.spyOn(db, 'query');

  // Test case for createUser endpoint
  describe('POST /api/user', () => {
    it('should create a new user', async () => {
      // Mock database query result (no existing user with same email)
      mockDbQuery.mockImplementation((query, values, callback) => {
        callback(null, []);
      });

      const response = await request(app)
        .post('/api/user')
        .send(userData);

      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty('message', 'User created successfully');
    });

    it('should return 409 if user with same email already exists', async () => {
      // Mock database query result (existing user with same email)
      mockDbQuery.mockImplementation((query, values, callback) => {
        callback(null, [{ email: userData.email }]);
      });

      const response = await request(app)
        .post('/api/user')
        .send(userData);

      expect(response.statusCode).toBe(409);
      expect(response.body).toHaveProperty('error', 'User with this email already exists');
    });
  });

  // Test case for login endpoint
  describe('POST /api/login', () => {
    it('should authenticate user and return token', async () => {
      // Mock database query result (user with matching email)
      mockDbQuery.mockImplementation((query, values, callback) => {
        callback(null, [{ id: 1, username: userData.username, password: 'mockhashedpassword' }]);
      });

      const response = await request(app)
        .post('/api/login')
        .send({ email: userData.email, password: userData.password });

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('token', 'mocktoken');
      expect(response.body).toHaveProperty('username', userData.username);
    });

    it('should return 401 if email or password is incorrect', async () => {
      // Mock database query result (no user with matching email)
      mockDbQuery.mockImplementation((query, values, callback) => {
        callback(null, []);
      });

      const response = await request(app)
        .post('/api/login')
        .send({ email: userData.email, password: 'wrongpassword' });

      expect(response.statusCode).toBe(401);
      expect(response.body).toHaveProperty('error', 'Invalid email or password');
    });
  });

  // Test case for refreshToken endpoint
  describe('POST /api/refresh-token', () => {
    it('should generate new token if current token has expired', async () => {
      // Mock JWT verify to return expired token
      jest.spyOn(jwt, 'verify').mockImplementation((token, secret, callback) => {
        callback(null, { userId: 1, exp: Date.now() / 1000 - 100 }); // Token expired 100 seconds ago
      });

      const response = await request(app)
        .post('/api/refresh-token')
        .send({ token: 'expiredtoken' });

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('token', 'mocktoken');
    });

    it('should return 400 if token has not expired yet', async () => {
      // Mock JWT verify to return token that has not expired yet
      jest.spyOn(jwt, 'verify').mockImplementation((token, secret, callback) => {
        callback(null, { userId: 1, exp: Date.now() / 1000 + 100 }); // Token expires in 100 seconds
      });

      const response = await request(app)
        .post('/api/refresh-token')
        .send({ token: 'validtoken' });

      expect(response.statusCode).toBe(400);
      expect(response.body).toHaveProperty('error', 'Token has not expired yet');
    });

    it('should return 401 if token is invalid', async () => {
      // Mock JWT verify to throw an error (invalid token)
      jest.spyOn(jwt, 'verify').mockImplementation(() => {
        throw new Error('Invalid token');
      });

      const response = await request(app)
        .post('/api/refresh-token')
        .send({ token: 'invalidtoken' });

      expect(response.statusCode).toBe(401);
      expect(response.body).toHaveProperty('error', 'Invalid token');
    });
  });
});
