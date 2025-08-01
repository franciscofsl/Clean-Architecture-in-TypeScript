import type { PirateForListDto } from "../pirates.types";

import { useEffect, useState } from "react";
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
} from "@fluentui/react-components";
import useRestGet from "../../generic-components/hooks/rest/useRestGet";
import type { Result } from "../../helpers/Result";

const PirateList = () => {
  // alias to reuse hook
  const { getRest: getPirates } = useRestGet<Result<PirateForListDto[]>>({
    endpoint: "pirates",
  });

  const [pirates, setPirates] = useState<PirateForListDto[]>([]);

  useEffect(() => {
    const fetchPirates = async () => {
      const response = await getPirates();
      if (response.isSuccess) {
        setPirates(response.value ?? []);
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
