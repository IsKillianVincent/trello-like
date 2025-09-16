import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import LoginScreen from '../src/screens/auth/LoginScreen';
import { signInWithEmailAndPassword } from 'firebase/auth';

test('affiche une erreur si champs vides', () => {
  const { getByText } = render(<LoginScreen navigation={{ navigate: jest.fn() }} />);
  fireEvent.press(getByText(/Se connecter/i));
  expect(getByText(/requis/i)).toBeTruthy();
});

test('login KO affiche message', async () => {
  const { getByPlaceholderText, getByText, findByText } =
    render(<LoginScreen navigation={{ navigate: jest.fn() }} />);
  fireEvent.changeText(getByPlaceholderText('Email'), 'bad@demo.io');
  fireEvent.changeText(getByPlaceholderText('Mot de passe'), 'wrong');
  fireEvent.press(getByText(/Se connecter/i));
  expect(await findByText(/Erreur lors de la connexion/i)).toBeTruthy();
});

test('login OK appelle firebase auth', async () => {
  const navigate = jest.fn();
  const { getByPlaceholderText, getByText } = render(<LoginScreen navigation={{ navigate }} />);
  fireEvent.changeText(getByPlaceholderText('Email'), 'ok@demo.io');
  fireEvent.changeText(getByPlaceholderText('Mot de passe'), 'secret');
  fireEvent.press(getByText(/Se connecter/i));
  await waitFor(() => expect(signInWithEmailAndPassword).toHaveBeenCalled());
});
