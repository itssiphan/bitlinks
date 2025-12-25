import { MongoClient } from 'mongodb'

export function POST(request) {
	const client = new MongoClient(`${process.env.MONGODB_URI}`)

	return request.json()
		.then((body) => {
			return client.connect()
				.then(() => {
					const db = client.db('bitlinks')
					const collection = db.collection('links')

					return collection.findOne({shortUrl: body.shortUrl})
						.then((existing) => {
							if (existing) {
								return {type: 'EXISTS', data: existing}
							}
							return collection.insertOne(body)
						})
				})
		})
		.then((result) => {
			if (result?.type === 'EXISTS') {
			    console.log("URL Already Exists", result)
				return Response.json({success: false, message: 'URL Already Exists', data: result.data})
			}

			console.log("URL Generated Successfully", result)
			return Response.json({success: true, message: 'URL Generated Successfully', result})
		})
		.catch((error) => {
			console.error('Error:', error)
			return Response.json({success: false, message: 'Request failed'})
		})
		.finally(() => {
			client.close()
		})
}
