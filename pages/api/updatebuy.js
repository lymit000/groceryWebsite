import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
    const personName = req.query.param0;
    const date = req.query.param1;
    const buy = req.query.param2.toString();
    const itemName = req.query.param3;
    const itemPrice = req.query.param4;


    const client = await clientPromise
    const db = await client.db("grocery-app");
    const updatePerson = await client.db("grocery-app").collection(personName);
    const param = await db.collection(date);
    const priceParam = await db.collection(personName);

    const personDB = await db.collection(personName).findOne({date: date});
    const personCollectionOfDate = await JSON.parse(JSON.stringify(personDB));


    const singleFood = await db.collection(date).findOne({foodName: itemName})
    const changeFood = await JSON.parse(JSON.stringify(singleFood));
    // console.log(buy)
    let onlyArray = changeFood.buy


    async function updateBuy(client, foodName, updatedArray) {
        const result = await client.updateOne({foodName: foodName}, { $set: updatedArray});
    }
    async function updateWeekTotal(buyer, date, updatedTotal) {
        const result = await client.db("grocery-app").collection(buyer.toString()).updateOne({date: date}, { $set: updatedTotal});
    }


    async function updateFalse(buyer, size, itemPrice) {
        // 0 if size == 1 new person goes up by ITEM
        // else
        // 1 the new person goes up ITEM / SIZE - 1
        // 2 everyone goes down ITEM / SIZE - 1
        // 3 everyone goes up ITEM / SIZE
        const personDB = await db.collection(buyer.toString()).findOne({date: date});
        if (size === 1) {

        } else {
            // 2
            const subtract = Math.round((itemPrice / (size - 1)) * 100) / 100 ;
            const newTotal = Math.round((personDB.totalPrice - subtract)* 100) / 100
            console.log("THIS IS THE FIRST SUBTRACT ")
            console.log("WE ARE SUBTRACTING ")
            console.log(itemPrice)
            console.log(size - 1)
            console.log(subtract)
            console.log("TO")
            console.log(personDB.totalPrice)
            console.log("FOR A TOTAL OF ")
            console.log(newTotal)
            const result1 = await updateWeekTotal(buyer, date, {totalPrice: newTotal});
            const result = await updateFalseTwo(buyer, size, itemPrice)
        }
    }

    async function updateFalseTwo(buyer, size, itemPrice) {
        //3
        const personDB = await db.collection(buyer.toString()).findOne({date: date});

        const add = Math.round((itemPrice / size) * 100) / 100
        const finalTotal = Math.round((personDB.totalPrice + add) * 100) / 100;
        console.log("THIS IS THE last add ")
        console.log("WE ARE adding ")
        console.log(itemPrice)
        console.log(size )
        console.log(add)
        console.log("TO")
        console.log(personDB.totalPrice)
        console.log("FOR A TOTAL OF ")
        console.log(finalTotal)
        const result = await updateWeekTotal(buyer, date, {totalPrice: finalTotal});

        // UPDATE FINAL TOTAL
    }


    async function updateTrue(buyer, size, itemPrice) {
        if (size == 0) {

        } else {
            const personDB = await db.collection(buyer.toString()).findOne({date: date});
            // 3 everyone goes down ITEM / SIZE + 1
            const firstSubtract = Math.round((itemPrice / (size + 1)) * 100) / 100
            const newTotal = Math.round((personDB.totalPrice - firstSubtract) * 100) / 100;
            console.log("THIS IS THE next SUBTRACT")
            console.log("WE ARE SUBBING ")
            console.log(itemPrice)
            console.log(size + 1)
            console.log(firstSubtract)
            console.log("TO")
            console.log(personCollectionOfDate.totalPrice)
            console.log("FOR A TOTAL OF ")
            console.log(newTotal)
            const result1 = await updateWeekTotal(buyer, date, {totalPrice: newTotal});
            const result = await updateTrueTwo(buyer, size, itemPrice);
        }
    }

    async function updateTrueTwo(buyer, size, itemPrice) {
        const personDB = await db.collection(buyer.toString()).findOne({date: date});

        // 2 everyone goes up ITEM / SIZE
        const add = Math.round((itemPrice / size) * 100) / 100
        const finalTotal = Math.round((personDB.totalPrice + add )* 100) / 100;
        console.log("FINAL ADD IS ")
        console.log(personDB.totalPrice)
        console.log(add)
        console.log("FOR A TOTAL OF ")
        console.log(finalTotal)
        const result = await updateWeekTotal(buyer, date, {totalPrice: finalTotal});
    }

    // Selling
    if (buy === "true") {
        if (!onlyArray.includes(personName)) {
            // 1 the caller person goes down ITEM / SIZE
            const firstSubtract = Math.round((itemPrice / onlyArray.length) * 100) / 100;
            const newTotal = Math.round((personCollectionOfDate.totalPrice - firstSubtract) * 100) / 100;
            console.log("THIS IS THE FIRST SUBTRACT if size === 1 OR ANYTHING")
            console.log("WE ARE SUBBING ")
            console.log(itemPrice)
            console.log(onlyArray.length)
            console.log(firstSubtract)
            console.log("TO")
            console.log(personCollectionOfDate.totalPrice)
            console.log("FOR A TOTAL OF ")
            console.log(newTotal)
            const result1 = await updateWeekTotal(personName, date, {totalPrice: newTotal});


            onlyArray = onlyArray(item => item !== personName)
            const result = await updateBuy(param, itemName, {buy: onlyArray, totalPeople: onlyArray.length});

            // we need to add money to the other people
            {onlyArray && onlyArray.map(async buyer => {
                if (buyer.toString() !== personName) {
                    const result = await updateTrue(buyer, onlyArray.length, itemPrice)
                }
            })}
        }
        // Buying
    } else {
        if (!onlyArray.includes(personName)) {
            onlyArray = onlyArray.push(personName)
            // await updateWeekTotal(updatePerson, date, {totalPrice: newTotal});
            const result = await updateBuy(param, itemName, {buy: onlyArray, totalPeople: onlyArray.length});
            // WE need to subtract money from the other people

            // 1
            console.log("WE ARE adding A PERSON")
            console.log(personName)
            if (onlyArray.length === 1) {
                const firstAdd = Math.round((itemPrice / (onlyArray.length)) * 100) / 100
                const firstTotal = Math.round((personCollectionOfDate.totalPrice + firstAdd) * 100) / 100;
                const result = await updateWeekTotal(personName, date, {totalPrice: firstTotal});
                console.log("THIS IS THE FIRST ADD if size === 1")
                console.log("WE ARE ADDING ")
                console.log(itemPrice)
                console.log(onlyArray.length)
                console.log(firstAdd)
                console.log("TO")
                console.log(personCollectionOfDate.totalPrice)
                console.log("FOR A TOTAL OF ")
                console.log(firstTotal)
            } else {
                const firstAdd = Math.round((itemPrice / (onlyArray.length - 1)) * 100) / 100
                const firstTotal = Math.round((personCollectionOfDate.totalPrice + firstAdd) * 100) / 100;
                const result = await updateWeekTotal(personName, date, {totalPrice: firstTotal});
                console.log("THIS IS THE FIRST ADD if size !=== 1")
                console.log("WE ARE ADDING ")
                console.log(itemPrice)
                console.log(onlyArray.length)
                console.log(firstAdd)
                console.log("TO")
                console.log(personCollectionOfDate.totalPrice)
                console.log("FOR A TOTAL OF ")
                console.log(firstTotal)
            }

            {onlyArray && onlyArray.map(async buyer => {
                const result = await updateFalse(buyer, onlyArray.length, itemPrice);
            })}
        }
    }

    console.log(singleFood)
    const result = await res.json("HI")
}