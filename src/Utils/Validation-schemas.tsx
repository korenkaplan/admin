import * as Yup from 'yup';
export const LoginValidationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  });
export const CreateProductValidationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    price: Yup.number().min(0,'Price can\'t be lower the 0').required('Price is required'),
    category: Yup.string().required('Category is required'),
    fabric: Yup.string().required('Fabric is required'),
    gender: Yup.string().required('Gender is required'),
    season: Yup.string().required('Season is required'),
    colors: Yup.array().min(1, 'At least one color is required').required('Colors are required'),
  });