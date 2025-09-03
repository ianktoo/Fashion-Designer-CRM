import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';

describe('App', () => {
  it('renders the login page by default for designer routes', () => {
    // The DesignerLayout redirects to /login if not authenticated.
    window.location.hash = '#/dashboard';

    render(<App />);
    
    // Since the default auth state is logged out, it should redirect to login.
    expect(screen.getByText('Designer Portal Login')).toBeInTheDocument();
  });

  it('renders the client portal page', () => {
    // Set the hash to the client portal route
    window.location.hash = '#/portal';

    render(<App />);

    expect(screen.getByText('Client Portal')).toBeInTheDocument();
    expect(screen.getByText('Enter your Client ID to manage your appointments.')).toBeInTheDocument();
  });
});
