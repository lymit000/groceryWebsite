import Head from 'next/head'
import "tailwindcss/tailwind.css"
import clientPromise from '../lib/mongodb'
import Link from "next/link";
import Profile from "./components/Profile";
import Dates from "./components/Dates";
import {server} from "../config";
import Foods from "./components/Foods";


export default function Home({ Aidan, Andoni, Atay, Justin, Keshav, Kulbir, Mitchell, Nathaniel, Ridge, allPeople, query, base }) {
    let totalPrice = 0;

    let peopleArray = ["Aidan", "Andoni", "Atay", "Justin", "Keshav", "Kulbir", "Mitchell", "Nathaniel", "Ridge"]

    function calculateTotal(otherPrice, flag, totalPeople) {
        if (flag) {
            totalPrice = (otherPrice / totalPeople) + totalPrice
        }
    }
    return (
        <>
            <div className={"bg-blue-800 grid place-items-center grid-cols-11 gap-5 justify-items-center p-2 bg-gray-200 max-w"}>
                <div>
                    <button className={"flex place-items-center items-center justify-items-center bg-blue-600 rounded-xl p-3"}>
                        <Link href={server + "/"}>
                            Home Page
                        </Link>
                    </button>
                </div>

                <div className={"text-4xl"}>
                    <h1>

                    </h1>
                </div>
                <div className={"text-4xl"}>
                    <h1>

                    </h1>
                </div>
                <div className={"text-4xl"}>
                    <h1>

                    </h1>
                </div>
                <div className={"text-4xl"}>
                    <h1>

                    </h1>
                </div>
                <div className={"text-2xl font-bold"}>
                    <h1>
                        {query}
                    </h1>
                </div>
            </div>

            <div class={"relative min-h-screen flex"}>
                <div class={"bg-gray-600 text-gray-900 h-screen w-32 grid place-items-center grid-cols-1 justify-items-center p-2 bg-gray-200 h-screen "}>
                    {/*<button className={"flex place-items-center items-center justify-items-center bg-gray-100 rounded-xl p-3"}>*/}
                    {/*    <Link href={server + "/house/message"}>*/}
                    {/*        House*/}
                    {/*    </Link>*/}
                    {/*</button>*/}

                    {base && base.map(singleDate => (
                        <>
                            {/*<h1>SIDEBARALLDATES</h1>*/}
                            <button className={"flex place-items-center items-center justify-items-center bg-gray-100 rounded-xl p-3"}>
                                <Link href={server + "/" + singleDate.date}>
                                    {singleDate && singleDate.date}
                                </Link>
                            </button>
                        </>
                    ))}
                </div>


                <div className={"w-screen"}>
                    <div className="grid place-items-center grid-cols-3 gap-5 justify-items-center p-2 bg-gray-200 h-screen">
                        <div className={"bg-gray-300 font-semibold text-center rounded-3xl border shadow-lg p-2 max-w-xs"}>
                            Aidan
                            <Dates itemPrice={Aidan.totalPrice} date={Aidan.date} personName={"Aidan"} markDone={Aidan.markDone}/>
                        </div>

                        <div className={"bg-gray-300 font-semibold text-center rounded-3xl border shadow-lg p-2 max-w-xs"}>
                            Andoni
                            <Dates itemPrice={Andoni.totalPrice} date={Andoni.date} personName={"Andoni"} markDone={Andoni.markDone}/>
                        </div>

                        <div className={"bg-gray-300 font-semibold text-center rounded-3xl border shadow-lg p-2 max-w-xs"}>
                            Atay
                            <Dates itemPrice={Atay.totalPrice} date={Atay.date} personName={"Atay"} markDone={Atay.markDone}/>
                        </div>

                        <div className={"bg-gray-300 font-semibold text-center rounded-3xl border shadow-lg p-2 max-w-xs"}>
                            Justin
                            <Dates itemPrice={Justin.totalPrice} date={Justin.date} personName={"Justin"} markDone={Justin.markDone}/>
                        </div>

                        <div className={"bg-gray-300 font-semibold text-center rounded-3xl border shadow-lg p-2 max-w-xs"}>
                            Keshav
                            <Dates itemPrice={Keshav.totalPrice} date={Keshav.date} personName={"Keshav"} markDone={Keshav.markDone}/>
                        </div>

                        <div className={"bg-gray-300 font-semibold text-center rounded-3xl border shadow-lg p-2 max-w-xs"}>
                            Kulbir
                            <Dates itemPrice={Kulbir.totalPrice} date={Kulbir.date} personName={"Kulbir"} markDone={Kulbir.markDone}/>
                        </div>
                        <div className={"bg-gray-300 font-semibold text-center rounded-3xl border shadow-lg p-2 max-w-xs"}>
                            Mitchell
                            <Dates itemPrice={Mitchell.totalPrice} date={Mitchell.date} personName={"Mitchell"} markDone={Mitchell.markDone}/>
                        </div>

                        <div className={"bg-gray-300 font-semibold text-center rounded-3xl border shadow-lg p-2 max-w-xs"}>
                            Nathaniel
                            <Dates itemPrice={Nathaniel.totalPrice} date={Nathaniel.date} personName={"Nathaniel"} markDone={Nathaniel.markDone}/>
                        </div>
                        <div className={"bg-gray-300 font-semibold text-center rounded-3xl border shadow-lg p-2 max-w-xs"}>
                            Ridge
                            <Dates itemPrice={Ridge.totalPrice} date={Ridge.date} personName={"Ridge"} markDone={Ridge.markDone}/>
                        </div>
                    </div>
                </div>

            </div>
        </>

    )
}


