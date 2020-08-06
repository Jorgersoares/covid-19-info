import React from 'react'

//Material ui
import Dialog from '@material-ui/core/Dialog';

//Custom components
import Chart from '../Chart';

export default function ChartModal(props) {
    return (
        <Dialog
            open={props.open}
            onClose={props.close}
            maxWidth='sm'
            fullWidth={true}>
            <Chart countrie={props.countrie} />
        </Dialog>
    );
}
