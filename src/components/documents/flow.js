import { get } from 'lodash'
import React, { useState } from 'react'

import Request from './steps/request'
import UploadDocument from './steps/upload'

export const useFlowSteps = ({ ...props }) => {

    const flowSteps = {
        "Carga de documentos": < UploadDocument {...props} />,
        "Solicitud de Revisión y Aprobación": <Request {...props} />
    }
    const [activeStep, setActiveStep] = useState(1)

    const Component = flowSteps[Object.keys(flowSteps)[activeStep]];

    return [flowSteps, Component, activeStep, setActiveStep];
}