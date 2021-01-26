
export const SUBSCRIBED = 'SUBSCRIBED';
export const UPLOADED = 'UPLOADED';
export const VIEWED = 'VIEWED';
export const UPDATED = 'UPDATED';

const lblSubscribed = 'Subscribió'
const lblUploaded = 'Subió'
const lblViewed = 'Visualizó'
const lblUpdated = 'Actualizó'

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