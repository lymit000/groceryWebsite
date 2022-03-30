import Head from 'next/head'
import "tailwindcss/tailwind.css"
import clientPromise from '../../lib/mongodb'
import Link from "next/link";
import Dates from "../components/Dates";
import {server} from "../../config";
import Foods from "../components/Foods";
import HomeButton from "../components/HomeButton";
import ProfileLink from "../components/ProfileLink";
import ProfileLinkFlipped from "../components/ProfileLinkFlipped";

export default function Home({ Aidan, Andoni, Atay, Justin, Keshav, Kulbir, Mitchell, Nathaniel, Ridge, allPeople, query, base, personName }) {
    const allNames = ["Aidan", "Andoni", "Atay", "Justin", "Keshav", "Kulbir", "Mitchell", "Nathaniel", "Ridge"]

    let i = 1;
    let j = -1;

    function count() {
        i = i + 1;
        j = j + 1;
    }
    return (
        <div className={"max-w flex items-center justify-center"}>
            <div className={"bg-background h-screen w-screen "}>
                <div className={"grid grid-cols-3"}>
                    <HomeButton/>
                    <div></div>
                    <div className={"text-right"}>
                        <Link href={server + "/people/allPeople"}>
                            <button className={"bg-otherBlack text-primary mx-1 w-fit font-mono rounded-lg p-1"}>
                                Back to All People
                            </button>
                        </Link>
                    </div>
                </div>
                <div className="bg-otherBlack text-center w-full h-12 mx-2 my-2 text-white font-mono text-4xl">
                    {personName}
                </div>
                <div className={"grid grid-cols-3 h-full w-full bg-background text-white"}>
                    {base && base.map(singleDate => (
                        <>
                            <ProfileLinkFlipped link={server + "food/" + personName + "/" + singleDate.date} totalPrice={singleDate.totalPrice} date={singleDate.date} Name={personName} markDone={singleDate.markDone}/>
                        </>
                    ))}
                </div>
            </div>

        </div>
    )
}


export async function getServerSideProps(context) {
    const query = context.query.single_person;


    const date = context.query.single_person[0];
    const personName = context.query.single_person[0];

    console.log(personName);
    const client = await clientPromise
    const db = client.db("grocery-app");

    const data = await db.collection("people").find().toArray()
    const allPeople = await JSON.parse(JSON.stringify(data));

    const aidanDB = await db.collection("Aidan").findOne({date: query});
    const Aidan = await JSON.parse(JSON.stringify(aidanDB));

    const andoniDB = await db.collection("Andoni").findOne({date: query});
    const Andoni = await JSON.parse(JSON.stringify(andoniDB));

    const atayDB = await db.collection("Atay").findOne({date: query});
    const Atay = await JSON.parse(JSON.stringify(atayDB));

    const justinDB = await db.collection("Justin").findOne({date: query});
    const Justin = await JSON.parse(JSON.stringify(justinDB));

    const keshavDB = await db.collection("Keshav").findOne({date: query});
    const Keshav = await JSON.parse(JSON.stringify(keshavDB));

    const kulbirDB = await db.collection("Kulbir").findOne({date: query});
    const Kulbir = await JSON.parse(JSON.stringify(kulbirDB));

    const mitchellDB = await db.collection("Mitchell").findOne({date: query});
    const Mitchell = await JSON.parse(JSON.stringify(mitchellDB));

    const baseDB = await db.collection(personName).find().toArray();
    const  base = await JSON.parse(JSON.stringify(baseDB));
    console.log(base);

    const nathanielDB = await db.collection("Nathaniel").findOne({date: query});
    const Nathaniel = await JSON.parse(JSON.stringify(nathanielDB));

    const ridgeDB = await db.collection("Ridge").findOne({date: query});
    const Ridge = await JSON.parse(JSON.stringify(ridgeDB));


    // const data = await fetch(`http://localhost:3000/api/moviedetails?movie_id=573a1390f29313caabcd42e8`);

    // const data = await fetch(`http://localhost:3000/api/moviedetails?movie_id=${context.query.movie_id}`);
    // const movie = await data.json();

    // console.log(movie)

    return {
        props: { Aidan, Andoni, Atay, Justin, Keshav, Kulbir, Mitchell, Nathaniel, Ridge, allPeople, query, base, personName },
    }
}
