import React from 'react';
import { screen, render, fireEvent, wait, getByLabelText, queryByAttribute } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

test('Test the counter', () => {

  
  // screen.debug();

  render(<App />);
  
  // screen.debug();

  const idCount = document.getElementById("idCount");
  expect(idCount).toBeTruthy();
  // screen.debug(idCount);

  const idOnCount = document.getElementById("idOnCount");
  expect(idOnCount).toBeTruthy();

  const idBad = document.getElementById("idBad");
  expect(idBad).toBeFalsy();
  
  let value = idCount.textContent;
  expect(value).toBeTruthy();
  

  fireEvent.click(idOnCount);

  // The count should have changed
  expect(idCount.textContent).not.toBe(value);
  

})

test('Test the counter', () => {

  render(<App />);

  const idOnDoStuff = document.getElementById("idOnDoStuff");
  expect(idOnDoStuff).toBeTruthy();

  const idFullName = document.getElementById("idFullName");

  const s1 = /asdf/i;

})
