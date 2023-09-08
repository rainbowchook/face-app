import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Logo from '.'

describe('Logo', () => {
  test('Logo image rendered', () => {
    render(<Logo />)
    expect(screen.getByTestId('logo')).toBeInTheDocument()
  })

  test('Logo link opens to correct website', () => {
    const url = 'https://www.freepik.com/icon/artificial-intelligence_1122577#position=87&page=1&term=brain&fromView=keyword'

    render(<Logo />)

    expect(screen.getByTestId('logo')).toBeInTheDocument()

    const link = screen.getByText(/Designed by Freepik/i)
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', url)
    
    userEvent.click(link)
    // expect(window.location.pathname).toBe(url)
  })
})
