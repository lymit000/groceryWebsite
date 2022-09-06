import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
    const personName = req.query.param0;
    const date = req.query.param1;

    const allNames = ["Aidan", "Andoni", "John", "Justin", "Mitchell", "Sam", "Zach"]

    console.log(personName)
    console.log(date)

    const client = await clientPromise
    const entireDB = await client.db("grocery-app");

    const collectionReceipt = await entireDB.collection(date)
    const collectionAllItemsOnReceipt = await collectionReceipt.find().toArray();
    const receiptOfDate = await JSON.parse(JSON.stringify(collectionAllItemsOnReceipt));

    let completeTotal = 0;
    function computeTotal(currentPrice, currentPeople) {
        completeTotal = completeTotal + (Math.round((currentPrice / (currentPeople)) * 100) / 100)
    }

    function reset () {
        completeTotal = 0;
    }



    await wholeThing();
    async function wholeThing() {
        for (const person of allNames) {
            for (const item of receiptOfDate) {
                if (item.buy.includes(person)) {
                    computeTotal(item.foodPrice, item.totalPeople);
                }
            }
            completeTotal = Math.round((completeTotal) * 100) / 100
            await updateWeekTotal(person, date, {totalPrice: completeTotal});
            reset();
        }
    }

    async function updateWeekTotal(buyer, date, updatedTotal) {
        const result = await client.db("grocery-app").collection(buyer.toString()).updateOne({date: date}, { $set: updatedTotal});
    }

    const result = await res.json("HI")
}