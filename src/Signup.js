import axios from 'axios'
import { useState } from 'react';
import React from 'react';

async function handleSubmit(e, setShowModal) {
    console.log("Signup called")
    var error = false
    e.preventDefault()
    var res = {};
    var username = (e.target.form[0].value)
    var passwd = e.target.form[1].value
    await axios.get("https://subscription-back.herokuapp.com/api/users/" + username).then(async function (data) {
        res = data['data']
        if (res != null && res['username'] == username) {
            console.log("User already exists")
            setShowModal("User already exists")
            error = true
            setTimeout(() => { setShowModal(false) }, 2700)
        }
        await axios.post("https://subscription-back.herokuapp.com/api/users", {
            "username": username,
            "passwd": passwd
        }).catch(e => {
            setShowModal("Error, Please try again after sometime")
            error = true
            setTimeout(() => { setShowModal(false) }, 2700)
        })
    }).catch(e => {
        console.log(e)
        setShowModal("Error, Please try again after sometime")
        error = true
        setTimeout(() => { setShowModal(false) }, 2700)
    })
    if (!error)
        window.location.href = "/subscriptions"
}


function Signup(props) {
    const [showModal, setShowModal] = useState(false)
    console.log(props)
    return (
        <div className="login flex justify-center">
            {showModal ? (
                <>
                    <div
                        className=" flex AuthenticationModal overflow-x-hidden overflow-y-auto fixed outline-none focus:outline-none"
                    >
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            <div className="transition rounded-lg shadow-lg relative flex flex-col w-full bg-red-200 border-red-200 border-2 outline-none focus:outline-none">
                                <div className="px-5 py-2 rounded-t">
                                    <p>{showModal}</p>
                                </div>
                            </div>

                        </div>
                    </div>
                </>
            ) : null}
            <div className="flex flex-col">
                <div className="text-4xl text-white m-10">Sign up</div>
                <form>
                    <div className="flex flex-row">
                        <div className="flex flex-col">
                            <label className="m-2 text-white ml-0 text-lg">Username</label>
                            <label className="m-2 text-white ml-0 text-lg mt-7">Password</label>
                        </div>
                        <div className="flex flex-col">
                            <input className="p-2 border-grey-200 border-2 rounded-md focus:outline-none w-96" type="text" ></input>
                            <input className="p-2 border-grey-200 border-2 rounded-md focus:outline-none mt-5 w-96" type="password" ></input>
                        </div>
                    </div>
                    <input className="m-auto my-5 ml-4 p-3 transition duration-500 cursor-pointer rounded-lg w-32 ease-in-out text-white bg-blue-400 hover:bg-blue-700 hover:text-white focus:outline-none transform hover:scale-100" value="Sign Up" type="submit" onClick={(e) => handleSubmit(e, setShowModal)}></input>
                </form>
            </div>
        </div>
    )
}

export default Signup