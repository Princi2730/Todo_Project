import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import SignIn from './SignIn';
import { Provider } from 'react-redux';
import { store } from '../../reduxtoolkit/store';
import { fetchloginData } from '../../reduxtoolkit/loginSlice';

jest.mock('../../reduxtoolkit/loginSlice', () => ({
  fetchloginData: jest.fn(),
}));

describe('SignIn component', () => {
  test('renders sign-in form', () => {
    render(
      <Provider store={store}>
        <Router>
          <SignIn />
        </Router>
      </Provider>
    );
    expect(screen.getByLabelText('Email Address')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sign In' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Don't have an account? Sign Up/i })).toBeInTheDocument();
  });

  test('submits form with valid data', async () => {
    render(
      <Provider store={store}>
        <Router>
          <SignIn />
        </Router>
      </Provider>
    );

    fireEvent.change(screen.getByLabelText('Email Address'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } });

    fireEvent.click(screen.getByRole('button', { name: 'Sign In' }));

    await waitFor(() => expect(fetchloginData).toHaveBeenCalledWith({ email: 'test@example.com', password: 'password123' }));
  });

  test('shows error messages with invalid data', async () => {
    render(
      <Provider store={store}>
        <Router>
          <SignIn />
        </Router>
      </Provider>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Sign In' }));

    await waitFor(() => {
      expect(screen.getByText('This field is required', { exact: false })).toBeInTheDocument();
      expect(fetchloginData).not.toHaveBeenCalled();
    });
  });

  // Add more tests as needed to cover other scenarios
});