import { render, screen } from '@testing-library/react';
import App from './App';

test('renders main page correctly', () => {
  render(<App />);
  const linkElement = screen.getByText(/George Ivanov/i);
  expect(linkElement).toBeInTheDocument();
});
