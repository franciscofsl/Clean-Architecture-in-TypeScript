import { useCallback, useState } from "react";
import { apiClient } from "../../../api/RestClient";

interface UseRestPostProps {
    endpoint: string;
}

const useRestPost = ({ endpoint }: UseRestPostProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const postRest = useCallback(async (data: unknown) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await apiClient.post(endpoint, data);
            return response.data;
        } catch (err) {
            setError(err instanceof Error ? err.message : "An unexpected error occurred");
        } finally {
            setIsLoading(false);
        }
    }, [endpoint]);

    return { postRest, isLoading, error };
};

export default useRestPost;