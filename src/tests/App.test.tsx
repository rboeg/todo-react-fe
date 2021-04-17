import React from 'react';
import { render, screen } from '@testing-library/react';
import TasksList from '../components/TasksList';

test('renders learn react link', () => {
  render(<TasksList />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
