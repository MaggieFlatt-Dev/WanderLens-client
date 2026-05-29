import { useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import WanderLensLogo from "../../assets/WanderLensLogo.png";

export const Login = () => {
    const [email, setEmail] = useState("maggie@testemail.com")
    const [password, setPassword] = useState("Test1")
    const existDialog = useRef()
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()
        fetch("http://localhost:8000/login", {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(authInfo => {
                if (authInfo.valid) {
                    localStorage.setItem("WanderLens_token", JSON.stringify(authInfo))
                    navigate("/")
                } else {
                    existDialog.current.showModal()
                }
            })
    }

    return (
        <main className="min-h-screen flex flex-col items-center justify-center bg-earthGreen">
            <dialog className="p-6 rounded-lg shadow-md bg-cream" ref={existDialog}>
                <div className="text-earthGreen text-xl antialiased">User does not exist</div>
                <button className="mt-3 text-md text-darkBrown hover:text-red" onClick={() => existDialog.current.close()}>Close</button>
            </dialog>

            <section>
                <form className="bg-cream p-8 rounded-lg shadow-md w-80 flex flex-col gap-4" onSubmit={handleLogin}>
                    <img src={WanderLensLogo} alt="WanderLens Logo" />
                    <h2 className="text-xl text-center text-mustard">Please sign in</h2>
                    <fieldset className="flex flex-col gap-1 border-0 p-0">
                        <label className="text-sm font-medium text-mustard" htmlFor="inputEmail">Email address</label>
                        <input
                            type="email"
                            id="inputEmail"
                            value={email}
                            onChange={evt => setEmail(evt.target.value)}
                            className="border border-lunarGold 
                            bg-white 
                            rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-lunarGoldHover"
                            placeholder="Email address"
                            required autoFocus
                        />
                    </fieldset>
                    <fieldset className="flex flex-col gap-1 border-0 p-0">
                        <label className="text-sm font-medium text-mustard" htmlFor="inputPassword">Password</label>
                        <input
                            type="password"
                            id="inputPassword"
                            value={password}
                            onChange={evt => setPassword(evt.target.value)}
                            className="border border-lunarGold
                            bg-white 
                            rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-lunarGoldHover"
                            placeholder="Password"
                        />
                    </fieldset>
                    <fieldset className="border-0 p-0">
                        <button type="submit" className="largeButton">
                            Sign in
                        </button>
                    </fieldset>
                </form>
            </section>
            <div className="mt-4">
                <Link className="text-offWhite hover:text-lunarGoldHover underline text-sm" to="/register">Not a member yet?</Link>
            </div>
        </main>
    )
}
