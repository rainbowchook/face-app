import { render, screen } from '@testing-library/react'
import Rank from '.'

describe('Rank', () => {
  test('Rank is rendered', () => {
    render(<Rank />)
    expect(screen.getByText(/your rank is/i)).toBeInTheDocument()
    expect(screen.getByText(/^#\d+/)).toBeInTheDocument()
  })
})