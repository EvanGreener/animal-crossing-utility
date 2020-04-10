import React, { PureComponent } from 'react'
import { Paper, Backdrop, CircularProgress } from '@material-ui/core'
import Axios from 'axios'
import { Column, Table, AutoSizer } from 'react-virtualized'

function msToTime(duration) {
    var seconds = parseInt((duration / 1000) % 60),
        minutes = parseInt((duration / (1000 * 60)) % 60),
        hours = parseInt((duration / (1000 * 60 * 60)) % 24)

    hours = hours < 10 ? '0' + hours : hours
    minutes = minutes < 10 ? '0' + minutes : minutes
    seconds = seconds < 10 ? '0' + seconds : seconds

    return hours + ':' + minutes + ':' + seconds
}

function convertTimeToDate(start_time, end_time) {
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

    return { time, startTime, endTime }
}

function rowRenderer({
    className,
    columns,
    index,
    key,
    onRowClick,
    onRowDoubleClick,
    onRowMouseOut,
    onRowMouseOver,
    onRowRightClick,
    rowData,
    style,
}) {
    const a11yProps = { 'aria-rowindex': index + 1 }

    if (
        onRowClick ||
        onRowDoubleClick ||
        onRowMouseOut ||
        onRowMouseOver ||
        onRowRightClick
    ) {
        a11yProps['aria-label'] = 'row'
        a11yProps.tabIndex = 0

        if (onRowClick) {
            a11yProps.onClick = (event) => onRowClick({ event, index, rowData })
        }
        if (onRowDoubleClick) {
            a11yProps.onDoubleClick = (event) =>
                onRowDoubleClick({ event, index, rowData })
        }
        if (onRowMouseOut) {
            a11yProps.onMouseOut = (event) =>
                onRowMouseOut({ event, index, rowData })
        }
        if (onRowMouseOver) {
            a11yProps.onMouseOver = (event) =>
                onRowMouseOver({ event, index, rowData })
        }
        if (onRowRightClick) {
            a11yProps.onContextMenu = (event) =>
                onRowRightClick({ event, index, rowData })
        }
    }

    switch (index) {
        case 0:
            style = { ...style, backgroundColor: '#ffe554', color: 'black' }
            break
        case 1:
            style = { ...style, backgroundColor: '#adadad', color: 'black' }
            break
        case 2:
            style = { ...style, backgroundColor: '#bf6730', color: 'black' }
            break

        default:
            break
    }

    return (
        <div
            {...a11yProps}
            className={className}
            key={key}
            role="row"
            style={style}
        >
            {columns}
        </div>
    )
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
            const newCritters = data.filter((critter) => {
                const { allDay } = this.props
                const { start_time, end_time } = critter

                if (start_time === '00:00:00' && end_time === '23:59:59') {
                    return allDay
                }

                const { startTime, endTime, time } = convertTimeToDate(
                    start_time,
                    end_time
                )

                return time >= startTime && time < endTime
            })

            this.setState({
                currentlyObtainable: newCritters,
            })
        }
    }

    componentDidMount() {
        /**
         * Retriving data from API on port 9000
         */

        Axios.get(`http://192.168.0.162:9000`).then((response) => {
            this.setState({ data: response.data, fetchingData: false })
        })

        /**
         * Updates data every second
         */
        setInterval(this.updateData, 500)
    }

    render() {
        const { fetchingData, data, currentlyObtainable } = this.state

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
                                rowRenderer={rowRenderer}
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
                                    label="Time left:"
                                    width={width / 6}
                                    cellRenderer={({ rowIndex }) => {
                                        const {
                                            start_time,
                                            end_time,
                                        } = currentlyObtainable[rowIndex]

                                        if (
                                            start_time === '00:00:00' &&
                                            end_time === '23:59:59'
                                        ) {
                                            return 'All Day'
                                        } else {
                                            // Time = the time now
                                            const {
                                                endTime,
                                            } = convertTimeToDate(
                                                start_time,
                                                end_time
                                            )

                                            const time = new Date()

                                            const diff =
                                                endTime.getTime() -
                                                time.getTime()

                                            return msToTime(diff)
                                        }
                                    }}
                                />
                                <Column
                                    dataKey="start_time"
                                    label="Availible again at:"
                                    width={width / 3.5}
                                    cellRenderer={({ rowIndex, cellData }) => {
                                        const {
                                            start_time,
                                            end_time,
                                        } = currentlyObtainable[rowIndex]

                                        if (
                                            start_time === '00:00:00' &&
                                            end_time === '23:59:59'
                                        ) {
                                            return '-'
                                        } else {
                                            return cellData
                                        }
                                    }}
                                />
                            </Table>
                        )}
                    </AutoSizer>
                </Paper>
            )

        return (
            <div>
                Showing <strong> {currentlyObtainable.length} </strong>{' '}
                obtainable creatures
                {renderedObject}
                <Backdrop open={fetchingData || !data}>
                    <CircularProgress color="inherit" />
                </Backdrop>
            </div>
        )
    }
}

export default CritterList
