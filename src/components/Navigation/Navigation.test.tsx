import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Navigation from '.'

test('Navigation rendered', () => {
  render(<Navigation />)

  expect(screen.getByText(/sign out/i)).toBeInTheDocument()
})
