import { render, screen } from '@testing-library/react';
import LoginForm from '.';

test('renders sign in page', () => {
  render(<LoginForm />);
  const signInText = screen.getByText("Sign in");
  expect(signInText).toBeInTheDocument();
});

// Test for email validation - invalid email
test('shows error message for invalid email', async () => {
  render(<LoginForm />);

  // Get email input field and submit button
  const emailInput = screen.getByLabelText(/email address/i);
  const submitButton = screen.getByRole('button', { name: /sign in/i });

  // Input invalid email
  userEvent.type(emailInput, 'invalidemail');
  fireEvent.click(submitButton);

  // Wait for error message
  await waitFor(() => {
    expect(screen.getByText('Please enter a valid email address.')).toBeInTheDocument();
  });
});

// Test for email validation - valid email
test('does not show error for valid email', async () => {
  render(<LoginForm />);

  // Get email input field and submit button
  const emailInput = screen.getByLabelText(/email address/i);
  const submitButton = screen.getByRole('button', { name: /sign in/i });

  // Input valid email
  userEvent.type(emailInput, 'test@example.com');
  fireEvent.click(submitButton);

  // Ensure no error message is displayed
  await waitFor(() => {
    expect(screen.queryByText('Please enter a valid email address.')).not.toBeInTheDocument();
  });
});

// Test for password validation - invalid password
test('shows error message for invalid password', async () => {
  render(<LoginForm />);

  // Get password input field and submit button
  const passwordInput = screen.getByLabelText(/password/i);
  const submitButton = screen.getByRole('button', { name: /sign in/i });

  // Input invalid password
  userEvent.type(passwordInput, 'short');
  fireEvent.click(submitButton);

  // Wait for error message
  await waitFor(() => {
    expect(screen.getByText('Password must be at least 8 characters long, contain both uppercase and lowercase letters, at least one number, and one special character.')).toBeInTheDocument();
  });
});

// Test for password validation - valid password
test('does not show error for valid password', async () => {
  render(<LoginForm />);

  // Get password input field and submit button
  const passwordInput = screen.getByLabelText(/password/i);
  const submitButton = screen.getByRole('button', { name: /sign in/i });

  // Input valid password
  userEvent.type(passwordInput, 'Valid123!');
  fireEvent.click(submitButton);

  // Ensure no error message is displayed
  await waitFor(() => {
    expect(screen.queryByText('Password must be at least 8 characters long, contain both uppercase and lowercase letters, at least one number, and one special character.')).not.toBeInTheDocument();
  });
});