import React from 'react';

const CardHeader = (props) => {

  const {heading, subHeading} = props;
  let {styleName} = props;

  return (
    <div className={`jr-card-header d-flex align-items-start ${styleName}`}>
      <div className="mr-auto">
        <h3 className="card-heading">{heading}</h3>
        {subHeading && <p className="sub-heading">{subHeading}</p>}
      </div>
    </div>
  )
};

export default CardHeader;
CardHeader.defaultProps = {
  styleName: '',
  subHeading: ''
};

