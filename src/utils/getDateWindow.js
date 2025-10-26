// src/utils/getDateWindow.js
function getDateWindow(period = 'last30d') {
  const now = new Date();
  let from = null;
  let to = null;

  switch (period) {
    case 'last30d':
      from = new Date(now);
      from.setDate(now.getDate() - 30);
      to = now;
      break;

    case 'prev_month':
      from = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      to = new Date(now.getFullYear(), now.getMonth(), 0); // último día del mes anterior
      break;

    case 'all':
    default:
      // sin límites
      break;
  }

  return { from, to };
}

module.exports = { getDateWindow };
