import "tailwindcss/tailwind.css"
import {useRouter} from "next/router";
import Link from "next/link";
import {server} from "../../config";
import {useEffect, useState} from "react";

function Profile(props) {

    const [ bought, setBought ] = useState(props.buy);
    const [ buyButton, setBuyButton ] = useState("flex items-center justify-center mx-2 my-2 bg-otherBlack rounded-lg flex items-center justify-center text-3xl font-mono h-5/6 border-2 border-dotted border-red-500");

    useEffect(() => {
        if (bought === false ) {
            setBuyButton("flex items-center justify-center mx-2 my-2 bg-otherBlack rounded-lg flex items-center justify-center text-3xl font-mono h-5/6 border-2 border-dotted border-red-500")
        } else if (bought === true) {
            setBuyButton("flex items-center justify-center mx-2 my-2 bg-otherBlack rounded-lg flex items-center justify-center text-3xl font-mono h-5/6 border-2 border-dotted border-green-400")
        }

    }, [bought]);

    async function handleButton() {
        if (!bought) {
            {!bought && setBought(true), setBuyButton("flex items-center justify-center mx-2 my-2 bg-otherBlack rounded-lg flex items-center justify-center text-3xl font-mono h-5/6 border-2 border-dotted border-red-500")}
        } else {
            {bought && setBought(false), setBuyButton("flex items-center justify-center mx-2 my-2 bg-otherBlack rounded-lg flex items-center justify-center text-3xl font-mono h-5/6 border-2 border-dotted border-green-400")}
        }
        console.log("button clicked")
        forceReload();
    }

    return (
        <Link href={server + "dates/" + props.Name+"#" + props.i}>
            <button className={buyButton}>
                {props.buy ? <div className={"text-green-400"}>
                    {props.Name}
                </div> : <div className={"text-red-500"}>
                    {props.Name}
                </div>}
            </button>
        </Link>
    )
}

export default Profile;