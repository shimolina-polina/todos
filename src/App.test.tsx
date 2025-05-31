import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import { useState } from 'react';
import { vi } from 'vitest'

vi.mock('./hooks/useLocalStorage', () => ({
  __esModule: true,
  default: (_key: string, initialValue: any) => {
    const [state, setState] = useState(initialValue);
    return [state, setState];
  },
}));

describe('App', () => {
  test('добавляет новую задачу', () => {
    render(<App />);

    const input = screen.getByLabelText(/what needs to be done/i);
    fireEvent.change(input, { target: { value: 'New Task' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    expect(screen.getByText('New Task')).toBeInTheDocument();
  });

  test('переключает статус задачи', () => {
    render(<App />);
    const input = screen.getByLabelText(/what needs to be done/i);
    fireEvent.change(input, { target: { value: 'Task to toggle' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();

    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();

    fireEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });

  test('удаляет задачу', () => {
    render(<App />);
    const input = screen.getByLabelText(/what needs to be done/i);
    fireEvent.change(input, { target: { value: 'Task to delete' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    const deleteButton = screen.getByLabelText('удалить');
    fireEvent.click(deleteButton);

    expect(screen.queryByText('Task to delete')).not.toBeInTheDocument();
  });

  test('фильтрация задач', () => {
    render(<App />);
    const input = screen.getByLabelText(/what needs to be done/i);

    fireEvent.change(input, { target: { value: 'Active Task' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    expect(screen.getByText('Active Task')).toBeInTheDocument();

    fireEvent.change(input, { target: { value: 'Completed Task' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    expect(screen.getByText('Completed Task')).toBeInTheDocument();

    const checkboxes = screen.getAllByRole('checkbox');
    fireEvent.click(checkboxes[0]);

    fireEvent.click(screen.getByText('Active'));
    expect(screen.getByText('Active Task')).toBeInTheDocument();
    expect(screen.queryByText('Completed Task')).not.toBeInTheDocument();


    fireEvent.click(screen.getByText('Completed'));
    expect(screen.queryByText('Active Task')).not.toBeInTheDocument();
    expect(screen.getByText('Completed Task')).toBeInTheDocument();


    fireEvent.click(screen.getByText('All'));
    expect(screen.getByText('Active Task')).toBeInTheDocument();
    expect(screen.getByText('Completed Task')).toBeInTheDocument();
  });
});
