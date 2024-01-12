import { screen } from '@testing-library/react';
import { fireEvent } from '@testing-library/dom';
import { Sidebar } from './Sidebar';
import { componentRender } from 'shared/config/tests/ComponentRender';

describe('Sidebar', () => {
  test('render sidebar ', () => {
    componentRender(<Sidebar />);
    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
  });

  test('check toggle', () => {
    componentRender(<Sidebar />);
    const btn = screen.getByTestId('btn-collapsed');
    expect(screen.getByTestId('sidebar')).not.toHaveClass('collapsed');
    fireEvent.click(btn);
    expect(screen.getByTestId('sidebar')).toHaveClass('collapsed');
    fireEvent.click(btn);
    expect(screen.getByTestId('sidebar')).not.toHaveClass('collapsed');
  });
});
