import { useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom";

export const Login = () => {
    const [email, setEmail] = useState("maggie@testemail.com")
    const [password, setPassword] = useState("hilliard")
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
        <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
            <dialog className="p-6 rounded-lg shadow-md" ref={existDialog}>
                <div>User does not exist</div>
                <button className="mt-3 text-sm text-gray-500 hover:text-gray-700" onClick={() => existDialog.current.close()}>Close</button>
            </dialog>

            <section>
                <form className="bg-white p-8 rounded-lg shadow-md w-80 flex flex-col gap-4" onSubmit={handleLogin}>
                    <h1 className="text-4xl font-bold text-center">WanderLens</h1>
                    <h2 className="text-xl text-center text-gray-600">Please sign in</h2>
                    <fieldset className="flex flex-col gap-1 border-0 p-0">
                        <label className="text-sm font-medium text-gray-700" htmlFor="inputEmail">Email address</label>
                        <input
                            type="email"
                            id="inputEmail"
                            value={email}
                            onChange={evt => setEmail(evt.target.value)}
                            className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Email address"
                            required autoFocus
                        />
                    </fieldset>
                    <fieldset className="flex flex-col gap-1 border-0 p-0">
                        <label className="text-sm font-medium text-gray-700" htmlFor="inputPassword">Password</label>
                        <input
                            type="password"
                            id="inputPassword"
                            value={password}
                            onChange={evt => setPassword(evt.target.value)}
                            className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Password"
                        />
                    </fieldset>
                    <fieldset className="border-0 p-0">
                        <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
                            Sign in
                        </button>
                    </fieldset>
                </form>
            </section>
            <div className="mt-4">
                <Link className="text-blue-600 hover:text-blue-800 underline text-sm" to="/register">Not a member yet?</Link>
            </div>
        </main>
    )
}
