import { useCallback, useState } from "react";
import { apiClient } from "../../../api/RestClient";
import { Result } from "../../../helpers/Result";

interface UseRestPostProps {
    endpoint: string;
}

const useRestPost = ({ endpoint }: UseRestPostProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<Result | null>(null);

    const postRest = useCallback(async (data: unknown) => {
        setIsLoading(true);
        setResult(null);

        try {
            const response = await apiClient.post(endpoint, data);
            const apiResult = response.data as Result;
            setResult(apiResult);
        } catch (err) {
            console.error("Error posting data:", err);
            const errorMessage = err instanceof Error ? err.message : "An unexpected error occurred";
            setResult(Result.fail(errorMessage));
        } finally {
            setIsLoading(false);
        }
    }, [endpoint]);

    return { postRest, isLoading, result };
};

export default useRestPost;