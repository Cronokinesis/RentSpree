import { atom } from 'recoil';

export const characterState = atom({
    key: 'characterState',
    default: {
        firstName: '',
        lastName: ''
    }
});

export const jokesState = atom({
    key: 'jokesState',
    default: []
})

export const listOptionState = atom({
    key: 'listOptionState',
    default: {
        limit: 20,
        numberOfPage: 1
    }
})

export const productsState = atom({
    key: 'productsState',
    default: []
})

export const tokenState = atom({
    key: 'tokenState',
    default: ''
})

export const selectItemState = atom({
    key: 'selectItemState',
    default: {
        id: '',
        name: '',
        description: '',
        price: ''
    }
})

export const modalState = atom({
    key: 'modalState',
    default: {
        type: 'create',
        isShow: false,
        idIsAlready: false,
        message: ''
    }
})

export const confirmState = atom({
    key: 'confirmState',
    default: {
        type: 'delete',
        isShow: false
    }
})