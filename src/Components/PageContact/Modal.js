import { Grid, Input } from '@material-ui/core'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import * as React from 'react'

export const ModalDialog = ({
  isEdit,
  fullScreen,
  handleClose,
  activEdit,
  setActivEdit,
  open,
  handleDelete,
  handleSave,
}) => {
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
              Phone:
              </Grid>
              <Grid item xs={4} md={4}>
                <Input
                  value={activEdit.phone}
                  onChange={e =>
                    setActivEdit({
                      ...activEdit,
                      phone: e.currentTarget.value,
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
          {isEdit ? <Button onClick={handleDelete}>Delete</Button> : ''}
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
  )
}
