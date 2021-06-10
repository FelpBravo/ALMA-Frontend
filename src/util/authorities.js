import { createSelector } from 'reselect';

const selectAuthUserAuthorities = state => state?.auth?.authorities;

export const hasAuthority = authority => createSelector(
    selectAuthUserAuthorities,
    authorities => authorities && authorities.includes(authority),
);