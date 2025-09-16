import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import SignInScreen from '../src/screens/auth/SignInScreen';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';

test('refuse si mots de passe différents', () => {
  const { getByPlaceholderText, getByText, getByDisplayValue, queryByText } =
    render(<SignInScreen navigation={{ navigate: jest.fn() }} />);
  fireEvent.changeText(getByPlaceholderText('Email'), 'u@demo.io');
  fireEvent.changeText(getByPlaceholderText('Mot de passe'), 'a');
  fireEvent.changeText(getByPlaceholderText('Confirmation du mot de passe'), 'b');
  fireEvent.press(getByText(/S'inscrire/i));
  expect(getByText(/incomplètes ou incorrectes/i)).toBeTruthy();
});

test('inscription OK déclenche email de vérification', async () => {
  const { getByPlaceholderText, getByText } = render(<SignInScreen navigation={{ navigate: jest.fn() }} />);
  fireEvent.changeText(getByPlaceholderText('Email'), 'u@demo.io');
  fireEvent.changeText(getByPlaceholderText('Mot de passe'), 'pwd');
  fireEvent.changeText(getByPlaceholderText('Confirmation du mot de passe'), 'pwd');
  fireEvent.press(getByText(/S'inscrire/i));
  await waitFor(() => expect(createUserWithEmailAndPassword).toHaveBeenCalled());
  expect(sendEmailVerification).toHaveBeenCalled();
});
