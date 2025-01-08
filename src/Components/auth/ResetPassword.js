import React from 'react'
import {  logo2 } from '../../utils'

const ResetPassword = () => {
  return (
    <>
     <section className="login_content d-flex justify-content-lg-end align-items-center position-relative">
        <div className="login_form d-flex flex-column align-items-center justify-content-center px-lg-5 position-relative">
                   <img src={logo2} alt="Reality Assistant" className="position-absolute top-0 start-50 translate-middle-x mt-5"/>
            <form action="" className="w-100 px-5">
                <h2 className="fw-bold text-center mb-0">Reset Your Password</h2>
                <p className="text-black-50 mb-5 text-center small_text">Your password will be reset by email</p>
                    <div className="mb-3">
                        <input type="mail" className="border border-black-50 border-2 border-bottom-0 p-2 rounded-2 w-100" placeholder="Enter your email address" />
                    </div>
                    <div>
                        <button className="text-uppercase w-100 py-2 border-0 primary_btn rounded-2">SEND OTP</button>
                    </div>
            </form>
        </div>
    </section>
    </>
  )
}

export default ResetPassword