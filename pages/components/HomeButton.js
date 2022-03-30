import Link from "next/link";
import "tailwindcss/tailwind.css"
import {server} from "../../config";


function date(props) {

    return (
        <Link href={server} passHref>
            <div className={"flex items-center justify-left bg-otherBlack text-primary mx-1 w-fit font-mono rounded-lg p-1"}>
                <button>
                    Back to Home
                </button>
            </div>
        </Link>
    )
}

export default date;