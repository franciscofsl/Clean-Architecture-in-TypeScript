import { useState, type PropsWithChildren } from "react";
import useCreatePirate from "../hooks/useCreatePirate";
import type { CreatePirateDto } from "../pirates.types";
import {
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogTitle,
  DialogContent,
  DialogBody,
  DialogActions,
  Button,
  Input,
  Label,
  makeStyles,
  ToolbarButton,
} from "@fluentui/react-components";

interface CreatePirateProps {
  onCreate?: (pirate: CreatePirateDto) => void;
}

const useStyles = makeStyles({
  content: {
    display: "flex",
    flexDirection: "column",
    rowGap: "10px",
  },
});

const CreatePirate = ({ onCreate }: PropsWithChildren<CreatePirateProps>) => {
  const { createPirate, isLoading, error } = useCreatePirate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const emptyPirate: CreatePirateDto = {
    name: "",
  };

  const [newPirate, setNewPirate] = useState<CreatePirateDto>(emptyPirate);

  const handleCreatePirate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createPirate(newPirate);
    onCreate?.(newPirate);
    setIsDialogOpen(false);
    setNewPirate(emptyPirate);
  }; 

  const styles = useStyles();
  return (
    <Dialog open={isDialogOpen} onOpenChange={(event, data) => setIsDialogOpen(data.open)}>
      <DialogTrigger>
        <ToolbarButton onClick={() => setIsDialogOpen(true)}>Create</ToolbarButton>
      </DialogTrigger>
      <DialogSurface aria-describedby={undefined}>
        <form onSubmit={handleCreatePirate}>
          <DialogBody>
            <DialogTitle>Create new pirate</DialogTitle>
            <DialogContent className={styles.content}>
              <Label required htmlFor={"name"}>
                Name
              </Label>
              <Input
                required
                type="text"
                id={"name"}
                value={newPirate.name}
                onChange={(e) =>
                  setNewPirate({ ...newPirate, name: e.target.value })
                }
              />
            </DialogContent>
            <DialogActions>
              <Button type="submit" appearance="primary">
                Submit
              </Button>
              <DialogTrigger disableButtonEnhancement>
                <Button appearance="secondary">Close</Button>
              </DialogTrigger>
            </DialogActions>
          </DialogBody>{" "}
        </form>
      </DialogSurface>
    </Dialog>
  );
};

export default CreatePirate;
