import Link from "next/link";
import "tailwindcss/tailwind.css"
import { useState, useEffect } from 'react';
import {server} from "../../config";
import {useRouter} from "next/router";


function date(props) {

    return (
        <Link href={server + "/"}>
            <div className={"flex items-center justify-left bg-otherBlack text-primary mx-1 w-fit font-mono rounded-lg p-1"}>
                <button>
                    Back to Home
                </button>
            </div>
        </Link>
    )
}

export default date;