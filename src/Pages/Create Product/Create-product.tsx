import React, { FC, useState } from 'react';
import Box from '@mui/material/Box';
import SideNav from '../../Components/sidenav/Side-nav';
import DirectoryHeader from '@/Components/Ui Comps/Directory-header';
import { makeStyles, createStyles } from '@mui/styles';
import { CreateProductValidationSchema } from '@/Utils/Validation-schemas';
import { CreateProductDto, CreateProductForm } from './Create-product-dto';
import { Button, FormControl, InputLabel, TextField, IconButton, InputAdornment, OutlinedInput, Typography, Divider, Select, MenuItem, FormControlLabel, FormLabel, Input } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import { toast } from 'react-toastify';
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
    const classes = useStyles();
    const [isLoading,setIsLoading] = useState(false);
    const [buttonTitle, setButtonTitle] = useState("Create Product");
    const initialValues = { name: '', price: 0, colors: [], season: Season.SpringSummer, gender: ClothingGender.Male, fabric: '', category: '' }
    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({ maxFiles: 1, accept: { 'image/png': ['.png'], 'image/jpeg': [], 'image/jpg': [], },maxSize:3 * 1024 * 1024 })
    const handleSubmit = async (values: CreateProductForm, { setSubmitting }) => {
        //TODO: add image to s3 and add item to collection
        if (acceptedFiles.length == 0) {
            alert("Please select an image");
            return;
        }
        setIsLoading(true)
        setButtonTitle('Uploading Image to S3...')
        const { imageUrl } = await uploadFile();
        const dto: CreateProductDto = {
            category: values.category,
            name: values.name,
            price: values.price,
            imageSource: imageUrl,
            fabric: values.fabric,
            gender: values.gender,
            season: values.season,
            colors: values.colors
        }
        setButtonTitle('Saving new Product...')
         const result:boolean = await createProduct(dto);
        setIsLoading(false)
        if(result)
        {

        }
        setButtonTitle(result?'Created Successfully':'Failed TO Create')
        setSubmitting(false);
        setTimeout(() => {
            setButtonTitle('Create Product')
            }, 3000);
    }
    const createProduct = async (dto: CreateProductDto) => {
        const reqBody = {
            ...dto
        };

        try {
            const response = await axios.post('https://scan-and-go.onrender.com/items/create', reqBody);
            console.log(response.data);
            return response.status == 201; 
        } catch (error:any) {
           console.log(error.message);
           return false
            
        }
    }
    const dropzoneInitText = (
        <div className={classes.dropzoneInitText} >
            <CloudUploadIcon sx={{ width: 80, height: 80, color: 'lightskyblue',marginRight:5 }} />
            <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
                <h4>Drag and drop your image here</h4>
                <p style={{color:'GrayText',fontSize:14}}>JPG,JPEG,PNG size no more than 3MB</p>
            </div>
        </div>
    )
    const uploadFile = async (): Promise<string> => {
        if (acceptedFiles.length == 0) {
            alert("Please select an image");
            return '';
        }
        const formData = new FormData();
        formData.append('file', acceptedFiles[0])
        try {
            const response = await axios.post('https://scan-and-go.onrender.com/items/uploadFile', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log('File uploaded successfully:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error uploading file:', error);
            return ''
        }
    }
    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <SideNav header='Create Product' />
                <Box component="main" sx={{ flexGrow: 1, p: 6,marginTop:5 }}>
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
                                                        name='name'
                                                    />
                                                </FormControl>
                                            )}
                                        </Field>
                                        <ErrorMessage name="name" component="div" className={classes.error} />
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
                                        <ErrorMessage name="price" component="div" className={classes.error} />
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
                                        <ErrorMessage name="category" component="div" className={classes.error} />
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
                                        <ErrorMessage name="fabric" component="div" className={classes.error} />
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
                                        <ErrorMessage name="colors" component="div" className={classes.error} />
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
                                    <div {...getRootProps({ className: 'dropzone' })} className={classes.dropZoneDiv}>
                                        <input {...getInputProps()} />
                                        {acceptedFiles.length > 0 ? <p>{acceptedFiles[0].name}</p> : (dropzoneInitText)}
                                    </div>
                                </div><br />
                                <LoadingButton
                                    color="primary"
                                    type='submit'
                                    loading={isLoading}
                                    loadingPosition="start"
                                    startIcon={<SaveIcon />}
                                    variant='contained'
                                >
                                    <span>{buttonTitle}</span>
                                </LoadingButton>
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
        error: {
            color: 'red',
        },
        dropzoneInitText: {
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
        },
        dropZoneDiv: {
            border: '2px dashed lightgray',
            borderRadius: '20px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            minHeight: '100px',
            cursor: 'pointer',
            backgroundColor: 'white',
            outline: 'none',
            transition: 'border 0.24s ease-in-out',

        },
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
            marginBottom: 25,

        },
        secondRow: {
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: 25,


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
            marginBottom: 25,

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