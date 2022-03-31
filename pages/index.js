import "tailwindcss/tailwind.css"
import clientPromise from '../lib/mongodb'
import Link from "next/link";
import {server} from "../config";


export default function Home({ Aidan, Andoni, Atay, Justin, Keshav, Kulbir, Mitchell, Nathaniel, Ridge, allPeople }) {

  return (
    <div className={"max-w flex items-center justify-center"}>
        <div className={"bg-background h-full w-screen "}>
            <div className="bg-otherBlack text-center w-full h-12 mx-2 my-2 text-white font-mono text-4xl">
                Grocery Website
            </div>

            <div className={"text-white grid grid-cols-3 flex items-center justify-center"}>
                <Link href={server + "dates/allDates"} passHref>
                    <button className={"h-5/6 mx-2 my-2 bg-otherBlack rounded-lg flex items-center justify-center text-3xl font-mono"}>
                        All Dates
                    </button>
                </Link>

                {/*<Link href={server + "house/allFoods"} passHref>*/}
                    <div className={"h-screen mx-2 my-2 bg-otherBlack rounded-lg flex items-center justify-center text-3xl font-mono text-center"}>
                        When marking food
                        <br/>
                        ONLY CLICK THE BUTTON ONCE EACH TIME
                        <br/>
                        Close the alert and wait for the page to refresh before clicking the next button
                    </div>
                {/*</Link>*/}

                <Link href={server + "people/allPeople"} passHref>
                    <button className={"h-5/6 mx-2 my-2 bg-otherBlack rounded-lg flex items-center justify-center text-3xl font-mono"}>
                        All People
                    </button>
                </Link>
            </div>
        </div>
    </div>
      // <>
      //     <div className={"bg-blue-800 grid place-items-center grid-cols-11 gap-5 justify-items-center p-2 bg-gray-200 max-w"}>
      //         <div>
      //             <button className={"flex place-items-center items-center justify-items-center bg-blue-600 rounded-xl p-3"}>
      //                 <Link href={server + "/"}>
      //                     Home Page
      //                 </Link>
      //             </button>
      //         </div>
      //         <div></div>
      //         <div></div>
      //         <div></div>
      //         <div></div>
      //         <div className={"text-4xl"}>
      //             <h1>
      //                 COSTCO
      //             </h1>
      //         </div>
      //     </div>
      //
      //     <div class={"relative min-h-screen flex"}>
      //         <div class={"bg-gray-600 text-gray-900 h-screen w-32 grid place-items-center grid-cols-1 justify-items-center p-2 bg-gray-200 h-screen "}>
      //             {/*<button className={"flex place-items-center items-center justify-items-center bg-gray-100 rounded-xl p-3"}>*/}
      //             {/*    <Link href={server + "/house/message"}>*/}
      //             {/*        House*/}
      //             {/*    </Link>*/}
      //             {/*</button>*/}
      //
      //             {Mitchell && Mitchell.map(singleDate => (
      //                 <>
      //                     {/*<h1>SIDEBARALLDATES</h1>*/}
      //                         <button className={"flex place-items-center items-center justify-items-center bg-blue-100 rounded-xl p-3"}>
      //                             <Link href={server + "/" + singleDate.date}>
      //                                 {singleDate && singleDate.date}
      //                             </Link>
      //                         </button>
      //                 </>
      //             ))}
      //         </div>
      //
      //         <div className={"w-screen"}>
      //             <div className="grid place-items-center grid-cols-3 gap-5 justify-items-center p-2 bg-gray-200 h-screen">
      //                 {allPeople && allPeople.map(people => (
      //                         <>
      //                             <button>
      //                                 <Link href={`/food/${people.name}`} scroll={false}>
      //                                     <h1>
      //                                         <Profile name={people.name}/>
      //
      //                                     </h1>
      //                                 </Link>
      //                             </button>
      //                         </>
      //                     )
      //                 )}
      //             </div>
      //         </div>
      //     </div>
      // </>


      // {/*// <div>*/}
      // {/*//     <div className="grid place-items-center grid-cols-3 gap-5 justify-items-center p-2 bg-gray-200 max-w">*/}
      // {/*//         {allPeople && allPeople.map(people => (*/}
      //            <>
      //                <button>
      //                    <Link href={`/food/${people.name}`} scroll={false}>
      //                        <h1>
      //                            <Profile name={people.name}/>
      //
      //                        </h1>
      //                    </Link>
      //                </button>
      //            </>
      //             )
      //         )}
      //     </div>
      // </div>
  )
}


export async function getServerSideProps(context) {
    const client = await clientPromise
    const db = client.db("grocery-app");
    //
    const data = await db.collection("people").find().toArray()
    //
    const allPeople = await JSON.parse(JSON.stringify(data));

    const aidanDB = await db.collection("Aidan").find().toArray();
    const Aidan = await JSON.parse(JSON.stringify(aidanDB));

    const andoniDB = await db.collection("Aidan").find().toArray();
    const Andoni = await JSON.parse(JSON.stringify(andoniDB));

    const atayDB = await db.collection("Aidan").find().toArray();
    const Atay = await JSON.parse(JSON.stringify(atayDB));

    const justinDB = await db.collection("Aidan").find().toArray();
    const Justin = await JSON.parse(JSON.stringify(justinDB));

    const keshavDB = await db.collection("Aidan").find().toArray();
    const Keshav = await JSON.parse(JSON.stringify(keshavDB));

    const kulbirDB = await db.collection("Aidan").find().toArray();
    const Kulbir = await JSON.parse(JSON.stringify(kulbirDB));

    const mitchellDB = await db.collection("Aidan").find().toArray();
    const Mitchell = await JSON.parse(JSON.stringify(mitchellDB));

    const nathanielDB = await db.collection("Aidan").find().toArray();
    const Nathaniel = await JSON.parse(JSON.stringify(nathanielDB));

    const ridgeDB = await db.collection("Aidan").find().toArray();
    const Ridge = await JSON.parse(JSON.stringify(ridgeDB));


    // const data = await fetch(`http://localhost:3000/api/moviedetails?movie_id=573a1390f29313caabcd42e8`);

    // const data = await fetch(`http://localhost:3000/api/moviedetails?movie_id=${context.query.movie_id}`);
    // const movie = await data.json();

    // console.log(movie)

    return {
        props: { Aidan, Andoni, Atay, Justin, Keshav, Kulbir, Mitchell, Nathaniel, Ridge, allPeople },
    }
}
