import { types } from 'types/types';

const initialState = {
    openModal: false,
    openModal1: false,
    userslist: [],
    validateNickname: false,
    companys: [],
    departments: [],
    dependencies: [],
    profiles:[],
    groupname: false,
    grouplist: [],
    users: {
        id: '',
            },
    members: [],        
   
}

export const adminUsersReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.usersInitLoaded:
            return {
                ...state,
                userslist: action.payload,
            } 
        case types.companyInitLoaded:
            return {
                ...state,
                companys: action.payload,
            }
        case types.departmentsInitLoaded:
            return {
                ...state,
                departments: action.payload,
                }
        case types.usersOpenModal:
            return {
                ...state,
                openModal: true,
            }

        case types.usersCloseModal:
            return {
                ...state,
                openModal: false,
            }
        case types.groupOpenModal:
            return {
                ...state,
                openModal1: true,
            }

        case types.groupCloseModal:
            return {
                ...state,
                openModal1: false,
            }
        case types.usersValidateNickname:
            return {
                ...state,
                validateNickname: action.payload
            }
        case types.groupValidateName:
            return {
                ...state,
                groupname: action.payload
                }              
        case types.dependenciesInitLoaded:
            return {
                ...state,
                dependencies: action.payload,
            }
        case types.profilesInitLoaded:
            return {
                ...state,
                profiles: action.payload,
            }
        case types.groupInitLoaded:
            return {
                ...state,
                grouplist: action.payload,
                } 
        case types.groupSaveLoaded:
            return {
                ...state,
                openModal1: false,
                users: {
                    id: '',
                        }
                }
        case types.membersInitLoaded:
            return {
                ...state,
                members: action.payload,
                }                
        
        default:
            return state;
    }
};