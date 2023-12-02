import React from 'react';
import { render, screen } from '@testing-library/react';
import Input from './Input';

test('renders a button in Input component', () => {
  render(<Input />);
  const buttonElement = screen.getByRole('button');
  expect(buttonElement).toBeInTheDocument();
});
