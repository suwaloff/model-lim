import { render, screen } from '@testing-library/react';
import { fireEvent } from '@testing-library/dom';
import { Sidebar } from './Sidebar';

describe('Sidebar', () => {
  test('render sidebar ', () => {
    render(<Sidebar />);
    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
  });

  test('check toggle', () => {
    render(<Sidebar />);
    const btn = screen.getByTestId('btn-collapsed');
    expect(screen.getByTestId('sidebar')).not.toHaveClass('collapsed');
    fireEvent.click(btn);
    expect(screen.getByTestId('sidebar')).toHaveClass('collapsed');
    fireEvent.click(btn);
    expect(screen.getByTestId('sidebar')).not.toHaveClass('collapsed');
  });
});
