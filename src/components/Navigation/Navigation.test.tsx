import { render, screen } from '@testing-library/react'
import Navigation from '.'

test('Navigation rendered', () => {
  render(<Navigation />)

  const link = screen.getByText(/sign out/i)
  expect(link).toBeInTheDocument()
  expect(link).toHaveAttribute('role', 'link')
})
