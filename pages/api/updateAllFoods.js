import clientPromise from '../../lib/mongodb'

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const foodName = (req.body.first)
        const foodPrice = (req.body.last)
        const itemNumber = (req.body.itemNumber)
        // const img = (req.query.param3).replaceAll('*', '&')
        const img = (req.body.img)


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


        const err = await test()
        if (err) throw err;
        res.status(201).json({
            message: "yay"
        })
    } else {
        const foodName = (req.body.first)
        const foodPrice = (req.body.last)
        const itemNumber = (req.body.itemNumber)
        // const img = (req.query.param3).replaceAll('*', '&')
        const img = (req.body.img)


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


        const err = await test()
        if (err) throw err;
        res.status(201).json({
            message: "yay"
        })
    }
    // import clientPromise from '../../lib/mongodb'
    //
    // export default async function handler(req, res) {
    //     handler.post(
    //         async (req, res) => {
    //             const client = await clientPromise
    //             const db = await client.db("grocery-app").collection("allFoods")
    //
    //             const foodName = (req.body.first)
    //             const foodPrice = (req.body.last)
    //             const itemNumber = (req.body.itemNumber)
    //             const img = (req.body.img)
    //
    //             const result = await db.insertOne(
    //                 {
    //                     foodName: foodName,
    //                     foodPrice: foodPrice,
    //                     buy: ["Aidan", "Andoni", "John", "Justin", "Mitchell", "Sam", "Zach"],
    //                     totalPeople: 7,
    //                     itemNumber: itemNumber,
    //                     imgAddress: img
    //                 }
    //             );
    //         })
    // }

}
