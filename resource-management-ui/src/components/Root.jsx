import React, { useEffect, useState } from "react";
import _ from "lodash";
import MaterialTable from 'material-table'
import { Grid } from "@material-ui/core";
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import { forwardRef } from 'react';
import axios from 'axios'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';


const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

const designations = [
    {
        value: 'Senior Software Engineer',
        label: 'Senior Software Engineer',
    },
    {
        value: 'Senior Software Engineer II',
        label: 'Senior Software Engineer II',
    },
    {
        value: 'Senior Software Engineer III',
        label: 'Senior Software Engineer III',
    }
];

export const Root = () => {
    const classes = useStyles();
    const [employees, setEmployees] = useState([]);
    const [designation, setDesignation] = React.useState('Software Engineer');
    const [name, setName] = React.useState('Test');
    const [count, setCount] = useState(0);

    useEffect(() => {
        axios.get("http://localhost:4000/employees")
            .then(employees => setEmployees(employees.data))
            .catch(err => console.log(err));
        if (count != employees.length) { count = employees.count }
    }, [count]);

    const handleChange = (event) => {
        setDesignation(event.target.value);
    };
    const handleSubmit = (event) => {
        axios.post("http://localhost:4000/employees", { name: name, designation: designation })
            .then(employees => setEmployees(employees.data))
            .catch(err => console.log(err));
        setCount(employees.length)
    };
    const handleDelete = (event) => {
        axios.delete("http://localhost:4000/employees", { name: event.target.value })
            .then(employees => setEmployees(employees.data))
            .catch(err => console.log(err));
        setCount(employees.length)
    };

    return (<div style={{ padding: 20 }}>
        <Grid container spacing={1}>
            <Grid item>
                <MaterialTable
                    columns={[
                        { title: 'Name', field: 'name' },
                        { title: 'Designation', field: 'designation' }
                    ]}
                    data={employees}
                    title=""
                    icons={tableIcons}
                    actions={[
                        {
                            icon: 'delete',
                            tooltip: 'Delete Employee',
                            onClick: { handleDelete }
                        }
                    ]}
                />
            </Grid>
            <Grid item xs={12}>
                <Button variant="contained" color="primary">Add Employee</Button>
            </Grid>
            <Grid>
                <form className={classes.root} noValidate autoComplete="off">
                    <TextField id="name" label="Name" onChange={e => setName(e.target.value)} />
                    <TextField
                        id="designation"
                        select
                        label="Designation"
                        value={designation}
                        onChange={handleChange}
                        helperText="Please select designation">
                        {designations.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </form>
                <Button variant="contained" color="primary" onClick={handleSubmit}>Submit</Button>
            </Grid>

        </Grid></div>);
}