export async function getServerSideProps(context) {
    const query = context.query.side_bar;

    const client = await clientPromise
    const db = client.db("grocery-app");
    //
    const data = await db.collection("people").find().toArray()
    //
    const allPeople = JSON.parse(JSON.stringify(data));

    const aidanDB = await db.collection("Aidan").findOne({date: query});
    const Aidan = JSON.parse(JSON.stringify(aidanDB));

    const andoniDB = await db.collection("Andoni").findOne({date: query});
    const Andoni = JSON.parse(JSON.stringify(andoniDB));

    const atayDB = await db.collection("Atay").findOne({date: query});
    const Atay = JSON.parse(JSON.stringify(atayDB));

    const justinDB = await db.collection("Justin").findOne({date: query});
    const Justin = JSON.parse(JSON.stringify(justinDB));

    const keshavDB = await db.collection("Keshav").findOne({date: query});
    const Keshav = JSON.parse(JSON.stringify(keshavDB));

    const kulbirDB = await db.collection("Kulbir").findOne({date: query});
    const Kulbir = JSON.parse(JSON.stringify(kulbirDB));

    const mitchellDB = await db.collection("Mitchell").findOne({date: query});
    const Mitchell = JSON.parse(JSON.stringify(mitchellDB));

    const baseDB = await db.collection("Aidan").find().toArray();
    const  base = JSON.parse(JSON.stringify(baseDB));

    const nathanielDB = await db.collection("Nathaniel").findOne({date: query});
    const Nathaniel = JSON.parse(JSON.stringify(nathanielDB));

    const ridgeDB = await db.collection("Ridge").findOne({date: query});
    const Ridge = JSON.parse(JSON.stringify(ridgeDB));


    // const data = await fetch(`http://localhost:3000/api/moviedetails?movie_id=573a1390f29313caabcd42e8`);

    // const data = await fetch(`http://localhost:3000/api/moviedetails?movie_id=${context.query.movie_id}`);
    // const movie = await data.json();

    // console.log(movie)

    return {
        props: { Aidan, Andoni, Atay, Justin, Keshav, Kulbir, Mitchell, Nathaniel, Ridge, allPeople, query, base },
    }
}
