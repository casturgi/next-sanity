import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const users = await prisma.user.findMany()
    return NextResponse.json(users)
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: 'Failed to fetch users', message: error.message }, { status: 500 })
    }
    return NextResponse.json({ error: 'Failed to fetch users', message: 'An unknown error occurred' }, { status: 500 })
  }
}