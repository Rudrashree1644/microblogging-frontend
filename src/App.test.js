import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Continue with Google button', () => {
  render(<App />);
  const buttonElement = screen.getByText(/continue with google/i);
  expect(buttonElement).toBeInTheDocument();
});
