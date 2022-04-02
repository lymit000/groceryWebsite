import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
    const personName = req.query.param0;
    const date = req.query.param1;

    console.log(personName)
    console.log(date)

    const client = await clientPromise
    const entireDB = await client.db("grocery-app");

    const collectionReceipt = await entireDB.collection(date)
    const collectionAllItemsOnReceipt = await collectionReceipt.find().toArray();
    const receiptOfDate = await JSON.parse(JSON.stringify(collectionAllItemsOnReceipt));

    async function updateBuy(client, foodName, updatedArray) {
        const result = await client.updateOne({foodName: foodName}, { $set: updatedArray});
    }


    let completeTotal = 0;
    function computeTotal(currentPrice, currentPeople) {
        completeTotal = completeTotal + (Math.round((currentPrice / (currentPeople)) * 100) / 100)
    }



    await wholeThing();
    async function wholeThing() {
        for (const date of receiptOfDate) {
            if (date.buy.includes(personName)) {
                computeTotal(date.foodPrice, date.totalPeople);
            }
        }
        // console.log(completeTotal)
        completeTotal = Math.round((completeTotal) * 100) / 100
        await updateWeekTotal(personName, date, {totalPrice: completeTotal});
    }

    async function updateWeekTotal(buyer, date, updatedTotal) {
        const result = await client.db("grocery-app").collection(buyer.toString()).updateOne({date: date}, { $set: updatedTotal});
    }

    const result = await res.json("HI")
}