import Head from 'next/head'
import "tailwindcss/tailwind.css"
import Link from "next/link";
import Dates from "../components/Dates";
import {server} from "../../config";
import HomeButton from "../components/HomeButton";
import NoProfile from "../components/NoProfile";

export default function Home() {

    const allNames = ["Aidan", "Andoni", "Atay", "Justin", "Keshav", "Kulbir", "Mitchell", "Nathaniel", "Ridge"]

    return (
        <div className={"bg-background h-full w-screen "}>
            <HomeButton/>

            <div className={"bg-background h-screen grid grid-cols-3 flex items-center justify-center text-white"}>
                {allNames.map(singleName => (
                    <NoProfile Name={singleName}/>
                ))}
            </div>
        </div>
        )
}

