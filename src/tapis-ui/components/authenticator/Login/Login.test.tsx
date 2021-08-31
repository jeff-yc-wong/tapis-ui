import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import renderComponent from 'utils/testing';
import { Login } from 'tapis-ui/components/authenticator';

describe('Login', () => {
  it('renders Login component', () => {
    const { getAllByText } = renderComponent(<Login />);
    expect(getAllByText(/Username/).length).toEqual(1);
  });
});