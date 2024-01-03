// apps/client/src/components/ui/badge2.tsx

import React from 'react';
// import PropTypes from 'prop-types';
// import './Badge.css'; // Assume this is your CSS file for styling

const Badge2 = ({ label, count, isAlert }) => {
  const ariaRole = isAlert ? 'alert' : 'status';
  const contrastStyle = {
    backgroundColor: 'navy', // High contrast background
    color: 'white', // High contrast text color
  };

  return (
    <div
      className={`badge-container ${isAlert ? 'alert-badge' : ''}`}
      style={contrastStyle}
    >
      <span className="badge-label">{label}</span>
      {count > 0 && (
        <span className="badge-count" role={ariaRole} aria-live="polite">
          {count}
        </span>
      )}
    </div>
  );
};

// @ts-ignore
Badge2.propTypes = {
  // @ts-ignore
  label: PropTypes.string.isRequired,
  // @ts-ignore
  count: PropTypes.number,
  // @ts-ignore
  isAlert: PropTypes.bool,
};

Badge2.defaultProps = {
  count: 0,
  isAlert: false,
};

export default Badge2;
