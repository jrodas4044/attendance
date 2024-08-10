import * as React from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json"
import Form from "@cloudscape-design/components/form";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Button from "@cloudscape-design/components/button";
import Container from "@cloudscape-design/components/container";
import Header from "@cloudscape-design/components/header";
import FormField from "@cloudscape-design/components/form-field";
import Input from "@cloudscape-design/components/input";
import DatePicker from "@cloudscape-design/components/date-picker";
import TimeInput from "@cloudscape-design/components/time-input";
import moment from "moment-timezone";

Amplify.configure(outputs);
const client = generateClient<Schema>();

// @ts-ignore
export default (props) => {
  const [date, setDate] = React.useState(moment().format("YYYY-MM-DD"));
  const [dateStart, setDateStart] = React.useState(moment().format("YYYY-MM-DD"));
  const [dateEnd, setDateEnd] = React.useState(moment().format("YYYY-MM-DD"));
  const [timeStart, setTimeStart] = React.useState(moment().format("HH:mm"));
  const [timeEnd, setTimeEnd] = React.useState(moment().add(15, 'minutes').format("HH:mm"));

  const storeAttendanceControl = async () => {
    const data = {
      date: date,
      start: `${dateStart}T${timeStart}:00.000Z`,
      end: `${dateEnd}T${timeEnd}:00.000Z`,
      courseId: props.courseId,
      available: true,
    };

    try {
      // @ts-ignore
      await client.models.AttendanceControl.create(data);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  }
  
  return (
    <form onSubmit={e => e.preventDefault()}>
      <Form
        actions={
          <SpaceBetween direction="horizontal" size="xs">
            
            <Button variant="primary"
              onClick={storeAttendanceControl}
            >Crear Nuevo</Button>
          </SpaceBetween>
        }
      >
        <Container
          header={
            <Header variant="h2">
              Nuevo registro de asistencia
            </Header>
          }
        >
          <SpaceBetween direction="vertical" size="l">
            <FormField label="Fecha de asistencia">
            <DatePicker
        openCalendarAriaLabel={selectedDate =>
          "Choose certificate expiry date" +
          (selectedDate
            ? `, selected date is ${selectedDate}`
            : "")
        }
        locale="es_GT"
        value={date}
        placeholder="YYYY/MM/DD"
        onChange={({ detail }) => setDate(detail.value)}
      />
            </FormField>
          <div className="flex items-center space-x-4">
          <FormField label="Habilitado desde el">
              <DatePicker
                
                  openCalendarAriaLabel={selectedDate =>
                    "Choose certificate expiry date" +
                    (selectedDate
                      ? `, selected date is ${selectedDate}`
                      : "")
                  }
                  locale="es_GT"
                  value={dateStart}
                  placeholder="YYYY/MM/DD"
                  onChange={({ detail }) => setDateStart(detail.value)}
              />
            </FormField>


            <FormField label="A las">

            <TimeInput
      format="hh:mm"
      placeholder="hh:mm"
      use24Hour={true}
      value={timeStart}
      onChange={({ detail }) => setTimeStart(detail.value)}
    />
            </FormField>
  
            <FormField label="Hasta el">
              <DatePicker

                openCalendarAriaLabel={selectedDate =>
                  "Choose certificate expiry date" +
                  (selectedDate
                    ? `, selected date is ${selectedDate}`
                    : "")
                }
                locale="es_GT"
                value={dateEnd}
                placeholder="YYYY/MM/DD"
                onChange={({ detail }) => setDateEnd(detail.value)}
              />
            </FormField>

            <FormField label="A las">

            <TimeInput
format="hh:mm"
placeholder="hh:mm"
use24Hour={true}
value={timeEnd}
onChange={({ detail }) => setTimeEnd(detail.value)}
/>
</FormField>
          </div>
          </SpaceBetween>
        </Container>
      </Form>
    </form>
  );
}