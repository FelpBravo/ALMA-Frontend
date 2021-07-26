import { setChildrenTags } from 'helpers/setChildrenTags';
import { types } from 'types/types';

const initialState = {
    initTags: [],
    openModal: false,
    actionModal: '',
    tags: {
        id: 0,
        tag: '',
        hex: '',
        state: true,
    },
    selectedTagsIds: [],
    tagId: '',

}

export const tagsReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.tagsInitLoaded:
            return {
                ...state,
                initTags: action.payload,
            }

        case types.tagsSetChildren:
            setChildrenTags(state.initTags, action.payload.id, action.payload.tagS);
            return {
                ...state,
                initTags: [...state.initTags],
            }

        case types.tagsSaveIds:
            return {
                ...state,
                selectedTagsIds: [...state.selectedTagsIds, action.payload],
            }

        case types.tagsRemoveId:
            return {
                ...state,
                selectedTagsIds: state.selectedTagsIds.map(x => {
                    if (x != action.payload) {
                        return x;
                    }
                }),
            }
        case types.tagsRemoveIdSelected:
                return {
                    ...state,
                    tagId: "",
                }
        case types.tagsSelected:
            return {
                ...state,
                tagId: action.payload,
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