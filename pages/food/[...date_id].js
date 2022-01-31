import Head from 'next/head'
import { useState, useEffect } from 'react';
import Profile from "../components/Profile";
import clientPromise from '../../lib/mongodb'
import Link from 'next/link'
import Foods from "../components/Foods";
import Dates from "../components/Dates";
import log from "tailwindcss/lib/util/log";
import "tailwindcss/tailwind.css"
import { useRouter } from "next/router";

export default function MovieDetails({ person, receipt, date, didBuy, personCollectionOfDate }) {

    let totalPrice = personCollectionOfDate.totalPrice;

    function calculateTotal(otherPrice, flag, totalPeople) {
        if (flag) {
            totalPrice = (otherPrice / totalPeople) + totalPrice
        }
    }

    const router = useRouter();
    const forceReload = () => {
        router.reload();
    }


    return (
        <>
            <div>
                <div className="grid place-items-center grid-cols-5 gap-5 justify-items-center p-2 bg-gray-200 max-w">
                    <button className={"bg-blue-300 font-semibold text-center rounded-3xl border shadow-lg p-2 max-w-xs"}>
                        {/*<Link href={`http://localhost:3000/food/${person.name}`}>*/}
                        <Link href={`/food/${person.name}`} scroll={false}>

                        <h1>
                                Back to all Dates
                            </h1>
                        </Link>
                    </button>
                    <p></p>
                    {/*{console.log(personCollectionOfDate.totalPrice)}*/}
                    <Profile name={person.name} moneyOwed={personCollectionOfDate.totalPrice}/>
                    <p></p>
                    <button className={"bg-blue-300 font-semibold text-center rounded-3xl border shadow-lg p-2 "} onClick={forceReload}>
                        <h1 className={"font-bold"}>
                            Refresh
                        </h1>
                        <p className={"text-sm"}>(Click refresh to make sure all <br/>information is accurate)</p>

                    </button>
                </div>
                <div className="grid place-items-center grid-cols-8 gap-1 justify-items-center p-2 bg-gray-200 max-w">
                    {receipt && receipt.map(item => (
                        <>
                            <div>
                                {calculateTotal(item.foodPrice, JSON.parse(JSON.stringify(item.buy)).includes(person.name), item.totalPeople)}
                                {/*{item.totalPeople}*/}
                                {/*{console.log(item.foodPrice)}*/}
                                {/*// foodPrice={item.foodPrice}*/}
                                <Foods foodName={item.foodName} foodPrice={item.foodPrice} personName={person.name} buy={JSON.parse(JSON.stringify(item.buy)).includes(person.name)} date={date} totalPeople={item.totalPeople}/>
                            </div>
                        </>
                    ))}
                </div>

            </div>

            {/*<div className="grid place-items-center grid-cols-4 gap-5 justify-items-center p-2 bg-gray-200 max-w">*/}
            {/*    {food && food.map(item => (*/}
            {/*            <>*/}
            {/*                <Foods itemName={item.foodName} itemPrice={item.foodPrice}/>*/}
            {/*            </>*/}
            {/*        )*/}
            {/*    )*/}
            {/*    }*/}

            {/*</div>*/}
        </>
    );
}


