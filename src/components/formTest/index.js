import React from 'react'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { TextField } from 'components/ui/Form';
import schema from './FormTest.schema';
import { Paper } from '@material-ui/core';



const CampaignForm = () => {

    const { register, handleSubmit, errors, control, watch } = useForm({
        mode: 'onTouched',
        name: 'campaign',
        // defaultValues: {},
        // resolver: yupResolver(schema),
    });

    const titleProps = {
        error: errors?.title || null,
        label: 'Título de campaña',
        name: 'title',
        register,
        shrink: true,
        size: 'medium',
    };

    const onSubmit = values => {
        console.log("values", values)
    };


    return (<Paper>
         <form onSubmit={handleSubmit(onSubmit)}>
            <TextField {...titleProps} />
            <button type="submit">Enviar</button>
        </form>
    </Paper>
    );
};

export default CampaignForm;
