import Head from 'next/head'
import "tailwindcss/tailwind.css"
import clientPromise from '../../lib/mongodb'
import Link from "next/link";
import Profile from "../components/Profile";
import Dates from "../components/Dates";
import {server} from "../../config";
import Foods from "../components/Foods";
import {useRouter} from "next/router";


export default function PageWithJSbasedForm({allFood, collectionName}) {
    const router = useRouter();
    const forceReload = () => {
        router.reload();
    }
    // Handles the submit event on form submit.
    const refreshSubmit = async (event) => {
        event.preventDefault()
        const data = {
            first: event.target.first.value,
            last: event.target.last.value,
            itemNumber: event.target.itemNumber.value,
            img: event.target.img.value
        }

        const personDB = await fetch(server + '/api/updatefile?param0='+data.first+"&param1="+data.last+"&param2=allFoods"+"&param3="+data.itemNumber+"&param4="+data.img);
        // Send the data to the server in JSON format.
        forceReload();
        alert("just added " + first + "to all foods");
        // API endpoint where we send form data.
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const data = {
            first: event.target.first.value,
            last: event.target.last.value,
            itemNumber: event.target.itemNumber.value,
            img: event.target.img.value
        }

        const personDB = await fetch(server + '/api/updatefile?param0='+data.first+"&param1="+data.last+"&param2="+collectionName.toString()+"&param3="+data.itemNumber+"&param4="+data.img);
        // Send the data to the server in JSON format.

        // API endpoint where we send form data.
        alert("just added " + first + "to " + collectionName.toString());

    }

    return (
        // We pass the event to the handleSubmit() function on submit.
        <>
            <div className={"bg-blue-700"}>
                <button>
                    <Link href={`/`} scroll={false}>
                        <h1>
                            Home Page
                        </h1>
                    </Link>
                </button>
                <form onSubmit={refreshSubmit}>
                    <label htmlFor="first">Food Name</label>
                    <input type="text" id="first" name="first" required className={"block w-full shadow py-3 px-4 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md focus:outline-none focus:ring-2"}/>

                    <label htmlFor="last">Food Price</label>
                    <input type="text" id="last" name="last" required className={"block w-full shadow py-3 px-4 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md focus:outline-none focus:ring-2"}/>

                    <label htmlFor="itemNumber">Item Number</label>
                    <input type="text" id="itemNumber" name="itemNumber" required className={"block w-full shadow py-3 px-4 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md focus:outline-none focus:ring-2"}/>

                    <label htmlFor="img">Img</label>
                    <input defaultValue={"../../img/"} type="text" id="img" name="img" required className={"block w-full shadow py-3 px-4 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md focus:outline-none focus:ring-2"}/>

                    <button className={"bg-blue-600 p-1 rounded-lg my-1"} type="submit">Submit</button>
                </form>
            </div>

            <div className={"bg-blue-700 grid place-items-center grid-cols-7 gap-5 justify-items-center p-2 bg-gray-200 max-w"}>

                {allFood && allFood.map(item => (
                    <>
                        <div className={"bg-gray-300 font-semibold text-center rounded-3xl border w-min p-2"}>
                            <form onSubmit={handleSubmit}>
                                <input type="text" id="first" name="first" defaultValue={item.foodName} required/>
                                <input type="text" id="last" name="last" required defaultValue={item.foodPrice}/>
                                <input type="text" id="itemNumber" name="itemNumber" defaultValue={item.itemNumber} required/>
                                <input type="text" id="img" name="img" defaultValue={item.img} required />

                                <button className={"bg-blue-600 p-1 rounded-lg my-1"} type="submit" scroll={false}>Add</button>
                            </form>
                            <br/>
                            <img src={item.img}/>
                            <br/>
                        </div>
                    </>
                ))}
            </div>
        </>

    )
}


export async function getServerSideProps(context) {
    const collectionName = context.query.new_file;
    const client = await clientPromise
    const entireDB = await client.db("grocery-app");

    const foodCollection = await entireDB.collection("allFoods");

    const allFoodCollection = await foodCollection.find().toArray();
    const allFood = await JSON.parse(JSON.stringify(allFoodCollection));
    return {
        props: {allFood, collectionName},
    }
}
