import Head from 'next/head'
import "tailwindcss/tailwind.css"
import Link from "next/link";
import Profile from "./components/Profile";
import clientPromise from "../lib/mongodb";


export default function MovieDetails() {

    return (
        <>
            <h1>Create New Date</h1>
            <form className={"bg-blue-100"}>
                <label>
                    Name: <input className={"bg-gray-100"} type="text" name="name1" />
                    Name: <input className={"bg-gray-100"} type="text" name="name" />
                </label>
                <input className={"bg-red-300 rounded-3xl"} type="submit" value="Submit"/>
            </form>
        </>
    )
}

export async function getServerSideProps(context) {

    async function createMultipleListings(client, newListings) {
        // Which database youre going to use and which collection in the db
        // And inserts one
        // We want to wait for the results so we use await
        // We're going to store this value in result
        const result = await db.collection("10-24-21").insertMany(newListings);
    }

    const client = await clientPromise
    const db = client.db("grocery-app");
    const oneBefore = db.collection("10-24-21");

    // await createMultipleListings(db, [{
    //         "foodName": "Protein Powder",
    //         "foodPrice": {"$numberDouble": "7.79"},
    //         "buy": [],
    //         "totalPeople": {"$numberInt": "0"}
    //     },
    //     {
    //         "foodName": "Frozen Blueberry",
    //         "foodPrice": {"$numberDouble": "7.79"},
    //         "buy": [],
    //         "totalPeople": {"$numberInt": "0"}
    //     },
    //     {
    //         "foodName": "Frozen Blueberry",
    //         "foodPrice": {"$numberDouble": "7.79"},
    //         "buy": [],
    //         "totalPeople": {"$numberInt": "0"}
    //     },
    //     {
    //         "foodName": "Pasta Chicken Ravioli",
    //         "foodPrice": {"$numberDouble": "12.79"},
    //         "buy": [],
    //         "totalPeople": {"$numberInt": "0"}
    //     }])


    return {
        props: { },

    }
}