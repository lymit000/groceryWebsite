import {useEffect, useState} from 'react';
// import clientPromise from '../../lib/mongodb'
import {useRouter} from "next/router";
import {server} from '../../config';
import Image from "next/image";


function Foods(props, { person, receipt, date, didBuy }) {

    const [bought, setBought] = useState(props.buy);
    const [buyButton, setBuyButton] = useState("");
    const [actualBuyButton, setActualBuyButton] = useState("");
    const [words, setWords] = useState("");
    const [flip, setFlip] = useState(true);
    const [header, setHeader] = useState("");

    const router = useRouter();
    const forceReload = () => {
        router.reload();
    }


    async function updateFoodName() {
        const personDB = await fetch(server + 'api/updatebuy?param0=' + props.Name + "&param1=" + props.date + "&param2=" + bought + "&param3=" + props.foodName + "&param4=" + props.foodPrice);
        // document.location.reload(false)
        // alert(personDB)
        // forceReload()
    }

    useEffect(() => {
        if (bought === false) {
            setWords("Add");
            setActualBuyButton("items-center text-center p-3  border-2 bg-greenBackground border-0 w-full rounded-b-xl border-green-400 border-dotted font-mono");
            setBuyButton("flex w-full bg-whiteBackground h-full border-t-2 border-r-2 border-l-2 border-redFont  p-2 flex-col")
            setHeader("items-center text-center p-2 text-yellowFont border-2 bg-redFont border-0 w-full rounded-t-xl border-green-400 border-dotted");
        } else if (bought === true) {
            setWords("Remove");
            setActualBuyButton("items-center text-center p-3  border-2 bg-redFont border-0 w-full rounded-b-xl border-green-400 border-dotted font-mono");
            setHeader("items-center text-center p-2  border-2 bg-greenBackground border-0 w-full rounded-t-xl border-green-400 border-dotted font-mono");
            setBuyButton("flex w-full bg-whiteBackground h-full border-t-2 border-r-2 border-l-2 border-greenBackground  p-2 flex-col")
        }

    }, [bought]);

    function handleFlip() {
        setFlip(!flip);
    }

    async function handleButton() {
        const result = await updateFoodName();
        if (!bought) {
            {
                !bought && setBought(true), setBuyButton("flex w-full bg-whiteBackground h-full border-t-2 border-r-2 border-l-2 border-redFont  p-2 flex-col")
                // forceReload()

                // alert("Just added " + props.foodName + ". New total is " + Math.round(((props.totalPrice + (props.foodPrice / (props.totalPeople + 1))))* 100) / 100)
            }
        } else {
            {
                bought && setBought(false), setBuyButton("flex w-full bg-whiteBackground h-full border-t-2 border-r-2 border-l-2 border-redFont  p-2 flex-col")
                // forceReload()

                // alert("Just removed " + props.foodName + ". New total is " + Math.round(((props.totalPrice - (props.foodPrice / (props.totalPeople))))* 100) / 100)

            }
        }
    }

    return (
        <div className={"flex w-full h-full"}>
            {flip ? <div className={"flex w-full  h-full p-2 flex-col "}>
                <button id="save" className={header} onClick={handleFlip}>
                    <h1 className={"text-yellowFont"}>
                        ${props.foodPrice}
                        {/*{props.buy ? <h1> Remove </h1> : <h1> Add </h1>}*/}
                    </h1>
                </button>
                <div className={buyButton}>

                    <div className={"flex"}>
                        <img alt={props.foodName} src={"/" + props.img} className={"h-full w-screen"} width={"50"} height={"50"}/>
                    </div>
                    {/*<div className={"mt-auto border-2 border-yellowBackground w-full p-2 rounded-xl"}>*/}
                    {/*    {props.allPeople}*/}
                    {/*    /!*{props.buy &&*!/*/}
                    {/*    <p>*/}
                    {/*        {props.totalPeople} people*/}
                    {/*        <br/>*/}
                    {/*        ${Math.round((props.foodPrice / (props.totalPeople)) * 100) / 100} per person*/}
                    {/*    </p>*/}

                    {/*    <div className={"text-center text-small "}>*/}
                    {/*        {props.totalPeople === 0 ? "0 People" : ""}*/}
                    {/*    </div>*/}
                    {/*</div>*/}


                </div>

                <button id="save" className={actualBuyButton} onClick={handleButton}>
                    <h1 className={"text-yellowFont"}>
                        {words} {props.foodName}
                        {/*{props.buy ? <h1> Remove </h1> : <h1> Add </h1>}*/}
                    </h1>
                </button>

            </div> : <div className={"flex w-full  h-full p-2 flex-col "}>
                <button id="save" className={header} onClick={handleFlip}>
                    <h1 className={"text-yellowFont"}>
                        ${props.foodPrice}
                        {/*{props.buy ? <h1> Remove </h1> : <h1> Add </h1>}*/}
                    </h1>
                </button>
                <div className={buyButton}>

                    <h1 className={"text-xl text-greenFont font-bold text-center"}>Current people buying this item</h1>
                    <div className={"text-greenFont text-center"}>
                        {props.allPeople && props.allPeople.map(person => (
                            <div key={"test"}> {person} </div>
                        ))}
                    </div>
                    {/*{props.buy &&*/}
                    <p className={"text-xl text-greenFont text-center font-bold"}>
                        {props.totalPeople} people
                        <br/>
                        ${Math.round((props.foodPrice / (props.totalPeople)) * 100) / 100} per person
                    </p>

                    <div className={"text-center text-small "}>
                        {props.totalPeople === 0 ? "0 People" : ""}
                    </div>


                </div>

                <button id="save" className={actualBuyButton} onClick={handleButton}>
                    <h1 className={"text-yellowFont"}>
                        {words} {props.foodName} ${props.foodPrice}
                        {/*{props.buy ? <h1> Remove </h1> : <h1> Add </h1>}*/}
                    </h1>
                </button>

            </div>}
        </div>



        // <div className={buyButton}>
        //     <div className={"bg-otherBlack h-full"}>
        //         <h1 className="text-lg"> {props.foodName} </h1>
        //         <h3 className="text-med "> ${props.foodPrice} </h3>
        //         <div className={"flex justify-center"}>
        //             <img alt={props.foodName} src={"/" + props.img} className={"h-full w-screen"} width={"50"} height={"50"}/>
        //         </div>
        //         {props.buy &&
        //             <p>
        //                 {props.totalPeople} people
        //                 <br/>
        //                 ${Math.round((props.foodPrice / (props.totalPeople)) * 100) / 100} per person
        //             </p>}
        //         {props.buy ?
        //             <button id="save" className={"border-2 border-green-400 border-dotted w-full"} onClick={handleButton}>
        //                 <h1>
        //                     {props.buy ? <h1> Remove </h1> : <h1> Add </h1>}
        //                 </h1>
        //             </button> :
        //             <button id="save" className={"border-2 border-red-500 border-dotted w-full"} onClick={handleButton}>
        //                 <h1>
        //                     {props.buy ? <h1> Remove </h1> : <h1> Add </h1>}
        //                 </h1>
        //             </button>}
        //         <div className={"text-center text-small "}>
        //             {props.totalPeople === 0 ? "0 People" : ""}
        //         </div>
        //     </div>
        // </div>

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
