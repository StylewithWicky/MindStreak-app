// 📦 RegisterForm.jsx
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import '../Css/LoginForm.css'; // Reuse the same CSS

function RegisterForm({ onRegister }) {
  const handleSubmit = async (values, { setSubmitting, setErrors, resetForm }) => {
    try {
      const res = await axios.post('http://localhost:5000/auth/register', values);
      alert(res.data.message || 'Registration successful!');
      resetForm();
      onRegister(); // Optional callback to go to login or dashboard
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Registration failed';
      setErrors({ general: errorMsg });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="login-container">
      <h2>Register</h2>
      <Formik
        initialValues={{ username: '', email: '', password: '' }}
        validationSchema={Yup.object({
          username: Yup.string().required('Username required'),
          email: Yup.string().email('Invalid email').required('Required'),
          password: Yup.string().min(6, 'Min 6 characters').required('Required')
        })}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors }) => (
          <Form>
            <div>
              <label>Username:</label>
              <Field name="username" type="text" />
              <ErrorMessage name="username" component="div" />
            </div>
            <div>
              <label>Email:</label>
              <Field name="email" type="email" />
              <ErrorMessage name="email" component="div" />
            </div>
            <div>
              <label>Password:</label>
              <Field name="password" type="password" />
              <ErrorMessage name="password" component="div" />
            </div>
            {errors.general && <div className="error-msg">{errors.general}</div>}
            <button type="submit" disabled={isSubmitting}>Register</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default RegisterForm;
