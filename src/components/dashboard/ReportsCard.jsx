import React from 'react';
import AssessmentIcon from '@mui/icons-material/Assessment';

export default function ReportsCard() {
  return (
    <div 
      className="bg-white rounded-lg shadow-md p-6 transition-transform hover:scale-105"
      style={{
        background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
      }}
    >
      <div className="flex items-center space-x-3 mb-4">
        <div 
          className="p-2 rounded-lg"
          style={{
            background: 'linear-gradient(135deg, #5B32B4 0%, #7C4FCF 100%)',
          }}
        >
          <AssessmentIcon style={{ color: 'white', fontSize: '24px' }} />
        </div>
        <h3 className="text-lg font-semibold" style={{ color: '#1a1a1a' }}>Reports</h3>
      </div>
      <p style={{ color: '#4a5568' }}>View and manage reports from here.</p>
    </div>
  );
}

