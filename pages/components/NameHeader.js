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
        <div className="justify-center place-items-center text-center my-1  border- rounded-lg text-2xl font-mono h-5/6">
            <button className={"bg-greenBackground text-yellowFont p-2 rounded-lg font-semi"} onClick={updateFoodName}> Calculate Total
                {props.buy ? <div className={"font-thin text-yellowFont"}>
                ${props.totalPrice}
            </div>:<div className={"text-yellowFont"}>
                {props.Name} ${props.totalPrice}
            </div>} </button>

            {/*<div className={"text-3xl text-black"}>*/}
            {/*    {props.date}*/}
            {/*</div>*/}

        </div>
    )
}

export default Profile;