import "tailwindcss/tailwind.css"
import clientPromise from '../../lib/mongodb'
import HomeButton from "../components/HomeButton";
import Link from "next/link";
import {server} from "../../config";
import CardDate from "../components/CardDate";
import ProfileLink from "../components/ProfileLink";
import NoCash from "../components/NoCash";


export default function Home({ Aidan, Andoni, Atay, Justin, Mitchell, John, Sam, Zach, base, query }) {
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
        <div className={"bg-whiteBackground h-screen w-screen text-center"}>
            <div className={"grid bg-grayBackground grid-cols-3 p-2 mb-2"}>
                <HomeButton/>
                <div></div>
                <div className={"text-right"}>
                    <Link href={server + "people/allPeople"} passHref>
                        <button className={"bg-greenBackground text-yellowFont mx-1 w-fit rounded-lg p-2"}>
                            Go to All People
                        </button>
                    </Link>
                </div>

            </div>

            <div className="carousel w-full">
                <div id={"1"} className="carousel-item relative w-full">
                    <Link href={"dates/allDates"} passHref>
                        <button className={"h-full w-full text-white w-full rounded-3xl mx-3"}>
                            <div className="flex items-center justify-center mx-20  font-mono h-full text-center  border-greenBackground rounded-3xl">
                                <p1 className={"items-center justify-center h-max text-4xl text-otherBlack p-5"}> All Dates <br/> </p1>
                            </div>
                        </button>
                    </Link>
                    {count()}
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                        <a href={"#0"} passHref className="my-2 btn btn-circle bg-whiteBackground border-4 border-greenBackground hover:bg-greenBackground hover:border-0" >❮</a>
                        <a href={server + "dates/allDates" } passHref className={"border-2 p-4 border-greenBackground rounded-xl p-1 text-4xl text-yellowFont bg-greenBackground font-mono"}> {"All Dates"}</a>
                        <a href={"#2"} passHref className="my-2 btn btn-circle bg-whiteBackground border-4 border-greenBackground hover:bg-greenBackground hover:border-0">❯</a>
                    </div>
                </div>
                {base && base.map(singleDate => (
                    <div id={i.toString()} className="carousel-item relative w-full" key={"test"}>
                    {/*<div id={"test"} className="carousel-item relative w-full" key={"test"}>*/}

                    <CardDate  totalPrice={singleDate.totalPrice}/>
                        {count()}
                        <div className="absolute bg-whiteBackground p-1 flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                            <a href={"#"+j} className="my-2 btn btn-circle bg-whiteBackground border-4 border-greenBackground hover:bg-greenBackground hover:border-0" passHref>❮</a>
                            <a href={server + "dates/" + singleDate.date + "#" + (j + 1)} passHref className={"border-2 p-4 border-greenBackground rounded-xl p-1 text-4xl text-yellowFont bg-greenBackground font-mono"}> {singleDate.date}</a>

                            <a href={"#"+i} passHref className="my-2 btn btn-circle bg-whiteBackground border-4 border-greenBackground hover:bg-greenBackground hover:border-0">❯</a>
                        </div>
                    </div>
                ))}
            </div>

            {reset()}
            <div className={"h-screen grid grid-cols-3 gap-10 p-2 text-white bg-whiteBackground"}>
                {query === "allDates" ? (
                    <>
                    {base.map(singleDates => (
                        <>
                        {count()}
                        <NoCash Name={singleDates.date} i={i} />
                        </>

                    ))}
                    </>
                ) : (
                    <>
                        <ProfileLink totalPrice={Aidan.totalPrice} date={Aidan.date} Name={"Aidan"} markDone={Aidan.markDone}/>
                        <ProfileLink totalPrice={Andoni.totalPrice} date={Andoni.date} Name={"Andoni"} markDone={Andoni.markDone}/>
                        <ProfileLink totalPrice={John.totalPrice} date={John.date} Name={"John"} markDone={John.markDone}/>
                        <ProfileLink totalPrice={Justin.totalPrice} date={Justin.date} Name={"Justin"} markDone={Justin.markDone}/>
                        {/*<ProfileLink totalPrice={Keshav.totalPrice} date={Keshav.date} Name={"Keshav"} markDone={Keshav.markDone}/>*/}
                        {/*<ProfileLink totalPrice={Kulbir.totalPrice} date={Kulbir.date} Name={"Kulbir"} markDone={Kulbir.markDone}/>*/}
                        <ProfileLink totalPrice={Mitchell.totalPrice} date={Mitchell.date} Name={"Mitchell"} markDone={Mitchell.markDone}/>
                        <ProfileLink totalPrice={Sam.totalPrice} date={Sam.date} Name={"Sam"} markDone={Sam.markDone}/>
                        <ProfileLink totalPrice={Zach.totalPrice} date={Zach.date} Name={"Zach"} markDone={Zach.markDone}/>
                    </>
                    )}

            </div>
        </div>
    )
}


export async function getServerSideProps(context) {

    const query = context.query.all_dates;
    const personName = context.query
    const client = await clientPromise
    const db = client.db("grocery-app");
    const baseDB = await db.collection("Aidan").find().toArray();
    const base = await JSON.parse(JSON.stringify(baseDB));

    const aidanDB = await db.collection("Aidan").findOne({date: query});
    const Aidan = await JSON.parse(JSON.stringify(aidanDB));

    const andoniDB = await db.collection("Andoni").findOne({date: query});
    const Andoni = await JSON.parse(JSON.stringify(andoniDB));

    // const atayDB = await db.collection("Atay").findOne({date: query});
    // const Atay = await JSON.parse(JSON.stringify(atayDB));

    const justinDB = await db.collection("Justin").findOne({date: query});
    const Justin = await JSON.parse(JSON.stringify(justinDB));

    // const keshavDB = await db.collection("Keshav").findOne({date: query});
    // const Keshav = await JSON.parse(JSON.stringify(keshavDB));
    //
    // const kulbirDB = await db.collection("Kulbir").findOne({date: query});
    // const Kulbir = await JSON.parse(JSON.stringify(kulbirDB));

    const mitchellDB = await db.collection("Mitchell").findOne({date: query});
    const Mitchell = await JSON.parse(JSON.stringify(mitchellDB));

    // const nathanielDB = await db.collection("Nathaniel").findOne({date: query});
    // const Nathaniel = await JSON.parse(JSON.stringify(nathanielDB));
    //
    // const ridgeDB = await db.collection("Ridge").findOne({date: query});
    // const Ridge = await JSON.parse(JSON.stringify(ridgeDB));

    const johnDB = await db.collection("John").findOne({date: query});
    const John = await JSON.parse(JSON.stringify(johnDB));

    const samDB = await db.collection("Sam").findOne({date: query});
    const Sam = await JSON.parse(JSON.stringify(samDB));

    const zachDB = await db.collection("Zach").findOne({date: query});
    const Zach = await JSON.parse(JSON.stringify(zachDB));
    return {
        props: { Aidan, Andoni, John, Justin, Mitchell, Sam, Zach, base, query},
    }
}
