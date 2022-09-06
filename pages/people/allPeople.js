import "tailwindcss/tailwind.css"
import HomeButton from "../components/HomeButton";
import NoProfile from "../components/NoProfile";
import clientPromise from "../../lib/mongodb";
import ProfileLinkFlipped from "../components/ProfileLinkFlipped";
import {server} from "../../config";
import Link from "next/link";

export default function Home({Aidan, Andoni, Atay, Justin, Mitchell, John, Sam, Zach}) {

    // const allNames = ["Aidan", "Andoni", "Atay", "Justin", "Keshav", "Kulbir", "Mitchell", "Nathaniel", "Ridge"]
    //

    let singleTotal = 0;
    function computeTotal(newPrice) {
        singleTotal = singleTotal + newPrice;
    }

    function reset() {
        singleTotal = 0;
    }
    return (
        <div className={"h-full w-screen "}>
            <div className={"bg-grayBackground p-2 grid-cols-3 grid"}>
                <HomeButton/>
                <div></div>
                <div className={"flex justify-end"}>
                    <Link href={server + "dates/allDates"} passHref>
                        <button className={"bg-greenBackground text-yellowFont mx-1 w-fit rounded-lg p-2"}>
                            Go to All Dates
                        </button>
                    </Link>
                </div>
            </div>


            <div className={"bg-whiteBackground h-screen grid grid-cols-3 flex items-center justify-center text-white"}>
                {Aidan && Aidan.map(singleDate => (
                    <>
                        {singleDate.markDone && computeTotal(singleDate.totalPrice)}
                    </>
                ))}
                <NoProfile Name={"Aidan"} totalPrice={Math.round((singleTotal) * 100) / 100}/>
                {reset()}
                {Andoni && Andoni.map(singleDate => (
                    <>
                        {singleDate.markDone && computeTotal(singleDate.totalPrice)}
                    </>
                ))}
                <NoProfile Name={"Andoni"} totalPrice={Math.round((singleTotal) * 100) / 100}/>
                {reset()}
                {John && John.map(singleDate => (
                    <>
                        {singleDate.markDone && computeTotal(singleDate.totalPrice)}
                    </>
                ))}
                <NoProfile Name={"John"} totalPrice={Math.round((singleTotal) * 100) / 100}/>
                {reset()}
                {Justin && Justin.map(singleDate => (
                    <>
                        {singleDate.markDone && computeTotal(singleDate.totalPrice)}
                    </>
                ))}
                <NoProfile Name={"Justin"} totalPrice={Math.round((singleTotal) * 100) / 100}/>
                {reset()}
                {/*{Keshav && Keshav.map(singleDate => (*/}
                {/*    <>*/}
                {/*        {singleDate.markDone && computeTotal(singleDate.totalPrice)}*/}
                {/*    </>*/}
                {/*))}*/}
                {/*<NoProfile Name={"Keshav"} totalPrice={Math.round((singleTotal) * 100) / 100}/>*/}
                {/*{reset()}*/}
                {/*{Kulbir && Kulbir.map(singleDate => (*/}
                {/*    <>*/}
                {/*        {singleDate.markDone && computeTotal(singleDate.totalPrice)}*/}
                {/*    </>*/}
                {/*))}*/}
                {/*<NoProfile Name={"Kulbir"} totalPrice={Math.round((singleTotal) * 100) / 100}/>*/}
                {/*{reset()}*/}
                {Mitchell && Mitchell.map(singleDate => (
                    <>
                        {singleDate.markDone && computeTotal(singleDate.totalPrice)}
                    </>
                ))}
                <NoProfile Name={"Mitchell"} totalPrice={Math.round((singleTotal) * 100) / 100}/>
                {reset()}
                {Sam && Sam.map(singleDate => (
                    <>
                        {singleDate.markDone && computeTotal(singleDate.totalPrice)}
                    </>
                ))}
                <NoProfile Name={"Sam"} totalPrice={Math.round((singleTotal) * 100) / 100}/>
                {reset()}
                {Zach && Zach.map(singleDate => (
                    <>
                        {singleDate.markDone && computeTotal(singleDate.totalPrice)}
                    </>
                ))}
                <NoProfile Name={"Zach"} totalPrice={Math.round((singleTotal) * 100) / 100}/>
                {reset()}

            </div>
        </div>
        )
}

export async function getServerSideProps(context) {
    const client = await clientPromise
    const db = client.db("grocery-app");
    //
    const aidanDB = await db.collection("Aidan").find().toArray();
    const Aidan = await JSON.parse(JSON.stringify(aidanDB));

    const andoniDB = await db.collection("Andoni").find().toArray();
    const Andoni = await JSON.parse(JSON.stringify(andoniDB));

    // const atayDB = await db.collection("Atay").find().toArray();
    // const Atay = await JSON.parse(JSON.stringify(atayDB));

    const justinDB = await db.collection("Justin").find().toArray();
    const Justin = await JSON.parse(JSON.stringify(justinDB));

    // const keshavDB = await db.collection("Keshav").find().toArray();
    // const Keshav = await JSON.parse(JSON.stringify(keshavDB));
    //
    // const kulbirDB = await db.collection("Kulbir").find().toArray();
    // const Kulbir = await JSON.parse(JSON.stringify(kulbirDB));

    const mitchellDB = await db.collection("Mitchell").find().toArray();
    const Mitchell = await JSON.parse(JSON.stringify(mitchellDB));

    // const nathanielDB = await db.collection("Nathaniel").find().toArray();
    // const Nathaniel = await JSON.parse(JSON.stringify(nathanielDB));
    //
    // const ridgeDB = await db.collection("Ridge").find().toArray();
    // const Ridge = await JSON.parse(JSON.stringify(ridgeDB));

    const johnDB = await db.collection("John").find().toArray();
    const John = await JSON.parse(JSON.stringify(johnDB));

    const samDB = await db.collection("Sam").find().toArray();
    const Sam = await JSON.parse(JSON.stringify(samDB));

    const zachDB = await db.collection("Zach").find().toArray();
    const Zach = await JSON.parse(JSON.stringify(zachDB));

    return {
        props: { Aidan, Andoni, Justin, Mitchell, John, Sam, Zach },
    }
}


