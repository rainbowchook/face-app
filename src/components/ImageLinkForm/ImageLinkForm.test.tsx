import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ImageLinkForm from '.'

describe('ImageLinkForm', () => {
  test('ImageLinkForm components rendered', () => {
    render(<ImageLinkForm />)
    expect(screen.getByText(/Upload picture to detect face/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/Enter URL here/i)).toBeInTheDocument()
    expect(screen.getByRole('button')).toBeInTheDocument()
    
  })
  test('ImageLinkForm change form input', () => {
    const imageUrl = 'http://fakeimgurl.com/fakeimg.png'

    render(<ImageLinkForm />)

    const textInput = screen.getByPlaceholderText(/Enter URL here/i)
    
    userEvent.type(textInput, imageUrl)
    expect(textInput).toHaveValue(imageUrl)
    userEvent.clear(textInput)
    expect(textInput).toHaveValue('')
  })
  
  // test('ImageLinkForm click', () => {
  //   const imageUrl = 'http://fakeimgurl.com/fakeimg.png'

  //   render(<ImageLinkForm />)
  //   const textInput = screen.getByPlaceholderText(/Enter URL here/i)
  //   const submitButton = screen.getByRole('button')

  //   userEvent.type(textInput, imageUrl)
  //   expect(textInput).toHaveValue(imageUrl)
  //   userEvent.click(submitButton)
  //   expect(textInput).toHaveValue('')
  // })
})