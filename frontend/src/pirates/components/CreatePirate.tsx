import { useState, type PropsWithChildren } from "react";
import useCreatePirate from "../hooks/useCreatePirate";
import type { CreatePirateDto } from "../pirates.types";

interface CreatePirateProps{
  onCreate?: (pirate: CreatePirateDto) => void;
}

const CreatePirate = ({ onCreate }: PropsWithChildren<CreatePirateProps>) => {
  const { createPirate, isLoading, error } = useCreatePirate();

  const emptyPirate: CreatePirateDto = {
    name: "",
  };

  const [newPirate, setNewPirate] = useState<CreatePirateDto>(emptyPirate);

  const handleCreatePirate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createPirate(newPirate);
    onCreate?.(newPirate);  
    setNewPirate(emptyPirate);
  };

  return (
    <form onSubmit={handleCreatePirate}>
      <input
        type="text"
        name="name"
        placeholder="Pirate Name"
        value={newPirate.name}
        onChange={(e) => setNewPirate({ ...newPirate, name: e.target.value })}
      />
      <input type="submit" value="Create Pirate" disabled={isLoading} />
    </form>
  );
};

export default CreatePirate;
