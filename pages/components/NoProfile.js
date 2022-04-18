import "tailwindcss/tailwind.css"
import {useRouter} from "next/router";
import Link from "next/link";
import {server} from "../../config";

function Profile(props) {

    return (
        <Link href={server + "people/" + props.Name} passHref>
            {/*<button className={"w-full flex items-center justify-center bg-otherBlack flex items-center justify-center text-xl font-mono h-5/6 -l-4 border-t-4 border-r-2 border-otherBlack"}>*/}
            <button className="flex items-center justify-center mx-2 my-2 bg-otherBlack rounded-lg flex items-center justify-center text-2xl font-mono h-5/6 ">
                <div>
                    <div>
                        <div>
                            {props.Name}
                        </div>
                        <div>
                            ${props.totalPrice}
                        </div>
                    </div>
                </div>

            </button>
        </Link>
    )
}

export default Profile;

// function Profile(props) {
//     return (<div>test</div>)
// }
// export default Profile;