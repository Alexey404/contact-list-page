import {
  Alert,
  Box,
  Button,
  Container,
  Grid,
  TextField,
} from '@material-ui/core'
import { useState } from 'react'
import { Redirect } from 'react-router-dom'

export const Login = ({ loginHendler, isLogin, isAlert }) => {
  const [login, setLogin] = useState({ login: '', password: '' })

  const loginHandler = () => {
    loginHendler(login)
  }
  if (isLogin) {
    return <Redirect to='/contacts' />
  }

  return (
    <div>
      <Container maxWidth='sm'>
        <Box
          sx={{
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box
            sx={{
              border: '1px solid black',
              width: 300,
              height: 370,
              padding: 5,
              borderRadius: 3,
            }}
          >
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <h2>Sign in</h2>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id='outlined-login-inputs'
                  label='Phone or email'
                  onChange={e =>
                    setLogin(prev => ({
                      ...prev,
                      login: e.target.value,
                    }))
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id='outlined-password-input'
                  label='Password'
                  type='password'
                  autoComplete='current-password'
                  onChange={e =>
                    setLogin(prev => ({
                      ...prev,
                      password: e.target?.value,
                    }))
                  }
                />
              </Grid>
              {!isAlert ? (
                <Grid item xs={12}>
                  <Alert severity='error'>wrong login or password</Alert>
                </Grid>
              ) : (
                ''
              )}
              <Grid item xs={12}>
                <Button onClick={loginHandler} variant='contained'>
                  Next
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </div>
  )
}
