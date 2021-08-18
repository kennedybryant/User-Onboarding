import * as yup from 'yup';

const formSchema = yup.object().shape({
    name: yup  
        .string()
        .trim()
        .required('Name is required')
        .min(3, 'Name must be at least 3 characters long'),
    email: yup
        .string()
        .trim()
        .email('Must be a valid email address')
        .required('Email is required'),
    password: yup
        .string()
        .trim()
        .required('Password is required')
        .min(3, 'Password must be at least 3 characters long'),
    terms: yup
        .boolean()
        .oneOf([true], 'You must accept Terms and Conditions')
})

export default formSchema