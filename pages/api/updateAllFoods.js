import clientPromise from '../../lib/mongodb'

export default async function handler(req, res) {
    const foodName = (req.query.param0)
    const foodPrice = (req.query.param1)
    const itemNumber = (req.query.param2)
    const img = (req.query.param3).replaceAll('*', '&')


    async function createListing(client, newListing) {
        const result = await client.insertOne(newListing);
    }


    const client = await clientPromise
    const db = await client.db("grocery-app")


    const dataCollection = await db.collection("allFoods");


    async function test() {
        await createListing(dataCollection, {
            foodName: foodName,
            foodPrice: foodPrice,
            buy: [],
            totalPeople: 0,
            itemNumber: itemNumber,
            imgAddress: img
        })
    }


    await test()
    res.json({message: "IT WORKS!!"})
}
