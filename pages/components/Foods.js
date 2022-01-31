import Link from "next/link";
import { useState, useEffect } from 'react';
import clientPromise from "../../lib/mongodb";
// import clientPromise from '../../lib/mongodb'
import { useRouter } from "next/router";
import Router from 'next/router'


function Foods(props, { person, receipt, date, didBuy }) {

    const [ bought, setBought ] = useState(props.buy);
    const [ buyButton, setBuyButton ] = useState("");



    useEffect(() => {
        if (bought === false ) {
            setBuyButton("bg-red-600 px-1 py-1 mt-4 rounded-3xl text-gray-100 font-semibold uppercase tracking-wide")
        } else if (bought === true) {
            setBuyButton("bg-green-600 px-1 py-1 mt-4 rounded-3xl text-gray-100 font-semibold uppercase tracking-wide")
        }

    }, [bought]);
    async function handleButton() {
        if (!bought) {
            {!bought && setBought(true), setBuyButton("bg-green-600 px-1 py-1 mt-4 rounded-3xl text-gray-100 font-semibold uppercase tracking-wide")}
        } else {
            {bought && setBought(false), setBuyButton("bg-red-600 px-1 py-1 mt-4 rounded-3xl text-gray-100 font-semibold uppercase tracking-wide")}
        }

        // await updateListingsByName(client, "Chicken Breasts", "Chickenn")
    }

    // async function updateListingsByName(client, nameOfListing, updatedListing) {
    //     const result = receipt.updateOne({name: nameOfListing}, { $set: updatedListing});
    // }

    return (
        <div className="flex items-center justify-center ">
            <div className="bg-white font-semibold text-center rounded-3xl border shadow-lg p-10 max-w-xs">
                <h1 className="text-lg text-gray-700"> {props.foodName} </h1>
                <h3 className="text-sm text-gray-400 ">  ${props.foodPrice} </h3>
                <button className={buyButton} onClick={handleButton}>
                    {/*<Link href={`http://localhost:3000/food/${props.personName}/${props.date}/${bought}/${props.foodName}/${props.foodPrice}`}>*/}
                    <Link href={`/food/${props.personName}/${props.date}/${bought}/${props.foodName}/${props.foodPrice}`} scroll={false}>

                    <h1>
                            Buy
                        </h1>
                    </Link>
                </button>
                {props.buy &&
                <p>
                    ${(props.foodPrice / (props.totalPeople))} per person
                </p>}
            </div>
        </div>
    )
}

export default Foods;

export async function getServerSideProps(context) {
    // const protocol = context.headers['x-forwarded-proto'] || 'http'
    // const baseUrl = context ? `${protocol}://${req.headers.host}` : ''

    async function updateListingsByName(client, nameOfListing, updatedListing) {
        const result = await param.updateOne({foodName: nameOfListing}, { $set: updatedListing});
    }
    const personName = context.query.date_id[0];
    const date = context.query.date_id[1];
    const buy = context.query.date_id[2];
    const itemName = context.query.date_id[3];
    const { URL } = process.env;
    const data = await fetch(URL + `/api/getfood?date_id=${date}`);
    const receipt = await data.json();

    const didBuy = true;

    const client = await clientPromise
    const db = client.db("grocery-app");
    const param = db.collection(date);
    const singlePerson = await db.collection("people").findOne({name: personName})
    const person = JSON.parse(JSON.stringify(singlePerson));

    const singleFood = await db.collection(date).findOne({foodName: itemName})
    const changeFood = JSON.parse(JSON.stringify(singleFood));
    // console.log(buy)
    if (buy === "true") {

        const array = changeFood.buy
        const changedArray = array.filter(item => item !== personName)
        // console.log(changedArray)
        await updateListingsByName(param, itemName, {buy: changedArray, totalPeople: changedArray.length});
    } else if (buy === "false") {
        const array = changeFood.buy
        if (!array.includes(personName)) {
            array.push(personName)
        }
        console.log("food")

        await updateListingsByName(param, itemName, {buy: array, totalPeople: array.length});
    }

    return {
        props: { person, receipt, date, didBuy },

    }
}