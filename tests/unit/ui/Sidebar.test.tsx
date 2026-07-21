import { render, screen, fireEvent } from '@testing-library/react'
import Sidebar from '@/app/dashboard/_components/Sidebar'
// import { describe, it, expect, jest, beforeEach } from '@jest/globals'

// Mock contexts
jest.mock('@/context/AuthContext', () => ({
    useAuth: () => ({ user: { role: 'user' } }),
}))
const mockToggleTheme = jest.fn()
jest.mock('@/context/ThemeContext', () => ({
    useTheme: () => ({
        theme: 'light',
        toggleTheme: mockToggleTheme
    }),
}))
jest.mock('@/context/WishlistContext', () => ({
    useWishlist: () => ({ wishlistItems: [] }),
}))

// Mock Next.js hooks
jest.mock('next/navigation', () => ({
    useRouter: () => ({ push: jest.fn() }),
    usePathname: () => '/dashboard',
    useSearchParams: () => new URLSearchParams(),
}))

describe('Sidebar', () => {
    it('renders navigation links', () => {
        render(<Sidebar activePage="shoes" />)
        expect(screen.getByText(/SHOES/i)).toBeInTheDocument()
        expect(screen.getByText(/MY CART/i)).toBeInTheDocument()
        expect(screen.getByText(/PROFILE/i)).toBeInTheDocument()
    })

    it('calls toggleTheme when theme button is clicked', () => {
        render(<Sidebar activePage="shoes" />)

        const buttons = screen.getAllByRole('button')
        const themeButton = buttons[0]

        fireEvent.click(themeButton)
        expect(mockToggleTheme).toHaveBeenCalled()
    })

    it('updates search value on input change', () => {
        render(<Sidebar activePage="shoes" />)
        const searchInput = screen.getByPlaceholderText(/Look for kicks/i)

        fireEvent.change(searchInput, { target: { value: 'Jordan' } })
        expect(searchInput).toHaveValue('Jordan')
    })
})
