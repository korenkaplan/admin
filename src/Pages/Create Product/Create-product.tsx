import React, { FC } from 'react';
import Box from '@mui/material/Box';
import SideNav from '../../Components/sidenav/Side-nav';
import DirectoryHeader from '@/Components/Ui Comps/Directory-header';
import { makeStyles, createStyles } from '@mui/styles';
import { CreateProductValidationSchema } from '@/Utils/Validation-schemas';
import { CreateProductForm } from './Create-product-dto';
import { Button, FormControl, InputLabel, TextField, IconButton, InputAdornment, OutlinedInput, Typography, Divider, Select, MenuItem, FormControlLabel, FormLabel, Input } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import { styled } from '@mui/material/styles';
import {
    Formik,
    Form,
    Field,
    ErrorMessage,
} from 'formik';
import { Category, ClothingGender, Color, Fabric, Gender, Season } from '@/Utils/Global-enums';
interface Props {
}

const CreateProductPage: FC<Props> = () => {
    const initialValues: CreateProductForm = { name: '', price: 0, colors: [], imageFile: "",season:Season.Yearly,fabric:Fabric.Denim,gender:ClothingGender.Male }
    const classes = useStyles();

    const handleSubmit = async (values: CreateProductForm, { setSubmitting }) => {
        alert(JSON.stringify(values));
        console.log(values);
        setSubmitting(false);

    }
    
const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });
    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <SideNav />
                <Box component="main" sx={{ flexGrow: 1, p: 6, }}>
                    <DirectoryHeader header="Create Product" />
                    <div className={classes.formContainer}>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={CreateProductValidationSchema}
                            onSubmit={handleSubmit}
                        >
                            <Form style={{ flexDirection: 'column', display: 'flex', height: '30%', padding: 20 }}>
                                <div className={classes.firstRow}>
                                    <div className={classes.nameDiv}>
                                        <Field name="name">
                                            {({ field }: any) => (
                                                <FormControl variant="outlined" fullWidth>
                                                    <InputLabel htmlFor="NameInput">Name</InputLabel>
                                                    <OutlinedInput
                                                        id="NameInput"
                                                        label="Name"
                                                        variant="outlined"
                                                        {...field}

                                                    />
                                                </FormControl>
                                            )}
                                        </Field>
                                        <ErrorMessage name="name" component="div" className='error' />
                                    </div>
                                    <div className={classes.priceDiv}>
                                        <Field name="price">
                                            {({ field }: any) => (
                                                <FormControl variant="outlined">
                                                    <InputLabel htmlFor="PriceInput">Price</InputLabel>
                                                    <OutlinedInput
                                                        id="PriceInput"
                                                        label="Price"
                                                        variant="outlined"
                                                        type='number'
                                                        {...field}
                                                    />
                                                </FormControl>
                                            )}
                                        </Field>
                                        <ErrorMessage name="price" component="div" className='error' />
                                    </div>
                                </div>
                                <div className={classes.secondRow}>
                                    <div className={classes.selectCategoryDiv}>
                                        <Field name="category">
                                            {({ field }: any) => (
                                                <FormControl variant="outlined" fullWidth>
                                                    <InputLabel htmlFor="CategoryInput">Category</InputLabel>
                                                    <Select
                                                        label="Category"
                                                        {...field}
                                                        inputProps={{
                                                            name: 'category',
                                                            id: 'CategoryInput',
                                                        }}
                                                    >
                                                        {
                                                            Object.keys(Category).map((key) => (
                                                                <MenuItem key={key} value={Category[key]}>{Category[key]}</MenuItem>
                                                            ))
                                                        }
                                                    </Select>
                                                </FormControl>
                                            )}
                                        </Field>
                                        <ErrorMessage name="category" component="div" className='error' />
                                    </div>
                                    <div className={classes.selectFabricDiv}>
                                        <Field name="fabric">
                                            {({ field }: any) => (
                                                <FormControl variant="outlined" fullWidth>
                                                    <InputLabel htmlFor="FabricInput">Fabric</InputLabel>
                                                    <Select
                                                        label="Fabric"
                                                        {...field}
                                                        inputProps={{
                                                            name: 'fabric',
                                                            id: 'FabricInput',
                                                        }}
                                                    >
                                                        {
                                                            Object.keys(Fabric).map((key) => (
                                                                <MenuItem key={key} value={Fabric[key]}>{Fabric[key]}</MenuItem>
                                                            ))
                                                        }
                                                    </Select>
                                                </FormControl>
                                            )}
                                        </Field>
                                        <ErrorMessage name="fabric" component="div" className='error' />
                                    </div>
                                </div>
                                <div className={classes.thirdRow}>
                                    <div className={classes.selectColorsDiv}>
                                        <Field name="colors">
                                            {({ field, meta }: any) => ( // Added 'meta' for error handling
                                                <FormControl variant="outlined" fullWidth>
                                                    <InputLabel htmlFor="ColorsInput">Colors</InputLabel>
                                                    <Select
                                                        label="Colors"
                                                        {...field}
                                                        inputProps={{
                                                            name: 'colors',
                                                            id: 'ColorsInput',
                                                        }}
                                                        multiple
                                                    >
                                                        {Object.keys(Color).map((key) => (
                                                            <MenuItem key={key} value={Color[key]}>
                                                                {Color[key]}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            )}
                                        </Field>
                                        <ErrorMessage name="colors" component="div" className='error' />
                                    </div>
                                    <div className={classes.genderRadioDiv}>
                                        <FormControl>
                                            <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
                                            <RadioGroup
                                                aria-labelledby="demo-radio-buttons-group-label"
                                                defaultValue={ClothingGender.Male}
                                                name="radio-buttons-group"
                                            >
                                                {Object.keys(ClothingGender).map((key) => (<FormControlLabel value={ClothingGender[key]} control={<Radio />} label={ClothingGender[key]} />))}
                                            </RadioGroup>
                                        </FormControl>
                                    </div>
                                    <div className={classes.seasonRadioDiv}>
                                        <FormControl>
                                            <FormLabel id="demo-radio-buttons-group-label">Season</FormLabel>
                                            <RadioGroup
                                                aria-labelledby="demo-radio-buttons-group-label"
                                                defaultValue={Season.SpringSummer}
                                                name="radio-buttons-group"
                                            >
                                                {Object.keys(Season).map((key) => (<FormControlLabel value={Season[key]} control={<Radio />} label={Season[key]} />))}
                                            </RadioGroup>
                                        </FormControl>
                                    </div>
                                </div>
                                <div>
                                    <Field name="imageFile">
                                        {({ field }: any) => (
                                            // <FormControl>
                                            //     <input {...field} name='imageFile' type="file" accept="image/png, image/jpeg"/>
                                            // </FormControl>
                                            <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                                            Upload file
                                            <VisuallyHiddenInput  name="imageFile" {...field} type="file"  accept="image/png, image/jpeg" />
                                            {initialValues.imageFile}
                                          </Button>
                                        )}
                                    </Field>
                                    <ErrorMessage name="imageFile" component="div" className='error' />
                                </div>
                                <Button style={{ width: '50%', alignSelf: 'center' }} type='submit' variant="contained">submit</Button>
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
        dropZoneDiv: {},
        seasonRadioDiv: {
            width: '25%',
        },
        genderRadioDiv: {
            width: '25%',

        },
        selectColorsDiv: {
            width: '30%',
        },
        thirdRow: {
            display: 'flex',
            justifyContent: 'space-between',

        },
        secondRow: {
            display: 'flex',
            justifyContent: 'space-between',

        },
        selectCategoryDiv: {
            width: '50%',
        },
        selectFabricDiv: {
            width: '40%',
        },
        firstRow: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        priceDiv: {
            width: '20%'
        },
        nameDiv: {
            width: '65%',
        },
        formContainer: {
            width: '45%',
            margin: 'auto',
        },
        form: {},
    })
);
export default CreateProductPage;