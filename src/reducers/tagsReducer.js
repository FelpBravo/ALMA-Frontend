import { types } from 'types/types';

const initialState = {
    tagslist: [],
    openModal: false,
    actionModal: '',
    tags: {
        id: 0,
        tag: '',
        hex: '',
        state: true,
    },
    tagSet: "",
}

export const tagsReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.tagsInitLoaded:
            return {
                ...state,
                tagslist: action.payload,
            }

        case types.tagsOpenModal:
            return {
                ...state,
                openModal: true,
            }

        case types.tagsCloseModal:
            return {
                ...state,
                openModal: false,
            }

        case types.tagsSetActionModal:
            return {
                ...state,
                actionModal: action.payload,
            }

        case types.tagsDeleteLoaded:
            return {
                ...state,
                tagslist: action.payload,
            }

        case types.tagsSetFolder:
            return {
                ...state,
                tags: { ...action.payload }
            }

        case types.tagsSaveLoaded:
            return {
                ...state,
                openModal: false,
                tags: {
                    id: 0,
                    tag: '',
                    hex: '',
                    state: true,
                }
            }

        case types.tagsUpdateLoaded:
            return {
                ...state,
                tagslist: state.tagslist.map((item) => {

                    const { id, tag, hex } = action.payload;

                    if (item.id === id) {

                        item.tag = tag;
                        item.hex = hex;

                    }

                    return item;

                }),
            }

        case types.tagsRemoveAll:
            return {
                tagslist: [],
                openModal: false,
                actionModal: '',
                tags: {
                    id: 0,
                    tag: '',
                    hex: '',
                    state: true,
                }
            }
        case types.tagSetInit:
            return {
                ...state,
                tagSet: action.payload,
            }

        default:
            return state;
    }
};