import React, { PureComponent } from 'react'
import { Paper, Backdrop, CircularProgress } from '@material-ui/core'
import Axios from 'axios'
import { Column, Table, AutoSizer } from 'react-virtualized'

function msToTime(duration) {
    var milliseconds = parseInt((duration % 1000) / 100),
        seconds = parseInt((duration / 1000) % 60),
        minutes = parseInt((duration / (1000 * 60)) % 60),
        hours = parseInt((duration / (1000 * 60 * 60)) % 24)

    hours = hours < 10 ? '0' + hours : hours
    minutes = minutes < 10 ? '0' + minutes : minutes
    seconds = seconds < 10 ? '0' + seconds : seconds

    return hours + ':' + minutes + ':' + seconds + '.' + milliseconds
}

class CritterList extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            fetchingData: true,
            data: null,
            currentlyObtainable: [],
        }
    }

    updateData = () => {
        const { data } = this.state
        if (data !== null) {
            this.setState({
                currentlyObtainable: data.filter(critter => {
                    const { start_time, end_time } = critter
                    const time = new Date()

                    const year = time.getFullYear()
                    const month = time.getMonth()
                    const dayOfMonth = time.getDate()

                    const startSplit = start_time.split(':')
                    const endSplit = end_time.split(':')

                    //Month is 0-indexed
                    const startTime = new Date(
                        year,
                        month,
                        dayOfMonth,
                        startSplit[0],
                        startSplit[1],
                        startSplit[2]
                    )
                    let endTime = new Date(
                        year,
                        month,
                        dayOfMonth,
                        endSplit[0],
                        endSplit[1],
                        endSplit[2]
                    )

                    if (startTime.getHours() > endTime.getHours()) {
                        endTime.setDate(endTime.getDate() + 1)
                    }

                    return time >= startTime && time < endTime
                }),
            })
        }
    }

    componentDidMount() {
        /**
         * Retriving data from API on port 9000
         */

        Axios.get(`http://192.168.0.162:9000`).then(response => {
            this.setState({ data: response.data, fetchingData: false })
        })

        /**
         * Updates data every five seconds
         */
        this.updateData()
        setInterval(this.updateData, 1000)
    }

    render() {
        const { fetchingData, data, currentlyObtainable } = this.state
        console.log(currentlyObtainable)

        const renderedObject =
            fetchingData || !data ? (
                <div />
            ) : (
                <Paper
                    elevation={12}
                    style={{
                        height: 400,
                        width: '100%',
                        backgroundColor: '#0d1121',
                        opacity: '90%',
                    }}
                >
                    <AutoSizer disableHeight>
                        {({ width }) => (
                            <Table
                                headerHeight={60}
                                height={400}
                                width={width}
                                headerStyle={{
                                    color: 'aqua',
                                }}
                                rowCount={currentlyObtainable.length}
                                rowGetter={({ index }) =>
                                    currentlyObtainable[index]
                                }
                                rowHeight={55}
                                rowStyle={{ color: 'white' }}
                            >
                                <Column
                                    dataKey="img_src"
                                    label="Image"
                                    width={width / 6}
                                    cellRenderer={({ cellData }) => (
                                        <img
                                            src={cellData}
                                            alt=""
                                            height={64}
                                            width={64}
                                        />
                                    )}
                                />
                                <Column
                                    dataKey="name"
                                    label="Name"
                                    width={width / 6}
                                />
                                <Column
                                    dataKey="price"
                                    label="Price"
                                    width={width / 6}
                                />
                                <Column
                                    dataKey="location"
                                    label="Location"
                                    width={width / 4}
                                />
                                <Column
                                    dataKey="end_time"
                                    label="Obtainable till"
                                    width={width / 4}
                                />
                            </Table>
                        )}
                    </AutoSizer>
                </Paper>
            )

        return (
            <div>
                Currently <strong> {currentlyObtainable.length} </strong>{' '}
                creatures obtainable
                {renderedObject}
                <Backdrop open={fetchingData || !data}>
                    <CircularProgress color="inherit" />
                </Backdrop>
            </div>
        )
    }
}

export default CritterList
