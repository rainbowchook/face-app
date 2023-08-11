import React, { ChangeEvent, FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { serverUrl } from '../Home'
import { useAuthContext } from '../../hooks/useAuthContext'
import { User } from '../../contexts/AuthContext'

export type SignInForm = {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const [form, setForm] = useState<SignInForm>({
    email: '',
    password: '',
  })
  const { signIn } = useAuthContext()
  const navigate = useNavigate()

  const { email, password } = form

  const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    fetch(`${serverUrl}/users/signin`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
      cache: 'default',
    })
      .then((res) => res.json())
      .then((user: User) => {
        console.log(user)
        if(!user.id) {
          throw new Error('Unable to sign user in')
        }
        signIn(user)
        navigate('/home')
      })
      .catch((error) => {
        alert(error)
        // navigate('/signin')
      })
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
              Sign In
            </legend>
            <div className="mt-4">
              <label
                className="block font-semibold leading-normal text-sm"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="p-2 appearance-none border border-solid bg-transparent hover:bg-black hover:white w-full"
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={onChange}
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
                value={password}
                onChange={onChange}
              />
            </div>
          </fieldset>
          <div className="mt-4">
            <input
              className="font-bold px-4 py-2 appearance-none border border-solid bg-transparent grow cursor-pointer textsm block"
              type="submit"
              value="Sign in"
            />
          </div>
          <div className="leading-normal mt-4">
            <Link className="form-link" to="/register">
              Register
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

export default SignIn
