import "tailwindcss/tailwind.css"
import clientPromise from '../../lib/mongodb'
import Link from "next/link";
import {server} from "../../config";
import {useRouter} from "next/router";
import Image from "next/image";



export default function PageWithJSbasedForm({allFood, collectionName}) {
    const router = useRouter();
    const forceReload = () => {
        router.reload();
    }
    // Handles the submit event on form submit.
    const refreshSubmit = async (event) => {
        event.preventDefault()
        // const data = {
        //     first: event.target.first.value,
        //     last: event.target.last.value,
        //     itemNumber: event.target.itemNumber.value,
        //     img: event.target.img.value
        // }

        // const personDB = await fetch(server + '/api/updateAllFoods?param0='+data.first+"&param1="+data.last+"&param2="+data.itemNumber+"&param3="+data.img.replaceAll('&','*'));
        const personDB = await fetch(server + '/api/updateAllFoods', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({first: event.target.first.value,
            last: event.target.last.value,
            itemNumber: event.target.itemNumber.value,
            img: event.target.img.value}),
        })

        // Send the data to the server in JSON format.
        alert("just added " + " food " + " to all foods");
        forceReload()
        // API endpoint where we send form data.
    }

    function handleInput()  {
        if (document.getElementById("exists").value === "true") {
            document.getElementById("exists").value = "false"
        } else {
            document.getElementById("exists").value = "true"
        }

        alert(document.getElementById("exists").value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const imgAdd = (event.target.img.value).charAt(0) === 'h'

        // const personDB = await fetch(server + '/api/updatefile?param0='+data.first+"&param1="+data.last+"&param2="+collectionName.toString()+"&param3="+data.itemNumber+"&param4="+data.img.replaceAll('&','*')+"&param5="+data.allOrNot);
        const personDB = await fetch(server + '/api/updatefile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                first: event.target.first.value,
                last: event.target.last.value,
                newDate: collectionName.toString(),
                itemNumber: event.target.itemNumber.value,
                img: event.target.img.value,
                allOrNot: event.target.radioButton.value,
                imgAddy: imgAdd}),
        })
        // Send the data to the server in JSON format.

        // API endpoint where we send form data.
        alert("Just added " + " food " + " to " + collectionName.toString());

    }


    const redirect =  (event) => {
        event.preventDefault()

        const data = {
            date: event.target.date.value,
        }
        // action="nextpage.php"
        window.location.href=data.date;
        // alert(data.allOrNot)


    }



    return (
        // We pass the event to the handleSubmit() function on submit.
        <>
            <div className={"grid grid-cols-3 bg-grayBackground p-2"}>
                <div></div>
                <form className={"flex place-items-center justify-center"} onSubmit={redirect}>
                    <div className={"grid grid-cols-2 mt-3"}>
                        <label className={"text-right mr-2 text-xl text-redFont font-bold"}>Current Date is</label>
                        <input className={"text-center w-36 text-xl text-greenBackground"} name={"date"} id={"date"} defaultValue={collectionName.toString()}/>
                        {/*<button type={"submit"}> Click me</button>*/}
                    </div>
                </form>
                <div className={"bg-grayBackground h-full text-white text-right"}>

                    <button className={"bg-greenBackground p-3 mt-2 rounded-md"}>
                        <Link href={`/`} passHref>
                            <h1>
                                Home Page
                            </h1>
                        </Link>
                    </button>

                </div>
            </div>

            <div className={"p-8 text-center"}>
                <form onSubmit={refreshSubmit}>
                    <input type="text" id="first" name="first" className={"my-2 placeholder-redFont text-greenBackground bg-grayBackground block w-full p-4 rounded-lg"} placeholder={"Food Name"} required />
                    <input type="text" id="last" name="last" placeholder={"Food Price"} required className={"text-greenBackground my-2 placeholder-redFont bg-grayBackground block w-full p-4 rounded-lg"}/>
                    <input type="text" id="itemNumber" name="itemNumber" placeholder={"Item Number"} required className={"text-greenBackground my-2 placeholder-redFont bg-grayBackground block w-full p-4 rounded-lg"}/>
                    <input placeholder={"Image Address"} type="text" id="img" name="img" required className={"text-greenBackground placeholder-redFont bg-grayBackground block w-full p-4 rounded-lg"} defaultValue={"https://richmedia.ca-richimage.com/"}/>
                    <button className={"p-3 rounded-lg my-1 bg-greenBackground mt-4 text-yellowFont text-center"} type="submit">Add New Food</button>
                </form>
            </div>


            <div className={"bg-whiteBackground h-full grid place-items-center grid-cols-5 gap-4 justify-items-center text-yellowFont p-2 max-w"}>
                {allFood && allFood.map(item => (
                    <div className={"radio-toolbar"} key={item.foodName}>

                    <form onSubmit={handleSubmit} className={"bg-grayBackground p-4 rounded-xl rounded-t-lg font-semibold text-center w-min"}>
                        <div className={"radio-toolbar"}>
                            <input type="text" id="first" name="first" className={"placeholder-black bg-greenBackground p-2 mb-1 rounded-xl text-yellowFont"} defaultValue={item.foodName} required/>
                            <input type="text" id="last" name="last" className={" bg-greenBackground border-redFont rounded-xl mb-1 p-2"} required defaultValue={item.foodPrice}/>
                            <input type="text" id="itemNumber" className={" bg-greenBackground border-redFont rounded-xl mb-1 p-2"} name="itemNumber" defaultValue={item.itemNumber} required/>
                            <input type="text" id="img" name="img" className={"rounded-lg bg-greenBackground border-redFont mb-1 p-2"} defaultValue={item.imgAddress ? item.imgAddress : item.img} required />
                        </div>
                        {/*<img src={"/" + item.img} height={250} width={250} alt={item.foodName}/>*/}
                            <Image
                                src={(item.imgAddress ? item.imgAddress : "/" + item.img.slice(6))}
                                height={400}
                                width={400}
                                alt={item.foodName}
                            />
                        {/*<input id={"allOrNot"} type={"radio"} class="form-radio text-indigo-600"  value={"true"}/>*/}
                        <div className={"grid grid-cols-2"}>
                            <input type="radio" id={item.foodName + "True"} name={"radioButton"} value="true" />
                            <label htmlFor={item.foodName + "True"}>All</label>
                            <input type="radio" id={item.foodName + "False"} name={"radioButton"} value="false" defaultChecked/>
                            <label htmlFor={item.foodName + "False"}>None</label>
                        </div>
                        <input hidden id={"oldFoodName"} name={"oldFoodName"} value={item.foodName}/>
                        <button className={"w-full bg-greenBackground rounded-b-lg text-white p-2"} type="submit" scroll={false}>Add</button>
                    </form>

                    </div>
                ))}
            </div>
            <style jsx>
                {`
          .radio-toolbar input[type="radio"] {
                opacity: 0;
                position: fixed;
                width: 0;
            }

          .radio-toolbar label {
                display: inline-block;
                background-color: #F55555;
                padding: 10px 20px;
                font-family: sans-serif, Arial;
                font-size: 16px;
            }

          .radio-toolbar input[type="radio"]:checked + label {
                background-color: #677C55;
            }
            
            .radio-toolbar label:hover {
              background-color: #dfd;
            }
        `}
            </style>
        </>
    )

}



export async function getServerSideProps(context) {
    const collectionName = context.query.new_file[0];
    // const exists = context.query.new_file[1].toString();
    // const allOrNot = context.query.new_file[2].toString();
    // console.log(allOrNot);
    const client = await clientPromise
    const entireDB = await client.db("grocery-app");

    const foodCollection = await entireDB.collection("allFoods");

    const session = client.startSession();
        const allFoodCollection = await foodCollection.find().toArray();
        const allFood = await JSON.parse(JSON.stringify(allFoodCollection));
        await session.endSession();

    return {
        props: {allFood, collectionName},
    }
}
