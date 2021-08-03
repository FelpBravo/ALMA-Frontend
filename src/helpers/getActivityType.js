import IntlMessages from 'util/IntlMessages';
import React from 'react'

export const SUBSCRIBED = 'SUBSCRIBED';
export const UPLOADED = 'UPLOADED';
export const VIEWED = 'VIEWED';
export const UPDATED = 'UPDATED';

const lblSubscribed = <IntlMessages id="dashboard.subscription" />  
const lblUploaded = <IntlMessages id="dashboard.uploated" /> 
const lblViewed = <IntlMessages id="dashboard.visualized" /> 
const lblUpdated = <IntlMessages id="dashboard.updated" />  

export const getActivityType = (activity) => {

    switch (activity) {

        case SUBSCRIBED:
            return lblSubscribed;

        case UPLOADED:
            return lblUploaded;

        case VIEWED:
            return lblViewed;

        case UPDATED:
            return lblUpdated;

        default:
            return '';

    }

}