import "tailwindcss/tailwind.css"
import {useRouter} from "next/router";

function Profile(props) {
    const router = useRouter();
    const forceReoload = () => {
        router.reload();
    }
    return (
        <div className="flex items-center justify-center">
            <div className="bg-white font-semibold text-center rounded-3xl border shadow-lg p-5 w-40 h-40">
                {/*<img className="mb-3 w-32 h-32 rounded-full shadow-lg mx-auto"*/}
                {/*     src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"*/}
                {/*     alt="product designer"/>*/}
                    <h1 className="flex text-lg text-gray-700 justify-center items-center"> {props.name} </h1>
                {props.moneyOwed && (
                    <h3 className="text-sm text-gray-400 "> You owe: ${props.moneyOwed} </h3>
                )}
            </div>
        </div>
    )
}

export default Profile;