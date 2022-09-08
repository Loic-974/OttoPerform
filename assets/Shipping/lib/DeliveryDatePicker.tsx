import { Dayjs } from "dayjs";
import dayjs = require("dayjs");
import React = require("react");
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { CalendarPicker } from "@mui/x-date-pickers";

const isWeekend = (date: Dayjs) => {
    const day = date.day();

    return day === 0 || day === 6;
};

export function DeliveryDatePicker() {
    const [value, setValue] = React.useState<Dayjs | null>(dayjs());

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <CalendarPicker
                date={value}
                onChange={(newDate) => setValue(newDate)}
                disablePast
            />
        </LocalizationProvider>
    );
}
