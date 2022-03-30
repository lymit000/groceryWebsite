import "tailwindcss/tailwind.css"
import {useRouter} from "next/router";
import Link from "next/link";
import {server} from "../../config";

function Profile(props) {

    return (
        <Link href={server + "people/" + props.Name}>
            <button className="flex items-center justify-center mx-2 my-2 bg-otherBlack rounded-lg flex items-center justify-center text-3xl font-mono h-5/6 ">
                <div>
                    {props.Name}
                </div>

            </button>
        </Link>
    )
}

export default Profile;