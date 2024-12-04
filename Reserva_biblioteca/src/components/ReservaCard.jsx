import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardActions from '@mui/joy/CardActions';
import Typography from '@mui/joy/Typography';

export default function ReservaCard({ centro, sala, hora, fecha, onEliminar }) {
    return (
        <Card
            variant="outlined"
            sx={{
                margin: "5vw",
                width: "85vw"
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            />
            <CardContent>
                <Typography level="title-lg">Centro: {centro}, Día: {fecha}</Typography>
                <Typography level="body-md">
                    Sala: {sala}, Hora: {hora}
                </Typography>
            </CardContent>
            <CardActions buttonFlex="1">
                <Button variant="outlined" color="neutral" onClick={onEliminar}>
                    Eliminar reserva
                </Button>
            </CardActions>
        </Card>
    );
}
