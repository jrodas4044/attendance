import * as React from "react";
import { GridProps } from "@aws-amplify/ui-react";
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
export declare type CourseStudentCreateFormInputValues = {};
export declare type CourseStudentCreateFormValidationValues = {};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type CourseStudentCreateFormOverridesProps = {
    CourseStudentCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
} & EscapeHatchProps;
export declare type CourseStudentCreateFormProps = React.PropsWithChildren<{
    overrides?: CourseStudentCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: CourseStudentCreateFormInputValues) => CourseStudentCreateFormInputValues;
    onSuccess?: (fields: CourseStudentCreateFormInputValues) => void;
    onError?: (fields: CourseStudentCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: CourseStudentCreateFormInputValues) => CourseStudentCreateFormInputValues;
    onValidate?: CourseStudentCreateFormValidationValues;
} & React.CSSProperties>;
export default function CourseStudentCreateForm(props: CourseStudentCreateFormProps): React.ReactElement;
