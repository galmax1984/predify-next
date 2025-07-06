// Centralized API path constants for the app

export const API_BASE_URL = "/api";

export const API_MATCHDAY_BASE_URL = `${API_BASE_URL}/matchday`;

export function apiNextMatchday() {
  return `${API_MATCHDAY_BASE_URL}/next`;
}

export function apiPreviousMatchdays() {
  return `${API_MATCHDAY_BASE_URL}/previous`;
}

export function apiMatchdayById(id: number | string) {
  return `${API_MATCHDAY_BASE_URL}/${id}`;
}

export const API_FIXTURES_BASE_URL = `${API_BASE_URL}/fixtures`;

export function apiFixturesByMatchday(matchday: number | string) {
  return `${API_FIXTURES_BASE_URL}/${matchday}`;
} 