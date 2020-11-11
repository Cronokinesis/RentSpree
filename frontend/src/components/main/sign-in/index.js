import _ from 'lodash'
import { useState } from 'react'
import { useRecoilState } from 'recoil'
import { characterState } from '../../../store/atom'
import { useHistory } from 'react-router-dom'

function SignIn() {
    const history = useHistory()
    const [character, setCharacter] = useRecoilState(characterState)
    const [firstName, setFirstName] = useState(_.get(character, 'firstName', ''))
    const [lastName, setLastName] = useState(_.get(character, 'lastName', ''))

    const onSubmit = async () => {
        setCharacter({
            firstName,
            lastName
        })

        history.push('/dashboard')
    }

    return (
        <div className="contianer h-screen bg-gray-200 flex justify-center items-center px-2">
            <div className="w-full max-w-lg bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="flex justify-center p-10 mb-4">
                    <img className="w-auto" src="/rentspree-logo.svg" alt="rentspree-logo"/>
                </div>
                <form className="pb-4">
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                                First Name
                        </label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                name="firstName" type="text" placeholder="Chuck" value={firstName}
                                onChange={e => setFirstName(e.target.value)}
                            />
                        </div>
                        <div className="w-full md:w-1/2 px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                                Last Name
                        </label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                name="lastName" type="text" placeholder="Norris" value={lastName}
                                onChange={e => setLastName(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="flex items-center justify-end">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="button"
                            onClick={onSubmit}
                        >
                            Submit
                        </button>
                    </div>
                </form>
                <p className="text-center text-gray-500 text-xs">
                    &copy;2020 Acme Corp. All rights reserved.
                </p>
            </div>
        </div>
    );
}

export default SignIn;
