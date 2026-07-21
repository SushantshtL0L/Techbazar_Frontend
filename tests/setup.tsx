import React from 'react'
import '@testing-library/jest-dom'

// Common mocks for Next.js
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} />
  },
}))

export const mockRouter = {
  push: jest.fn(),
  replace: jest.fn(),
  prefetch: jest.fn(),
  back: jest.fn(),
}

jest.mock('next/navigation', () => ({
  useRouter: () => mockRouter,
  usePathname: jest.fn(() => ''),
  useSearchParams: jest.fn(() => new URLSearchParams()),
}))

jest.mock('next/cache', () => ({
  revalidatePath: jest.fn(),
  revalidateTag: jest.fn(),
  unstable_cache: jest.fn((cb: any) => cb),
}))

// Mock react-icons to avoid ESM issues in Jest
jest.mock('react-icons/fa', () => ({
  FaEye: () => <div data-testid="fa-eye" />,
  FaEyeSlash: () => <div data-testid="fa-eye-slash" />,
}))

jest.mock('react-icons/fi', () => ({
  FiSearch: () => <div />,
  FiShoppingCart: () => <div />,
  FiTrendingUp: () => <div />,
  FiTag: () => <div />,
  FiUser: () => <div />,
  FiPlusSquare: () => <div />,
  FiShoppingBag: () => <div />,
  FiArrowRight: () => <div />,
  FiBox: () => <div />,
  FiSun: () => <div />,
  FiMoon: () => <div />,
  FiHeart: () => <div />,
  FiClipboard: () => <div />,
}))

// Mock framer-motion to avoid "unknown prop" warnings in tests
jest.mock('framer-motion', () => ({
  motion: {
    div: React.forwardRef(({ children, whileHover, whileTap, layoutId, initial, animate, exit, transition, ...props }: any, ref) => (
      <div {...props} ref={ref}>{children}</div>
    )),
    span: React.forwardRef(({ children, whileHover, whileTap, layoutId, initial, animate, exit, transition, ...props }: any, ref) => (
      <span {...props} ref={ref}>{children}</span>
    )),
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}))
