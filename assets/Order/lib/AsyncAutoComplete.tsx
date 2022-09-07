import React = require("react");
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import styled from "styled-components";

function sleep(delay = 0) {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
}

export const AsyncAutoComplete = <T extends {}>({
    label,
    getDataFn,
}: {
    label: string;
    getDataFn: () => T[];
}) => {
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState<readonly T[]>([]);

    const loading = React.useMemo(
        () => open && !options.length,
        [open, options]
    );

    React.useEffect(() => {
        getDataFn();
    }, []);

    React.useEffect(() => {
        let active = true;

        if (!loading) {
            return undefined;
        }

        (async () => {
            if (active && !options.length) {
                const data = await getDataFn();
                setOptions(data);
            }
        })();

        return () => {
            active = false;
        };
    }, [loading]);

    //   React.useEffect(() => {
    //     if (!open) {
    //       setOptions([]);
    //     }
    //   }, [open]);

    return (
        <StyledAutoComplete
            id="asynchronous-demo"
            open={open}
            onOpen={() => {
                setOpen(true);
            }}
            // fullWidth
            freeSolo
            onClose={() => {
                setOpen(false);
            }}
            // isOptionEqualToValue={(option, value) =>
            //     option.title === value.title
            // }
            // getOptionLabel={(option) => option.}
            options={options}
            loading={loading}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={label}
                    fullWidth
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <React.Fragment>
                                {loading ? (
                                    <CircularProgress
                                        color="inherit"
                                        size={20}
                                    />
                                ) : null}
                                {params.InputProps.endAdornment}
                            </React.Fragment>
                        ),
                    }}
                />
            )}
        />
    );
};

const StyledAutoComplete = styled(Autocomplete)`
    width: 80%;
    .MuiAutocomplete-root {
        width: 80%;
    }
`;
