import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const useApi = (endpoint, options = {}) => {
  const { getAccessTokenSilently } = useAuth0();
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
        const accessToken = await getAccessTokenSilently({ audience, scope });
        const res = await fetch(process.env.REACT_APP_AXON_DOMAIN + endpoint, {
          ...fetchOptions,
          headers: {
            ...fetchOptions.headers,
            // Add the Authorization header to the existing headers
            Authorization: `Bearer ${accessToken}`
          }
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
  }, [getAccessTokenSilently, options, refreshIndex, state, endpoint]);

  return {
    ...state,
    refresh: () => setRefreshIndex(refreshIndex + 1)
  };
};
