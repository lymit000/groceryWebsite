import Link from "next/link";
import "tailwindcss/tailwind.css"
import {server} from "../../config";


function date(props) {

    return (
        <Link href={server + "dates/" + props.Name} passHref>
            <button className={"text-white w-full rounded-3xl mx-3 flex items-center justify-center mx-20 text-6xl font-mono h-full text-center bg-otherBlack rounded-3xl "}>
                <div>
                    {props.buy ? <div className={"text-green-400"}>
                        {props.Name}
                    </div> : <div className={"text-red-500"}>
                        {props.Name}
                    </div>}

                    <div className={"text-red-500"}>
                    </div>
                </div>
            </button>
        </Link>

    )
}

export default date;