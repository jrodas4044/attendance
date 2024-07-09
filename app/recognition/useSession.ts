import { useState, useEffect } from 'react';
import { get } from 'aws-amplify/api';
const useSession = () => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        setLoading(true);
        const restOperation = get({
          apiName: "myHttpApi",
          path: "session",
        });
        const { body } = await restOperation.response;
        const json = await body.json();
        setSession(json);
      } catch (error) {
        console.error('Error fetching session:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, []);

  return { session, loading, error };
};

export default useSession;