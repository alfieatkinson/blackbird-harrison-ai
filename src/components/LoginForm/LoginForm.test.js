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