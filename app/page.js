'use client'
 
import { useSearchParams } from 'next/navigation'
 
export default function SearchBar() {
  const searchParams = useSearchParams()
 
  const blog = searchParams.get('blog')
  const utm_source = searchParams.get('utm_source')
 
  // URL -> `http://localhost:3000/?blog=siphan&utm_source=instagram`
  return(
    <>
      <p>Home page</p>
      {(blog || utm_source) && <p>Search: <strong>{blog}</strong> and <strong>{utm_source}</strong></p>}
    </>
  )
}