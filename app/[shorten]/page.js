import { redirect } from 'next/navigation'
import { MongoClient } from 'mongodb'

export default async function Page({ params }) {
  const { shorten } = await params
  console.log(shorten)

  const client = new MongoClient(process.env.MONGODB_URI)
  await client.connect()

  const db = client.db('bitlinks')
  const collection = db.collection('links')

  const result = await collection.findOne({ shortUrl: shorten })

  await client.close()

  if (result?.url) {
    redirect(result.url)
  }

  return <div>Short URL not found: ${shorten}</div>
}
