import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import Api from './api';
import React, { useState } from 'react';
import axios from 'axios';
import useStateWithLocalStorage from './use-local-storage';

const PRINTER_COM1_BASEMENT = ['psc008', 'psc011'];
const PRINTER_COM1_TECH_SERVICES = ['psts', 'pstb', 'pstc'];
const PRINTER_OPTIONS = [...PRINTER_COM1_BASEMENT, ...PRINTER_COM1_TECH_SERVICES];

function PrintForm(): React.FC<null> {
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();

    const [submitting, setSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [password, setPassword] = useStateWithLocalStorage<string>('password');
    const [sunfireId, setSunfireId] = useStateWithLocalStorage<string>('sunfire_id');
    const [printer, setPrinter] = useStateWithLocalStorage<string>('printer');

    const setStatesForNewSubmission = () => {
        setSubmitting(true);
        setErrorMessage('');
        setSuccessMessage('');
    };
    const onSubmit = async (data: any) => {
        console.log(data);
        const formData = new FormData();
        formData.append('sunfire_id', data.sunfire_id);
        setSunfireId(data.sunfire_id);
        formData.append('password', data.password);
        setPassword(data.password);
        formData.append('printer', data.printer);
        setPrinter(data.printer);
        formData.append('side', data.side);
        formData.append('file', data.file[0]);
        setStatesForNewSubmission();

        axios({
            method: 'post',
            url: Api.printUrl(),
            data: formData,
        })
            .then((res) => {
                setSubmitting(false);
                setSuccessMessage(JSON.stringify(res.data));
            })
            .catch((error) => {
                if (error.response) {
                    // Request sent, but error code falls outside 2XX
                    setSubmitting(false);
                    setErrorMessage('Request failed: ' + error.response.data);
                } else if (error.request) {
                    // Request sent but no response received
                    setSubmitting(false);
                    setErrorMessage(
                        'Response not received.\n If sunfire connection is up, your credentials are likely to be incorrect.\n Otherwise, its likely a connection problem.\n Contents of request:' +
                            JSON.stringify(error.request),
                    );
                } else {
                    // Some other internal error, likely on client side
                    setErrorMessage('Client-side error, please contact admin.\n' + JSON.stringify(error.config));
                }
            });
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="sunfire_id">sunfire id</label>
                <input
                    {...register('sunfire_id', {
                        required: 'This is required',
                        maxLength: { value: 80, message: 'Max length of 80 characters' },
                        pattern: { value: /^[A-Za-z]+$/, message: 'Letters only' },
                    })}
                    defaultValue={sunfireId}
                    type="text"
                    disabled={submitting}
                />
                <ErrorMessage errors={errors} name="sunfire_id" as="span" />
                <div className="help">[sunfire_id]@comp.nus.edu.sg</div>
                <br />
                <label htmlFor="password">password</label>
                <input
                    {...register('password', {
                        required: 'This is required',
                        maxLength: { value: 80, message: 'Max length of 80 characters' },
                        pattern: { value: /^[\x00-\x7F]+$/, message: 'Only ASCII characters allowed' },
                    })}
                    defaultValue={password}
                    type="password"
                    disabled={submitting}
                />
                <ErrorMessage errors={errors} name="password" key="password" as="span" />
                <br />
                <label htmlFor="printer">printer</label>
                <select
                    {...register('printer', {
                        minLength: { value: 1, message: 'This is required' },
                        required: 'This is required',
                    })}
                    disabled={submitting}
                >
                    <option hidden disabled selected>
                        {printer}
                    </option>
                    {PRINTER_OPTIONS.map((value) => (
                        <option key={value} value={value}>
                            {value}
                        </option>
                    ))}
                </select>
                <ErrorMessage errors={errors} name="printer" as="span" />
                <div className="help">Basement: {PRINTER_COM1_BASEMENT.join(', ')}</div>
                <div className="help">Level 1: {PRINTER_COM1_TECH_SERVICES.join(', ')}</div>
                <br />
                <label htmlFor="side">side</label>
                <select
                    {...register('side', {
                        minLength: { value: 1, message: 'This is required' },
                        required: 'This is required',
                    })}
                    disabled={submitting}
                >
                    <option key="double-sided" value="-dx">
                        {' '}
                        double-sided{' '}
                    </option>
                    <option key="single-sided" value="-sx">
                        {' '}
                        single-sided{' '}
                    </option>
                </select>
                <ErrorMessage errors={errors} name="side" as="span" />
                <br />
                <label htmlFor="file">file</label>
                <input {...register('file', { required: 'Please upload a file' })} type="file" disabled={submitting} />
                <ErrorMessage errors={errors} name="file" as="span" />
                <br />
                <button className="submitButton" disabled={submitting}>
                    SUBMIT
                </button>
            </form>
            {errorMessage && <div className="error">{errorMessage}</div>}
            {successMessage && <div className="success">{successMessage}</div>}
        </>
    );
}

export default PrintForm;
