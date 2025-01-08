import React from 'react'
import {  logo2 } from '../../utils'
import { Link } from 'react-router-dom'
import { FaEyeSlash } from 'react-icons/fa'

const Login = () => {
  return (
    <>
    <section className="login_content d-flex justify-content-lg-end align-items-center position-relative">
         <div className="login_form d-flex flex-column align-items-center justify-content-center px-lg-5 position-relative">
                    <img src={logo2} alt="Reality Assistant" className="position-absolute top-0 start-50 translate-middle-x mt-5"/>
            <form action="" className="w-100 px-5">
                <h2 className="fw-bold text-center mb-5">Login</h2>
                    <div className="mb-3">
                        <input type="mail" className="border border-black-50 border-2 border-bottom-0 p-2 rounded-2 w-100" placeholder="Username" />
                    </div>
                    <div className="mb-2 position-relative w-full">
                        <input type="password" className="border border-black-50 border-2  border-bottom-0 p-2 rounded-2 w-100" placeholder="Password" />
                        <span className="position-absolute end-0 top-50 translate-middle-y me-4 text-black-50 ">
                        <FaEyeSlash />
                        </span>
                    </div>
                    <div className="mb-4 d-flex justify-content-end"><Link to="/reset-password">Forgot Password?</Link></div>
                    <div>
                        <button className="text-uppercase w-100 py-2 border-0 primary_btn rounded-2">Login</button>
                    </div>
            </form>
        </div>
    </section>
    </>
  )
}

export default Login