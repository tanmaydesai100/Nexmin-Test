import { render } from '@testing-library/react';
import App from '../App';

// Mock AppRouter
jest.mock('../router/AppRouter', () => {
  return function AppRouter() {
    return <div>App Router</div>;
  };
});

test('renders App component', () => {
  const { container } = render(<App />);
  expect(container).toBeInTheDocument();
});

