import "tailwindcss/tailwind.css"
import clientPromise from '../../lib/mongodb'
import Link from "next/link";
import {server} from "../../config";
import {useRouter} from "next/router";
import Image from "next/image";


export default function PageWithJSbasedForm({allFood, collectionName, exists}) {
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

        const personDB = await fetch(server + '/api/updatefile?param0='+data.first+"&param1="+data.last+"&param2=allFoods"+"&param3="+data.itemNumber+"&param4="+data.img+"&param5=true");
        // Send the data to the server in JSON format.
        forceReload();
        // alert("just added " + first + "to all foods");
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

        const personDB = await fetch(server + '/api/updatefile?param0='+data.first+"&param1="+data.last+"&param2="+collectionName.toString()+"&param3="+data.itemNumber+"&param4="+data.img+"&param5="+exists);
        // Send the data to the server in JSON format.

        // API endpoint where we send form data.
        alert("Just added " + data.first + "to " + collectionName.toString());

    }

    return (
        // We pass the event to the handleSubmit() function on submit.
        <>
            <div className={"bg-background h-full text-white text-center"}>
                <button className={"bg-otherBlack p-3"}>
                    <Link href={`/`} scroll={false} passHref>
                        <h1>
                            Home Page
                        </h1>
                    </Link>
                </button>
                <form onSubmit={refreshSubmit}>
                    <label htmlFor="first">Food Name</label>
                    <input type="text" id="first" name="first" required className={"bg-otherBlack block w-full shadow py-3 px-4 placeholder-otherBlack focus:ring-blue-500 focus:border-blue-500 border-otherBlack rounded-md focus:outline-none focus:ring-2"}/>

                    <label htmlFor="last">Food Price</label>
                    <input type="text" id="last" name="last" required className={"bg-otherBlack block w-full shadow py-3 px-4 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md focus:outline-none focus:ring-2"}/>

                    <label htmlFor="itemNumber">Item Number</label>
                    <input type="text" id="itemNumber" name="itemNumber" required className={"bg-otherBlack bg-otherBlack block w-full shadow py-3 px-4 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md focus:outline-none focus:ring-2"}/>

                    <label htmlFor="img">Img</label>
                    <input defaultValue={"../../img/"} type="text" id="img" name="img" required className={"bg-otherBlack block w-full shadow py-3 px-4 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md focus:outline-none focus:ring-2"}/>

                    <button className={"bg-otherBlack p-3 rounded-lg my-1"} type="submit">Add New Food</button>
                </form>
            </div>

            <div className={"bg-background h-full grid place-items-center grid-cols-6 gap-4 justify-items-center text-white p-2 max-w"}>

                {allFood && allFood.map(item => (
                    <>
                        <div className={"bg-otherBlack font-semibold text-center w-min p-2 bg-otherBlack"}>
                            <form onSubmit={handleSubmit}>
                                <input type="text" id="first" name="first" className={"bg-otherBlack"} defaultValue={item.foodName} required/>
                                <input type="text" id="last" name="last" className={"bg-otherBlack"} required defaultValue={item.foodPrice}/>
                                <input type="text" id="itemNumber" className={"bg-otherBlack"} name="itemNumber" defaultValue={item.itemNumber} required/>
                                <input type="text" id="img" name="img" className={"bg-otherBlack"} defaultValue={item.img} required />
                                <img src={"/" + item.img} alt={"not working so temp right here"}/>
                                <button className={"w-full border-2 border-primary border-dashed  stext-white p-1 "} type="submit" scroll={false}>Add</button>
                            </form>
                            <br/>
                            <br/>
                        </div>
                    </>
                ))}
            </div>
        </>

    )
}


export async function getServerSideProps(context) {
    const collectionName = context.query.new_file[0];
    const exists = context.query.new_file[1].toString();
    const client = await clientPromise
    const entireDB = await client.db("grocery-app");

    const foodCollection = await entireDB.collection("allFoods");

    const allFoodCollection = await foodCollection.find().toArray();
    const allFood = await JSON.parse(JSON.stringify(allFoodCollection));
    return {
        props: {allFood, collectionName, exists},
    }
}
