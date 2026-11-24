import React from 'react';
import { getStatusColor } from '../utils/helpers';

export default function StatusBadge({ status, className = '' }) {
  const meta = getStatusColor(status);

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${meta.bg} ${className}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${meta.dot}`} />
      <span>{meta.label}</span>
    </span>
  );
}
