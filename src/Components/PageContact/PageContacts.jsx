import Box from '@material-ui/core/Box'
import Checkbox from '@material-ui/core/Checkbox'
import Paper from '@material-ui/core/Paper'
import { useTheme } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { ModalDialog } from './Modal'
import { EnhancedTableHead } from './TableHead'
import { EnhancedTableToolbar } from './TableToolbar'

const createData = (id, name, surname, phone, mail) => {
  return {
    id,
    name,
    surname,
    phone,
    mail,
  }
}

const descendingComparator = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) return -1
  if (b[orderBy] > a[orderBy]) return 1
  return 0
}

const getComparator = (order, orderBy) => {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

const stableSort = (array, comparator) => {
  const stabilizedThis = array.map((el, index) => [el, index])
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) return order
    return a[1] - b[1]
  })
  return stabilizedThis.map(el => el[0])
}

export const EnhancedTable = ({ isLogin, authorizationOff }) => {
  const [isError, setIsError] = useState(false)
  const [order, setOrder] = useState('asc')
  const [orderBy, setOrderBy] = useState('id')
  const [selected, setSelected] = useState([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [isEdit, setIsEdit] = useState(false)
  const [value, setValue] = useState('')
  const [change, setChange] = useState('name')
  const [open, setOpen] = useState(false)
  const [activEdit, setActivEdit] = useState({
    name: '',
    surname: '',
    phone: '',
    mail: '',
  })
  const [rows, setRows] = useState([
    {
      id: 1,
      name: 'Alex',
      surname: 'Lager',
      phone: 89182323222,
      mail: 'Chtoto@gmail.com',
    },
  ])

  const filteredContacts = rows.filter(contact => {
    return String(contact[change])
      .toLowerCase()
      .includes(String(value.toLowerCase()))
  })

  filteredContacts.map(e => createData(e.name, e.surname, e.phone, e.mail))

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelecteds = filteredContacts.map(n => n.id)
      setSelected(newSelecteds)
      return
    }
    setSelected([])
  }

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id)
    let newSelected = []
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      )
    }
    setSelected(newSelected)
  }

  const handleChangePage = (e, newPage) => setPage(newPage)

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const isSelected = name => selected.indexOf(name) !== -1

  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - filteredContacts.length)
      : 0

  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))

  const handleClickOpen = (e, isTrue) => {
    setIsEdit(isTrue)
    setActivEdit(e)
    setIsError(false)
    setOpen(true)
  }

  const handleClose = () => setOpen(false)

  const handleDelete = () => {
    setSelected(prev => [...prev].filter(el => el !== activEdit.id))
    handleClose()
    setRows(prev => [...prev].filter(row => row.id !== activEdit.id))
  }

  const handlerEdit = (e, row) => handleClickOpen(row, true)

  const remove = () => {
    selected.map(e => setRows(prev => [...prev].filter(row => row.id !== e)))
    setSelected([])
  }

  const handleSave = () => {
    isEdit
      ? setRows(
          rows.map(item => (item.id === activEdit.id ? { ...activEdit } : item))
        )
      : setRows([
          ...rows,
          {
            id:
              Math.max.apply(
                Math,
                rows.map(i => i.id)
              ) + 1,
            ...activEdit,
          },
        ])
    setOpen(false)
  }

  if (!isLogin) return <Redirect to='/' />

  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
          <EnhancedTableToolbar
            numSelected={selected.length}
            remove={remove}
            handleClickOpen={handleClickOpen}
            setValue={setValue}
            value={value}
            setChange={setChange}
            change={change}
            authorizationOff={authorizationOff}
          />
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby='tableTitle'
              size={'medium'}
            >
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={filteredContacts.length}
              />
              <TableBody>
                {stableSort(filteredContacts, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const isItemSelected = isSelected(row.id)
                    const labelId = `enhanced-table-checkbox-${index}`
                    return (
                      <TableRow
                        hover
                        role='checkbox'
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.id}
                        selected={isItemSelected}
                        onClick={e => handlerEdit(e, row)}
                      >
                        <TableCell
                          padding='checkbox'
                          onClick={e => e.stopPropagation()}
                        >
                          <Checkbox
                            onClick={event => handleClick(event, row.id)}
                            color='primary'
                            checked={isItemSelected}
                            inputProps={{
                              'aria-labelledby': labelId,
                            }}
                          />
                        </TableCell>
                        <TableCell
                          component='th'
                          id={labelId}
                          scope='row'
                          padding='none'
                        >
                          {row.id}
                        </TableCell>
                        <TableCell align='right'>{row.name}</TableCell>
                        <TableCell align='right'>{row.surname}</TableCell>
                        <TableCell align='right'>{row.phone}</TableCell>
                        <TableCell align='right'>{row.mail}</TableCell>
                      </TableRow>
                    )
                  })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: 53 * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25]}
            component='div'
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
      <ModalDialog
        isEdit={isEdit}
        fullScreen={fullScreen}
        handleClose={handleClose}
        activEdit={activEdit}
        setActivEdit={setActivEdit}
        open={open}
        handleDelete={handleDelete}
        handleSave={handleSave}
        isError={isError}
        setIsError={setIsError}
      />
    </>
  )
}
