import Head from 'next/head'
import { useState, useEffect } from 'react';
import clientPromise from '../../lib/mongodb'
import Link from 'next/link'
import Foods from "../components/Foods";
import Dates from "../components/Dates";
import log from "tailwindcss/lib/util/log";
import "tailwindcss/tailwind.css"
import { server } from '../../config';
import {render} from "react-dom";
import dates from "../components/Dates";
import HomeButton from "../components/HomeButton";
import NameHeader from "../components/NameHeader";

function MovieDetails({ personName, personOfDate, receiptOfDate, date}) {

    return (
            <div className={"bg-background h-screen w-screen "}>
                <div className={"grid grid-cols-3"}>
                    <HomeButton/>
                    <div></div>
                    <div className={"text-right"}>
                        <Link href={server + "people/" + personName} passHref>
                            <button className={"bg-otherBlack text-primary mx-1 w-fit font-mono rounded-lg p-1"}>
                                Back to {personName}
                            </button>
                        </Link>
                    </div>
                </div>

            <div className={"text-white w-full rounded-3xl mx-3"}>
                <div className="flex items-center justify-center mx-20 text-6xl font-mono h-full text-center bg-otherBlack rounded-3xl">
                    <NameHeader Name={personName} totalPrice={personOfDate.totalPrice} date={date} buy={personOfDate.markDone}/>
                </div>
            </div>
            <div className={"grid grid-cols-4 bg-background"}>
                {receiptOfDate && receiptOfDate.map(item => (
                    <>
                        <div>
                            <Foods foodName={item.foodName} foodPrice={item.foodPrice} personName={personName} buy={JSON.parse(JSON.stringify(item.buy)).includes(personName)} date={personOfDate.date} totalPeople={item.totalPeople} img={item.img}/>
                        </div>
                    </>
                ))}


            </div>
            </div>

    );
}


export async function getServerSideProps(context) {
    const client = await clientPromise
    const entireDB = await client.db("grocery-app");

    const personName = context.query.date_id[0];
    const date = context.query.date_id[1];
    const collectionReceipt = await entireDB.collection(date)
    const collectionAllItemsOnReceipt = await collectionReceipt.find().toArray();
    const receiptOfDate = await JSON.parse(JSON.stringify(collectionAllItemsOnReceipt));

    const collectionPerson = await entireDB.collection(personName)
    const collectionPersonOfDate = await collectionPerson.findOne({date: date});
    const personOfDate = await JSON.parse(JSON.stringify(collectionPersonOfDate));


    let totalPrice = 0;

    function calculateTotal(otherPrice, flag, totalPeople) {
        if (flag) {
            totalPrice = Math.round(((otherPrice / totalPeople) + totalPrice) * 100) / 100

            console.log()
        }
    }


    {receiptOfDate && receiptOfDate.map(item => (
        <>
            {calculateTotal(item.foodPrice, JSON.parse(JSON.stringify(item.buy)).includes(personName), item.totalPeople)}
            {/*{item.totalPeople}*/}
            {/*{console.log(item.foodPrice)}*/}
        </>
    ))}

    const result = await client.db("grocery-app").collection(personName).updateOne({date: date}, { $set: {totalPrice: totalPrice}});

    return {
        props: { personName, personOfDate, receiptOfDate, date},
    }
}

export default MovieDetails;