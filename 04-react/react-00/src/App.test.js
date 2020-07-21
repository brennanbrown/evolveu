import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  
  // screen.debug();
  const { getByText } = render(<App />);

  
  // screen.debug();



  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
