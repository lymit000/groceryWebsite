import Head from 'next/head'
import "tailwindcss/tailwind.css"
import clientPromise from '../../lib/mongodb'
import Link from "next/link";
import Dates from "../components/Dates";
import {server} from "../../config";
import Foods from "../components/Foods";
import CardDate from "../components/CardDate";
import HomeButton from "../components/HomeButton";
import NoCash from "../components/NoCash";
import ProfileLink from "../components/ProfileLink";


export default function Home({ Aidan, Andoni, Atay, Justin, Keshav, Kulbir, Mitchell, Nathaniel, Ridge, allPeople, query, base }) {
    const allNames = ["Aidan", "Andoni", "Atay", "Justin", "Keshav", "Kulbir", "Mitchell", "Nathaniel", "Ridge"]
    let i = 1;
    let j = -1;

    function count() {
        i = i + 1;
        j = j + 1;
    }
    function reset() {
        i = 1;
        j = -1;
    }
    return (
        <div className={"bg-background h-screen w-screen text-center"}>
            {/*<div className={"grid grid-cols-3"}>*/}
            {/*    <HomeButton/>*/}
            {/*    <div></div>*/}
            {/*    <div className={"text-right"}>*/}
            {/*        <Link href={server + "" +*/}
            {/*            "dates/allDates#1"} passHref>*/}
            {/*            <button className={"bg-otherBlack text-primary mx-1 w-fit font-mono rounded-lg p-1"}>*/}
            {/*                Back to All Dates*/}
            {/*            </button>*/}
            {/*        </Link>*/}
            {/*    </div>*/}

            {/*</div>*/}

            {/*<div className="carousel w-full">*/}
            {/*    <div id={"1"} className="carousel-item relative w-full">*/}
            {/*        <Link href={"dates/allDates"} passHref>*/}
            {/*            <button className={"text-white w-full rounded-3xl mx-3"}>*/}
            {/*                <div className="flex items-center justify-center mx-20  font-mono h-full text-center bg-otherBlack rounded-3xl">*/}
            {/*                    <p1 className={"items-center justify-center h-max text-6xl text-otherBlack"}> All Dates <br/> </p1>*/}
            {/*                </div>*/}
            {/*            </button>*/}
            {/*        </Link>*/}
            {/*        {count()}*/}
            {/*        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">*/}
            {/*            <a href={"#0"} passHref className="btn btn-circle" >❮</a>*/}
            {/*            <a href={server + "dates/allDates" } passHref className={"bg-primary rounded-xl p-1 text-6xl text-white font-mono"}> {"All Dates"}</a>*/}

            {/*            <a href={"#2"} passHref className="btn btn-circle">❯</a>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*    {base && base.map(singleDate => (*/}
            {/*        // <div id={i.toString()} className="carousel-item relative w-full">*/}
            {/*        <div id={"test"} className="carousel-item relative w-full" key={"test"}>*/}

            {/*        <CardDate  totalPrice={singleDate.totalPrice}/>*/}
            {/*            {count()}*/}
            {/*            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">*/}
            {/*                <a href={"#"+j} className="btn btn-circle" passHref>❮</a>*/}
            {/*                <a href={server + "dates/" + singleDate.date + "#" + (j + 1)} passHref className={"bg-primary rounded-xl p-1 text-6xl text-white font-mono"}> {singleDate.date}</a>*/}

            {/*                <a href={"#"+i} passHref className="btn btn-circle">❯</a>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    ))}*/}
            {/*</div>*/}

            {/*{reset()}*/}
            {/*<div className={"h-screen grid grid-cols-3 text-white bg-background"}>*/}
            {/*    {query == "allDates" ? (*/}
            {/*        <>*/}
            {/*        {base.map(singleDates => (*/}
            {/*            <>*/}
            {/*            {count()}*/}
            {/*            <NoCash Name={singleDates.date} i={i} />*/}
            {/*            </>*/}

            {/*        ))}*/}
            {/*        </>*/}
            {/*    ) : (*/}
            {/*        <>*/}
            {/*            <ProfileLink link={server + "food/Aidan/" + Aidan.date} totalPrice={Aidan.totalPrice} date={Aidan.date} Name={"Aidan"} markDone={Aidan.markDone}/>*/}
            {/*            <ProfileLink link={server + "food/Andoni/" + Andoni.date} totalPrice={Andoni.totalPrice} date={Andoni.date} Name={"Andoni"} markDone={Andoni.markDone}/>*/}
            {/*            <ProfileLink link={server + "food/Atay/" + Atay.date} totalPrice={Atay.totalPrice} date={Atay.date} Name={"Atay"} markDone={Atay.markDone}/>*/}
            {/*            <ProfileLink link={server + "food/Justin" + Justin.date} totalPrice={Justin.totalPrice} date={Justin.date} Name={"Justin"} markDone={Justin.markDone}/>*/}
            {/*            <ProfileLink link={server + "food/Keshav/" + Keshav.date} totalPrice={Keshav.totalPrice} date={Keshav.date} Name={"Keshav"} markDone={Keshav.markDone}/>*/}
            {/*            <ProfileLink link={server + "food/Kulbir/" + Kulbir.date} totalPrice={Kulbir.totalPrice} date={Kulbir.date} Name={"Kulbir"} markDone={Kulbir.markDone}/>*/}
            {/*            <ProfileLink link={server + "food/Mitchell/" + Mitchell.date} totalPrice={Mitchell.totalPrice} date={Mitchell.date} Name={"Mitchell"} markDone={Mitchell.markDone}/>*/}
            {/*            <ProfileLink link={server + "food/Nathaniel/" + Nathaniel.date} totalPrice={Nathaniel.totalPrice} date={Nathaniel.date} Name={"Nathaniel"} markDone={Nathaniel.markDone}/>*/}
            {/*            <ProfileLink link={server + "food/Ridge/" + Ridge.date} totalPrice={Ridge.totalPrice} date={Ridge.date} Name={"Ridge"} markDone={Ridge.markDone}/>*/}
            {/*        </>*/}
            {/*        )}*/}

            {/*</div>*/}
        </div>
    )
}


export async function getServerSideProps(context) {
    const query = context.query.all_dates;


    const personName = context.query
    const date = context.query.all_dates[1];

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

    const baseDB = await db.collection("Aidan").find().toArray();
    const  base = await JSON.parse(JSON.stringify(baseDB));

    const nathanielDB = await db.collection("Nathaniel").findOne({date: query});
    const Nathaniel = await JSON.parse(JSON.stringify(nathanielDB));

    const ridgeDB = await db.collection("Ridge").findOne({date: query});
    const Ridge = await JSON.parse(JSON.stringify(ridgeDB));


    // const data = await fetch(`http://localhost:3000/api/moviedetails?movie_id=573a1390f29313caabcd42e8`);

    // const data = await fetch(`http://localhost:3000/api/moviedetails?movie_id=${context.query.movie_id}`);
    // const movie = await data.json();

    // console.log(movie)

    return {
        props: { Aidan, Andoni, Atay, Justin, Keshav, Kulbir, Mitchell, Nathaniel, Ridge, allPeople, query, base },
    }
}
