// components/CompatibilityReport.js
"use client"
import React, { useEffect, useState } from 'react';

const CompatibilityReport = ({ username }) => {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompatibilityReport = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/compatibility-report?username=${username}`);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to fetch compatibility report');
        }

        const data = await response.json();
        setReport(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCompatibilityReport();
  }, [username]);

  return (
    <div>
      {loading && <div>Loading...</div>}
      {error && <div className="text-red-500">{error}</div>}

      {report && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Compatibility Report</h2>

          <div className="mb-4">
            <h3 className="text-xl font-semibold">User</h3>
            <p>Name: {report.user.name || report.user.login}</p>
            <p>Username: @{report.user.login}</p>
            <p>Bio: {report.user.bio || 'No bio available'}</p>
          </div>

          <div className="mb-4">
            <h3 className="text-xl font-semibold">Most Compatible Follower/Following</h3>
            <p>{report.compatibilityReport}</p>
          </div>

          <div className="mb-4">
            <h3 className="text-xl font-semibold">Followers</h3>
            <ul>
              {report.followers.map((follower) => (
                <li key={follower.login}>
                  <p>Name: {follower.login}</p>
                  <p>Profile README: {report.profileReadmes[follower.login] || 'No profile README available'}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-4">
            <h3 className="text-xl font-semibold">Following</h3>
            <ul>
              {report.following.map((following) => (
                <li key={following.login}>
                  <p>Name: {following.login}</p>
                  <p>Profile README: {report.profileReadmes[following.login] || 'No profile README available'}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompatibilityReport;