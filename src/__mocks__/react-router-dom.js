const React = require('react');

const mockNavigate = jest.fn();

module.exports = {
  BrowserRouter: ({ children }) => React.createElement('div', null, children),
  MemoryRouter: ({ children }) => React.createElement('div', null, children),
  Link: ({ to, children, ...props }) => React.createElement('a', { href: to, ...props }, children),
  Navigate: ({ to }) => React.createElement('div', { 'data-testid': 'navigate', 'data-to': to }),
  useNavigate: () => mockNavigate,
  mockNavigate,
};

