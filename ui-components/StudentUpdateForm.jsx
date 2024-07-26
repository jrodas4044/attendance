/* eslint-disable */
"use client";
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { getStudent } from "./graphql/queries";
import { updateStudent } from "./graphql/mutations";
const client = generateClient();
export default function StudentUpdateForm(props) {
  const {
    id: idProp,
    student: studentModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    cognitoId: "",
    name: "",
    carne: "",
    email: "",
    pictureName: "",
  };
  const [cognitoId, setCognitoId] = React.useState(initialValues.cognitoId);
  const [name, setName] = React.useState(initialValues.name);
  const [carne, setCarne] = React.useState(initialValues.carne);
  const [email, setEmail] = React.useState(initialValues.email);
  const [pictureName, setPictureName] = React.useState(
    initialValues.pictureName
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = studentRecord
      ? { ...initialValues, ...studentRecord }
      : initialValues;
    setCognitoId(cleanValues.cognitoId);
    setName(cleanValues.name);
    setCarne(cleanValues.carne);
    setEmail(cleanValues.email);
    setPictureName(cleanValues.pictureName);
    setErrors({});
  };
  const [studentRecord, setStudentRecord] = React.useState(studentModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getStudent.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getStudent
        : studentModelProp;
      setStudentRecord(record);
    };
    queryData();
  }, [idProp, studentModelProp]);
  React.useEffect(resetStateValues, [studentRecord]);
  const validations = {
    cognitoId: [],
    name: [{ type: "Required" }],
    carne: [],
    email: [],
    pictureName: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          cognitoId: cognitoId ?? null,
          name,
          carne: carne ?? null,
          email: email ?? null,
          pictureName: pictureName ?? null,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await client.graphql({
            query: updateStudent.replaceAll("__typename", ""),
            variables: {
              input: {
                id: studentRecord.id,
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "StudentUpdateForm")}
      {...rest}
    >
      <TextField
        label="Cognito id"
        isRequired={false}
        isReadOnly={false}
        value={cognitoId}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              cognitoId: value,
              name,
              carne,
              email,
              pictureName,
            };
            const result = onChange(modelFields);
            value = result?.cognitoId ?? value;
          }
          if (errors.cognitoId?.hasError) {
            runValidationTasks("cognitoId", value);
          }
          setCognitoId(value);
        }}
        onBlur={() => runValidationTasks("cognitoId", cognitoId)}
        errorMessage={errors.cognitoId?.errorMessage}
        hasError={errors.cognitoId?.hasError}
        {...getOverrideProps(overrides, "cognitoId")}
      ></TextField>
      <TextField
        label="Name"
        isRequired={true}
        isReadOnly={false}
        value={name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              cognitoId,
              name: value,
              carne,
              email,
              pictureName,
            };
            const result = onChange(modelFields);
            value = result?.name ?? value;
          }
          if (errors.name?.hasError) {
            runValidationTasks("name", value);
          }
          setName(value);
        }}
        onBlur={() => runValidationTasks("name", name)}
        errorMessage={errors.name?.errorMessage}
        hasError={errors.name?.hasError}
        {...getOverrideProps(overrides, "name")}
      ></TextField>
      <TextField
        label="Carne"
        isRequired={false}
        isReadOnly={false}
        value={carne}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              cognitoId,
              name,
              carne: value,
              email,
              pictureName,
            };
            const result = onChange(modelFields);
            value = result?.carne ?? value;
          }
          if (errors.carne?.hasError) {
            runValidationTasks("carne", value);
          }
          setCarne(value);
        }}
        onBlur={() => runValidationTasks("carne", carne)}
        errorMessage={errors.carne?.errorMessage}
        hasError={errors.carne?.hasError}
        {...getOverrideProps(overrides, "carne")}
      ></TextField>
      <TextField
        label="Email"
        isRequired={false}
        isReadOnly={false}
        value={email}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              cognitoId,
              name,
              carne,
              email: value,
              pictureName,
            };
            const result = onChange(modelFields);
            value = result?.email ?? value;
          }
          if (errors.email?.hasError) {
            runValidationTasks("email", value);
          }
          setEmail(value);
        }}
        onBlur={() => runValidationTasks("email", email)}
        errorMessage={errors.email?.errorMessage}
        hasError={errors.email?.hasError}
        {...getOverrideProps(overrides, "email")}
      ></TextField>
      <TextField
        label="Picture name"
        isRequired={false}
        isReadOnly={false}
        value={pictureName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              cognitoId,
              name,
              carne,
              email,
              pictureName: value,
            };
            const result = onChange(modelFields);
            value = result?.pictureName ?? value;
          }
          if (errors.pictureName?.hasError) {
            runValidationTasks("pictureName", value);
          }
          setPictureName(value);
        }}
        onBlur={() => runValidationTasks("pictureName", pictureName)}
        errorMessage={errors.pictureName?.errorMessage}
        hasError={errors.pictureName?.hasError}
        {...getOverrideProps(overrides, "pictureName")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || studentModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || studentModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}