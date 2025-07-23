import useGetPirates from "../hooks/useGetPirates";
import type { PirateForListDto } from "../pirates.types";

import React, { useEffect, useState } from "react";
import CreatePirate from "./CreatePirate";
const PirateList = () => {
  const { getPirates, loadingState } = useGetPirates();
  const [pirates, setPirates] = useState<PirateForListDto[]>([]);

  useEffect(() => {
    const fetchPirates = async () => {
      const response = await getPirates();
      console.log(response);
      if (response && response.data) {
        setPirates(response.data);
      }
    };
    fetchPirates();
  }, []);

  const onPirateCreated = (newPirate: PirateForListDto) => {
    setPirates((prevPirates) => [...prevPirates, newPirate]);
  };

  return (
    <div>
      <h1>Pirate List</h1>
      <CreatePirate onCreate={onPirateCreated}/>
    
      <table>
        <thead>
          <tr>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {pirates.map((pirate: PirateForListDto) => (
            <tr key={pirate.name}>
              <td>{pirate.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PirateList;
