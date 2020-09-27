import { useEffect, useState } from "react";

export const useApi = (endpoint, options = {}, body = {}, accessToken) => {
  const [state, setState] = useState({
    error: null,
    loading: true,
    data: null
  });
  const [refreshIndex, setRefreshIndex] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const { audience, scope, ...fetchOptions } = options;
        const res = await fetch(process.env.REACT_APP_AXON_DOMAIN + endpoint, {
          ...fetchOptions,
          headers: {
            ...fetchOptions.headers,
            // Add the Authorization header to the existing headers.
            Authorization: `Bearer ${accessToken}`,
            // Think its same to assume all content is json.
            "Content-Type": "application/json"
          },
          body: JSON.stringify(body)
        });
        setState({
          ...state,
          data: await res.json(),
          error: null,
          loading: false
        });
      } catch (error) {
        setState({
          ...state,
          error,
          loading: false
        });
      }
    })();
    //eslint-disable-next-line
  }, [refreshIndex, accessToken]);

  return {
    ...state,
    refresh: () => setRefreshIndex(refreshIndex + 1)
  };
};
