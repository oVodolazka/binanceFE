import { Box, Button } from '@mui/material'
import React from 'react'

export const IntegrationSuccess = (props) => {
    const handleReplaceKeys = () => {
        props.onEditKeys();
    }
    const handleDeleteKeys = () => {
        props.onRemoveKeys();
    }
    return (
        <Box sx={{ paddingTop: '94px', paddingLeft: '30px', paddingRight: '30px', backgroundColor: '#9c9e9d47', height: '100%' }}>
            <Box sx={{ backgroundColor: '#ffffff', borderRadius: '10px', height: '600px', padding: '50px' }}>
                <Box sx={{ paddingLeft: '7px' }}>Integration is successfull</Box>
                <Button onClick={handleReplaceKeys}>Replace keys</Button>
                <Button onClick={handleDeleteKeys}>Remove keys</Button>
            </Box>
        </Box>
    )
}