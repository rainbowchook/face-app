import React, { SyntheticEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Register: React.FC = () => {
  const navigate = useNavigate()

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
    console.log(e.target)
    navigate('/home')
  }

  return (
    <article className="rounded border border-solid border-black border-opacity-10 shadow-lg my-8 w-full sm:w-50 md:w-25 max-w-fit mx-auto">
      <main className="p-8">
        <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
          <fieldset
            id="sign_up"
            className="border border-solid border-transparent px-0 mx-0"
          >
            <legend className="text-5xl font-semibold px-0 mx-0">
              Register
            </legend>
            <div className="mt-4">
              <label
                className="block font-semibold leading-normal text-sm"
                htmlFor="email-address"
              >
                Email
              </label>
              <input
                className="p-2 appearance-none border border-solid bg-transparent hover:bg-black hover:white w-full"
                type="email"
                name="email-address"
                id="email-address"
              />
            </div>
            <div className="mt-4">
              <label
                className="block font-semibold leading-normal text-sm"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="font-bold p-2 appearance-none border border-solid bg-transparent hover:bg-black hover:white w-full"
                type="password"
                name="password"
                id="password"
              />
            </div>
          </fieldset>
          <div className="mt-4">
            <input
              className="font-bold px-4 py-2 appearance-none border border-solid bg-transparent grow cursor-pointer textsm block"
              type="submit"
              value="Register"
            />
          </div>
          <div className="leading-normal mt-4">
            <Link className="form-link" to="/signin">
              Sign In
            </Link>
            {/* <a href="#0" className="form-link">
              Forgot your password?
            </a> */}
          </div>
        </form>
      </main>
    </article>
  )
}

export default Register