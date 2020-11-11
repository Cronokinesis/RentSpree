import { useState, useEffect } from 'react'
import { useRecoilValue, useRecoilState, useResetRecoilState } from 'recoil'
import { listOptionState, productsState, selectItemState, modalState, confirmState } from '../../../store/atom'
import { getProducts, getPagination, getLimits } from '../../../store/selector'
import { Transition } from '@tailwindui/react'
import { Link } from 'react-router-dom'
import _, { update } from 'lodash'
import Modal from '../../modal'
import Confirm from '../../modal/confirm'

import {
    getProductsWithAPI,
    createProduct,
    updateProductById,
    deleteProductById
} from './api'

function Dashboard() {
    const [totalProducts, setProducts] = useRecoilState(productsState)
    const { products, pages, limit, numberOfPage, totalJokes } = useRecoilValue(getProducts)
    const [listOption, setListOption] = useRecoilState(listOptionState)
    const pagination = useRecoilValue(getPagination)
    const limits = useRecoilValue(getLimits)

    const [isOpenLimit, setIsOpenLimit] = useState(false)

    const [modal, setModal] = useRecoilState(modalState)
    const [item, setItem] = useRecoilState(selectItemState)
    const resetItem = useResetRecoilState(selectItemState)
    const [confirm, setConfirm] = useRecoilState(confirmState)

    useEffect(() => {
        async function fetchData() {
            setProducts(await getProductsWithAPI())
        }
        fetchData()
    }, [])

    const onConfirmCreate = async () => {
        const { success, code, message } = await createProduct(item)
        if (success) {
            setProducts(await getProductsWithAPI())
            setModal({
                isShow: false
            })
        } else {
            if (code === 99) {
                //id is already exists
                setModal({
                    ...modal,
                    idIsAlready: true,
                    message
                })
            }
        }
    }

    const onConfirmEdit = async () => {
        if (await updateProductById(item)) {
            setProducts(await getProductsWithAPI())
            setModal({
                isShow: false
            })
        }
    }

    const onConfirmDelete = async () => {
        const { id } = item
        if (await deleteProductById(id)) {
            setProducts(await getProductsWithAPI())
            setConfirm({
                isShow: false
            })
        }
    }

    const onCancel = (type) => {
        switch (type) {
            case 'create':
            case 'edit':
                setModal({ isShow: false, type: modal.type })
                break;
            case 'delete':
                setConfirm({ isShow: false })
                break;
            default:
                break;
        }

    }

    const onChangePagination = (symbol) => {
        switch (symbol) {
            case '<':
                setListOption({
                    ...listOption,
                    numberOfPage: (numberOfPage - 1) > 0 ? numberOfPage - 1 : 1
                })
                break;
            case '>':
                setListOption({
                    ...listOption,
                    numberOfPage: (numberOfPage + 1) <= pages ? numberOfPage + 1 : pages
                })
                break;
            default:
                setListOption({
                    ...listOption,
                    numberOfPage: symbol
                })
                break;
        }
    }

    const onChangeLimit = (limit) => {
        setListOption({ numberOfPage: 1, limit })
        setIsOpenLimit(false)
    }

    return (
        <div className="max-h-screen-90 m-5 pb-2 bg-white rounded">
            <div className="bg-white px-4 py-3 sm:flex items-center sm:justify-between border-t border-gray-200 sm:px-6">
                <div className="w-full text-center sm:hidden">
                    <div className="text-sm leading-5 text-gray-700">
                        Showing &nbsp;
                            <span className="font-medium">{numberOfPage}</span>
                            &nbsp;to&nbsp;
                            <span className="font-medium">{pages}</span>
                            &nbsp;of&nbsp;
                            <span className="font-medium">{totalJokes}</span>
                            &nbsp;results
                            </div>
                </div>
                <div className="grid grid-cols-3 w-full sm:hidden">
                    <Link to={"#"}
                        className="text-center px-2 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
                        onClick={() => onChangePagination('<')}>
                        Previous
                        </Link>
                    <div className="text-center px-2">
                        <div>
                            <span className="rounded-md shadow-sm">
                                <button type="button"
                                    className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition ease-in-out duration-150"
                                    id="options-menu" aria-haspopup="true" aria-expanded="true"
                                    onClick={() => { setIsOpenLimit(!isOpenLimit) }}
                                >
                                    {limit}
                                    <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </span>
                        </div>
                        <Transition
                            show={isOpenLimit}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-100"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-100"
                        >
                            <div className="origin-top-right absolute  mt-2 w-32 rounded-md shadow-lg">
                                <div className="rounded-md bg-white shadow-xs">
                                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                        {
                                            limits.map(number => {
                                                return (
                                                    <Link to={"#"} key={number} className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                                                        role="menuitem"
                                                        onClick={() => onChangeLimit(number)}
                                                    >
                                                        {number}
                                                    </Link>
                                                )
                                            })
                                        }

                                        {/* <a href="#" className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900" role="menuitem">Support</a>
                                                <a href="#" className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900" role="menuitem">License</a> */}
                                    </div>
                                </div>
                            </div>
                        </Transition>
                    </div>
                    <Link to={"#"}
                        className="text-center px-2 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
                        onClick={() => onChangePagination('>')}>
                        Next
                    </Link>
                </div>
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                    <div>
                        <div className="text-sm leading-5 text-gray-700">
                            Showing &nbsp;
                            <span className="font-medium">{numberOfPage}</span>
                            &nbsp;to&nbsp;
                            <span className="font-medium">{pages}</span>
                            &nbsp;of&nbsp;
                            <span className="font-medium">{totalJokes}</span>
                            &nbsp;results

                        <div className="relative inline-block text-left px-4">
                                <div>
                                    <span className="rounded-md shadow-sm">
                                        <button type="button"
                                            className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition ease-in-out duration-150"
                                            id="options-menu" aria-haspopup="true" aria-expanded="true"
                                            onClick={() => { setIsOpenLimit(!isOpenLimit) }}
                                        >
                                            {limit}
                                            <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                    </span>
                                </div>
                                <Transition
                                    show={isOpenLimit}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-100"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-100"
                                >
                                    <div className="origin-top-right absolute  mt-2 w-56 rounded-md shadow-lg">
                                        <div className="rounded-md bg-white shadow-xs">
                                            <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                                {
                                                    limits.map(number => {
                                                        return (
                                                            <Link to={"#"} key={number} className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                                                                role="menuitem"
                                                                onClick={() => onChangeLimit(number)}
                                                            >
                                                                {number}
                                                            </Link>
                                                        )
                                                    })
                                                }

                                                {/* <a href="#" className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900" role="menuitem">Support</a>
                                                <a href="#" className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900" role="menuitem">License</a> */}
                                            </div>
                                        </div>
                                    </div>
                                </Transition>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-row">
                        <div className="mx-4 flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                            {/* <!-- Heroicon name: exclamation --> */}
                            <button className="w-10 h-10 bg-white focus:outline-none"
                                onClick={() => {
                                    resetItem()
                                    setModal({
                                        type: 'create',
                                        isShow: true
                                    })
                                }}
                            >
                                <img src="/plus.svg" alt="plus" />
                            </button>
                        </div>
                        <nav className="relative inline-flex shadow-sm">
                            {
                                pagination.map(({ no, active, enable, symbol }) => {
                                    return (
                                        enable ?
                                            active ?
                                                <span key={no} className="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-gray-200 text-sm leading-5 font-medium text-gray-700">
                                                    {symbol}
                                                </span>
                                                :
                                                <button key={no} className={`-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium  focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150`}
                                                    onClick={() => onChangePagination(symbol)}
                                                >
                                                    {symbol}
                                                </button>
                                            :
                                            <span key={no} className="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700">
                                                {symbol}
                                            </span>
                                    )
                                })
                            }
                        </nav>
                    </div>
                </div>
            </div>
            <Modal
                onConfirmCreate={onConfirmCreate}
                onConfirmEdit={onConfirmEdit}
                onCancel={onCancel}
            />
            <Confirm
                onConfirm={onConfirmDelete}
                onCancel={onCancel}
            />
            <div className="max-h-screen-70 sm:max-h-screen-80 flex flex-col overflow-auto">
                <div className="p-2 align-middle inline-block min-w-full">
                    <div className="shadow border-b border-gray-200 sm:rounded-lg">
                        <table className="">
                            <thead>
                                <tr>
                                    <th className="w-20 px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        ID
                                        </th>
                                    <th className="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Name
                                        </th>
                                    <th className="w-64 px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        description
                                        </th>
                                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Price
                                        </th>
                                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                        </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white">
                                {
                                    products.map(({ id, name, description, price }) => (
                                        <tr key={id}>
                                            <td className="px-6 py-4 whitespace-no-wrap">
                                                <div className="flex items-center justify-center">
                                                    {id}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-no-wrap">
                                                <div className="flex items-center justify-center">
                                                    {name}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-no-wrap">
                                                {description}
                                            </td>
                                            <td className=" px-6 py-4 text-right whitespace-no-wrap">
                                                {_.isNumber(price) ? price.toFixed(2) : '0.00'}
                                            </td>
                                            <td className=" px-6 py-4 whitespace-no-wrap">
                                                <span className="px-2 inline-flex text-sm leading-5 font-semibold rounded-full bg-green-100 text-green-400 hover:bg-green-600 hover:text-white">
                                                    <button className="focus:outline-none"
                                                        onClick={() => {
                                                            setItem({
                                                                id, name, description, price
                                                            })
                                                            setModal({
                                                                type: 'edit',
                                                                isShow: true
                                                            })
                                                        }}
                                                    >
                                                        Edit
                                                        </button>
                                                </span>
                                                <span className="px-2 inline-flex text-sm leading-5 font-semibold rounded-full bg-red-100 text-red-400 hover:bg-red-600 hover:text-white">
                                                    <button className="focus:outline-none"
                                                        onClick={() => {
                                                            setItem({
                                                                id, name, description, price
                                                            })
                                                            setConfirm({
                                                                ...confirm,
                                                                isShow: true
                                                            })
                                                        }}
                                                    >
                                                        Delete</button>
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Dashboard