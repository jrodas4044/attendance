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
export declare type AttendanceControlCreateFormInputValues = {
    date?: string;
    time?: string;
    available?: boolean;
};
export declare type AttendanceControlCreateFormValidationValues = {
    date?: ValidationFunction<string>;
    time?: ValidationFunction<string>;
    available?: ValidationFunction<boolean>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type AttendanceControlCreateFormOverridesProps = {
    AttendanceControlCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    date?: PrimitiveOverrideProps<TextFieldProps>;
    time?: PrimitiveOverrideProps<TextFieldProps>;
    available?: PrimitiveOverrideProps<SwitchFieldProps>;
} & EscapeHatchProps;
export declare type AttendanceControlCreateFormProps = React.PropsWithChildren<{
    overrides?: AttendanceControlCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: AttendanceControlCreateFormInputValues) => AttendanceControlCreateFormInputValues;
    onSuccess?: (fields: AttendanceControlCreateFormInputValues) => void;
    onError?: (fields: AttendanceControlCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: AttendanceControlCreateFormInputValues) => AttendanceControlCreateFormInputValues;
    onValidate?: AttendanceControlCreateFormValidationValues;
} & React.CSSProperties>;
export default function AttendanceControlCreateForm(props: AttendanceControlCreateFormProps): React.ReactElement;
