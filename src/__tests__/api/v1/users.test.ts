import { describe, expect, it, vi, beforeEach, type Mock } from 'vitest'
import { GET } from '@/app/(api)/api/v1/users/route'
import { Role } from '@prisma/client'

vi.mock('@/lib/prisma', () => {
  const mockFindMany = vi.fn()
  return {
    prisma: {
      user: {
        findMany: mockFindMany,
      },
    },
  }
})

describe('/api/v1/users', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('returns users list', async () => {
    const mockUsers = [
      {
        id: '1',
        name: 'Test User',
        email: 'test@example.com',
        role: Role.USER,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ]

    const { prisma } = await import('@/lib/prisma')
    const mockFn = prisma.user.findMany as unknown as Mock
    mockFn.mockResolvedValueOnce(mockUsers)

    const response = await GET()
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(Array.isArray(data)).toBe(true)
    expect(data).toEqual(mockUsers)
  })

  it('handles errors gracefully', async () => {
    const { prisma } = await import('@/lib/prisma')
    const mockFn = prisma.user.findMany as unknown as Mock
    mockFn.mockRejectedValueOnce(new Error('Database error'))

    const response = await GET()
    expect(response.status).toBe(500)
  })
})
