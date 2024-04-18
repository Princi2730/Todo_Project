import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SelectedList from './SelectedList';

describe('SelectedList component', () => {
  test('renders correctly', () => {
    const onSelectRoute = jest.fn();
    const { getByText } = render(<SelectedList onSelectRoute={onSelectRoute} />);
    expect(getByText('All Todos')).toBeInTheDocument();
    expect(getByText('My Todos')).toBeInTheDocument();
    expect(getByText('Logout')).toBeInTheDocument();
  });

  test('calls onSelectRoute with correct route when clicking on All Todos', () => {
    const onSelectRoute = jest.fn();
    const { getByText } = render(<SelectedList onSelectRoute={onSelectRoute} />);
    
    fireEvent.click(getByText('All Todos'));
    expect(onSelectRoute).toHaveBeenCalledWith('/alltodos');
  });

  test('calls onSelectRoute with correct route when clicking on My Todos', () => {
    const onSelectRoute = jest.fn();
    const { getByText } = render(<SelectedList onSelectRoute={onSelectRoute} />);
    
    fireEvent.click(getByText('My Todos'));
    expect(onSelectRoute).toHaveBeenCalledWith('/my-todos');
  });

  test('calls LogoutUser function when clicking on Logout', () => {
    const onSelectRoute = jest.fn();
    const { getByText } = render(<SelectedList onSelectRoute={onSelectRoute} />);
    
    fireEvent.click(getByText('Logout'));
    // Write your expectation here based on how the LogoutUser function is called.
    // For example, if LogoutUser calls dispatch, you can mock dispatch and check if it's called.
  });
});
