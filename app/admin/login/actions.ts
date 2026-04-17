'use server'

import { cookies } from 'next/headers'
import { createClient } from '@supabase/supabase-js'

export async function loginAdmin(formData: FormData) {
  const password = formData.get('password') as string
  const username = formData.get('username') as string

  // Initialize a fresh supabase client for server-side auth
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  // Attempt Supabase Authentication (username acts as email)
  const { data, error } = await supabase.auth.signInWithPassword({
    email: username,
    password: password
  })

  // Provide a fallback hardcoded login just in case Supabase isn't reachable or setup yet
  const expectedUsername = process.env.ADMIN_USERNAME || 'admin';
  const expectedPassword = process.env.ADMIN_PASSWORD || 'password123';

  if (!error && data?.user) {
    // Supabase auth successful
    setDateCookie()
    return { success: true }
  } else if (username === expectedUsername && password === expectedPassword) {
    // Fallback standard auth successful
    setDateCookie()
    return { success: true }
  } else {
    return { error: 'Invalid email/username or password. ' + (error?.message || '') }
  }
}

function setDateCookie() {
  cookies().set('qbay_admin_session', 'authenticated', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: '/',
  })
}
