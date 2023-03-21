import {format} from 'date-fns'

export const COLUMNS = [
    {
        Header:'Id',
        Footer:'Id',
        accessor: 'id'

    },
    {
        Header:'First Name',
        Footer:'First Name',
        accessor:'first_name'
    },
    {
        Header:'Last Name',
        Footer:'Last Name',
        accessor:'last_name'
    },
    {
        Header:'Email',
        Footer:'Email',
        accessor:'email'
    },
    {
        Header:'Date',
        Footer:'Date',
        accessor:'date'
       // Cell:({value}) => {return format(new Date(value),'dd/mm/yyyy')},
    },
    {
        Header:'Ip Address',
        Footer:'Ip Address',
        accessor:'ip_address'
    },
]

export const GROUPED_COLUMNS = [
    {
        Header:'Id',
        Footer:'Id',
        accessor: 'id'

    },
    {
        Header:'Nombre',
        Footer:'Nombre',
        columns:[
            {
                Header:'First Name',
                Footer:'First Name',
                accessor:'first_name'
            },
            {
                Header:'Last Name',
                Footer:'Last Name',
                accessor:'last_name'
            },
        ]
    },
    {
        Header:'Infomación',
        Footer:'Información',
        columns:[
            {
                Header:'Email',
                Footer:'Email',
                accessor:'email'
            },
            {
                Header:'Date',
                Footer:'Date',
                accessor:'date'
                //Cell:({value}) => {return format(new Date(value),'dd/mm/yyyy')}
            },
            {
                Header:'Ip Address',
                Footer:'Ip Address',
                accessor:'ip_address'
            },
        ]
    },

]