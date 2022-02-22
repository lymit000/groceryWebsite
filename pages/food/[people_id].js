import Head from 'next/head'
import { useState, useEffect } from 'react';
import Profile from "../components/Profile";
import clientPromise from '../../lib/mongodb'
import "tailwindcss/tailwind.css"

import Link from 'next/link'
import Foods from "../components/Foods";
import Dates from "../components/Dates";
import { server } from '../../config';
import {useRouter} from "next/router";

function MovieDetails({ personCollection, allReceipts, personID }) {

    const [markDone, setMarkDone] = useState(personCollection.markDone)

    //
    // useEffect(() => {
    //     forceReload();
    // })


        return (
        <>
                <div className="grid place-items-center grid-cols-5 gap-5 justify-items-center p-2 bg-gray-200 max-w">
                    <button className={"bg-blue-300 font-semibold text-center rounded-3xl border shadow-lg p-2 max-w-xs"}>
                        <Link href="/">
                            <h1>
                                Back to all People
                            </h1>
                        </Link>
                    </button>
                    <p></p>
                    <Profile name={personID}/>
                    <p></p>
                </div>
            <div>
                <div className="grid place-items-center grid-cols-4 gap-5 justify-items-center p-2 bg-gray-200 max-w">
                    {/*{allReceipts && allReceipts.map(singleDate => (*/}
                    {/*        <>*/}

                    {/*            {singleDate && <Dates itemPrice={totalPrice} date={singleDate.date} personName={person.name}/>}*/}

                    {/*        </>*/}
                    {/*    ))}*/}
                    {personCollection && personCollection.map(singleDate => (
                        <>
                            {singleDate && <Dates itemPrice={singleDate.totalPrice} date={singleDate.date} personName={personID} markDone={singleDate.markDone}/>}

                        </>
                    ))}
                </div>
            </div>
        </>
    );
}

export async function getServerSideProps(context) {

    //
    // const data = await db.collection("movies").find({year: 2013, 'imdb.rating': {$gt: 8}}).limit(20).toArray()
    //
    // const movies = JSON.parse(JSON.stringify(data));

    // const data = await fetch(`http://localhost:3000/api/moviedetails?movie_id=573a1390f29313caabcd42e8`);

    // const data = await fetch(`http://localhost:3000/api/moviedetails?name=${context.query.name}`);
    const personID = context.query.people_id;
    const data = await fetch(`${server}/api/getpeople?people_id=${personID}`);
    // const data = await fetch(`http://localhost:3000/api/moviedetails?name_id=Aidan`);
    const personCollection = await data.json();

    // console.log(movie)

    const client = await clientPromise
    const db = client.db("grocery-app");
    const foodData = await db.collection("food").find().toArray()
    const allReceipts = JSON.parse(JSON.stringify(foodData));

    return {
        props: { personCollection, allReceipts, personID },

    }
}

export default MovieDetails;