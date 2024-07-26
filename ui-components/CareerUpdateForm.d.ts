import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { Career } from "./graphql/types";
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
export declare type CareerUpdateFormInputValues = {
    name?: string;
};
export declare type CareerUpdateFormValidationValues = {
    name?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type CareerUpdateFormOverridesProps = {
    CareerUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type CareerUpdateFormProps = React.PropsWithChildren<{
    overrides?: CareerUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    career?: Career;
    onSubmit?: (fields: CareerUpdateFormInputValues) => CareerUpdateFormInputValues;
    onSuccess?: (fields: CareerUpdateFormInputValues) => void;
    onError?: (fields: CareerUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: CareerUpdateFormInputValues) => CareerUpdateFormInputValues;
    onValidate?: CareerUpdateFormValidationValues;
} & React.CSSProperties>;
export default function CareerUpdateForm(props: CareerUpdateFormProps): React.ReactElement;
