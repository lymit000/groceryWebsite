import {useEffect, useState} from 'react';
// import clientPromise from '../../lib/mongodb'
import {useRouter} from "next/router";
import {server} from '../../config';
import Image from "next/image";


function Foods(props, { person, receipt, date, didBuy }) {

    const [bought, setBought] = useState(props.buy);
    const [buyButton, setBuyButton] = useState("");

    const router = useRouter();
    const forceReload = () => {
        router.reload();
    }

    async function updateFoodName() {
        const personDB = await fetch(server + '/api/updatebuy?param0=' + props.personName + "&param1=" + props.date + "&param2=" + props.buy + "&param3=" + props.foodName + "&param4=" + props.foodPrice);
    }


    useEffect(() => {
        if (bought === false) {
            setBuyButton("border-2 border-red-500 border-solid mx-2 my-2 bg-primary  flex items-center justify-center text-3xl font-mono h-max text-white")
        } else if (bought === true) {
            setBuyButton("border-2 border-green-400 border-solid mx-2 my-2 bg-primary  flex items-center justify-center text-3xl font-mono h-max text-white")
        }

    }, [bought]);

    async function handleButton() {
        if (!bought) {
            {
                !bought && setBought(true), setBuyButton("border-2 border-red-500 border-solid mx-2 my-2 bg-primary  flex items-center justify-center text-3xl font-mono h-max text-white")
            }
        } else {
            {
                bought && setBought(false), setBuyButton("border-2 border-green-400 border-solid mx-2 my-2 bg-primary  flex items-center justify-center text-3xl font-mono h-max text-white")
            }
        }
        const result = await updateFoodName();
    }

    return (
        <div className={buyButton}>
            <div className={"bg-otherBlack h-full"}>
                <h1 className="text-lg"> {props.foodName} </h1>
                <h3 className="text-med "> ${props.foodPrice} </h3>
                <div className={"flex justify-center"}>
                    <img alt={props.foodName} src={"/" + props.img} className={"h-5/6 w-screen"} width={"50"}
                           height={"50"}/>

                </div>
                {props.buy &&
                    <p>
                        {props.totalPeople} people
                        <br/>
                        ${Math.round((props.foodPrice / (props.totalPeople)) * 100) / 100} per person
                    </p>}
                {props.buy ?
                    <button className={"border-2 border-green-400 border-dotted w-full"} onClick={handleButton}>
                        <h1>
                            {props.buy ? <h1> Sell </h1> : <h1> Buy </h1>}
                        </h1>
                    </button> :
                    <button className={"border-2 border-red-500 border-dotted w-full"} onClick={handleButton}>
                        <h1>
                            {props.buy ? <h1> Sell </h1> : <h1> Buy </h1>}
                        </h1>
                    </button>}


            </div>
        </div>

        // {/*<div className="flex items-center justify-center">*/}
        // {/*    <div className="bg-white font-semibold text-center rounded-3xl border shadow-lg w-40 h-60777 items-center justify-center">*/}
        // {/*        <h1 className="text-lg text-gray-700"> {props.foodName} </h1>*/}
        // {/*        <h3 className="text-med text-gray-400 ">  ${props.foodPrice} </h3>*/}
        // {/*        <div className={"flex justify-center"}>*/}
        // {/*            <img src={"../../img/bacon.jfif"} class={"w-full"}/>*/}
        // {/*        </div>*/}
        //
        // {/*        <button className={buyButton} onClick={handleButton}>*/}
        // {/*            /!*<Link href={`http://localhost:3000/food/${props.personName}/${props.date}/${bought}/${props.foodName}/${props.foodPrice}`}>*!/*/}
        // {/*                <h1>*/}
        // {/*                    Buy*/}
        // {/*                </h1>*/}
        // {/*        </button>*/}
        // {/*        {props.buy &&*/}
        // {/*        <p>*/}
        // {/*            {props.totalPeople} people*/}
        // {/*            <br/>*/}
        // {/*            ${Math.round((props.foodPrice / (props.totalPeople)) * 100) / 100} per person*/}
        // {/*        </p>}*/}
        // {/*    </div>*/}
        // {/*</div>*/}
    )

}
export default Foods;
