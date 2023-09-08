import { render, screen } from '@testing-library/react'
import ParticleBackground from '.'

console.log = jest.fn()

test('ParticleBackground rendered', () => {
  render(<ParticleBackground />)
  // screen.debug()
  expect(console.log).toHaveBeenCalled()

  // expect(screen.getByTestId('tsparticles')).toBeInTheDocument()
  // expect(screen.getByTestId('tsparticles')).toHaveStyle({width: '100%', height: '100%'})
})
