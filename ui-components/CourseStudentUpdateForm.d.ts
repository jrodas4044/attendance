import * as React from "react";
import { GridProps } from "@aws-amplify/ui-react";
import { CourseStudent } from "./graphql/types";
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
export declare type CourseStudentUpdateFormInputValues = {};
export declare type CourseStudentUpdateFormValidationValues = {};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type CourseStudentUpdateFormOverridesProps = {
    CourseStudentUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
} & EscapeHatchProps;
export declare type CourseStudentUpdateFormProps = React.PropsWithChildren<{
    overrides?: CourseStudentUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    courseStudent?: CourseStudent;
    onSubmit?: (fields: CourseStudentUpdateFormInputValues) => CourseStudentUpdateFormInputValues;
    onSuccess?: (fields: CourseStudentUpdateFormInputValues) => void;
    onError?: (fields: CourseStudentUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: CourseStudentUpdateFormInputValues) => CourseStudentUpdateFormInputValues;
    onValidate?: CourseStudentUpdateFormValidationValues;
} & React.CSSProperties>;
export default function CourseStudentUpdateForm(props: CourseStudentUpdateFormProps): React.ReactElement;
