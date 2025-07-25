const FormType = {
    Text: 0,
    Numeric: 1,
} as const;

type FormType = typeof FormType[keyof typeof FormType];

export default FormType;