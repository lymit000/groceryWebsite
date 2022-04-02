import "tailwindcss/tailwind.css"
import {server} from "../../config";
import {useRouter} from "next/router";

function Profile(props) {

    async function updateFoodName() {
        const personDB = await fetch(server + 'api/updateAll?param0=' + props.Name + "&param1=" + props.date);
        forceReload();
    }


    const router = useRouter();
    const forceReload = () => {
        router.reload();
    }



    return (
        <div className="justify-center place-items-center text-center mx-2 my-2 bg-otherBlack rounded-lg text-3xl font-mono h-5/6 ">
            <div className={"text-4xl"}>
                {props.date}
            </div>
            {props.buy ? <div className={"text-green-400"}>
                {props.Name} ${props.totalPrice}
            </div>:<div className={"text-red-500"}>
                {props.Name} ${props.totalPrice}
            </div>}
            <button className={"bg-primary p-1 my-1 rounded-lg"} onClick={updateFoodName}> Calculate Total </button>
        </div>
    )
}

export default Profile;