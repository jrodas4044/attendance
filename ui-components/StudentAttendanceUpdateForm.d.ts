import * as React from "react";
import { GridProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { StudentAttendance } from "./graphql/types";
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
export declare type StudentAttendanceUpdateFormInputValues = {
    date?: string;
    isPresent?: boolean;
};
export declare type StudentAttendanceUpdateFormValidationValues = {
    date?: ValidationFunction<string>;
    isPresent?: ValidationFunction<boolean>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type StudentAttendanceUpdateFormOverridesProps = {
    StudentAttendanceUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    date?: PrimitiveOverrideProps<TextFieldProps>;
    isPresent?: PrimitiveOverrideProps<SwitchFieldProps>;
} & EscapeHatchProps;
export declare type StudentAttendanceUpdateFormProps = React.PropsWithChildren<{
    overrides?: StudentAttendanceUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    studentAttendance?: StudentAttendance;
    onSubmit?: (fields: StudentAttendanceUpdateFormInputValues) => StudentAttendanceUpdateFormInputValues;
    onSuccess?: (fields: StudentAttendanceUpdateFormInputValues) => void;
    onError?: (fields: StudentAttendanceUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: StudentAttendanceUpdateFormInputValues) => StudentAttendanceUpdateFormInputValues;
    onValidate?: StudentAttendanceUpdateFormValidationValues;
} & React.CSSProperties>;
export default function StudentAttendanceUpdateForm(props: StudentAttendanceUpdateFormProps): React.ReactElement;
