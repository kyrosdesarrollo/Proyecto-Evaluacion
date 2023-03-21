import { Sort } from '@mui/icons-material'
import React, { useMemo } from 'react'
import { useTable, useSortBy } from 'react-table'
import MOCK_DATA from '../../../__mocks__/MOCK_DATA.json'
import { COLUMNS } from './columns'
import './table.css'

const SortingTable = () => {
    const columns = useMemo(() => COLUMNS, [])
    const data = useMemo(() => MOCK_DATA, [])

    const tableInstance = useTable({
        columns,
        data

    },
    useSortBy);

    const { 
        getTableProps, 
        getTableBodyProps, 
        headerGroups, 
        footerGroups,
        rows, 
        prepareRow,
    } = tableInstance

  return (
    <>
        <table id='table' {...getTableProps()} >
            <thead>
                {// Loop over the header rows
                headerGroups.map(headerGroup => (
                    // Apply the header row props
                    <tr {...headerGroup.getHeaderGroupProps()}>
                    {// Loop over the headers in each row
                    headerGroup.headers.map(column => (
                        // Apply the header cell props
                        <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                        {// Render the header
                        column.render('Header')}
                         <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </span>
                        </th>

                        ))}
                        </tr>

            ))}
            </thead>
           {/* Apply the table body props */}

     <tbody {...getTableBodyProps()}>
                {// Loop over the table rows
                rows.map(row => {
                // Prepare the row for display
                prepareRow(row)
                return (
                    // Apply the row props
                    <tr {...row.getRowProps()}>
                    {// Loop over the rows cells

                    row.cells.map(cell => {

                        // Apply the cell props

                        return (

                        <td {...cell.getCellProps()}>

                            {// Render the cell contents

                            cell.render('Cell')}

                        </td>

                        )

                    })}

                    </tr>

                )

})}

</tbody>
<tbody >
    <tfoot>
    {
    footerGroups.map(footerGroup => (
          <tr {...footerGroup.getFooterGroupProps()}>
            {
                footerGroup.headers.map(column => (
              <td {...column.getFooterProps}>
                    {column.render('Footer')}
              </td>
            ))}
          </tr>
        ))}
    </tfoot>

</tbody>
       
</table>
    </>
  )
}

export default SortingTable
