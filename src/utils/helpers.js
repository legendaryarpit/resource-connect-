import confetti from 'canvas-confetti';

export function formatTimeRemaining(isoDateString) {
  if (!isoDateString) return null;
  const target = new Date(isoDateString).getTime();
  const now = new Date().getTime();
  const diffMs = target - now;

  if (diffMs <= 0) {
    return { text: 'Expired / Passed', isUrgent: true, isExpired: true };
  }

  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  const diffDays = Math.floor(diffHours / 24);

  if (diffDays > 1) {
    return { text: `${diffDays} days left`, isUrgent: false, isExpired: false };
  }
  if (diffHours >= 1) {
    return { text: `${diffHours}h ${diffMins}m left`, isUrgent: diffHours < 4, isExpired: false };
  }
  return { text: `${diffMins}m remaining!`, isUrgent: true, isExpired: false };
}

export const getTimeRemaining = formatTimeRemaining;

export function formatDate(isoString) {
  if (!isoString) return '';
  try {
    const d = new Date(isoString);
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  } catch {
    return isoString;
  }
}

export function formatDateTime(isoString) {
  if (!isoString) return '';
  try {
    const d = new Date(isoString);
    return d.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  } catch {
    return isoString;
  }
}

export function triggerConfetti() {
  try {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#10b981', '#f59e0b', '#0284c7', '#34d399']
    });
  } catch (e) {
    console.log('Confetti triggered');
  }
}

export function getStatusConfig(status) {
  switch (status?.toLowerCase()) {
    case 'available':
      return {
        label: 'Available',
        bg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
        badgeClass: 'bg-emerald-50 text-emerald-800 border-emerald-200',
        dot: 'bg-emerald-600',
        dotClass: 'bg-emerald-600',
        icon: 'CheckCircle2'
      };
    case 'requested':
      return {
        label: 'Requested',
        bg: 'bg-amber-50 text-amber-800 border-amber-200',
        badgeClass: 'bg-amber-50 text-amber-800 border-amber-200',
        dot: 'bg-amber-600',
        dotClass: 'bg-amber-600',
        icon: 'Clock'
      };
    case 'collected':
      return {
        label: 'Collected',
        bg: 'bg-sky-50 text-sky-800 border-sky-200',
        badgeClass: 'bg-sky-50 text-sky-800 border-sky-200',
        dot: 'bg-sky-600',
        dotClass: 'bg-sky-600',
        icon: 'Truck'
      };
    case 'completed':
      return {
        label: 'Completed',
        bg: 'bg-stone-100 text-stone-700 border-stone-200',
        badgeClass: 'bg-stone-100 text-stone-700 border-stone-200',
        dot: 'bg-stone-500',
        dotClass: 'bg-stone-500',
        icon: 'CheckCheck'
      };
    case 'pending':
      return {
        label: 'Pending Verification',
        bg: 'bg-amber-50 text-amber-800 border-amber-200',
        badgeClass: 'bg-amber-50 text-amber-800 border-amber-200',
        dot: 'bg-amber-600',
        dotClass: 'bg-amber-600',
        icon: 'AlertCircle'
      };
    case 'rejected':
      return {
        label: 'Rejected',
        bg: 'bg-rose-50 text-rose-800 border-rose-200',
        badgeClass: 'bg-rose-50 text-rose-800 border-rose-200',
        dot: 'bg-rose-600',
        dotClass: 'bg-rose-600',
        icon: 'XCircle'
      };
    default:
      return {
        label: status || 'Unknown',
        bg: 'bg-stone-100 text-stone-700 border-stone-200',
        badgeClass: 'bg-stone-100 text-stone-700 border-stone-200',
        dot: 'bg-stone-500',
        dotClass: 'bg-stone-500',
        icon: 'HelpCircle'
      };
  }
}

export const getStatusColor = getStatusConfig;

export function getUrgencyConfig(urgency) {
  switch (urgency?.toLowerCase()) {
    case 'urgent':
      return { label: 'Urgent', class: 'bg-rose-500 text-white' };
    case 'high':
      return { label: 'High Priority', class: 'bg-amber-500 text-white font-bold' };
    case 'medium':
      return { label: 'Medium', class: 'bg-sky-600 text-white' };
    case 'low':
    default:
      return { label: 'Standard', class: 'bg-emerald-600 text-white font-bold' };
  }
}