export async function getServerSideProps(context) {




    const personName = context.query.date_id[0];
    const date = context.query.date_id[1];
    const buy = context.query.date_id[2];
    const itemName = context.query.date_id[3];
    const itemPrice = context.query.date_id[4];

    const data = await fetch(`/api/getfood?date_id=${date}`);
    const receipt = await data.json();

    const didBuy = true;

    const client = await clientPromise
    const db = client.db("grocery-app");
    const updatePerson = client.db("grocery-app").collection(personName);
    const param = db.collection(date);
    const priceParam = db.collection(personName);

    const singlePerson = await db.collection("people").findOne({name: personName})
    const person = JSON.parse(JSON.stringify(singlePerson));

    const personDB = await db.collection(personName).findOne({date: "10-24-21"});
    const personCollectionOfDate = JSON.parse(JSON.stringify(personDB));


    const singleFood = await db.collection(date).findOne({foodName: itemName})
    const changeFood = JSON.parse(JSON.stringify(singleFood));
    // console.log(buy)

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
            const subtract = itemPrice / (size - 1);
            const newTotal = personDB.totalPrice - subtract
            // console.log("THIS IS THE FIRST SUBTRACT ")
            // console.log("WE ARE SUBTRACTING ")
            // console.log(itemPrice)
            // console.log(size - 1)
            // console.log(subtract)
            // console.log("TO")
            // console.log(personDB.totalPrice)
            // console.log("FOR A TOTAL OF ")
            // console.log(newTotal)
            await updateWeekTotal(buyer, date, {totalPrice: newTotal});
            await updateFalseTwo(buyer, size, itemPrice)
        }
    }

    async function updateFalseTwo(buyer, size, itemPrice) {
        //3
        const personDB = await db.collection(buyer.toString()).findOne({date: date});

        const add = itemPrice / size
        const finalTotal = personDB.totalPrice + add;
        // console.log("THIS IS THE last add ")
        // console.log("WE ARE adding ")
        // console.log(itemPrice)
        // console.log(size )
        // console.log(add)
        // console.log("TO")
        // console.log(personDB.totalPrice)
        // console.log("FOR A TOTAL OF ")
        // console.log(finalTotal)
        await updateWeekTotal(buyer, date, {totalPrice: finalTotal});

        // UPDATE FINAL TOTAL
    }


    async function updateTrue(buyer, size, itemPrice) {
        if (size == 0) {

        } else {
            const personDB = await db.collection(buyer.toString()).findOne({date: date});
            // 3 everyone goes down ITEM / SIZE + 1
            const firstSubtract = itemPrice / (size + 1)
            const newTotal = personDB.totalPrice - firstSubtract;
            // console.log("WE ARE REMOVING A PERSON")
            // console.log(buyer)
            // console.log(newTotal)
            await updateWeekTotal(buyer, date, {totalPrice: newTotal});
            await updateTrueTwo(buyer, size, itemPrice);
        }
    }

    async function updateTrueTwo(buyer, size, itemPrice) {
        const personDB = await db.collection(buyer.toString()).findOne({date: date});

        // 2 everyone goes up ITEM / SIZE
        const add = itemPrice / size
        const finalTotal = personDB.totalPrice + add;
        // console.log("FINAL ADD IS ")
        // console.log(personDB.totalPrice)
        //
        // console.log(add)
        await updateWeekTotal(buyer, date, {totalPrice: finalTotal});
    }

    if (buy === "true") {
        const array = changeFood.buy
        if (array.includes(personName)) {
            // 1 the caller person goes down ITEM / SIZE
            const firstSubtract = itemPrice / array.length;
            const newTotal = personCollectionOfDate.totalPrice - firstSubtract;
            await updateWeekTotal(personName, date, {totalPrice: newTotal});


            const changedArray = array.filter(item => item !== personName)
            await updateBuy(param, itemName, {buy: changedArray, totalPeople: changedArray.length});

            // we need to add money to the other people
            {changeFood.buy && changeFood.buy.map(buyer => {
                if (buyer.toString() !== personName) {
                    updateTrue(buyer, changedArray.length, itemPrice)
                }
            })}
        }
    } else if (buy === "false") {
        const array = changeFood.buy
        if (!array.includes(personName)) {
            array.push(personName)
            // await updateWeekTotal(updatePerson, date, {totalPrice: newTotal});
            await updateBuy(param, itemName, {buy: array, totalPeople: array.length});
            // WE need to subtract money from the other people

            // 1
            // console.log("WE ARE adding A PERSON")
            // console.log(personName)
            if (array.length === 1) {
                const firstAdd = itemPrice / (array.length)
                const firstTotal = personCollectionOfDate.totalPrice + firstAdd;
                await updateWeekTotal(personName, date, {totalPrice: firstTotal});
                // console.log("THIS IS THE FIRST ADD if size === 1")
                // console.log("WE ARE ADDING ")
                // console.log(itemPrice)
                // console.log(array.length)
                // console.log(firstAdd)
                // console.log("TO")
                // console.log(personCollectionOfDate.totalPrice)
                // console.log("FOR A TOTAL OF ")
                // console.log(firstTotal)
            } else {
                const firstAdd = (itemPrice / (array.length - 1))
                const firstTotal = personCollectionOfDate.totalPrice + firstAdd;
                await updateWeekTotal(personName, date, {totalPrice: firstTotal});
                // console.log("THIS IS THE FIRST ADD if size !=== 1")
                // console.log("WE ARE ADDING ")
                // console.log(itemPrice)
                // console.log(array.length)
                // console.log(firstAdd)
                // console.log("TO")
                // console.log(personCollectionOfDate.totalPrice)
                // console.log("FOR A TOTAL OF ")
                // console.log(firstTotal)
            }



            {changeFood.buy && changeFood.buy.map(buyer => {
                updateFalse(buyer, array.length, itemPrice)
            })}
        }



    }

    return {
        props: { person, receipt, date, didBuy, personCollectionOfDate },
    }
}