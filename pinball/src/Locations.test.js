import React from 'react';
import { render, screen } from '@testing-library/react';
import Locations from './Locations';

test('renders list items in Locations component', () => {
  const mockLocations = [{ name: 'Location 1' }, { name: 'Location 2' }];
  render(<Locations locations={mockLocations} />);

  const listItems = screen.getAllByRole('listitem');
  expect(listItems.length).toBe(mockLocations.length);
});
