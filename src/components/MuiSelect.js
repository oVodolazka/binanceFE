import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

const MuiSelect = ({ label, onChange, options, RenderComponent, value, }) => {
    const title = label.title
    return (
        <Box sx={{ minWidth: 400 }}>
            <FormControl fullWidth>
                <InputLabel id={label.id}>{label.title}</InputLabel>
                <Select
                    name={title}
                    labelId={label.id}
                    id={label.id}
                    value={value}
                    label={label.title}
                    onChange={onChange}
                >
                    {options.map((item, index) => (
                        <MenuItem
                            key={index}
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