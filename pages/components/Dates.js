import Link from "next/link";
import "tailwindcss/tailwind.css"
import {useEffect, useState} from 'react';
import {server} from "../../config";
import {useRouter} from "next/router";


function Dates(props) {

    const [ markDoneCSS, setMarkDoneCSS ] = useState("bg-red-600 px-1 py-1 mt-4 rounded-lg text-gray-100 font-semibold tracking-wide");

    const router = useRouter();
    const forceReload = () => {
        router.reload();
    }

    function refreshPage() {
        window.location.reload(false);
    }

    useEffect(() => {
        if (props.markDone === false ) {
            setMarkDoneCSS("bg-red-600 px-1 py-1 mt-4 rounded-lg text-gray-100 font-semibold tracking-wide")
        } else if (props.markDone === true) {
            setMarkDoneCSS("bg-green-600 px-1 py-1 mt-4 rounded-lg text-gray-100 font-semibold tracking-wide")
        }
    }, [props.markDone]);

    async function handleButton() {
        if (props.markDone === false ) {
            setMarkDoneCSS("bg-red-600 px-1 py-1 mt-4 rounded-lg text-gray-100 font-semibold tracking-wide")
        } else if (props.markDone === true) {
            setMarkDoneCSS("bg-green-600 px-1 py-1 mt-4 rounded-lg text-gray-100 font-semibold tracking-wide")
        }
        const result = await updateMarkDone();
        // forceReload();
        // refreshPage();
    }

    async function updateMarkDone() {
        const personDB = await fetch(server + '/api/updatemarkdone?param0='+props.personName+"&param1="+props.date+"&param2="+props.markDone.toString());
    }
    return (
        <div>
                <div className="flex items-center justify-center ">
                    <div className={"bg-white font-semibold text-center rounded-3xl border shadow-lg p-2"}>
                        <Link href={server + `food/${props.personName}/${props.date}`} scroll={false} passHref>

                        <button className={markDoneCSS}>
                            {props.date}
                        </button>
                        </Link>

                        <h1 className="text-lg text-gray-900 p-3"> ${props.itemPrice} </h1>
                        <button className={markDoneCSS} onClick={handleButton}>Mark Done </button>
                    </div>

                </div>
        </div>

    )
}

export default Dates;