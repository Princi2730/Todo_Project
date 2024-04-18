import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Dashboard from '../Dashboard/Dashboard';
import AllTodos from '../Todos/AllTodos';
import MyTodos from '../Todos/MyTodos';

jest.mock('../Todos/AllTodos', () => jest.fn(() => <div>All Todos</div>));
jest.mock('../Todos/MyTodos', () => jest.fn(() => <div>My Todos</div>));

describe('Dashboard component', () => {
  beforeEach(() => {
    AllTodos.mockClear();
    MyTodos.mockClear();
  });

  test('renders correctly', () => {
    const { getByText } = render(<Dashboard />);
    expect(getByText('All Todos')).toBeInTheDocument();
  });

  test('switches component when selecting route', () => {
    const { getByText } = render(<Dashboard />);
    expect(getByText('All Todos')).toBeInTheDocument();

    fireEvent.click(getByText('My Todos'));
    expect(MyTodos).toHaveBeenCalledTimes(1);
    expect(getByText('My Todos')).toBeInTheDocument();
  });
});
