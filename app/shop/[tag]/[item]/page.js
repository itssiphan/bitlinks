'use client'
import { useParams, usePathname } from 'next/navigation'

export default function App() {
  const params = useParams()
  const pathname = usePathname()

  console.log("Console Shop/[tag]/[item]:", params)

  return <p>Page: <strong>{pathname}</strong></p>
}