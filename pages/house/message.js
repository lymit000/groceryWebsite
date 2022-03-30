import Head from 'next/head'
import "tailwindcss/tailwind.css"
import clientPromise from '../../lib/mongodb'
import Link from "next/link";
import Dates from "../components/Dates";
import {server} from "../../config";


export default function Home({ Aidan, Andoni, Atay, Justin, Keshav, Kulbir, Mitchell, Nathaniel, Ridge, allPeople }) {

    return (
        <div>
            {/*<form onSubmit={handleSubmit}>*/}
            {/*    <input type="text" id="first" name="first" defaultValue={item.foodName} required/>*/}
            {/*    <input type="text" id="last" name="last" required defaultValue={item.foodPrice}/>*/}
            {/*    <input type="text" id="itemNumber" name="itemNumber" defaultValue={item.itemNumber} required/>*/}
            {/*    <input type="text" id="img" name="img" defaultValue={item.img} required />*/}

            {/*    <button className={"bg-blue-600 p-1 rounded-lg my-1"} type="submit" scroll={false}>Add</button>*/}
            {/*</form>*/}
        </div>
    )
}


export async function getServerSideProps(context) {
    const client = await clientPromise
    const db = await client.db("grocery-app");
    //
    const data = await db.collection("people").find().toArray()
    //
    const allPeople = await JSON.parse(JSON.stringify(data));

    const aidanDB = await db.collection("Aidan").find().toArray();
    const Aidan = await JSON.parse(JSON.stringify(aidanDB));

    const andoniDB = await db.collection("Aidan").find().toArray();
    const Andoni = await JSON.parse(JSON.stringify(andoniDB));

    const atayDB = await db.collection("Aidan").find().toArray();
    const Atay = await JSON.parse(JSON.stringify(atayDB));

    const justinDB = await db.collection("Aidan").find().toArray();
    const Justin = await JSON.parse(JSON.stringify(justinDB));

    const keshavDB = await db.collection("Aidan").find().toArray();
    const Keshav = await JSON.parse(JSON.stringify(keshavDB));

    const kulbirDB = await db.collection("Aidan").find().toArray();
    const Kulbir = await JSON.parse(JSON.stringify(kulbirDB));

    const mitchellDB = await db.collection("Aidan").find().toArray();
    const Mitchell = await JSON.parse(JSON.stringify(mitchellDB));

    const nathanielDB = await db.collection("Aidan").find().toArray();
    const Nathaniel = JSON.parse(JSON.stringify(nathanielDB));

    const ridgeDB = await db.collection("Aidan").find().toArray();
    const Ridge = await JSON.parse(JSON.stringify(ridgeDB));


    // const data = await fetch(`http://localhost:3000/api/moviedetails?movie_id=573a1390f29313caabcd42e8`);

    // const data = await fetch(`http://localhost:3000/api/moviedetails?movie_id=${context.query.movie_id}`);
    // const movie = await data.json();

    // console.log(movie)

    return {
        props: { Aidan, Andoni, Atay, Justin, Keshav, Kulbir, Mitchell, Nathaniel, Ridge, allPeople },
    }
}
