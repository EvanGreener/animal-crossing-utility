import React, { Component } from 'react'
import {
    TableContainer,
    Paper,
    Table,
    TableCell,
    TableRow,
    TableHead,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = () =>
    makeStyles({
        table: {
            minWidth: 400,
        },
        head: {
            backgroundColor: '#0d1121',
            color: 'aqua',
        },
    })

class CritterList extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    // createList = () => {
    //     const { data } = this.props
    //     const critters = []

    //     let rank = 1
    //     for (const value of data) {
    //         if (rank === 1) {
    //         } else if (rank === 2) {
    //         } else if (rank === 3) {
    //         } else {
    //         }
    //         rank++
    //     }
    // }

    render() {
        const classes = useStyles()
        return (
            <TableContainer elevation={5} component={Paper}>
                <Table className={classes}>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Image</TableCell>
                            <TableCell align="center">Price</TableCell>
                            <TableCell align="center">Location</TableCell>
                            <TableCell align="center">Name</TableCell>
                            <TableCell align="center">
                                Time left to obtain
                            </TableCell>
                        </TableRow>
                    </TableHead>
                </Table>
            </TableContainer>
        )
    }
}

export default CritterList
