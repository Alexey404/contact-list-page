import { FormControl, Grid, Input, NativeSelect } from '@material-ui/core'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Checkbox from '@material-ui/core/Checkbox'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import IconButton from '@material-ui/core/IconButton'
import Paper from '@material-ui/core/Paper'
import { alpha, useTheme } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import Toolbar from '@material-ui/core/Toolbar'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import DeleteIcon from '@material-ui/icons/Delete'
import { visuallyHidden } from '@material-ui/utils'
import * as React from 'react'
import { Redirect } from 'react-router-dom'
import SearchIcon from '@material-ui/icons/Search'

const createData = (id, name, surname, number, mail) => {
  return {
    id,
    name,
    surname,
    number,
    mail,
  }
}

const descendingComparator = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
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

const headCells = [
  {
    id: 'id',
    numeric: false,
    disablePadding: true,
    label: 'Id',
  },
  {
    id: 'name',
    numeric: true,
    disablePadding: false,
    label: 'Name',
  },
  {
    id: 'surname',
    numeric: true,
    disablePadding: false,
    label: 'Surname',
  },
  {
    id: 'number',
    numeric: true,
    disablePadding: false,
    label: 'Number',
  },
  {
    id: 'mail',
    numeric: true,
    disablePadding: false,
    label: 'Mail',
  },
]

