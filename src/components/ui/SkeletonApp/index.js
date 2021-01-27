import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';

const SkeletonApp = () => {
    return (
        <div>
            <Skeleton variant="circle" width={40} height={40} />
            <Skeleton
                variant="text"
                height={40}
                style={{width: '100%'}} />
            <Skeleton
                variant="text"
                height={40}
                style={{width: '100%'}} />
            <Skeleton
                variant="text"
                height={40}
                style={{width: '100%'}} />
            <Skeleton
                variant="text"
                height={40}
                style={{width: '100%'}} />
            <Skeleton
                variant="text"
                height={40}
                style={{width: '100%'}} />
        </div>
    )
}

export default SkeletonApp;