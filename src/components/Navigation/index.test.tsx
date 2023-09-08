import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Navigation from '.'

describe('Navigation', () => {
  test('Navigation rendered', () => {
    render(
      <BrowserRouter>
        <Navigation />
      </BrowserRouter>
    )

    const link = screen.getByText(/sign in/i)
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('role', 'link')
  })
})
