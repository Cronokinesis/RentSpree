import _ from 'lodash'
import { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Transition } from '@tailwindui/react'
import { useRecoilValue } from 'recoil'
import { getFirstName, getLastName } from '../../store/selector'

const regexPathDashboard = /^\/dashboard/i

function Header() {
    const [isOpenProfile, setIsOpenProfile] = useState(false)
    const [isOpenMenu, setIsOpenMenu] = useState(false)

    const firstName = useRecoilValue(getFirstName)
    const lastName = useRecoilValue(getLastName)

    const history = useHistory()
    const path = _.get(history, ['location', 'pathname'], '')

    const isDashboard = regexPathDashboard.test(path.toLocaleLowerCase())

    return (
        <nav className="bg-blue-600">
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                <div className="relative flex items-center justify-between h-16">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        {/* <!-- Mobile menu button--> */}
                        <button className="inline-flex items-center justify-center p-2 rounded-md text-gray-200 hover:text-white hover:bg-blue-800 focus:outline-none focus:bg-blue-800 focus:text-white transition duration-150 ease-in-out"
                            aria-label="Main menu" aria-expanded="false"
                            onClick={() => setIsOpenMenu(!isOpenMenu)}
                        >
                            <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                            <svg className="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="flex-shrink-0">
                            <img className="block lg:hidden h-10 w-auto" src="/rentspree-logo-circle.png" alt="Workflow logo" />
                            <img className="hidden lg:block h-10 w-auto" src="/rentspree-logo-circle.png" alt="Workflow logo" />
                        </div>
                        <div className="hidden sm:block sm:ml-6">
                            <div className="flex">
                                {
                                    isDashboard ?
                                        <Link to={"/dashboard"} className="ml-4 px-3 py-2 rounded-md text-sm font-medium leading-5 text-white bg-blue-800 focus:outline-none focus:text-white focus:bg-blue-700 transition duration-150 ease-in-out">Dashboard</Link>
                                        :
                                        <Link to={"/dashboard"} className="ml-4 px-3 py-2 rounded-md text-sm font-medium leading-5 text-gray-300 hover:text-white hover:bg-blue-700 focus:outline-none focus:text-white focus:bg-blue-700 transition duration-150 ease-in-out">Dashboard</Link>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        <div className="ml-3 relative">
                            <div>
                                <button className="flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-white transition duration-150 ease-in-out"
                                    id="user-menu" aria-label="User menu" aria-haspopup="true"
                                    onClick={() => setIsOpenProfile(!isOpenProfile)}
                                >
                                    <img className="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                                </button>
                            </div>
                            <Transition
                                show={isOpenProfile}
                                enter="ease-out duration-100"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-75"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95-0"
                            >
                                <div className="origin-top-right absolute right-0 mt-2 xl:w-screen-20 lg:w-screen-30 md:w-screen-40 sm:w-screen/2 xs: w-screen-90 rounded-md shadow-lg z-50">
                                    <div className="py-1 rounded-md bg-white shadow-xs" role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
                                        <span className="flex flex-row">
                                            <label className="block px-4  py-2 text-base leading-5 text-black">{firstName} {lastName}</label>
                                        </span>
                                        <Link to={'/sign-in'} className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 transition duration-150 ease-in-out" role="menuitem">Change Name</Link>
                                    </div>
                                </div>
                            </Transition>
                        </div>
                    </div>
                </div>
            </div>
            <Transition
                show={isOpenMenu}
                enter="hidden"
                enterFrom="hidden"
                enterTo="block"
                leave="block"
                leaveFrom="block"
                leaveTo="hidden"
            >
                <div className="sm:hidden">
                    <div className="px-2 pt-2 pb-3">
                        <Link to={"/dashboard"} className="block px-3 py-2 rounded-md text-base font-medium text-white bg-blue-800 focus:outline-none focus:text-white focus:bg-blue-500 transition duration-150 ease-in-out">Dashboard</Link>
                        <Link to={"/answer"} className="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-blue-700 focus:outline-none focus:text-white focus:bg-blue-700 transition duration-150 ease-in-out">Answer</Link>
                    </div>
                </div>
            </Transition>
        </nav>
    )
}

export default Header