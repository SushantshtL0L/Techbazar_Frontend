import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import ProductCard from '@/app/dashboard/_components/ProductCard'
// import { describe, it, expect, jest, beforeEach } from '@jest/globals'
import { useRouter } from 'next/navigation'

// Mock context and hooks
jest.mock('@/context/AuthContext', () => ({
    useAuth: () => ({ user: { id: 'user1', role: 'user' } }),
}))
const mockPush = jest.fn()
jest.mock('next/navigation', () => ({
    useRouter: () => ({ push: mockPush }),
}))
jest.mock('@/context/ThemeContext', () => ({
    useTheme: () => ({ theme: 'light' }),
}))
jest.mock('@/context/WishlistContext', () => ({
    useWishlist: () => ({
        addToWishlist: jest.fn(),
        removeFromWishlist: jest.fn(),
        isInWishlist: () => false,
    }),
}))
// Mocks are handled in setup.tsx

const mockProduct = {
    _id: 'prod1',
    name: 'Cool Sneakers',
    price: 5000,
    image: '/test.jpg',
    brand: 'Nike',
    condition: 'new',
    seller: 'user2',
}

describe('ProductCard', () => {
    it('renders product details correctly', () => {
        render(<ProductCard product={mockProduct} />)
        expect(screen.getByText('Cool Sneakers')).toBeInTheDocument()
        expect(screen.getByText('Nike')).toBeInTheDocument()
        expect(screen.getByText(/5,000/)).toBeInTheDocument()
    })

    it('navigates to detail page on click', () => {
        render(<ProductCard product={mockProduct} />)

        const card = screen.getByText('Cool Sneakers').closest('div')!
        fireEvent.click(card)

        expect(mockPush).toHaveBeenCalledWith('/dashboard/product/prod1')
    })
})
