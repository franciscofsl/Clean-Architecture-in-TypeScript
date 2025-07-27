import { useCallback, useState } from "react";
import { apiClient } from "../../../api/RestClient";
import { Result } from "../../../helpers/Result";

interface UseRestPostProps {
    endpoint: string;
}

const useRestPost = ({ endpoint }: UseRestPostProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<Result<unknown> | null>(null);

    const postRest = useCallback(async (data: unknown): Promise<Result<unknown>> => {
        setIsLoading(true);
        setResult(null);

        try {
            const response = await apiClient.post(endpoint, data);
            const apiResult = response.data as { isSuccess: boolean; error?: string; value?: unknown };

            // Convert the plain object to a Result instance
            let result: Result<unknown>;
            if (apiResult.isSuccess) {
                result = Result.ok(apiResult.value);
                setResult(result);
                return result;
            } else {
                result = Result.fail(apiResult.error || "An error occurred");
                setResult(result);
                return result;
            }
        } catch (err) {
            console.error("Error posting data:", err);
            const errorMessage = err instanceof Error ? err.message : "An unexpected error occurred";
            const result = Result.fail(errorMessage);
            setResult(result);
            return result;
        } finally {
            setIsLoading(false);
        }
    }, [endpoint]);

    return { postRest, isLoading, result };
};

export default useRestPost;