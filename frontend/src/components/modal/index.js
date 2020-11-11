import _ from 'lodash'
import { Transition } from '@tailwindui/react'
import { useResetRecoilState, useRecoilState, useRecoilValue } from 'recoil'
import { selectItemState, modalState } from '../../store/atom'

function Modal({ onConfirmCreate, onConfirmEdit, onCancel }) {
    const [item, setItem] = useRecoilState(selectItemState)
    const { id, name, description, price } = item
    const { type, isShow, idIsAlready, message } = useRecoilValue(modalState)
    const isModalCreate = type === "create"

    return (
        <Transition
            show={isShow}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        >
            <div className="fixed inset-0 overflow-y-auto">
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <div className="fixed inset-0 transition-opacity">
                        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                    </div>

                    {/* <!-- This element is to trick the browser into centering the modal contents. --> */}
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;

                    <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                                <div className="mt-3 sm:mt-0 sm:ml-4 sm:text-left w-full">
                                    {
                                        isModalCreate ?
                                            <h3 className="text-lg leading-6 font-medium text-gray-900 flex flex-row items-center" id="modal-headline">
                                                <div className="flex-shrink-0 flex items-center justify-center rounded-full sm:mx-0 sm:h-10 sm:w-10">
                                                    {/* <!-- Heroicon name: exclamation --> */}
                                                    <img className="w-8 h-8" src={"/plus.svg"} alt="plus" />
                                                </div>
                                                <div className="px-2">
                                                    Create Products
                                                </div>
                                            </h3>
                                            :
                                            <h3 className="text-lg leading-6 font-medium text-gray-900 flex flex-row items-center" id="modal-headline">
                                                <div className="flex-shrink-0 flex items-center justify-center rounded-full sm:mx-0 sm:h-10 sm:w-10">
                                                    {/* <!-- Heroicon name: exclamation --> */}
                                                    <img className="w-8 h-8" src={"/edit.svg"} alt="edit" />
                                                </div>
                                                <div className="px-2">
                                                    Edit Products
                                                </div>
                                            </h3>
                                    }

                                    <div className="mt-2">
                                        <div className="px-4 py-2 bg-white sm:px-6 sm:py-2">

                                            {
                                                isModalCreate ?
                                                    idIsAlready ?
                                                        <div className="mb-4">
                                                            <label htmlFor="about" className="block text-sm leading-5 font-medium text-gray-700">
                                                                {'ID :'}
                                                            </label>
                                                            <div className="rounded-md shadow-sm">
                                                                <input className="p-1 mt-1 w-full left-0 right-0 relative transition duration-150 ease-in-out sm:text-sm sm:leading-5 outline-red"
                                                                    placeholder="id of product"
                                                                    onChange={e => setItem({
                                                                        ...item,
                                                                        id: e.target.value
                                                                    })}
                                                                    value={id}
                                                                />
                                                            </div>
                                                            <p className="mt-2 text-sm text-red-600">
                                                                {message}
                                                            </p>
                                                        </div>
                                                        : <div className="mb-4">
                                                            <label htmlFor="about" className="block text-sm leading-5 font-medium text-gray-700">
                                                                {'ID :'}
                                                            </label>
                                                            <div className="rounded-md shadow-sm">
                                                                <input className="p-1 mt-1 w-full left-0 right-0 relative transition duration-150 ease-in-out sm:text-sm sm:leading-5 focus:outline-none shadow-outline"
                                                                    placeholder="id of product"
                                                                    onChange={e => setItem({
                                                                        ...item,
                                                                        id: e.target.value
                                                                    })}
                                                                    value={id}
                                                                />
                                                            </div>
                                                        </div>
                                                    :
                                                    <div className="mb-4">
                                                        <label htmlFor="company_website" className="block text-base font-medium leading-5 text-gray-700 p-1">
                                                            {`ID : ${id}`}
                                                        </label>
                                                    </div>
                                            }
                                            <div className="mb-4">
                                                <label className="block text-sm leading-5 font-medium text-gray-700">
                                                    Name :
                                                    </label>
                                                <div className="rounded-md shadow-sm">
                                                    <input className="p-1 mt-1 w-full left-0 right-0 relative transition duration-150 ease-in-out sm:text-sm sm:leading-5 focus:outline-none focus:shadow-outline focus:border-blue-300"
                                                        placeholder="name of product"
                                                        onChange={e => setItem({
                                                            ...item,
                                                            name: e.target.value
                                                        })}
                                                        value={name}
                                                    />
                                                </div>
                                            </div>
                                            <div className="mb-4">
                                                <label className="block text-sm leading-5 font-medium text-gray-700">
                                                    Description :
                                                    </label>
                                                <div className="rounded-md shadow-sm">
                                                    <input className="p-1 mt-1 w-full left-0 right-0 relative transition duration-150 ease-in-out sm:text-sm sm:leading-5 focus:outline-none focus:shadow-outline focus:border-blue-300"
                                                        placeholder="description of product"
                                                        onChange={e => setItem({
                                                            ...item,
                                                            description: e.target.value
                                                        })}
                                                        value={description}
                                                    />
                                                </div>
                                            </div>
                                            <div className="mb-4">
                                                <label className="block text-sm leading-5 font-medium text-gray-700">
                                                    Price :
                                                    </label>
                                                <div className="rounded-md shadow-sm">
                                                    <input className="p-1 mt-1 w-full left-0 right-0 relative transition duration-150 ease-in-out sm:text-sm sm:leading-5 focus:outline-none focus:shadow-outline focus:border-blue-300"
                                                        type="number"
                                                        placeholder="0.00"
                                                        onChange={e => setItem({
                                                            ...item,
                                                            price: e.target.value
                                                        })}
                                                        value={price}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                            <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                                {
                                    isModalCreate ?
                                        <button type="button"
                                            className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-green-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-green-500 focus:outline-none focus:border-green-800 focus:shadow-outline-red transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                                            onClick={onConfirmCreate}
                                        >
                                            Create
                                        </button>
                                        :
                                        <button type="button"
                                            className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-blue-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:border-blue-800 focus:shadow-outline-red transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                                            onClick={onConfirmEdit}
                                        >
                                            Edit
                                        </button>
                                }
                            </span>
                            <span className="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
                                <button type="button"
                                    className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                                    onClick={() => {
                                        onCancel(isModalCreate ? 'create' : 'edit')
                                    }}
                                >
                                    Cancel
                                </button>
                            </span>
                        </div>
                    </div>
                </div>
            </div >
        </Transition >
    )
}

export default Modal