import Head from 'next/head'
import "tailwindcss/tailwind.css"
import clientPromise from '../../lib/mongodb'
import Link from "next/link";
import Dates from "../components/Dates";
import {server} from "../../config";


export default function Home() {

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
