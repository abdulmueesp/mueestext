import React from 'react';
import PageHeader from '../../../../Components/common/PageHeader';

const Subscription = () => {
    return (
       <>
         <PageHeader title="Subscription" backButton={true} />
         <div className="subscription-content">
           {/* Your subscription content goes here */}
           <h2>Subscription Management</h2>
           <p>Manage your subscription plans and billing information here.</p>
         </div>
       </>
    );
};

export default Subscription;
