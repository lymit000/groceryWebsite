import "tailwindcss/tailwind.css"
import Link from "next/link";
import {server} from "../../config";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";

function Profile(props) {


    const [bought, setBought] = useState(props.markDone);
    const [buyButton, setBuyButton] = useState("");
    const [textColor, setTextColor] = useState("");

    const router = useRouter();
    const forceReload = () => {
        router.reload();
    }

    async function updateFoodName() {
        const personDB = await fetch(server + '/api/updatebuy?param0=' + props.personName + "&param1=" + props.date + "&param2=" + props.markDone + "&param3=" + props.foodName + "&param4=" + props.foodPrice);
    }


    useEffect(() => {
        if (bought === false) {
            setTextColor("text-red-500")
            setBuyButton("items-center text-center p-1 border-2 bg-otherBlack w-5/6 border-red-500 border-dotted font-mono")
        } else if (bought === true) {
            setTextColor("text-green-400")
            setBuyButton("items-center text-center p-1 border-2 bg-otherBlack w-5/6 border-green-400 border-dotted font-mono")
        }

    }, [bought]);

    async function handleButton() {
        if (!bought) {
            {
                !bought && setBought(true), setBuyButton("items-center text-center p-1 border-2 bg-otherBlack w-5/6 border-red-500 border-dotted font-mono")
                setTextColor("text-red-500")
            }
        } else {
            {
                bought && setBought(false), setBuyButton("items-center text-center p-1 border-2 bg-otherBlack w-5/6 border-green-400 border-dotted font-mono")
                setTextColor("text-green-400")

            }
        }
        const personDB = await fetch(server + '/api/updatemarkdone?param0='+props.Name+"&param1="+props.date+"&param2="+props.markDone);
    }

    // function refreshPage() {
    //     window.location.reload();
    // }

    // async function handleButton() {
    //     const result = await updateMarkDone();
    // }
    //
    // async function updateMarkDone() {
    //     const personDB = await fetch(server + '/api/updatemarkdone?param0='+props.Name+"&param1="+props.date+"&param2="+props.markDone);
    // }

    return (
        <div className={"w-full items-center justify-center text-center"}>
            {/*<Link href={props.link} passHref>*/}
            <button className={"w-full flex items-center justify-center mx-2 bg-otherBlack flex items-center justify-center text-3xl font-mono h-5/6 border-l-4 border-t-4 border-r-2 border-background"}>
                <div>
                    <div>
                        <div>
                            {props.date}
                        </div>
                        <div className={textColor}>
                            ${props.totalPrice}
                        </div>
                    </div>
                </div>

            </button>
            {/*</Link>*/}
            <button className={buyButton} onClick={handleButton}>
                <div className={textColor}>
                    Mark Done
                </div>
            </button>
            {/*{props.markDone ?*/}
            {/*<button className={"items-center text-center p-1 border-2 bg-otherBlack w-5/6 border-green-400 border-dotted font-mono"} onClick={handleButton}>*/}
            {/*    <h1>*/}
            {/*        Done*/}
            {/*    </h1>*/}
            {/*</button>: <button className={"items-center text-center p-1 border-2 bg-otherBlack w-5/6 border-red-500 border-dashed font-mono"} onClick={handleButton}>*/}
            {/*    <h1>*/}
            {/*        Not Done*/}
            {/*    </h1>*/}
            {/*</button> }*/}
        </div>

    )
}

export default Profile;