// src/app/page.tsx
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route'
import Login from '../components/Login'
import Logout from '../components/Logout'
export default async function Home() {
  const session = await getServerSession(authOptions)
  if (session) {
    return <div className='flex flex-col items-center justify-center h-screen'>
      <div className='text-lg font-bold'>Your name is {session.user?.name}</div>
      <div><Logout /> </div>
    </div>
  }
  return (
    <div className='flex flex-col h-screen justify-center items-center'>
      <Login />
    </div>
  )
}