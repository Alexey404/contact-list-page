import { Grid, Input } from '@material-ui/core'
import Alert from '@material-ui/core/Alert'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'

export const ModalDialog = ({
  isEdit,
  fullScreen,
  handleClose,
  activEdit,
  setActivEdit,
  open,
  handleDelete,
  handleSave,
  setIsError,
  isError,
}) => {
  const setValueHandler = (e, key) => {
    const length = e.currentTarget.value.length
    if (length > 15) return
    setActivEdit({
      ...activEdit,
      [key]: e.currentTarget.value,
    })
  }
  
  const handleSavestate = () => {
    if (
      activEdit.name.length >= 3 &&
      activEdit.surname.length >= 3 &&
      String(activEdit.phone).length >= 3 &&
      activEdit.mail.length >= 3
    ) {
      handleSave()
      setIsError(false)
    } else {
      setIsError(true)
    }
  }

  return (
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
                  onChange={e => setValueHandler(e, 'name')}
                />
              </Grid>
              <Grid item xs={2} md={2}>
                Surname:
              </Grid>
              <Grid item xs={4} md={4}>
                <Input
                  value={activEdit.surname}
                  onChange={e => setValueHandler(e, 'surname')}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={2} md={2}>
                Phone:
              </Grid>
              <Grid item xs={4} md={4}>
                <Input
                  value={activEdit.phone}
                  onChange={e => setValueHandler(e, 'phone')}
                />
              </Grid>
              <Grid item xs={2} md={2}>
                Mail:
              </Grid>
              <Grid item xs={4} md={4}>
                <Input
                  value={activEdit.mail}
                  onChange={e => setValueHandler(e, 'mail')}
                />
              </Grid>
              {isError ? (
                <Grid item xs={4} md={12}>
                  <Alert severity='error'>
                    All fields must be filled in at least 3 characters
                  </Alert>
                </Grid>
              ) : (
                ''
              )}
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          {isEdit ? <Button onClick={handleDelete}>Delete</Button> : ''}
          {isEdit ? (
            <Button onClick={handleSavestate}>Save</Button>
          ) : (
            <Button onClick={handleSavestate}>Add</Button>
          )}
          <Button onClick={handleClose} autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
