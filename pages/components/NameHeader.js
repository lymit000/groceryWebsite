import "tailwindcss/tailwind.css"

function Profile(props) {

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

        </div>
    )
}

export default Profile;