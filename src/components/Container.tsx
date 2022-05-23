import React, { useEffect } from 'react'
import { Grid, Card, Divider, Typography, Pagination, Box, CircularProgress } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { PAGE_SIZE } from '../constants'
import { Status } from '../types'
import { getPaginatedItems, getItemsFromAPI, paginate, getItems, getStatus } from './itemSlice'

export const Container = () => {
    const dispatch = useAppDispatch();
    const items = useAppSelector(getItems);
    const paginatedItems = useAppSelector(getPaginatedItems);
    const status = useAppSelector(getStatus)

    // fetching items when component is rendered
    useEffect(() => {
        dispatch(getItemsFromAPI())
    }, [])

    // pagination handler
    const handleChange = (e: React.ChangeEvent<unknown>, page: number) => {
        dispatch(paginate({ page }))
    }

    if (status === Status.Loading) return <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '94vh' }}>
        <CircularProgress />
    </Box>

    if(status === Status.Failed) return <div>Fetching failed</div>

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: "15px" }}>
            <Grid container alignItems='stretch' rowSpacing={3} columnSpacing={{ xs: 3 }} sx={{ maxHeight: '94vh', overflow: 'auto' }}>
                {paginatedItems.map((item, i) => <Grid key={item.id} item xs={4} sx={{ display: 'flex' }} >
                    <Card sx={{ padding: "15px" }}>
                        <Typography variant='h5'>{item.title} {i + 1}</Typography>
                        <Divider sx={{ margin: "10px 0px" }} />
                        <Typography sx={{ overflow: 'auto', height: "150px" }}>
                            {item.body}
                        </Typography>
                    </Card>
                </Grid>)}
            </Grid>
            <Pagination count={items.length / PAGE_SIZE} variant="outlined" onChange={handleChange} />
        </Box>
    )
}
