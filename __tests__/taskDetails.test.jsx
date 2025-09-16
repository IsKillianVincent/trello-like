import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import TaskDetailsScreen from '../src/screens/project/TaskDetailsScreen';
import * as FS from 'firebase/firestore';

const baseProps = {
  route: { params: { projectId: 'p1', task: { id: 't1', name: 'T1', status: 'Backlog', description: '' } } },
  navigation: { goBack: jest.fn() },
};

test('met à jour la description', async () => {
  jest.spyOn(FS, 'getDoc').mockResolvedValueOnce({
    exists: () => true,
    data: () => ({ columns: ['Backlog', 'Fait'] }),
  });
  jest.spyOn(FS, 'updateDoc').mockResolvedValueOnce();

  const { getByPlaceholderText, getByText } = render(<TaskDetailsScreen {...baseProps} />);

  await waitFor(() => expect(FS.getDoc).toHaveBeenCalled());

  fireEvent.changeText(getByPlaceholderText('Modifier la description...'), 'Nouvelle desc');
  fireEvent.press(getByText('Mettre à jour la description'));

  await waitFor(() => expect(FS.updateDoc).toHaveBeenCalled());
});
