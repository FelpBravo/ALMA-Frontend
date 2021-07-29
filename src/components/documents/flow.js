import { get } from 'lodash'
import React, { useState } from 'react'

import Request from './steps/requestReview'
import UploadDocument from './steps/uploadDocument'

export const useFlowSteps = ({ ...props }) => {
    const [otherProps, setOtherProps] = useState({})
    
    const flowSteps = {
        "Carga de doscumentos": < UploadDocument {...props} {...otherProps} setOtherProps={setOtherProps} />,
        "Solicitud de Revisión y Aprobación": <Request {...props} {...otherProps} />,
    }
    
    const [activeStep, setActiveStep] = useState(0)
    const Component = flowSteps[Object.keys(flowSteps)[activeStep]];


    return { flowSteps, Component, activeStep, setActiveStep, otherProps, setOtherProps };
}