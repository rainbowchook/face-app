import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ImageLinkForm from '.'

describe('ImageLinkForm', () => {
  test('ImageLinkForm components rendered', () => {
    const imageUrl = 'fakeUrl'
    const onChange = jest.fn()
    const onClick = jest.fn()

    render(<ImageLinkForm imageUrl={imageUrl} onChange={onChange} onClick={onClick} loading={false}/>)
    expect(screen.getByText(/Upload picture to detect face/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/Enter URL here/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Detect' })).toBeInTheDocument()
    expect(screen.getByText(/^Clicking will detect/i)).toBeInTheDocument()
    expect(screen.getByText(/^Clicking will detect/i)).not.toBeVisible()
  })

  test('Input to be required', () => {
    const imageUrl = 'fakeUrl'
    const onChange = jest.fn()
    const onClick = jest.fn()

    render(<ImageLinkForm imageUrl={imageUrl}onChange={onChange} onClick={onClick} loading={false}/>)

    const input = screen.getByPlaceholderText(/Enter URL here/i)
    expect(input).toBeRequired()
  })

  test('ImageLinkForm change form input', () => {
    const imageUrl = 'http://fakeimgurl.com/fakeimg.png'

    const onChange = jest.fn()
    const onClick = jest.fn()

    render(<ImageLinkForm imageUrl={imageUrl} onChange={onChange} onClick={onClick} loading={false}/>)

    const textInput = screen.getByPlaceholderText(/Enter URL here/i)
    
    userEvent.type(textInput, imageUrl)
    expect(textInput).toHaveValue(imageUrl)
    expect(onChange).toHaveBeenCalled()
    expect(onChange).toHaveBeenCalledTimes(imageUrl.length)
    // userEvent.clear(textInput)
    // expect(textInput).toHaveValue('')
  })

  test('Submit button', () => {
    const imageUrl = 'http://fakeimgurl.com/fakeimg.png'

    const onChange = jest.fn()
    const onClick = jest.fn()

    render(<ImageLinkForm imageUrl={imageUrl} onChange={onChange} onClick={onClick} loading={false}/>)
    
    const button = screen.getByRole('button', {name:'Detect'})
    expect(button).toHaveAccessibleDescription(/^clicking will detect/i)
    expect(button).not.toHaveAccessibleDescription('Other description')
  })
  
  test('ImageLinkForm submit button click', () => {
    const imageUrl = 'http://fakeimgurl.com/fakeimg.png'

    const onChange = jest.fn()
    const onClick = jest.fn()

    render(<ImageLinkForm imageUrl={imageUrl} onChange={onChange} onClick={onClick} loading={false}/>)

    const textInput = screen.getByPlaceholderText(/Enter URL here/i)
    
    userEvent.type(textInput, imageUrl)
    expect(textInput).toHaveValue(imageUrl)

    const button = screen.getByRole('button', {name:'Detect'})

    userEvent.click(button, undefined, { clickCount: 1 })
    expect(onClick).toHaveBeenCalled()
    expect(onClick).toHaveBeenCalledTimes(1)
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