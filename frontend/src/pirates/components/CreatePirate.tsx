import { useState, type PropsWithChildren } from "react";
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
  makeStyles,
  ToolbarButton,
  MessageBar,
  MessageBarBody,
} from "@fluentui/react-components";
import TypedForm from "../../generic-components/Forms/TypedForm";
import CreatePirateFormSetup from "./CreatePirateFormSetup";
import useRestPost from "../../generic-components/hooks/rest/useRestPost";

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
  const { postRest: createPirate, result } = useRestPost({
    endpoint: "pirates",
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const emptyPirate: CreatePirateDto = {
    name: "",
  };

  const [newPirate, setNewPirate] = useState<CreatePirateDto>(emptyPirate);

  const handleFieldChange = (field: keyof CreatePirateDto, value: string) => {
    setNewPirate((prev) => ({ ...prev, [field]: value }));
  };

  const handleCreatePirate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createPirate(newPirate);
    if (result?.isSuccess) {
      onCreate?.(newPirate);
      setIsDialogOpen(false);
      setNewPirate(emptyPirate);
    } else if (result?.isFailure()) {
      const errorMsg = result.error || "Error al crear el pirata";
      console.error("Error creating pirate:", errorMsg);
      setErrorMessage(errorMsg);
    }
  };

  const styles = useStyles();
  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={(_event, data) => setIsDialogOpen(data.open)}
    >
      <DialogTrigger>
        <ToolbarButton onClick={() => setIsDialogOpen(true)}>
          Create
        </ToolbarButton>
      </DialogTrigger>
      <DialogSurface aria-describedby={undefined}>
        <form onSubmit={handleCreatePirate}>
          <DialogBody>
            <DialogTitle>Create new pirate</DialogTitle>
            <DialogContent className={styles.content}>
              {errorMessage && (
                <MessageBar intent="error">
                  <MessageBarBody>{errorMessage}</MessageBarBody>
                </MessageBar>
              )}
              <TypedForm<CreatePirateDto, CreatePirateFormSetup>
                setup={new CreatePirateFormSetup()}
                values={newPirate}
                onChange={handleFieldChange}
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
