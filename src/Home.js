import macbook from "./macbook.svg"
import React from "react"
function Home(){


    return (
        <div class="h-full w-full leading-normal tracking-normal text-indigo-400 p-5 bg-cover bg-fixed">
            <div class="container pt-24 md:pt-36 mx-auto flex flex-wrap flex-col md:flex-row"> 
                <div class="flex flex-col w-full xl:w-2/5 lg:items-start overflow-y-hidden">
                    <h1 class="my-4 text-3xl md:text-5xl text-white opacity-75 font-bold leading-tight text-center md:text-left">
                        Manage all  your 
                        <span class="mx-4 bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-pink-500 to-purple-500">
                        Subscriptions
                        </span>
                        in a single app
                    </h1>
                    <p class="leading-normal text-base md:text-2xl mb-8 text-center md:text-left">
                        Manage your budget the right way
                    </p>

                    <div class="flex items-center justify-between pt-4">
                        <a
                            class="bg-gradient-to-r from-purple-800 to-green-500 hover:from-pink-500 hover:to-green-500 text-white font-bold py-2 px-4 rounded focus:ring transform transition hover:scale-105 duration-300 ease-in-out cursor-pointer"
                            href="/subscriptions"
                        >
                            Sign Up/Login
                        </a>
                    </div>
                </div>

                <div class="w-full xl:w-3/5 p-12 overflow-hidden">
                    <img class="mx-auto w-full md:w-4/5 transform -rotate-6 transition hover:scale-105 duration-700 ease-in-out hover:rotate-6" src={macbook} />
                </div>

                <div class="w-full pt-16 pb-6 text-sm text-center md:text-left fade-in">
                    <a class="text-gray-500 no-underline hover:no-underline" href="#">&copy; App 2020</a>
                    - Template by
                    <a class="text-gray-500 no-underline hover:no-underline" href="https://www.tailwindtoolbox.com">TailwindToolbox.com</a>
                </div>
            </div>
        </div>
    )
}

export default Home