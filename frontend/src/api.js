export async function requestJson(url, options) {
  let response;
  try {
    response = await fetch(url, options);
  } catch {
    throw new Error("Cannot reach the backend. Check that it is running and that VITE_API_BASE_URL is configured.");
  }

  const body = await response.text();
  let data;
  if (body) {
    try {
      data = JSON.parse(body);
    } catch {
      data = null;
    }
  }

  if (!response.ok) {
    const message = data?.detail || data?.message;
    throw new Error(message || `API request failed (HTTP ${response.status}${response.statusText ? ` ${response.statusText}` : ""}).`);
  }

  if (!data || typeof data !== "object") {
    throw new Error(`The backend returned an empty or invalid response (HTTP ${response.status}).`);
  }

  return data;
}