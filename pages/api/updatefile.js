import clientPromise from '../../lib/mongodb'

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const foodName = (req.body.first)
        const foodPrice = (req.body.last)
        const newDate = (req.body.newDate)
        const itemNumber = (req.body.itemNumber)
        const img = (req.body.img)
        const allOrNot = (req.body.allOrNot)
        const imgAddy = req.body.imgAddy


        async function createListing(client, newListing) {
            // Which database youre going to use and which collection in the db
            // And inserts one
            // We want to wait for the results so we use await
            // We're going to store this value in result
            const result = await client.insertOne(newListing);
        }


        const client = await clientPromise
        const db = await client.db("grocery-app")


        const dataCollection = await db.collection(newDate);

        const Aidan = await db.collection("Aidan");
        const Andoni = await db.collection("Andoni");
        const John = await db.collection("John");
        const Justin = await db.collection("Justin");
        const Mitchell = await db.collection("Mitchell");
        const Sam = await db.collection("Sam");
        const Zach = await db.collection("Zach");
        const exists = await db.listCollections({ name: newDate }).hasNext()

        async function createPeople() {
            if (!exists) {
                await createListing(Aidan, {
                    date: newDate,
                    totalPrice: 0,
                    markDone: false
                })
                await createListing(Andoni, {
                    date: newDate,
                    totalPrice: 0,
                    markDone: false
                })
                await createListing(John, {
                    date: newDate,
                    totalPrice: 0,
                    markDone: false
                })
                await createListing(Justin, {
                    date: newDate,
                    totalPrice: 0,
                    markDone: false
                })
                await createListing(Mitchell, {
                    date: newDate,
                    totalPrice: 0,
                    markDone: false
                })
                await createListing(Sam, {
                    date: newDate,
                    totalPrice: 0,
                    markDone: false
                })
                await createListing(Zach, {
                    date: newDate,
                    totalPrice: 0,
                    markDone: false
                })
            }
        }


        async function test() {
            if (allOrNot === "true") {
                if (imgAddy) {
                    await createListing(dataCollection, {
                        foodName: foodName,
                        foodPrice: foodPrice,
                        buy: ["Aidan", "Andoni", "John", "Justin", "Mitchell", "Sam", "Zach"],
                        totalPeople: 7,
                        itemNumber: itemNumber,
                        imgAddress: img
                    })
                } else {
                    await createListing(dataCollection, {
                        foodName: foodName,
                        foodPrice: foodPrice,
                        buy: ["Aidan", "Andoni", "John", "Justin", "Mitchell", "Sam", "Zach"],
                        totalPeople: 7,
                        itemNumber: itemNumber,
                        img: img
                    })
                }
            } else {
                if (imgAddy) {
                    await createListing(dataCollection, {
                        foodName: foodName,
                        foodPrice: foodPrice,
                        buy: [],
                        totalPeople: 0,
                        itemNumber: itemNumber,
                        imgAddress: img
                    })
                } else {
                    await createListing(dataCollection, {
                        foodName: foodName,
                        foodPrice: foodPrice,
                        buy: [],
                        totalPeople: 0,
                        itemNumber: itemNumber,
                        img: img
                    })
                }
            }
        }

        const err = await test()
        const errr = await createPeople()
        if (errr) throw errr;
        res.status(201).json({
            message: "yay"
        })
    } else {
        const foodName = (req.body.first)
        const foodPrice = (req.body.last)
        const newDate = (req.body.newDate)
        const itemNumber = (req.body.itemNumber)
        const img = (req.body.img)
        const allOrNot = (req.body.allOrNot)
        const imgAddy = req.body.imgAddy


        async function createListing(client, newListing) {
            // Which database youre going to use and which collection in the db
            // And inserts one
            // We want to wait for the results so we use await
            // We're going to store this value in result
            const result = await client.insertOne(newListing);
        }


        const client = await clientPromise
        const db = await client.db("grocery-app")


        const dataCollection = await db.collection(newDate);

        const Aidan = await db.collection("Aidan");
        const Andoni = await db.collection("Andoni");
        const John = await db.collection("John");
        const Justin = await db.collection("Justin");
        const Mitchell = await db.collection("Mitchell");
        const Sam = await db.collection("Sam");
        const Zach = await db.collection("Zach");
        const exists = await db.listCollections({ name: newDate }).hasNext()

        async function createPeople() {
            if (!exists) {
                await createListing(Aidan, {
                    date: newDate,
                    totalPrice: 0,
                    markDone: false
                })
                await createListing(Andoni, {
                    date: newDate,
                    totalPrice: 0,
                    markDone: false
                })
                await createListing(John, {
                    date: newDate,
                    totalPrice: 0,
                    markDone: false
                })
                await createListing(Justin, {
                    date: newDate,
                    totalPrice: 0,
                    markDone: false
                })
                await createListing(Mitchell, {
                    date: newDate,
                    totalPrice: 0,
                    markDone: false
                })
                await createListing(Sam, {
                    date: newDate,
                    totalPrice: 0,
                    markDone: false
                })
                await createListing(Zach, {
                    date: newDate,
                    totalPrice: 0,
                    markDone: false
                })
            }
        }


        async function test() {
            if (allOrNot === "true") {
                if (imgAddy) {
                    await createListing(dataCollection, {
                        foodName: foodName,
                        foodPrice: foodPrice,
                        buy: ["Aidan", "Andoni", "John", "Justin", "Mitchell", "Sam", "Zach"],
                        totalPeople: 7,
                        itemNumber: itemNumber,
                        imgAddress: img
                    })
                } else {
                    await createListing(dataCollection, {
                        foodName: foodName,
                        foodPrice: foodPrice,
                        buy: ["Aidan", "Andoni", "John", "Justin", "Mitchell", "Sam", "Zach"],
                        totalPeople: 7,
                        itemNumber: itemNumber,
                        img: img
                    })
                }
            } else {
                if (imgAddy) {
                    await createListing(dataCollection, {
                        foodName: foodName,
                        foodPrice: foodPrice,
                        buy: [],
                        totalPeople: 0,
                        itemNumber: itemNumber,
                        imgAddress: img
                    })
                } else {
                    await createListing(dataCollection, {
                        foodName: foodName,
                        foodPrice: foodPrice,
                        buy: [],
                        totalPeople: 0,
                        itemNumber: itemNumber,
                        img: img
                    })
                }
            }
        }

        const err = await test()
        const errr = await createPeople()
        if (errr) throw errr;
        res.status(201).json({
            message: "yay"
        })
    }
}
