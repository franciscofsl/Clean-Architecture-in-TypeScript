import useCreatePirate from "../hooks/useCreatePirate";

const CreatePirate = () => {
  const { createPirate, isLoading, error } = useCreatePirate();
  
  const handleCreatePirate = async () => {
    const dto = {
      name: "New Pirate",
      // Add other pirate properties here
    };
    await createPirate(dto);
  };

  return <form onSubmit={handleCreatePirate}>
    <input type="text"
           name="name" 
           placeholder="Pirate Name" />
    <input type="submit" value="Create Pirate" disabled={isLoading} />
  </form>;
};

export default CreatePirate;
