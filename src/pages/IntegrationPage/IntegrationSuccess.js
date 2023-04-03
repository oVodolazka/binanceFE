import { Box, Button } from "@mui/material"
import React from 'react'

export const IntegrationSuccess = (props) => {
    const handleReplaceKeys = () => {
        props.onEditKeys();
    }
    const handleDeleteKeys = () => {
        props.onRemoveKeys();
    }
    return (
        <Box sx={{ paddingTop: '130px', paddingLeft: '100px', backgroundColor: '#F8F8FF', height: '100%' }}>
            <Box sx={{ paddingLeft: '7px' }}>Integration is successfull</Box>
            <Button onClick={handleReplaceKeys}>Replace keys</Button>
            <Button onClick={handleDeleteKeys}>Remove keys</Button>
        </Box>
    )
}