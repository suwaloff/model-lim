import { render, screen } from '@testing-library/react';
import { Button, ButtonTHeme } from './Button';

describe('Button component', () => {
  test('render button ', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  test('add theme', () => {
    render(<Button theme={ButtonTHeme.CLEAR}>Click me</Button>);
    expect(screen.getByText('Click me')).toHaveClass('clear');
  });

  test('calls onClick', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    const button = screen.getByText('Click me');
    button.click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
