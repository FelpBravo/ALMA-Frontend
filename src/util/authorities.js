import { isArray } from 'lodash';
import { createSelector } from 'reselect';

const selectAuthUserAuthorities = state => state?.auth?.authorities;

export const hasAuthority = authority => createSelector(
    selectAuthUserAuthorities,
    authorities => authorities && authorities.includes(authority),
);

export const hasAllAuthorities = authorityList => createSelector(
    selectAuthUserAuthorities,
    authorities => authorities && authorities.some(r => authorityList.includes(r)),
);

// const existAuthority = (list, authority) => 
//     isArray(authority)
//     ? list.some(r => authority.includes(r))
//     : list.includes(authority)