// import React from 'react';
// import '@testing-library/jest-dom/extend-expect';
// import { render, fireEvent, waitFor } from '@testing-library/react';
// import Register from '../Register';

// // Mocking react-redux useDispatch
// jest.mock('react-redux', () => ({
//   ...jest.requireActual('react-redux'),
//   useDispatch: jest.fn(),
// }));

// describe('<Register />', () => {
//   test('renders the component', () => {
//     const { getByText, getByLabelText } = render(<Register />);
    
//     expect(getByText('Sign up')).toBeInTheDocument();
//     expect(getByLabelText('First Name')).toBeInTheDocument();
//     expect(getByLabelText('Email Address')).toBeInTheDocument();
//     expect(getByLabelText('Password')).toBeInTheDocument();
//     expect(getByLabelText('Confirm Password')).toBeInTheDocument();
//     expect(getByText('Sign Up')).toBeInTheDocument();
//   });

//   test('submits the form with valid data', async () => {
//     const { getByLabelText, getByText } = render(<Register />);

//     fireEvent.change(getByLabelText('First Name'), { target: { value: 'John' } });
//     fireEvent.change(getByLabelText('Email Address'), { target: { value: 'john@example.com' } });
//     fireEvent.change(getByLabelText('Password'), { target: { value: 'password123' } });
//     fireEvent.change(getByLabelText('Confirm Password'), { target: { value: 'password123' } });

//     fireEvent.submit(getByText('Register'));

//     // You may want to mock useDispatch to check if it's called correctly
//     // Here we'll just check if the submit action is triggered successfully
//     await waitFor(() => {
//       expect(mockDispatch).toHaveBeenCalledWith(expect.any(Function));
//     });
//   });

//   test('displays validation errors for required fields', async () => {
//     const { getByLabelText, getByText } = render(<Register />);

//     fireEvent.change(getByLabelText('First Name'), { target: { value: '' } });
//     fireEvent.change(getByLabelText('Email Address'), { target: { value: '' } });
//     fireEvent.change(getByLabelText('Password'), { target: { value: '' } });
//     fireEvent.change(getByLabelText('Confirm Password'), { target: { value: '' } });

//     fireEvent.blur(getByLabelText('First Name'));
//     fireEvent.blur(getByLabelText('Email Address'));
//     fireEvent.blur(getByLabelText('Password'));
//     fireEvent.blur(getByLabelText('Confirm Password'));

//     expect(getByText('This field is required')).toBeInTheDocument();
//     // More assertions for other fields...
//   });

//   // Add more test cases for other scenarios as needed
// });
