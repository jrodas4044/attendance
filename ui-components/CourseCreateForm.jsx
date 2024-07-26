/* eslint-disable */
"use client";
import * as React from "react";
import {
  Button,
  Flex,
  Grid,
  SelectField,
  TextField,
} from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { createCourse } from "./graphql/mutations";
const client = generateClient();
export default function CourseCreateForm(props) {
  const {
    clearOnSuccess = true,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    name: "",
    days: "",
    scheduleStart: "",
    scheduleEnd: "",
  };
  const [name, setName] = React.useState(initialValues.name);
  const [days, setDays] = React.useState(initialValues.days);
  const [scheduleStart, setScheduleStart] = React.useState(
    initialValues.scheduleStart
  );
  const [scheduleEnd, setScheduleEnd] = React.useState(
    initialValues.scheduleEnd
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setName(initialValues.name);
    setDays(initialValues.days);
    setScheduleStart(initialValues.scheduleStart);
    setScheduleEnd(initialValues.scheduleEnd);
    setErrors({});
  };
  const validations = {
    name: [{ type: "Required" }],
    days: [],
    scheduleStart: [],
    scheduleEnd: [],
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
          name,
          days,
          scheduleStart,
          scheduleEnd,
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
            query: createCourse.replaceAll("__typename", ""),
            variables: {
              input: {
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "CourseCreateForm")}
      {...rest}
    >
      <TextField
        label="Name"
        isRequired={true}
        isReadOnly={false}
        value={name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name: value,
              days,
              scheduleStart,
              scheduleEnd,
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
      <SelectField
        label="Days"
        placeholder="Please select an option"
        isDisabled={false}
        value={days}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              days: value,
              scheduleStart,
              scheduleEnd,
            };
            const result = onChange(modelFields);
            value = result?.days ?? value;
          }
          if (errors.days?.hasError) {
            runValidationTasks("days", value);
          }
          setDays(value);
        }}
        onBlur={() => runValidationTasks("days", days)}
        errorMessage={errors.days?.errorMessage}
        hasError={errors.days?.hasError}
        {...getOverrideProps(overrides, "days")}
      >
        <option
          children="Lunes"
          value="Lunes"
          {...getOverrideProps(overrides, "daysoption0")}
        ></option>
        <option
          children="Martes"
          value="Martes"
          {...getOverrideProps(overrides, "daysoption1")}
        ></option>
        <option
          children="Miercoles"
          value="Miercoles"
          {...getOverrideProps(overrides, "daysoption2")}
        ></option>
        <option
          children="Jueves"
          value="Jueves"
          {...getOverrideProps(overrides, "daysoption3")}
        ></option>
        <option
          children="Viernes"
          value="Viernes"
          {...getOverrideProps(overrides, "daysoption4")}
        ></option>
        <option
          children="Sabado"
          value="Sabado"
          {...getOverrideProps(overrides, "daysoption5")}
        ></option>
        <option
          children="Domingo"
          value="Domingo"
          {...getOverrideProps(overrides, "daysoption6")}
        ></option>
      </SelectField>
      <TextField
        label="Schedule start"
        isRequired={false}
        isReadOnly={false}
        type="time"
        value={scheduleStart}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              days,
              scheduleStart: value,
              scheduleEnd,
            };
            const result = onChange(modelFields);
            value = result?.scheduleStart ?? value;
          }
          if (errors.scheduleStart?.hasError) {
            runValidationTasks("scheduleStart", value);
          }
          setScheduleStart(value);
        }}
        onBlur={() => runValidationTasks("scheduleStart", scheduleStart)}
        errorMessage={errors.scheduleStart?.errorMessage}
        hasError={errors.scheduleStart?.hasError}
        {...getOverrideProps(overrides, "scheduleStart")}
      ></TextField>
      <TextField
        label="Schedule end"
        isRequired={false}
        isReadOnly={false}
        type="time"
        value={scheduleEnd}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              days,
              scheduleStart,
              scheduleEnd: value,
            };
            const result = onChange(modelFields);
            value = result?.scheduleEnd ?? value;
          }
          if (errors.scheduleEnd?.hasError) {
            runValidationTasks("scheduleEnd", value);
          }
          setScheduleEnd(value);
        }}
        onBlur={() => runValidationTasks("scheduleEnd", scheduleEnd)}
        errorMessage={errors.scheduleEnd?.errorMessage}
        hasError={errors.scheduleEnd?.hasError}
        {...getOverrideProps(overrides, "scheduleEnd")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
