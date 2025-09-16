import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import TaskScreen from '../src/screens/project/TaskScreen';
import * as FS from 'firebase/firestore';

test('ajoute une tâche', async () => {
  jest.spyOn(FS, 'addDoc').mockResolvedValueOnce({ id: 't1' });
  const route = { params: { projectId: 'p1' } };
  const { getByPlaceholderText, getByText } = render(<TaskScreen route={route} navigation={{ navigate: jest.fn() }} />);
  fireEvent.changeText(getByPlaceholderText('Nouvelle tâche... (ex: XTO-Add features)'), 'Tâche A');
  fireEvent.changeText(getByPlaceholderText('Description de la tâche...'), 'Desc');
  fireEvent.press(getByText(/Ajouter une tâche/i));
  await waitFor(() => expect(FS.addDoc).toHaveBeenCalled(), { timeout: 3000 });
});
