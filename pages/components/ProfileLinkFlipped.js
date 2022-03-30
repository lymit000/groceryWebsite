import "tailwindcss/tailwind.css"
import Link from "next/link";
import {server} from "../../config";

function ProfileLinked(props) {

    function refreshPage() {
        window.location.reload();
    }

    async function handleButton() {
        const result = await updateMarkDone();
        refreshPage();
    }

    async function updateMarkDone() {
        const personDB = await fetch(server + 'api/updatemarkdone?param0='+props.Name+"&param1="+props.date+"&param2="+props.markDone.toString());
    }

    return (
        <div className={"w-full items-center justify-center text-center"}>
        <Link href={props.link} passHref>
            <button className={"w-full flex items-center justify-center mx-2 bg-otherBlack flex items-center justify-center text-3xl font-mono h-5/6 border-l-4 border-t-4 border-r-2 border-background"}>
                <div>
                    <div>
                    {props.date}
                    {props.markDone ? <div className={"text-green-400"}>
                        ${props.totalPrice}
                    </div> : <div className={"text-red-500"}>
                        ${props.totalPrice}
                    </div>}
                    </div>
                </div>

            </button>
        </Link>
            {props.markDone ?
                <button className={"items-center text-center p-1 border-2 bg-otherBlack w-5/6 border-green-400 border-dotted"} onClick={handleButton}>
                    <h1>
                        Done
                    </h1>
                </button>: <button className={"items-center text-center p-1 border-2 bg-otherBlack w-5/6 border-red-500 border-dashed"} onClick={handleButton}>
                    <h1>
                        Not Done
                    </h1>
                </button> }
        </div>

    )
}

export default ProfileLinked;
// function Profile(props) {
//     return (<div>test</div>)
// }
//     export default Profile;