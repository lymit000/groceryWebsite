import Head from 'next/head'
import "tailwindcss/tailwind.css"
import clientPromise from '../lib/mongodb'
import Link from "next/link";
import Profile from "./components/Profile";
import Dates from "./components/Dates";


export default function Home({ Aidan, Andoni, Atay, Justin, Keshav, Kulbir, Mitchell, Nathaniel, Ridge, allPeople }) {

    let totalPrice = 0;
    function calculate(otherPrice) {
        totalPrice = totalPrice + otherPrice
    }

  return (
      <div class={"relative min-h-screen flex"}>
          <div class={"bg-gray-700 text-gray-900 h-screen w-32 grid place-items-center grid-cols-1 justify-items-center p-2 bg-gray-200 h-screen "}>


              {Mitchell && Mitchell.map(singleDate => (
                  <>
                      {/*<h1>SIDEBARALLDATES</h1>*/}
                      <button className={"flex place-items-center items-center justify-items-center bg-gray-100 rounded-xl p-3"}>
                          HUGE NEW CHANGES
                          {singleDate && singleDate.date}
                      </button>
                  </>
              ))}
              <nav></nav>
          </div>

          <div className={"w-screen"}>
              <div className="grid place-items-center grid-cols-3 gap-5 justify-items-center p-2 bg-gray-200 h-screen">
                  {allPeople && allPeople.map(people => (
                          <>
                              <button>
                                  <Link href={`/food/${people.name}`} scroll={false}>
                                      <h1>
                                          <Profile name={people.name}/>

                                      </h1>
                                  </Link>
                              </button>
                          </>
                      )
                  )}
              </div>
          </div>

      </div>


      // <div>
      //     <div className="grid place-items-center grid-cols-3 gap-5 justify-items-center p-2 bg-gray-200 max-w">
      //         {allPeople && allPeople.map(people => (
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
    const allPeople = JSON.parse(JSON.stringify(data));

    const aidanDB = await db.collection("Aidan").find().toArray();
    const Aidan = JSON.parse(JSON.stringify(aidanDB));

    const andoniDB = await db.collection("Aidan").find().toArray();
    const Andoni = JSON.parse(JSON.stringify(andoniDB));

    const atayDB = await db.collection("Aidan").find().toArray();
    const Atay = JSON.parse(JSON.stringify(atayDB));

    const justinDB = await db.collection("Aidan").find().toArray();
    const Justin = JSON.parse(JSON.stringify(justinDB));

    const keshavDB = await db.collection("Aidan").find().toArray();
    const Keshav = JSON.parse(JSON.stringify(keshavDB));

    const kulbirDB = await db.collection("Aidan").find().toArray();
    const Kulbir = JSON.parse(JSON.stringify(kulbirDB));

    const mitchellDB = await db.collection("Aidan").find().toArray();
    const Mitchell = JSON.parse(JSON.stringify(mitchellDB));

    const nathanielDB = await db.collection("Aidan").find().toArray();
    const Nathaniel = JSON.parse(JSON.stringify(nathanielDB));

    const ridgeDB = await db.collection("Aidan").find().toArray();
    const Ridge = JSON.parse(JSON.stringify(ridgeDB));


    // const data = await fetch(`http://localhost:3000/api/moviedetails?movie_id=573a1390f29313caabcd42e8`);

    // const data = await fetch(`http://localhost:3000/api/moviedetails?movie_id=${context.query.movie_id}`);
    // const movie = await data.json();

    // console.log(movie)

    return {
        props: { Aidan, Andoni, Atay, Justin, Keshav, Kulbir, Mitchell, Nathaniel, Ridge, allPeople },
    }
}
