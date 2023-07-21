import { render, screen } from '@testing-library/react'
import Logo from '.'

test('Logo rendered', () => {
  render(<Logo />)

  expect(screen.getByTestId('logo')).toBeInTheDocument()
  expect(screen.getByText(/Designed by Freepik/i)).toBeInTheDocument()
})