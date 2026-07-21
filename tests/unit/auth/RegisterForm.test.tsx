import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import RegisterForm from '@/app/(auth)/_components/RegisterForm'
// import { describe, it, expect, jest, beforeEach } from '@jest/globals'

// Mock auth actions
const mockHandleRegister = jest.fn()
jest.mock('@/lib/actions/auth.actions', () => ({
    handleRegister: (data: any) => mockHandleRegister(data),
}))

// Mocks are handled in setup.tsx


jest.mock('react-toastify', () => ({
    toast: {
        success: jest.fn(),
        error: jest.fn(),
    },
}))

describe('RegisterForm', () => {
    beforeEach(() => {
        jest.clearAllMocks()
        window.alert = jest.fn()
    })

    it('renders register form correctly', () => {
        render(<RegisterForm />)
        expect(screen.getByText(/Join the Hub!/i)).toBeInTheDocument()
        expect(screen.getByPlaceholderText(/Full Name/i)).toBeInTheDocument()
        expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument()
        expect(screen.getByPlaceholderText('Password')).toBeInTheDocument()
        expect(screen.getByPlaceholderText('Confirm Password')).toBeInTheDocument()
    })

    it('shows alert for password mismatch', async () => {
        render(<RegisterForm />)

        fireEvent.change(screen.getByPlaceholderText(/Full Name/i), { target: { value: 'John Doe' } })
        fireEvent.change(screen.getByPlaceholderText(/Email/i), { target: { value: 'john@example.com' } })
        fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } })
        fireEvent.change(screen.getByPlaceholderText('Confirm Password'), { target: { value: 'different' } })

        const form = screen.getByPlaceholderText(/Full Name/i).closest('form')!
        fireEvent.submit(form)

        await waitFor(() => {
            expect(window.alert).toHaveBeenCalledWith("Passwords don't match")
        })
    })

    it('calls handleRegister and switches to login on success', async () => {
        const mockOnSwitch = jest.fn()
        mockHandleRegister.mockResolvedValue({ success: true })

        render(<RegisterForm onSwitchToLogin={mockOnSwitch} />)

        fireEvent.change(screen.getByPlaceholderText(/Full Name/i), { target: { value: 'John Doe' } })
        fireEvent.change(screen.getByPlaceholderText(/Email/i), { target: { value: 'john@example.com' } })
        fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } })
        fireEvent.change(screen.getByPlaceholderText('Confirm Password'), { target: { value: 'password123' } })

        const form = screen.getByPlaceholderText(/Full Name/i).closest('form')!
        fireEvent.submit(form)

        await waitFor(() => {
            expect(mockHandleRegister).toHaveBeenCalled()
            expect(mockOnSwitch).toHaveBeenCalled()
        })
    })
})
