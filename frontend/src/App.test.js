import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import '@testing-library/jest-dom/extend-expect';

describe('App component', () => {
  test('renders sign-in page by default', () => {
    render(
      <Router>
        <App />
      </Router>
    );
    expect(screen.getByText('Sign In')).toBeInTheDocument();
  });

  test('renders registration page when route is /register', () => {
    render(
      <Router initialEntries={['/register']}>
        <App />
      </Router>
    );
    expect(screen.getByText('Register')).toBeInTheDocument();
  });

  test('renders dashboard when authenticated', () => {
    // Mocking authentication
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: async () => ({ isAuthenticated: true }),
    });

    render(
      <Router initialEntries={['/dashboard']}>
        <App />
      </Router>
    );
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });

  test('redirects to sign-in page when not authenticated for private routes', () => {
    // Mocking authentication
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: async () => ({ isAuthenticated: false }),
    });

    render(
      <Router initialEntries={['/dashboard']}>
        <App />
      </Router>
    );
    expect(screen.getByText('Sign In')).toBeInTheDocument();
  });
});
