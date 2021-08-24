import { FormControl, Grid, Input, NativeSelect } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import { alpha } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import DeleteIcon from '@material-ui/icons/Delete'
import SearchIcon from '@material-ui/icons/Search'
import * as React from 'react'

export const EnhancedTableToolbar = ({
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
