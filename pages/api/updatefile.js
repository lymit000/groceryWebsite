import clientPromise from '../../lib/mongodb'
import {ObjectId} from "mongodb";
import Foods from "../components/Foods";

    export default async function handler(req, res) {

    async function createMultipleListings(client, newListings) {
        // Which database youre going to use and which collection in the db
        // And inserts one
        // We want to wait for the results so we use await
        // We're going to store this value in result
        const result = await client.collection("10-24-21").insertMany(newListings);
    }

    async function createListing(client, newListing) {
        // Which database youre going to use and which collection in the db
        // And inserts one
        // We want to wait for the results so we use await
        // We're going to store this value in result
        const result = await client.insertOne(newListing);
    }

    const client = await clientPromise
    const db = client.db("grocery-app");
    const oneBefore = await db.collection("10-24-21");

    const Aidan = await db.collection("Aidan");
    const Andoni = await db.collection("Andoni");
    const Atay = await db.collection("Atay");
    const Justin = await db.collection("Justin");
    const Keshav = await db.collection("Keshav");
    const Kulbir = await db.collection("Kulbir");
    const Mitchell = await db.collection("Mitchell");
    const Nathaniel = await db.collection("Nathaniel");
    const Ridge = await db.collection("Ridge");

        // await createMultipleListings(db, [{
            //     foodName: "Protein Powder",
            //     foodPrice: 30.99,
            //     buy: [],
            //     totalPeople: 0
            // },
            //     {
            //         foodName: "Frozen Blueberries",
            //         foodPrice: 7.79,
            //         buy: [],
            //         totalPeople: 0
            //     },
            //     {
            //         foodName: "Frozen Blueberries",
            //         foodPrice: 7.79,
            //         buy: [],
            //         totalPeople: 0
            //     },
            //     {
            //         foodName: "Chicken Ravioli",
            //         foodPrice: 12.79,
            //         buy: [],
            //         totalPeople: 0
            //     },
            //     {
            //         foodName: "Milk",
            //         foodPrice: 5.89,
            //         buy: [],
            //         totalPeople: 0
            //     },
            //     {
            //         foodName: "Milk",
            //         foodPrice: 5.89,
            //         buy: [],
            //         totalPeople: 0
            //     },
            //     {
            //         foodName: "Milk",
            //         foodPrice: 5.89,
            //         buy: [],
            //         totalPeople: 0
            //     },
            //     {
            //         foodName: "Potatoes",
            //         foodPrice: 7.99,
            //         buy: [],
            //         totalPeople: 0
            //     },
            //     {
            //         foodName: "Lacroix",
            //         foodPrice: 7.99,
            //         buy: [],
            //         totalPeople: 0
            //     },
            //     {
            //         foodName: "Almond Milk",
            //         foodPrice: 8.99,
            //         buy: [],
            //         totalPeople: 0
            //     },
            //     {
            //         foodName: "Goldfish",
            //         foodPrice: 10.49,
            //         buy: [],
            //         totalPeople: 0
            //     },
            //     {
            //         foodName: "Quaker Oats",
            //         foodPrice: 9.69,
            //         buy: [],
            //         totalPeople: 0
            //     },
            //     {
            //         foodName: "Street Tacos",
            //         foodPrice: 14.57,
            //         buy: [],
            //         totalPeople: 0
            //     },
            //     {
            //         foodName: "Rice Krispies",
            //         foodPrice: 11.49,
            //         buy: [],
            //         totalPeople: 0
            //     },
            //     {
            //         foodName: "Greek Pita",
            //         foodPrice: 3.79,
            //         buy: [],
            //         totalPeople: 0
            //     },
            //     {
            //         foodName: "Broccoli",
            //         foodPrice: 6.99,
            //         buy: [],
            //         totalPeople: 0
            //     },
            //     {
            //         foodName: "Sausage",
            //         foodPrice: 10.69,
            //         buy: [],
            //         totalPeople: 0
            //     },
            //     {
            //         foodName: "Sausage",
            //         foodPrice: 10.69,
            //         buy: [],
            //         totalPeople: 0
            //     },
            //     {
            //         foodName: "Greek Pita",
            //         foodPrice: 3.79,
            //         buy: [],
            //         totalPeople: 0
            //     },
            //     {
            //         foodName: "Brussel Sprouts",
            //         foodPrice: 4.99,
            //         buy: [],
            //         totalPeople: 0
            //     },
            //     {
            //         foodName: "Protein Bars",
            //         foodPrice: 17.99,
            //         buy: [],
            //         totalPeople: 0
            //     },
            //     {
            //         foodName: "Sourdough Bread",
            //         foodPrice: 6.6,
            //         buy: [],
            //         totalPeople: 0
            //     },
            //     {
            //         foodName: "Sponges",
            //         foodPrice: 9.89,
            //         buy: [],
            //         totalPeople: 0
            //     },
            //     {
            //         foodName: "Aussie Bites",
            //         foodPrice: 10.49,
            //         buy: [],
            //         totalPeople: 0
            //     },
            //     {
            //         foodName: "Extra Virgin Olive Oil",
            //         foodPrice: 14.99,
            //         buy: [],
            //         totalPeople: 0
            //     },
            //     {
            //         foodName: "Spinach",
            //         foodPrice: 5.49,
            //         buy: [],
            //         totalPeople: 0
            //     },
            //     {
            //         foodName: "Half Dozen Eggs",
            //         foodPrice: 3.99,
            //         buy: [],
            //         totalPeople: 0
            //     },
            //     {
            //         foodName: "Butter",
            //         foodPrice: 8.49,
            //         buy: [],
            //         totalPeople: 0
            //     },
            //     {
            //         foodName: "Broccoli",
            //         foodPrice: 6.99,
            //         buy: [],
            //         totalPeople: 0
            //     },
            //     {
            //         foodName: "5 Dozen Eggs",
            //         foodPrice: 9.79,
            //         buy: [],
            //         totalPeople: 0
            //     },
            //     {
            //         foodName: "Chicken Breasts",
            //         foodPrice: 25.15,
            //         buy: [],
            //         totalPeople: 0
            //     },
            //     {
            //         foodName: "Chicken Thighs",
            //         foodPrice: 26.22,
            //         buy: [],
            //         totalPeople: 0
            //     },
            //     {
            //         foodName: "Mushrooms",
            //         foodPrice: 5.49,
            //         buy: [],
            //         totalPeople: 0
            //     },
            //     {
            //         foodName: "Pesto Sauce",
            //         foodPrice: 7.49,
            //         buy: [],
            //         totalPeople: 0
            //     },
            //     {
            //         foodName: "Mushrooms",
            //         foodPrice: 5.49,
            //         buy: [],
            //         totalPeople: 0
            //     }
            // ]);





            //
    res.json({message: "temp"});
    // res.json({message: "IT WORKS!!"})
}

// import clientPromise from '../../lib/mongodb'
// import {ObjectId} from "mongodb";
// import Foods from "../components/Foods";
// export default async function handler(req, res) {
//     async function createMultipleListings(client, newListings) {
//         // Which database youre going to use and which collection in the db
//         // And inserts one
//         // We want to wait for the results so we use await
//         // We're going to store this value in result
//         const result = await client.collection("10-24-21").insertMany(newListings);
//     }
//
//     const client = await clientPromise
//     const db = client.db("grocery-app");
//     const oneBefore = await db.collection("10-24-21");
//
//     await createMultipleListings(db, [{
//         foodName: "",
//         foodPrice: "",
//         buy: [],
//         totalPeople: ""
//     },
//         {
//             foodName: "",
//             foodPrice: "",
//             buy: [],
//             totalPeople: ""
//         }
//     ])
//
//
//
//     //
//     res.json({message: "temp"});
//     // res.json({message: "IT WORKS!!"})
// }