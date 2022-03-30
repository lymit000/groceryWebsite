import clientPromise from '../../lib/mongodb'

export default async function handler(req, res) {
    const query = req.query.date_id;
    // console.log(query);

    const client = await clientPromise
    const db = await client.db("grocery-app");

    // const data = await db.collection("movies").find({year: 2013, 'imdb.rating': {$gt: 8}}).limit(20).toArray()


    const data = await db.collection(query).find().toArray()
    //
    // res.json(data);
    await res.json(data);
    // res.json({message: "IT WORKS!!"})
}