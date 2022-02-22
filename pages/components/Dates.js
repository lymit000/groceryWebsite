import Link from "next/link";
import Profile from "./Profile";
import "tailwindcss/tailwind.css"
import { useState, useEffect } from 'react';


function Dates(props) {

    const [ markDoneCSS, setMarkDoneCSS ] = useState("bg-red-600 px-1 py-1 mt-4 rounded-3xl text-gray-100 font-semibold uppercase tracking-wide");

    useEffect(() => {
        if (props.markDone === false ) {
            setMarkDoneCSS("bg-red-600 px-1 py-1 mt-4 rounded-3xl text-gray-100 font-semibold tracking-wide")
        } else if (props.markDone === true) {
            setMarkDoneCSS("bg-green-600 px-1 py-1 mt-4 rounded-3xl text-gray-100 font-semibold tracking-wide")
        }
    }, [props.markDone]);

    function handleButton() {
        if (props.markDone === false ) {
            setMarkDone("bg-red-600 px-1 py-1 mt-4 rounded-3xl text-gray-100 font-semibold tracking-wide")
        } else if (props.markDone === true) {
            setMarkDone("bg-green-600 px-1 py-1 mt-4 rounded-3xl text-gray-100 font-semibold tracking-wide")
        }

    }

    return (
        <div>
                <div className="flex items-center justify-center ">
                    <div className="bg-white font-semibold text-center rounded-3xl border shadow-lg p-10">
                        <Link href={`/food/${props.personName}/${props.date}`} scroll={false}>

                        <button className={markDoneCSS}>
                            {props.date}
                        </button>
                        </Link>

                        <h1 className="text-lg text-gray-900 p-3 my-1"> ${props.itemPrice} </h1>
                        <button className={markDoneCSS} onClick={handleButton}>Mark Done </button>
                    </div>

                </div>
        </div>

    )
}

export default Dates;