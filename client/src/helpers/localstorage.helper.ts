export function getTokenFromLocalStorage() {
  return localStorage.getItem('token');
}

export function setTokenToLocalStorage(token: string) {
  localStorage.setItem('token', token);
}

export function removeTokenFromLocalStorage() {
  localStorage.removeItem('token');
}
