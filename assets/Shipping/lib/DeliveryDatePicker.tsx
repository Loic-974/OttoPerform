import { Dayjs } from "dayjs";
import dayjs = require("dayjs");
import React = require("react");
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { CalendarPicker } from "@mui/x-date-pickers";
import { Paper } from "@mui/material";
import styled from "styled-components";

const isWeekend = (date: Dayjs) => {
    const day = date.day();

    return day === 0 || day === 6;
};

export const DeliveryDatePicker = ({
    selectedDate,
    setSelectDate,
}: {
    selectedDate: Dayjs | null;
    setSelectDate: (arg: Dayjs | null) => void;
}) => {
    const [value, setValue] = React.useState<Dayjs | null>(dayjs());

    return (
        <StyledDateContainer elevation={2}>
            <StyledTitle>
                <p>Date de livraison</p>
            </StyledTitle>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <CalendarPicker
                    date={selectedDate}
                    onChange={(newDate) => {
                        setSelectDate(newDate);
                    }}
                    disablePast
                    //shouldDisableDate={(day: Dayjs) => isWeekend(day)}
                />
            </LocalizationProvider>
        </StyledDateContainer>
    );
};

const StyledDateContainer = styled(Paper)`
    width: 80%;
    display: flex;
    flex-direction: column;

    .MuiCalendarPicker-root {
        width: 100%;
    }
    div[role="row"] {
        justify-content: space-around;
    }
`;

const StyledTitle = styled.div`
    width: 85%;
    margin-left: 2.5%;
    padding: 8px 16px;
    border-bottom: 2px solid ${({ theme }) => theme.colors.hardGrey};

    p {
        font-weight: 600;
        margin-block-start: 0.6rem;
        margin-block-end: 0.6rem;
    }
`;

const StyledCalendarPicker = styled(CalendarPicker)`
    width: 100%;
`;
