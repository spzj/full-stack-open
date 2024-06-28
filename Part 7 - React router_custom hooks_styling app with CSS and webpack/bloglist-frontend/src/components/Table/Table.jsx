import { useState } from 'react'
import PropTypes from 'prop-types'

import SortIcon from '@/assets/sort.svg?react'
import styles from './Table.module.css'

const Table = ({ data, headers, rowOnClick, className, ...rest }) => {
  const [tableData, setTableData] = useState(data)
  const [sortField, setSortField] = useState('')
  const [isSortAsc, setIsSortAsc] = useState(true)
  const handleSort = (columnName) => {
    let newIsSortAsc
    if (columnName === sortField) {
      newIsSortAsc = !isSortAsc
      setIsSortAsc(!isSortAsc)
    } else {
      newIsSortAsc = true
      setIsSortAsc(true)
      setSortField(columnName)
    }

    const newTableData = [...tableData].sort(
      (a, b) =>
        a[columnName].toString().localeCompare(b[columnName].toString(), 'en', {
          numeric: true,
        }) * (newIsSortAsc ? 1 : -1)
    )
    setTableData(newTableData)
  }

  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  /* Differentiates between a drag (e.g. to copy) and click*/
  let startX = 0
  let startY = 0
  let isClick = false

  const handleMouseDown = (event) => {
    startX = event.clientX
    startY = event.clientY
    isClick = true
  }

  const handleMouseMove = (event) => {
    if (
      Math.abs(event.clientX - startX) > 3 ||
      Math.abs(event.clientY - startY) > 3
    ) {
      isClick = false
    }
  }

  const handleMouseUp = (d) => {
    if (isClick) {
      rowOnClick(d)
    }
  }

  return (
    <table className={`${styles.table} ${className}`} {...rest}>
      <thead>
        <tr>
          {headers.map((h) => (
            <th key={h} onClick={() => handleSort(h)} scope="col">
              <div className={styles.columnHeader}>
                <span>{capitalize(h)}</span>
                <SortIcon
                  className={
                    sortField === h
                      ? isSortAsc
                        ? styles.sortIconAsc
                        : styles.sortIconDesc
                      : styles.sortIcon
                  }
                />
              </div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {tableData.map((d) => (
          <tr
            key={d.id}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={() => handleMouseUp(d)}
          >
            {headers.map((h) => (
              <td key={`${d.id}-${h}`}>{d[h]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

Table.propTypes = {
  data: PropTypes.array.isRequired,
  headers: PropTypes.array.isRequired,
  rowOnClick: PropTypes.func,
  className: PropTypes.string,
}

export default Table
