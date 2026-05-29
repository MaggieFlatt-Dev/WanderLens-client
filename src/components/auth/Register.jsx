import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import WanderLensLogo from "../../assets/WanderLensLogo.png";

export const Register = () => {
  const [email, setEmail] = useState("admina@straytor.com");
  const [password, setPassword] = useState("straytor");
  const [firstName, setFirstName] = useState("Admina");
  const [lastName, setLastName] = useState("Straytor");
  const existDialog = useRef();
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    fetch("http://localhost:8000/register", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
        first_name: firstName,
        last_name: lastName,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((authInfo) => {
        if (authInfo && authInfo.token) {
          localStorage.setItem("WanderLens_token", JSON.stringify(authInfo));
          navigate("/");
        } else {
          existDialog.current.showModal();
        }
      });
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-earthGreen">
      <dialog className="p-6 rounded-lg shadow-md bg-cream" ref={existDialog}>
        <div>User already exists</div>
        <button
          className="text-earthGreen text-xl antialiased"
          onClick={() => existDialog.current.close()}
        >
          Close
        </button>
      </dialog>

      <section>
        <form
          className="bg-cream p-8 rounded-lg shadow-md w-80 flex flex-col gap-4"
          onSubmit={handleRegister}
        >
          <img src={WanderLensLogo} alt="WanderLens Logo" />
          <h2
            className="text-xl 
                    text-earthGreen
                    text-center"
          >
            Register new account
          </h2>
          <fieldset className="flex flex-col gap-1 border-0 p-0">
            <label
              className="text-sm font-medium text-mustard"
              htmlFor="firstName"
            >
              First name
            </label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(evt) => setFirstName(evt.target.value)}
              className="border border-lunarGold
                            bg-white
                            rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-lunarGoldHover"
              required
              autoFocus
            />
          </fieldset>
          <fieldset className="flex flex-col gap-1 border-0 p-0">
            <label
              className="text-sm
                        text-mustard
                        font-medium"
              htmlFor="lastName"
            >
              Last name
            </label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(evt) => setLastName(evt.target.value)}
              className="border border-lunarGold 
                            bg-white
                            rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-lunarGoldHover"
              required
            />
          </fieldset>
          <fieldset className="flex flex-col gap-1 border-0 p-0">
            <label
              className="text-sm font-medium text-mustard"
              htmlFor="inputEmail"
            >
              Email address
            </label>
            <input
              type="email"
              id="inputEmail"
              value={email}
              onChange={(evt) => setEmail(evt.target.value)}
              className="border border-lunarGold
                            bg-white
                            rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-lunarGoldHover"
              placeholder="Email address"
              required
            />
          </fieldset>
          <fieldset className="flex flex-col gap-1 border-0 p-0">
            <label
              className="text-sm font-medium text-mustard"
              htmlFor="inputPassword"
            >
              Password
            </label>
            <input
              type="password"
              id="inputPassword"
              value={password}
              onChange={(evt) => setPassword(evt.target.value)}
              className="border border-lunarGold 
                            bg-white
                            rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-lunarGoldHover"
              placeholder="Password"
            />
          </fieldset>
          <fieldset className="border-0 p-0">
            <button type="submit" className="largeButton">
              Register
            </button>
          </fieldset>
        </form>
      </section>
      <div className="mt-4">
        <Link
          className="text-offWhite hover:text-lunarGold underline text-sm"
          to="/login"
        >
          Already have an account?
        </Link>
      </div>
    </main>
  );
};
