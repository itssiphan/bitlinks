"use client"
import Link from 'next/link'
import { useState } from 'react'

const Shorten = () => {
    const [form, setForm] = useState({url: "", shortUrl: ""});
    const [loading, setLoading] = useState(false);
    const [linkMessage, setlinkMessage] = useState("");

    const handleChange = (e) => {
      setForm({...form, [e.target.name]: e.target.value})
    };

    const handleRequest = () => {
      let trimmedUrl = form.url.trim()
      let trimmedShortUrl = form.shortUrl.trim()

      if (!trimmedUrl || !trimmedShortUrl) {
        alert("Both fields are required")
        return;
      }

      setLoading(true)

      return fetch("/api/item", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({url: trimmedUrl, shortUrl: trimmedShortUrl})
      })
      .then(response => {
        if (!response.ok) throw new Error(`HTTP `);
        return response.json();
      })
      .then(result => {
        setlinkMessage(`${process.env.NEXT_PUBLIC_HOST}/${trimmedShortUrl}`)
        alert(result.message)
        setForm({url: "", shortUrl: ""})
        return result;
      })
      .catch(error => {
        alert(err.message)
      })
      .finally(() => {
        setLoading(false)
      })
    };

    return (
        <div className='mx-auto max-w-lg bg-violet-100 my-16 p-8 rounded-xl flex flex-col gap-4 overflow-hidden break-all'>
            <h1 className='font-bold text-2xl text-black'>Generate your short URLs</h1>

            <div className='flex flex-col gap-3'>
                <input
                    type="text"
                    name="url"
                    value={form.url}
                    onChange={handleChange}
                    className='px-4 py-3 focus:outline-violet-600 placeholder:text-gray-500 text-black rounded-md'
                    placeholder='Enter your URL'
                />

                <input
                    type="text"
                    name="shortUrl"
                    value={form.shortUrl}
                    onChange={handleChange}
                    className='px-4 py-3 focus:outline-violet-600 placeholder:text-gray-500 text-black focus:outline-purple-600 rounded-md'
                    placeholder='Enter your preferred short URL text'
                />
                <button onClick={handleRequest} disabled={loading} className={`rounded-lg shadow-lg p-3 py-3 mt-3 mb-2 font-bold text-white ${loading ? "bg-gray-500 cursor-not-allowed" : "cursor-pointer bg-violet-500"}`}>Generate</button>
            </div>

           {linkMessage && <div className=''>
                <span className='font-bold text-lg text-black'>Your Link</span>
                <code className='ml-2'>
                    <Link className="text-red-600 hover:text-red-800" href={`${linkMessage}`} target="_blank">{linkMessage}</Link>
                </code>
            </div>}
        </div>
    )
}

export default Shorten;