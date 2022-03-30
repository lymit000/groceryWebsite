import Head from 'next/head'
import { useState, useEffect } from 'react';
import clientPromise from '../../lib/mongodb'
import "tailwindcss/tailwind.css"

import Link from 'next/link'
import Foods from "../components/Foods";
import Dates from "../components/Dates";
import { server } from '../../config';
import {useRouter} from "next/router";

function MovieDetails({ personCollection, allReceipts, personID }) {

    const [markDone, setMarkDone] = useState(personCollection.markDone)

    const router = useRouter();
    const forceReload = () => {
        router.reload();
    }

    function refreshPage() {
        window.location.reload(false);
    }

    useEffect(() => {
    }, (allReceipts))


        return (
        <>
            {/*<div className={"max-w flex items-center justify-center"}>*/}
            {/*    <div className={"bg-background h-full w-screen "}>*/}
            {/*        <div className="bg-otherBlack text-center w-full h-12 mx-2 my-2 text-white font-mono text-4xl">*/}
            {/*            Costco Website*/}
            {/*        </div>*/}

            {/*        <div className={"text-white grid grid-cols-3 flex items-center justify-center"}>*/}
            {/*            <Link href={server + "/allDates"}>*/}
            {/*                <button className={"h-5/6 mx-2 my-2 bg-otherBlack rounded-lg flex items-center justify-center text-6xl font-mono"}>*/}
            {/*                    All Dates*/}
            {/*                </button>*/}
            {/*            </Link>*/}

            {/*            <Link href={server + "/allPeople"}>*/}
            {/*                <button className={"h-screen mx-2 my-2 bg-otherBlack rounded-lg flex items-center justify-center text-6xl font-mono"}>*/}
            {/*                    All People*/}
            {/*                </button>*/}
            {/*            </Link>*/}

            {/*            <Link href={server + "/allPeople"}>*/}
            {/*                <button className={"h-5/6 mx-2 my-2 bg-otherBlack rounded-lg flex items-center justify-center text-6xl font-mono"}>*/}
            {/*                    All Foods*/}
            {/*                </button>*/}
            {/*            </Link>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}

            {/*    <div className="grid place-items-center grid-cols-4 gap-5 justify-items-center p-2 bg-gray-200 max-w h-screen">*/}
            {/*        /!*{allReceipts && allReceipts.map(singleDate => (*!/*/}
            {/*        /!*        <>*!/*/}

            {/*        /!*            {singleDate && <Dates itemPrice={totalPrice} date={singleDate.date} personName={person.name}/>}*!/*/}

            {/*        /!*        </>*!/*/}
            {/*        /!*    ))}*!/*/}
            {/*        {personCollection && personCollection.map(singleDate => (*/}
            {/*            <>*/}
            {/*                {singleDate && <Dates itemPrice={singleDate.totalPrice} date={singleDate.date} personName={personID} markDone={singleDate.markDone}/>}*/}
            {/*            </>*/}
            {/*        ))}*/}
            {/*    </div>*/}
            <div>
                Broken
            </div>
        </>
    );
}

export async function getServerSideProps(context) {
    // const data = await db.collection("movies").find({year: 2013, 'imdb.rating': {$gt: 8}}).limit(20).toArray()
    // const movies = JSON.parse(JSON.stringify(data));
    const personID = context.query.people_id;
    const data = await fetch(server + `/api/getpeople?people_id=${personID}`);
    const personCollection = await data.json();

    // console.log(movie)

    const client = await clientPromise
    const db = await client.db("grocery-app");
    const foodData = await db.collection("food").find().toArray()
    const allReceipts = await JSON.parse(JSON.stringify(foodData));

    return {
        props: { personCollection, allReceipts, personID },

    }
}

export default MovieDetails;