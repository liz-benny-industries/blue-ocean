import 'regenerator-runtime/runtime';

export function debounce(func, timeout = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}

// credit: https://stackoverflow.com/questions/7641791/javascript-library-for-human-friendly-relative-date-formatting
export const formatDate = (date) => {
  const delta = Math.round(
    (+new Date() - +new Date(date.toString())) / 1000
  );

  const minute = 60;
  const hour = minute * 60;
  const day = hour * 24;
  const week = day * 7;

  let fuzzy;

  if (delta < 30) {
    fuzzy = 'just then.';
  } else if (delta < minute) {
    fuzzy = `${delta} seconds ago.`;
  } else if (delta < 2 * minute) {
    fuzzy = 'a minute ago.';
  } else if (delta < hour) {
    fuzzy = `${Math.floor(delta / minute)} minutes ago.`;
  } else if (Math.floor(delta / hour) == 1) {
    fuzzy = '1 hour ago.';
  } else if (delta < day) {
    fuzzy = `${Math.floor(delta / hour)} hours ago.`;
  } else if (delta < day * 2) {
    fuzzy = 'yesterday';
  }

  return fuzzy;
};
