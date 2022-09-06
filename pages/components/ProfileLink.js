import "tailwindcss/tailwind.css"
import Link from "next/link";
import {server} from "../../config";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";

function Profile(props) {


    const [bought, setBought] = useState(props.markDone);
    const [buyButton, setBuyButton] = useState("");
    const [textColor, setTextColor] = useState("");
    const [boxColor, setBoxColor] = useState("");

    const router = useRouter();
    const forceReload = () => {
        router.reload();
    }

    async function updateFoodName() {
        const personDB = await fetch(server + '/api/updatebuy?param0=' + props.personName + "&param1=" + props.date + "&param2=" + props.markDone + "&param3=" + props.foodName + "&param4=" + props.foodPrice);
    }


    useEffect(() => {
        if (bought === false) {
            setBoxColor("w-full flex items-center justify-center bg-whiteBackground flex items-center justify-center text-xl h-5/6 rounded-t-xl border-2 border-redFont")
            setTextColor("text-yellowFont")
            setBuyButton("items-center text-center p-3 bg-redFont border-0 w-full rounded-b-xl border-redFont font-mono")
        } else if (bought === true) {
            setBoxColor("w-full flex items-center justify-center bg-whiteBackground flex items-center justify-center text-xl h-5/6 rounded-t-xl border-2 border-greenBackground")
            setTextColor("text-yellowFont")
            setBuyButton("items-center text-center p-3  border-2 bg-greenBackground border-0 w-full rounded-b-xl border-green-400 border-dotted font-mono")
        }

    }, [bought]);

    async function handleButton() {
        if (!bought) {
            {
                setBoxColor("w-full flex items-center justify-center bg-whiteBackground flex items-center justify-center text-xl h-5/6 rounded-t-xl border-2 border-redFont")
                !bought && setBought(true), setBuyButton("items-center text-center p-1 border-2 bg-otherBlack w-5/6 border-red-500 border-dotted font-mono")
                setTextColor("text-yellowFont")
            }
        } else {
            {
                setBoxColor("w-full flex items-center justify-center bg-whiteBackground flex items-center justify-center text-xl h-5/6 rounded-t-xl border-2 border-greenBackground")
                bought && setBought(false), setBuyButton("items-center text-center p-1 border-2 bg-otherBlack w-5/6 border-green-400 border-dotted font-mono")
                setTextColor("text-yellowFont")

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
        <Link href={server + "food/" + props.Name + "/" + props.date} passHref>
             <button className={boxColor}>
                 <div>
                     <div>
                         <div className={"text-black"}>
                             {props.Name}
                         </div>
                         <div className={"text-black"}>
                             ${props.totalPrice}
                         </div>
                     </div>
                 </div>

             </button>
        </Link>
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