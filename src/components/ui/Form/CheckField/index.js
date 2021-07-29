import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox, FormControlLabel } from '@material-ui/core';
import { Controller } from 'react-hook-form';
import IntlMessages from 'util/IntlMessages';

const CheckField = ({
  name,
  label,
  control,
  className
}) => (
  <FormControlLabel
    label={<IntlMessages id="document.loadDocuments.ControlledDoc" />}
    className={className}
    control={(
      <Controller
        label={label}
        name={name}
        control={control}
        defaultValue={false}
        render={({ field: { onChange, value } }) => (
          <Checkbox
            color="primary"
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

export { CheckField };
