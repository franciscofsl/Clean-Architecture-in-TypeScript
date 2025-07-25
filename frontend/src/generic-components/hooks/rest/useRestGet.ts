import { useCallback, useState } from "react";
import { apiClient } from "../../../api/RestClient";
import loadingStatus from "../../../helpers/loadingStatus";

interface UseRestGetProps {
    endpoint: string;
}

const useRestGet = <TResponse>({ endpoint }: UseRestGetProps) => {
    const [loadingState, setLoadingState] = useState(loadingStatus.isLoading);

    const getRest = useCallback(async () => {
        setLoadingState(loadingStatus.isLoading);
        try {
            const response = await apiClient.get<TResponse>(endpoint);
            setLoadingState(loadingStatus.loaded);
            return response.data;
        } catch (error) {
            setLoadingState(loadingStatus.hasErrored);
            throw error;
        }
    }, []);

    return { getRest, loadingState };
};

export default useRestGet;