const EnhancedTableHead = ({
  onSelectAllClick,
  order,
  orderBy,
  numSelected,
  rowCount,
  onRequestSort,
}) => {
  const createSortHandler = property => event => {
    onRequestSort(event, property)
  }

  return (
    <TableHead>
      <TableRow>
        <TableCell padding='checkbox'>
          <Checkbox
            color='primary'
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component='span' sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

const EnhancedTableToolbar = ({
  numSelected,
  remove,
  handleClickOpen,
  setValue,
  value,
  setChange,
  authorizationOff,
}) => {
  return (
    <Toolbar
      sx={{
        pl: { sm: 4 },
        pr: { xs: 2, sm: 2 },
        ...(numSelected > 0 && {
          bgcolor: theme =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      <Grid item xs={1} md={1}>
        {numSelected > 0 ? (
          <Tooltip title='Delete'>
            <IconButton onClick={remove}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          ''
        )}
      </Grid>
      <SearchIcon />
      <Grid item xs={2} md={1}>
        <FormControl fullWidth>
          <NativeSelect
            defaultValue={'name'}
            inputProps={{
              name: 'Search',
              id: 'uncontrolled-native',
            }}
            onChange={e => setChange(e.currentTarget.value)}
          >
            <option value={'name'}>Name</option>
            <option value={'surname'}>Surname</option>
            <option value={'number'}>Number</option>
            <option value={'mail'}>Mail</option>
          </NativeSelect>
        </FormControl>
      </Grid>
      <Grid item xs={2} md={1}>
        <Input onChange={e => setValue(e.currentTarget.value)} value={value} />
      </Grid>
      <Grid item xs={1} md={5}>
        {numSelected > 0 ? (
          <Typography
            sx={{ flex: '1 1 100%' }}
            color='inherit'
            variant='subtitle1'
            component='div'
          >
            {numSelected} selected
          </Typography>
        ) : (
          <Typography
            sx={{ flex: '1 1 100%' }}
            variant='h6'
            id='tableTitle'
            component='div'
          >
            Contacts
          </Typography>
        )}
      </Grid>
      <Grid item xs={1} md={3}>
        <Button
          size='small'
          variant='contained'
          onClick={() =>
            handleClickOpen(
              { name: '', surname: '', number: '', mail: '' },
              false
            )
          }
        >
          Add new contact
        </Button>
      </Grid>
      <Grid item xs={1} md={1}>
        <Button size='small' variant='contained' onClick={authorizationOff}>
          Sign out
        </Button>
      </Grid>
    </Toolbar>
  )
}

export const EnhancedTable = ({ isLogin, authorizationOff }) => {
  const [order, setOrder] = React.useState('asc')
  const [orderBy, setOrderBy] = React.useState('id')
  const [selected, setSelected] = React.useState([])
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)
  const [activEdit, setActivEdit] = React.useState({
    name: '',
    surname: '',
    number: '',
    mail: '',
  })
  const [isEdit, setIsEdit] = React.useState(false)
  const [value, setValue] = React.useState('')
  const [change, setChange] = React.useState('name')

  const [rows, setRows] = React.useState([
    {
      id: 1,
      name: 'Alex',
      surname: 'Lager',
      number: 89182323222,
      mail: 'Chtoto@gmail.com',
    },
  ])

  const filteredContacts = rows.filter(contact => {
    return String(contact[change])
      .toLowerCase()
      .includes(String(value.toLowerCase()))
  })

  filteredContacts.map(e => createData(e.name, e.surname, e.number, e.mail))

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

  const handleChangePage = (e, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const isSelected = name => selected.indexOf(name) !== -1

  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - filteredContacts.length)
      : 0

  const [open, setOpen] = React.useState(false)
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))

  const handleClickOpen = (e, isTrue) => {
    setIsEdit(isTrue)
    setActivEdit(e)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const remove = () => {
    selected.map(e => {
      return setRows(prev => [...prev].filter(row => row.id !== e))
    })
    setSelected([])
  }

  const handleSave = () => {
    if (!isEdit) {
      setRows([
        ...rows,
        {
          id: rows[0]
            ? Math.max.apply(
                Math,
                rows.map(i => {
                  return i.id
                })
              ) + 1
            : 1,
          name: activEdit.name,
          surname: activEdit.surname,
          number: activEdit.number,
          mail: activEdit.mail,
        },
      ])
    } else {
      setRows(
        rows.map(item =>
          item.id === activEdit.id
            ? {
                ...item,
                name: activEdit.name,
                surname: activEdit.surname,
                number: activEdit.number,
                mail: activEdit.mail,
              }
            : item
        )
      )
    }
    handleClose()
  }
  if (!isLogin) {
    return <Redirect to='/' />
  }
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
                        onClick={() => handleClickOpen(row, true)}
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
                        <TableCell align='right'>{row.number}</TableCell>
                        <TableCell align='right'>{row.mail}</TableCell>
                        <TableCell align='right'></TableCell>
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

      <div>
        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={handleClose}
          aria-labelledby='responsive-dialog-title'
        >
          <DialogContent>
            <h1>{!isEdit ? 'Add new contact' : 'Edit contact'}</h1>

            <Box sx={{ flexGrow: 8 }}>
              <Grid container spacing={2}>
                <Grid item xs={2} md={2}>
                  Name:
                </Grid>
                <Grid item xs={4} md={4}>
                  <Input
                    value={activEdit.name}
                    onChange={e =>
                      setActivEdit({
                        ...activEdit,
                        name: e.currentTarget.value,
                      })
                    }
                  />
                </Grid>
                <Grid item xs={2} md={2}>
                  Surname:
                </Grid>
                <Grid item xs={4} md={4}>
                  <Input
                    value={activEdit.surname}
                    onChange={e =>
                      setActivEdit({
                        ...activEdit,
                        surname: e.currentTarget.value,
                      })
                    }
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={2} md={2}>
                  Number:
                </Grid>
                <Grid item xs={4} md={4}>
                  <Input
                    value={activEdit.number}
                    onChange={e =>
                      setActivEdit({
                        ...activEdit,
                        number: e.currentTarget.value,
                      })
                    }
                  />
                </Grid>
                <Grid item xs={2} md={2}>
                  Mail:
                </Grid>
                <Grid item xs={4} md={4}>
                  <Input
                    value={activEdit.mail}
                    onChange={e =>
                      setActivEdit({
                        ...activEdit,
                        mail: e.currentTarget.value,
                      })
                    }
                  />
                </Grid>
              </Grid>
            </Box>
          </DialogContent>
          <DialogActions>
            {isEdit ? (
              <Button onClick={handleSave}>Save</Button>
            ) : (
              <Button onClick={handleSave}>Add</Button>
            )}
            <Button onClick={handleClose} autoFocus>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  )
}
