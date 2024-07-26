import * as React from "react";
import { GridProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { AttendanceControl } from "./graphql/types";
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
export declare type AttendanceControlUpdateFormInputValues = {
    date?: string;
    time?: string;
    available?: boolean;
};
export declare type AttendanceControlUpdateFormValidationValues = {
    date?: ValidationFunction<string>;
    time?: ValidationFunction<string>;
    available?: ValidationFunction<boolean>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type AttendanceControlUpdateFormOverridesProps = {
    AttendanceControlUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    date?: PrimitiveOverrideProps<TextFieldProps>;
    time?: PrimitiveOverrideProps<TextFieldProps>;
    available?: PrimitiveOverrideProps<SwitchFieldProps>;
} & EscapeHatchProps;
export declare type AttendanceControlUpdateFormProps = React.PropsWithChildren<{
    overrides?: AttendanceControlUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    attendanceControl?: AttendanceControl;
    onSubmit?: (fields: AttendanceControlUpdateFormInputValues) => AttendanceControlUpdateFormInputValues;
    onSuccess?: (fields: AttendanceControlUpdateFormInputValues) => void;
    onError?: (fields: AttendanceControlUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: AttendanceControlUpdateFormInputValues) => AttendanceControlUpdateFormInputValues;
    onValidate?: AttendanceControlUpdateFormValidationValues;
} & React.CSSProperties>;
export default function AttendanceControlUpdateForm(props: AttendanceControlUpdateFormProps): React.ReactElement;
