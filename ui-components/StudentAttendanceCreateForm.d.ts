import * as React from "react";
import { GridProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
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
export declare type StudentAttendanceCreateFormInputValues = {
    date?: string;
    isPresent?: boolean;
};
export declare type StudentAttendanceCreateFormValidationValues = {
    date?: ValidationFunction<string>;
    isPresent?: ValidationFunction<boolean>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type StudentAttendanceCreateFormOverridesProps = {
    StudentAttendanceCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    date?: PrimitiveOverrideProps<TextFieldProps>;
    isPresent?: PrimitiveOverrideProps<SwitchFieldProps>;
} & EscapeHatchProps;
export declare type StudentAttendanceCreateFormProps = React.PropsWithChildren<{
    overrides?: StudentAttendanceCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: StudentAttendanceCreateFormInputValues) => StudentAttendanceCreateFormInputValues;
    onSuccess?: (fields: StudentAttendanceCreateFormInputValues) => void;
    onError?: (fields: StudentAttendanceCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: StudentAttendanceCreateFormInputValues) => StudentAttendanceCreateFormInputValues;
    onValidate?: StudentAttendanceCreateFormValidationValues;
} & React.CSSProperties>;
export default function StudentAttendanceCreateForm(props: StudentAttendanceCreateFormProps): React.ReactElement;
