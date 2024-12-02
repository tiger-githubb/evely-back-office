import axios from 'axios';
import { useEffect, useState } from 'react';
import { Badge, Text } from 'rizzui';

export default function HealthCheck() {
  const [healthStatus, setHealthStatus] = useState('Checking');

  useEffect(() => {
    const checkHealth = async () => {
      try {
        await axios.get(
          'https://api.dev.streamline-pulse.calculussolututions.tech/app/info/health-check'
        );
        setHealthStatus('OK');
      } catch (error) {
        console.error(error);
        setHealthStatus('Error');
      }
    };

    checkHealth();
    const interval = setInterval(checkHealth, 60000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'OK':
        return 'success';
      case 'Error':
        return 'danger';
      default:
        return 'warning';
    }
  };

  return (
    <div className="flex items-center">
      <Badge color={getStatusColor(healthStatus)} renderAsDot />
      <Text className="ms-2 font-medium text-gray-700">{healthStatus}</Text>
    </div>
  );
}
