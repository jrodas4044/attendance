import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type TeacherCreateFormInputValues = {
    email?: string;
    name?: string;
    cognitoId?: string;
    pictureName?: string;
};
export declare type TeacherCreateFormValidationValues = {
    email?: ValidationFunction<string>;
    name?: ValidationFunction<string>;
    cognitoId?: ValidationFunction<string>;
    pictureName?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type TeacherCreateFormOverridesProps = {
    TeacherCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    email?: PrimitiveOverrideProps<TextFieldProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    cognitoId?: PrimitiveOverrideProps<TextFieldProps>;
    pictureName?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type TeacherCreateFormProps = React.PropsWithChildren<{
    overrides?: TeacherCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: TeacherCreateFormInputValues) => TeacherCreateFormInputValues;
    onSuccess?: (fields: TeacherCreateFormInputValues) => void;
    onError?: (fields: TeacherCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: TeacherCreateFormInputValues) => TeacherCreateFormInputValues;
    onValidate?: TeacherCreateFormValidationValues;
} & React.CSSProperties>;
export default function TeacherCreateForm(props: TeacherCreateFormProps): React.ReactElement;
