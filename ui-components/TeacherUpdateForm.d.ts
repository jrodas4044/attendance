import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { Teacher } from "./graphql/types";
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
export declare type TeacherUpdateFormInputValues = {
    email?: string;
    name?: string;
    cognitoId?: string;
    pictureName?: string;
};
export declare type TeacherUpdateFormValidationValues = {
    email?: ValidationFunction<string>;
    name?: ValidationFunction<string>;
    cognitoId?: ValidationFunction<string>;
    pictureName?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type TeacherUpdateFormOverridesProps = {
    TeacherUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    email?: PrimitiveOverrideProps<TextFieldProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    cognitoId?: PrimitiveOverrideProps<TextFieldProps>;
    pictureName?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type TeacherUpdateFormProps = React.PropsWithChildren<{
    overrides?: TeacherUpdateFormOverridesProps | undefined | null;
} & {
    email?: string;
    teacher?: Teacher;
    onSubmit?: (fields: TeacherUpdateFormInputValues) => TeacherUpdateFormInputValues;
    onSuccess?: (fields: TeacherUpdateFormInputValues) => void;
    onError?: (fields: TeacherUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: TeacherUpdateFormInputValues) => TeacherUpdateFormInputValues;
    onValidate?: TeacherUpdateFormValidationValues;
} & React.CSSProperties>;
export default function TeacherUpdateForm(props: TeacherUpdateFormProps): React.ReactElement;
