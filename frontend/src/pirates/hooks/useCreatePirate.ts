import { createContext, use, useState } from "react";
import type { CreatePirateDto } from "../pirates.types";
import { apiClient } from "../../api/RestClient";

const useCreatePirate = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const createPirate = async (dto: CreatePirateDto) => {

        setIsLoading(true);
        setError(null);

        try {
            const response = await apiClient.post("/api/pirates", dto);
            return response.data;
        } catch (err) {
            setError(err instanceof Error ? err.message : "An unexpected error occurred");
        } finally {
            setIsLoading(false);
        }
    };

    return { createPirate, isLoading, error };
}


export default useCreatePirate;
