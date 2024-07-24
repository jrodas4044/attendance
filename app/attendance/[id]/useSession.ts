import { useState, useEffect } from 'react';
import { get } from 'aws-amplify/api';

interface Session {
  SessionId: string;
  // Add other properties as needed
}

const useSession = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

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
        // @ts-ignore
        setSession(json);
      } catch (error) {
        console.error('Error fetching session:', error);
        // @ts-ignore
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