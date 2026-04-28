import React from 'react';

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="card">
      <div className="card-header">
        <div className="card-icon">{icon}</div>
        <h3>{title}</h3>
      </div>
      <div className="card-body">
        <p>{description}</p>
      </div>
    </div>
  );
};

export default FeatureCard;
