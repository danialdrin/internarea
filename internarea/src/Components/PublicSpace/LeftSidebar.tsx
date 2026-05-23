import React from "react";

const LeftSidebar: React.FC = () => {
  return (
    <aside className="space-y-4">
      <nav className="bg-gray-800 text-white rounded-xl p-4 shadow-md">
        <ul className="space-y-2 text-sm">
          <li className="font-semibold">Home Feed</li>
          <li>Friends</li>
          <li>Public Space</li>
          <li>Notifications</li>
        </ul>
      </nav>
      <div className="bg-gray-800 text-white rounded-xl p-4 shadow-md">
        <h4 className="font-semibold">Posting Power</h4>
        <div className="text-sm text-gray-300">Friends: 3 • Posts Left Today: 2</div>
      </div>
    </aside>
  );
};

export default LeftSidebar;
