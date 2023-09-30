import React, { FC } from 'react';
import Box from '@mui/material/Box';
import SideNav from '../../Components/sidenav/Side-nav';
import DirectoryHeader from '@/Components/Ui Comps/Directory-header';
import { makeStyles, createStyles } from '@mui/styles';
import { CreateProductValidationSchema } from '@/Utils/Validation-schemas';
import { CreateProductForm } from './Create-product-dto';
import {
    Formik,
    Form,
    Field,
    ErrorMessage,
  } from 'formik';
interface Props {
}

const CreateProductPage: FC<Props> = () => {
    const initialValues: CreateProductForm = {name:'',price:0,}
    const classes = useStyles();
    const handleSubmit = async (values: CreateProductForm, { setSubmitting }) => {
        console.log(values);
        setSubmitting(false);
      
    }
    return (
        <>
        <Box sx={{ display: 'flex' }}>
       <SideNav/>
       <Box component="main" sx={{ flexGrow: 1, p:6,}}>
              <DirectoryHeader header="Create Product"/>   
              <div className={classes.formContainer}>
                <Formik
                initialValues={initialValues}
                validationSchema={CreateProductValidationSchema}
                onSubmit={handleSubmit}
                >
                <Form style={{ flexDirection:'column',display:'flex',height:'30%', padding:20}}>

                </Form>
                </Formik>
              </div> 
       </Box>
       </Box>
   </>
    );
};
const useStyles = makeStyles(() =>
  createStyles({
   formContainer:{},
   form:{},
  })
);
export default CreateProductPage;