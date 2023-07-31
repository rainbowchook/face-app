import { render, screen } from '@testing-library/react'
import App from './App'

describe('App component', () => {
  test('Components rendered', () =>{
    render(<App />)
    expect(screen.getByTestId('logo')).toBeInTheDocument()
  })
})