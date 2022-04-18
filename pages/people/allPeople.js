import "tailwindcss/tailwind.css"
import HomeButton from "../components/HomeButton";
import NoProfile from "../components/NoProfile";
import clientPromise from "../../lib/mongodb";
import ProfileLinkFlipped from "../components/ProfileLinkFlipped";

export default function Home({Aidan, Andoni, Atay, Justin, Keshav, Kulbir, Mitchell, Nathaniel, Ridge}) {

    // const allNames = ["Aidan", "Andoni", "Atay", "Justin", "Keshav", "Kulbir", "Mitchell", "Nathaniel", "Ridge"]
    //

    let singleTotal = 0;
    function computeTotal(newPrice) {
        singleTotal = singleTotal + newPrice;
    }

    function reset() {
        singleTotal = 0;
    }
    return (
        <div className={"bg-background h-full w-screen "}>
            <HomeButton/>


            <div className={"bg-background h-screen grid grid-cols-3 flex items-center justify-center text-white"}>
                {Aidan && Aidan.map(singleDate => (
                    <>
                        {singleDate.markDone && computeTotal(singleDate.totalPrice)}
                    </>
                ))}
                <NoProfile Name={"Aidan"} totalPrice={Math.round((singleTotal) * 100) / 100}/>
                {reset()}
                {Andoni && Andoni.map(singleDate => (
                    <>
                        {singleDate.markDone && computeTotal(singleDate.totalPrice)}
                    </>
                ))}
                <NoProfile Name={"Andoni"} totalPrice={Math.round((singleTotal) * 100) / 100}/>
                {reset()}
                {Atay && Atay.map(singleDate => (
                    <>
                        {singleDate.markDone && computeTotal(singleDate.totalPrice)}
                    </>
                ))}
                <NoProfile Name={"Atay"} totalPrice={Math.round((singleTotal) * 100) / 100}/>
                {reset()}
                {Justin && Justin.map(singleDate => (
                    <>
                        {singleDate.markDone && computeTotal(singleDate.totalPrice)}
                    </>
                ))}
                <NoProfile Name={"Justin"} totalPrice={Math.round((singleTotal) * 100) / 100}/>
                {reset()}
                {Keshav && Keshav.map(singleDate => (
                    <>
                        {singleDate.markDone && computeTotal(singleDate.totalPrice)}
                    </>
                ))}
                <NoProfile Name={"Keshav"} totalPrice={Math.round((singleTotal) * 100) / 100}/>
                {reset()}
                {Kulbir && Kulbir.map(singleDate => (
                    <>
                        {singleDate.markDone && computeTotal(singleDate.totalPrice)}
                    </>
                ))}
                <NoProfile Name={"Kulbir"} totalPrice={Math.round((singleTotal) * 100) / 100}/>
                {reset()}
                {Mitchell && Mitchell.map(singleDate => (
                    <>
                        {singleDate.markDone && computeTotal(singleDate.totalPrice)}
                    </>
                ))}
                <NoProfile Name={"Mitchell"} totalPrice={Math.round((singleTotal) * 100) / 100}/>
                {reset()}
                {Nathaniel && Nathaniel.map(singleDate => (
                    <>
                        {singleDate.markDone && computeTotal(singleDate.totalPrice)}
                    </>
                ))}
                <NoProfile Name={"Nathaniel"} totalPrice={Math.round((singleTotal) * 100) / 100}/>
                {reset()}
                {Ridge && Ridge.map(singleDate => (
                    <>
                        {singleDate.markDone && computeTotal(singleDate.totalPrice)}
                    </>
                ))}
                <NoProfile Name={"Ridge"} totalPrice={Math.round((singleTotal) * 100) / 100}/>
                {reset()}

            </div>
        </div>
        )
}

export async function getServerSideProps(context) {
    const client = await clientPromise
    const db = client.db("grocery-app");
    //
    const aidanDB = await db.collection("Aidan").find().toArray();
    const Aidan = await JSON.parse(JSON.stringify(aidanDB));

    const andoniDB = await db.collection("Andoni").find().toArray();
    const Andoni = await JSON.parse(JSON.stringify(andoniDB));

    const atayDB = await db.collection("Atay").find().toArray();
    const Atay = await JSON.parse(JSON.stringify(atayDB));

    const justinDB = await db.collection("Justin").find().toArray();
    const Justin = await JSON.parse(JSON.stringify(justinDB));

    const keshavDB = await db.collection("Keshav").find().toArray();
    const Keshav = await JSON.parse(JSON.stringify(keshavDB));

    const kulbirDB = await db.collection("Kulbir").find().toArray();
    const Kulbir = await JSON.parse(JSON.stringify(kulbirDB));

    const mitchellDB = await db.collection("Mitchell").find().toArray();
    const Mitchell = await JSON.parse(JSON.stringify(mitchellDB));

    const nathanielDB = await db.collection("Nathaniel").find().toArray();
    const Nathaniel = await JSON.parse(JSON.stringify(nathanielDB));

    const ridgeDB = await db.collection("Ridge").find().toArray();
    const Ridge = await JSON.parse(JSON.stringify(ridgeDB));

    return {
        props: { Aidan, Andoni, Atay, Justin, Keshav, Kulbir, Mitchell, Nathaniel, Ridge },
    }
}


