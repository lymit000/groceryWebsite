import clientPromise from '../../lib/mongodb'
import Link from 'next/link'
import Foods from "../components/Foods";
import "tailwindcss/tailwind.css"
import {server} from '../../config';
import HomeButton from "../components/HomeButton";
import NameHeader from "../components/NameHeader";
import CardDate from "../components/CardDate";

function MovieDetails({ personName, personOfDate, receiptOfDate, date, returnCollection}) {

    let i = 1;
    let j = -1;

    function count() {
        i = i + 1;
        j = j + 1;
    }
    function reset() {
        i = 1;
        j = -1;
    }

    return (
            <div className={"bg-background h-screen w-screen "}>
                <div className={"grid grid-cols-3"}>
                    <HomeButton/>
                    <div></div>
                    <div className={"text-right"}>
                        <Link href={server + "people/" + personName} passHref>
                            <button className={"bg-otherBlack text-primary mx-1 w-fit font-mono rounded-lg p-1"}>
                                Back to {personName}
                            </button>
                        </Link>
                    </div>
                </div>

            <div className={"text-white w-full rounded-3xl mx-3"}>
                <div className="flex items-center justify-center mx-20 text-4xl font-mono h-full text-center bg-otherBlack rounded-3xl">
                    <NameHeader Name={personName} totalPrice={personOfDate.totalPrice} date={date} buy={personOfDate.markDone}/>
                </div>
            </div>

            <div className={"grid grid-cols-3 bg-background"}>
                {receiptOfDate && receiptOfDate.map(item => (
                    <>
                        <div>
                            <Foods foodName={item.foodName} foodPrice={item.foodPrice} Name={personName} buy={JSON.parse(JSON.stringify(item.buy)).includes(personName)} date={personOfDate.date} totalPeople={item.totalPeople} img={item.img} totalPrice={personOfDate.totalPrice}/>
                            {item.buy && item.buy.map(singlePersons => (
                                singlePersons + " "
                            ))}
                        </div>
                    </>
                ))}
            </div>
            </div>

    );
}


export async function getServerSideProps(context) {
    const client = await clientPromise
    const entireDB = await client.db("grocery-app");

    const personName = context.query.date_id[0];
    const date = context.query.date_id[1];
    const collectionReceipt = await entireDB.collection(date)
    const collectionAllItemsOnReceipt = await collectionReceipt.find().toArray();
    const receiptOfDate = await JSON.parse(JSON.stringify(collectionAllItemsOnReceipt));

    const collectionPerson = await entireDB.collection(personName)

    const baseDB = await entireDB.collection("Aidan").find().toArray();
    const  returnCollection = await JSON.parse(JSON.stringify(baseDB));

    const collectionPersonOfDate = await collectionPerson.findOne({date: date});
    const personOfDate = await JSON.parse(JSON.stringify(collectionPersonOfDate));

    return {
        props: { personName, personOfDate, receiptOfDate, date, returnCollection},
    }
}

export default MovieDetails;