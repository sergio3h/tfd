import React from 'react';

const StatCard = ({ label, value, subValue, icon, trend = 'neutral' }) => {
  return (
    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
      <div className="flex justify-between items-start mb-2">
        <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">{label}</span>
        <span className="p-2 bg-slate-50 rounded-lg text-slate-600">{icon}</span>
      </div>
      <div>
        <div className="text-3xl font-bold text-slate-800">{value}</div>
        {subValue && (
          <div className={`text-xs mt-1 ${trend === 'positive' ? 'text-green-600' : 'text-slate-500'}`}>
            {subValue}
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;
