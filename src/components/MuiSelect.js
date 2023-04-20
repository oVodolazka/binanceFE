import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

const MuiSelect = ({ label, onChange, options, RenderComponent, value, }) => {
    const { id, title } = label;
    return (
        <Box sx={{ minWidth: 400 }}>
            <FormControl fullWidth>
                <InputLabel id={id}>{label.title}</InputLabel>
                <Select
                    name={title}
                    labelId={id}
                    id={id}
                    value={value}
                    label={label.title}
                    onChange={onChange}
                >
                    {options.map((item) => (
                        <MenuItem
                            key={item.id}
                            value={item.value}
                        >
                            <RenderComponent
                                data={item.data}
                            />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    )
}

export default MuiSelect