import clientPromise from '../../lib/mongodb'
import {ObjectId} from "mongodb";

export default async function handler(req, res) {
    const query = req.query;
    // console.log(query);

    const client = await clientPromise
    const db = await client.db("grocery-app");

    const personName = query.param0;
    const date = query.param1;
    const markDone = query.param2;
    console.log("Ap before i")
    console.log(markDone)

    if (markDone === "true") {
        const updated = {markDone: false}
        const result = await client.db("grocery-app").collection(personName).updateOne({date: date}, { $set: {markDone: false}});
        console.log("false NOW")

    } else if (markDone === "false") {
        const updated = {markDone: true}
        const result = await client.db("grocery-app").collection(personName).updateOne({date: date}, { $set: {markDone: true}});

        console.log("TRUE NOW")
    }

    // res.json(data);
    await res.json("worked");
    // res.json({message: "IT WORKS!!"})
}