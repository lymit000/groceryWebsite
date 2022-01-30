import Link from "next/link";
import Profile from "./Profile";
import "tailwindcss/tailwind.css"

function Dates(props) {

    return (
        <button>
            {/*<Link href={`http://localhost:3000/food/${props.personName}/${props.date}`}>*/}
            <Link href={`/food/${props.personName}/${props.date}`}>
            {/*<Link href={"http://localhost:3000/food/573a1391f29313caabcd8319"}>*/}
                <div className="flex items-center justify-center ">
                    <div className="bg-white font-semibold text-center rounded-3xl border shadow-lg p-10">
                        <button className="bg-red-600 px-1 py-1  rounded-3xl text-gray-100 font-bold uppercase">
                            {props.date}
                        </button>
                        <h1 className="text-sm text-gray-900 my-2"> ${props.itemPrice} </h1>
                    </div>
                </div>
            </Link>
        </button>

    )
}

export default Dates;