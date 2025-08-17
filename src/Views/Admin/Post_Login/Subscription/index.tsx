import React from 'react';

const Subscription = () => {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-center" style={{ color: '#06014f' }}>
                Create Subscription
            </h1>
            <p className="text-center text-gray-600">
                This is the subscription management page for admin users.
            </p>
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <h2 className="text-xl font-semibold mb-4">Subscription Management</h2>
                <p className="text-gray-600">
                    Here you can create and manage subscriptions for users.
                </p>
            </div>
        </div>
    );
};

export default Subscription;
