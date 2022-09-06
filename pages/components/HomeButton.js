import Link from "next/link";
import "tailwindcss/tailwind.css"
import {server} from "../../config";


function date(props) {

    return (
        <Link href={server} passHref>
            <div className={"h-max flex items-center justify-left bg-greenBackground text-yellowFont mx-1 w-fit font-mono rounded-lg p-2"}>
                <button>
                    Back to Home
                </button>
            </div>
        </Link>
    )
}

export default date;