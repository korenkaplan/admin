import React, { FC, useState } from 'react';
import loginBackground from '@/assets/loginBackground.jpg';
import { makeStyles, createStyles } from '@mui/styles';
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Button, FormControl, InputLabel, IconButton, InputAdornment, OutlinedInput, Typography, Checkbox, FormControlLabel } from '@mui/material';
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
} from 'formik';
import { LoginValidationSchema } from '@/Utils/Validation-schemas';
import { useAuth } from '@/Context/AuthContext'
import { LoginDto } from './Login-Dto';
import LoadingButton from '@mui/lab/LoadingButton';
import LoginIcon from '@mui/icons-material/Login';
import { ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
interface Props { }
interface MyFormValues {
  email: string;
  password: string;
  rememberMe:boolean;
}

const LoginPage: FC<Props> = () => {

  const [isLoading,setIsLoading] = useState(false);
  const [buttonTitle, setButtonTitle] = useState("Login");
  const [showPassword, setShowPassword] = useState(false);
  const [isRememberMe, setIsRememberMe] = useState(false);
  const classes = useStyles();
  const { loginAttempt } = useAuth()
  const buttonColor = '#5AE4A8'
  const initialValues: MyFormValues = { email: '', password: '',rememberMe: false};
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  const handleSubmit = async (values: LoginDto, { setSubmitting }) => {
    setIsLoading(true)
    const dto: LoginDto = {
      email: values.email,
      password: values.password,
      rememberMe: isRememberMe
    }
    const result = await loginAttempt(dto)
    setIsLoading(false)
    if(!result){
      toast("Login failed Email or password are incorrect",{ type: "error",autoClose:3000,theme: "colored",hideProgressBar: false, });
    }
    else{
      toast("Login Successful",{ type: "success",autoClose:3000,theme: "colored",hideProgressBar: false, });
    }
    setSubmitting(false);

  };
  const handleCheckboxChange = ()=>{
    setIsRememberMe(!isRememberMe)
  }

  const introDiv = (
    <div style={{ marginBottom: '10%' }}>
      <h1>Scan & Go</h1>
      <Typography>
        A smart mobile payment system for clothing stores.
        Make every customer’s smartphone a cashier.
      </Typography>
    </div>
  )
  const formik = (
    <Formik
      initialValues={initialValues}
      validationSchema={LoginValidationSchema}
      onSubmit={handleSubmit}
    >
      <Form style={{ flexDirection: 'column', display: 'flex', height: '30%', padding: 20 }}>
        <div>
          <Field name="email">
            {({ field }: any) => (
              <FormControl style={{ width: '100%' }} variant="outlined">
                <InputLabel htmlFor="EmailInput">Email</InputLabel>
                <OutlinedInput
                  id="EmailInput"
                  label="Email"
                  variant="outlined"
                  {...field}
                />
              </FormControl>
            )}
          </Field>
          <ErrorMessage name="email" component="div" className={classes.error} />
        </div>
        <br />
        <div>
          <Field name="password">
            {({ field }: any) => (
              <FormControl variant="outlined" style={{ width: '100%' }}>
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? 'text' : 'password'}
                  label="Password"
                  variant="outlined"
                  {...field}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            )}
          </Field>
          <ErrorMessage name="password" component="div" className={classes.error} />
        </div>
        <br />
          <FormControlLabel control={<Checkbox onChange={handleCheckboxChange} value={isRememberMe}  />} label={isRememberMe? 'Remembered':'Remember me'} />
          <LoadingButton  type='submit' loading={isLoading} loadingPosition="start" startIcon={<LoginIcon />} variant='contained' sx={{ width: '50%', alignSelf: 'center',backgroundColor: buttonColor}}> <span>{buttonTitle}</span></LoadingButton>
      </Form>
    </Formik>
  )
  const leftDiv = (
    <div className={classes.leftDiv}>
      {introDiv}
      {formik}
    </div>
  )

  return (
    <div className={classes.container}>
      {leftDiv}
      <div className={classes.imageDiv}>
        <img src={loginBackground} alt="Background" className={classes.image} />
      </div>
      <ToastContainer />
    </div>
  );
};
const useStyles = makeStyles(() =>
  createStyles({
    error: {
      color: 'red',
    },
    container: {
      flexDirection: 'row',
      width: '100%',
      height: '100vh', // Set height to 100% of viewport height
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    leftDiv: {
      width: '20%',
      height: '100vh',
      padding: 10,
      borderRight: '2px black solid',
      position: 'relative',
      paddingTop: '40px',
      backgroundColor: '#D5F7E6',
      right: 10
    },
    imageDiv: {
      width: '70%',
      height: '100vh',
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      position: 'relative',
    },
    image: {
      maxWidth: '110%',
      maxHeight: '100%',

    }
  })
);

export default LoginPage;
