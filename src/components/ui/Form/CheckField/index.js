import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox, FormControlLabel } from '@material-ui/core';
import { Controller } from 'react-hook-form';

const CheckField = ({
  name,
  label,
  control,
}) => (
  <FormControlLabel
    label={label}
    control={(
      <Controller
        label={label}
        name={name}
        control={control}
        defaultValue={false}
        render={({ field: {onChange, value} }) => (
          <Checkbox
            name={name}
            onChange={(e) => onChange(e.target.checked)}
            checked={value}
          />
        )}
      />
    )}
  />
);

CheckField.defaultProps = {
  name: '',
  label: '',
};

CheckField.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  control: PropTypes.objectOf(PropTypes.any).isRequired,
};

export { CheckField } ;
