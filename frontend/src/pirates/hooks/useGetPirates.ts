import { useCallback, useState } from "react";
import loadingStatus from "../../helpers/loadingStatus";
import { apiClient } from "../../api/RestClient";
import type { PirateForListDto } from "../pirates.types";

const useGetPirates = () => {
    const [loadingState, setLoadingState] = useState(loadingStatus.isLoading);

    const getPirates = useCallback(async () => {
        setLoadingState(loadingStatus.isLoading);
        try {
            const pirates = await apiClient.get<PirateForListDto[]>("pirates");
            setLoadingState(loadingStatus.loaded);
            return pirates;
        } catch {
            setLoadingState(loadingStatus.hasErrored);
        }
    }, []);


    return { getPirates, loadingState };
};

export default useGetPirates;