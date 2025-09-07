import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface HealthData {
  status: string;
  timestamp: string;
  uptime: number;
}

const Home: React.FC = () => {
  const [healthData, setHealthData] = useState<HealthData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkHealth = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:3001/health');
      setHealthData(response.data);
    } catch (err) {
      setError('Failed to connect to backend');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkHealth();
  }, []);

  return (
    <div className="home">
      <h1>CI/CD Workshop App</h1>
      <div className="health-check">
        <h2>Backend Health Check</h2>
        {loading && <p>Checking...</p>}
        {error && <p className="error">{error}</p>}
        {healthData && (
          <div className="health-data">
            <p><strong>Status:</strong> {healthData.status}</p>
            <p><strong>Timestamp:</strong> {healthData.timestamp}</p>
            <p><strong>Uptime:</strong> {healthData.uptime.toFixed(2)}s</p>
          </div>
        )}
        <button onClick={checkHealth}>Refresh Health</button>
      </div>
    </div>
  );
};

export default Home;