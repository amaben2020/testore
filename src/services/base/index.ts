const getToken = () => {
  return typeof window !== 'undefined'
    ? window.localStorage.getItem('access_token')
    : null;
};
const getRefreshToken = (): string | null => {
  return typeof window !== 'undefined'
    ? window.localStorage.getItem('refresh_token')
    : null;
};

export const fetchAPI = async (
  url: string,
  options: RequestInit = {},
  isPublic = false
) => {
  const token = getToken();

  const headers = {
    ...options.headers,
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
    ...(isPublic
      ? {}
      : {
          'x-publishable-api-key':
            process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || '',
        }),
  };

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL}${url}`,
      // { headers, ...options }
      {
        method: 'GET',
        headers: headers,
      }
    );
    console.log(response);
    if (response.ok) return response.json();

    // Handle 401 or token expiration
    if (response.status === 401) {
      const refreshResponse = await fetch(
        `${process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL}/auth/token/refresh`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            token: getRefreshToken(),
          }),
        }
      );

      if (refreshResponse.ok) {
        const refreshData = await refreshResponse.json();
        localStorage.setItem('access_token', refreshData.token);

        // Retry original request with the new token
        const retryHeaders = {
          ...headers,
          Authorization: `Bearer ${refreshData.token}`,
        };

        const retryResponse = await fetch(url, {
          ...options,
          headers: retryHeaders,
        });

        if (retryResponse.ok) return retryResponse.json();
      }
    }

    // If refresh fails or any other error, throw
    // throw new Error('Unable to fetch data');
  } catch (error) {
    console.error('Fetch failed:', error);
    throw error;
  }
};
