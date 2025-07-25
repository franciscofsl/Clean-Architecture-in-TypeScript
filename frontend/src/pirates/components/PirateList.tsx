import useGetPirates from "../hooks/useGetPirates";
import type { PirateForListDto } from "../pirates.types";

import React, { useEffect, useState } from "react";
import CreatePirate from "./CreatePirate";
import {
  DataGrid,
  DataGridBody,
  DataGridCell,
  DataGridHeaderCell,
  DataGridHeader,
  DataGridRow,
  createTableColumn,
  type TableColumnDefinition,
  Toolbar,
  ToolbarButton,
} from "@fluentui/react-components";
import TypedForm from "../../generic-components/Forms/TypedForm";
import CreatePirateFormSetup from "./CreatePirateFormSetup";
import type { CreatePirateDto } from "../pirates.types";

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

  const columns: TableColumnDefinition<PirateForListDto>[] = [
    createTableColumn<PirateForListDto>({
      columnId: "name",

      renderHeaderCell: () => {
        return "Name";
      },
      renderCell: (item) => {
        return item.name;
      },
    }),
  ];

  return (
    <>
      <h1>Pirate List</h1>

      <div>
        <Toolbar aria-label="Vertical Button">
          <CreatePirate onCreate={onPirateCreated} />
        </Toolbar>
      </div>

      <DataGrid
        items={pirates}
        columns={columns}
        sortable
        selectionMode="multiselect"
        getRowId={(item) => item.name}
        focusMode="composite"
        style={{ minWidth: "550px" }}
      >
        <DataGridHeader>
          <DataGridRow
            selectionCell={{
              checkboxIndicator: { "aria-label": "Select all rows" },
            }}
          >
            {({ renderHeaderCell }) => (
              <DataGridHeaderCell>{renderHeaderCell()}</DataGridHeaderCell>
            )}
          </DataGridRow>
        </DataGridHeader>
        <DataGridBody<PirateForListDto>>
          {({ item, rowId }) => (
            <DataGridRow<PirateForListDto>
              key={rowId}
              selectionCell={{
                checkboxIndicator: { "aria-label": "Select row" },
              }}
            >
              {({ renderCell }) => (
                <DataGridCell>{renderCell(item)}</DataGridCell>
              )}
            </DataGridRow>
          )}
        </DataGridBody>
      </DataGrid>
    </>
  );
};

export default PirateList;
