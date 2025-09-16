import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import ProjectScreen from '../src/screens/project/ProjectScreen';
import * as FS from 'firebase/firestore';

test('ajoute un projet', async () => {
  jest.spyOn(FS, 'addDoc').mockResolvedValueOnce({ id: 'p1' });
  const { getByPlaceholderText, getByText } = render(<ProjectScreen navigation={{ navigate: jest.fn() }} />);
  fireEvent.changeText(getByPlaceholderText('Nouveau projet'), 'Mon Projet');
  fireEvent.press(getByText('Ajouter Projet'));
  await waitFor(() => expect(FS.addDoc).toHaveBeenCalled());
});
