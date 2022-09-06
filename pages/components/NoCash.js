import "tailwindcss/tailwind.css"
import Link from "next/link";
import {server} from "../../config";
import {useEffect, useState} from "react";

function Profile(props) {

    const [ bought, setBought ] = useState(props.buy);
    const [ buyButton, setBuyButton ] = useState("flex items-center justify-center mx-2 my-2 bg-whiteBackground border-greenBackground border-2 text-black rounded-lg flex items-center justify-center text-2xl font-mono h-5/6 ");

    useEffect(() => {
        if (bought === false ) {
            setBuyButton("flex items-center justify-center mx-2 my-2 bg-whiteBackground rounded-lg border-greenBackground border-2 flex items-center justify-center text-2xl font-mono h-5/6")
        } else if (bought === true) {
            setBuyButton("flex items-center justify-center mx-2 my-2 bg-whiteBackground border-greenBackground border-2 rounded-lg flex items-center justify-center text-2xl font-mono h-5/6")
        }

    }, [bought]);

    return (
        <Link href={server + "dates/" + props.Name+"#" + props.i} passHref>
            <button className={buyButton}>
                {props.Name}
            </button>
        </Link>
    )
}

export default Profile;