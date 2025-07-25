import { Input, Label, makeStyles } from "@fluentui/react-components";
import type FormSetup from "./FormSetup";

interface TypedFormProps<TItemType, TSetupType extends FormSetup<TItemType>> {
  setup: TSetupType;
  values: TItemType;
  onChange: (field: keyof TItemType, value: string) => void;
}

const TypedForm = <TItemType, TSetupType extends FormSetup<TItemType>>({
  setup,
  values,
  onChange,
}: TypedFormProps<TItemType, TSetupType>) => {
  return (
    <>
      {setup.getFields().map((field) => (
        <>
          <Label required htmlFor={field.name}>
            {field.name}
          </Label>
          <Input
            required
            type="text"
            id={field.name}
            value={String(
              (values as Record<string, unknown>)[field.name] || ""
            )}
            onChange={(e) =>
              onChange(field.name as keyof TItemType, e.target.value)
            }
          />
        </>
      ))}
    </>
  );
};

export default TypedForm;
