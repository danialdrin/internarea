import React from "react";

const RightSidebar: React.FC = () => {
  return (
    <aside className="space-y-4">
      <div className="bg-gray-800 text-white rounded-xl p-4 shadow-md">
        <h3 className="font-semibold mb-2">Trending Hashtags</h3>
        <ul className="space-y-2 text-sm text-gray-300">
          <li>#DesignChallenges</li>
          <li>#ReactJobs</li>
          <li>#Internships2026</li>
        </ul>
      </div>
      <div className="bg-gray-800 text-white rounded-xl p-4 shadow-md">
        <h3 className="font-semibold mb-2">Top Creators</h3>
        <ul className="space-y-2 text-sm text-gray-300">
          <li>Jane Doe</li>
          <li>John Smith</li>
        </ul>
      </div>
    </aside>
  );
};

export default RightSidebar;
