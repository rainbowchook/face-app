import { render, screen } from '@testing-library/react'
import Rank from '.'
import { AuthContextType, User } from '../../contexts/AuthContext'
import { useAuthContext } from '../../hooks/useAuthContext'

describe('Rank', () => {
  test('Rank is rendered', () => {
    const currentUser: User = {
        id: 12,
        name: 'Test User',
        email: 'test@test.com',
        entries: 2,
        joined: new Date()
    }

    const context: AuthContextType = {
      currentUser,
      signIn: () => null,
      signOut: () => null,
      addEntriesCount: () => null,
    }

    jest.mock('../../hooks/useAuthContext')

    const mockUseAuthContext = useAuthContext as jest.MockedFunction<typeof useAuthContext>
    mockUseAuthContext.mockReturnValue(context)
    
    render(<Rank />)
    expect(screen.getByText(/your rank is/i)).toBeInTheDocument()
    expect(screen.getByText(/^#\d+/)).toBeInTheDocument()
  })
})