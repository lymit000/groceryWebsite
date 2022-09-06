import "tailwindcss/tailwind.css"
import clientPromise from '../../lib/mongodb'
import Link from "next/link";
import {server} from "../../config";
import HomeButton from "../components/HomeButton";
import ProfileLinkFlipped from "../components/ProfileLinkFlipped";
import ProfileLink from "../components/ProfileLink";
export default function Home({ Aidan, Andoni, Atay, Justin, Keshav, Kulbir, Mitchell, Nathaniel, Ridge, allPeople, query, base, personName }) {

    return (
        <div className={"max-w flex items-center justify-center"}>
            <div className={"bg-whiteBackground h-screen w-screen "}>
                <div className={"grid bg-grayBackground grid-cols-3 p-2"}>
                    <HomeButton/>
                    <div className={"text-center flex justify-center place-items-center text-7xl font-bold text-greenFont"}>
                        {personName}
                    </div>
                    <div className={"text-right"}>
                        <Link href={server + "people/allPeople"} passHref>
                            <button className={"bg-greenBackground text-yellowFont mx-1 w-fit font-mono rounded-lg p-2"}>
                                Back to All People
                            </button>
                        </Link>
                    </div>
                </div>
                <div className={"grid grid-cols-3 h-full w-full gap-4 bg-whiteBackground text-white"}>
                    {base && base.map(singleDate => (
                        <>
                            <ProfileLinkFlipped totalPrice={singleDate.totalPrice} date={singleDate.date} Name={personName} markDone={singleDate.markDone}/>
                        </>
                    ))}
                </div>
            </div>

        </div>
    )
}


export async function getServerSideProps(context) {
    const personName = context.query.single_person[0];

    const client = await clientPromise
    const db = client.db("grocery-app");

    const baseDB = await db.collection(personName).find().toArray();
    const base = await JSON.parse(JSON.stringify(baseDB));

    return {
        props: {base, personName },
    }
}
