import { renderHook, act } from '@testing-library/react'
import { CartProvider, useCart } from '@/context/CartContext'
// import { describe, it, expect, jest, beforeEach } from '@jest/globals'

const STABLE_USER = { id: 'user1' }
// Mock AuthContext
jest.mock('@/context/AuthContext', () => ({
    useAuth: () => ({ user: STABLE_USER, loading: false }),
}))

describe('CartContext', () => {
    beforeEach(() => {
        let store: Record<string, string> = {}
        Object.defineProperty(window, 'localStorage', {
            value: {
                getItem: (key: string) => store[key] || null,
                setItem: (key: string, value: string) => { store[key] = value },
                clear: () => { store = {} }
            },
            writable: true
        })
        jest.clearAllMocks()
    })

    it('adds an item to the cart', () => {
        const wrapper = ({ children }: { children: React.ReactNode }) => (
            <CartProvider>{children}</CartProvider>
        )

        const { result } = renderHook(() => useCart(), { wrapper })

        act(() => {
            result.current.addToCart({
                id: 'p1',
                name: 'Sneaker',
                price: 100,
                image: '',
                brand: 'Nike',
                quantity: 1,
                size: '42',
                color: 'red',
                description: ''
            })
        })

        expect(result.current.cartItems).toHaveLength(1)
        expect(result.current.cartItems[0].name).toBe('Sneaker')
        expect(result.current.totalPrice).toBe(100)
    })

    it('calculates total price correctly', () => {
        const wrapper = ({ children }: { children: React.ReactNode }) => (
            <CartProvider>{children}</CartProvider>
        )

        const { result } = renderHook(() => useCart(), { wrapper })

        act(() => {
            result.current.addToCart({ id: 'p1', price: 100, quantity: 2, size: '42' } as any)
            result.current.addToCart({ id: 'p2', price: 50, quantity: 1, size: '40' } as any)
        })

        expect(result.current.totalPrice).toBe(250)
    })
})
