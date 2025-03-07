import React from 'react';

function Settings() {
  return (
    <div className="min-h-screen p-4 bg-gray-50">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium">Change Password</h3>
            <p className="text-sm text-gray-500">Update your account password</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium">Notification Preferences</h3>
            <p className="text-sm text-gray-500">Manage your notification settings</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium">Privacy Settings</h3>
            <p className="text-sm text-gray-500">Control your privacy options</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
