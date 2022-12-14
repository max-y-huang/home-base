import { run } from 'uebersicht';
import { assertFile, escapeRegExp } from "./funcs";

const autoSuggestionsURL = 'https://api.datamuse.com/sug?s=<QUERY>';

export const searchQuery = async (query, mode, searchURL) => {
  if (mode === 'search') {
    const url = searchURL.replace('<QUERY>', encodeURIComponent(query));
    await run(`open "${url}"`);
  }
  if (mode === 'web') {
    await run(`open "${query}"`);
  }
}

export const addQueryToHistory = async (query, file) => {  // uses move-to-front heuristic
  await assertFile(file);
  query = encodeURIComponent(query);
  const oldHistory = (await run(`cat "${file}"`)).trim().split('\n');
  const filtered = oldHistory.filter((item) => item.toLowerCase() !== query.toLowerCase());
  const history = [query, ...filtered].join('\n');
  await run(`echo "${history}" > ${file}`);
};

export const removeQueryFromHistory = async (query, file) => {
  await assertFile(file);
  query = encodeURIComponent(query);
  const oldHistory = (await run(`cat "${file}"`)).trim().split('\n');
  const filtered = oldHistory.filter((item) => item.toLowerCase() !== query.toLowerCase());
  const history = filtered.join('\n');
  await run(`echo "${history}" > ${file}`);
};

const getHistorySuggestions = async (query, file) => {
  await assertFile(file);
  const history = (await run(`cat "${file}"`)).trim().split('\n').map((item) => decodeURIComponent(item));
  const pattern = new RegExp(escapeRegExp(query), 'i');
  const matches = history.filter((item) => item.match(pattern) !== null);
  return matches;
}

const getAutoCompleteSuggestions = async (query, mode) => {
  if (mode === 'web') {  // do not use auto complete suggestions for web
    return [];
  }
  query = encodeURIComponent(query);
  const url = autoSuggestionsURL.replace('<QUERY>', query);
  const data = await (await fetch(url)).json();
  const suggestions = data.map((item) => item.word);
  return suggestions;
}

export const getSuggestions = async (query, mode, file) => {
  const history = await getHistorySuggestions(query, file);
  const lowerCaseHistory = history.map((item) => item.toLowerCase());  // used to filter autoComplete
  const autoComplete = await getAutoCompleteSuggestions(query, mode);
  const filteredAutoComplete = autoComplete.filter((item) => !lowerCaseHistory.includes(item.toLowerCase()));  // used to avoid duplicates with history
  return [
    ...history.map((suggestion) => ({ suggestion, fromHistory: true })),
    ...filteredAutoComplete.map((suggestion) => ({ suggestion, fromHistory: false }))
  ];
};
