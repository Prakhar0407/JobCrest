import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Button } from '../ui/button';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import axios from 'axios';
import { COMPANY_API_END_POINT } from '@/utils/constant';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';
import useGetCompanyById from '@/hooks/useGetCompanyById';

const CompanySetup = () => {
    const params = useParams();
    useGetCompanyById(params.id);
    const [input, setInput] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
        file: null
    });
    const { singleCompany } = useSelector(store => store.company);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const changeFileHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", input.name);
        formData.append("description", input.description);
        formData.append("website", input.website);
        formData.append("location", input.location);
        if (input.file) {
            formData.append("file", input.file);
        }
        try {
            setLoading(true);
            const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/companies");
            }
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setInput({
            name: singleCompany.name || "",
            description: singleCompany.description || "",
            website: singleCompany.website || "",
            location: singleCompany.location || "",
            file: singleCompany.file || null
        });
    }, [singleCompany]);

    return (
        <div>
            <Navbar />
            <div style={styles.container}>
                <form onSubmit={submitHandler} style={styles.form}>
                    <div style={styles.headerContainer}>
                        <Button onClick={() => navigate("/admin/companies")} variant="outline" style={styles.backButton}>
                            <ArrowLeft />
                            <span>Back</span>
                        </Button>
                        <h1 style={styles.headerText}>🏢 Company Setup</h1>
                    </div>
                    <div style={styles.gridContainer}>
                        {[
                            { label: "Company Name", name: "name" },
                            { label: "Description", name: "description" },
                            { label: "Website", name: "website" },
                            { label: "Location", name: "location" },
                        ].map((field, index) => (
                            <div key={index}>
                                <Label>{field.label}</Label>
                                <Input type="text" name={field.name} value={input[field.name]} onChange={changeEventHandler} style={styles.input} />
                            </div>
                        ))}
                        <div>
                            <Label>Logo</Label>
                            <Input type="file" accept="image/*" onChange={changeFileHandler} style={styles.fileInput} />
                        </div>
                    </div>
                    {
                        loading ? <Button style={styles.button}><Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </Button> : <Button type="submit" style={styles.button}>Update</Button>
                    }
                </form>
            </div>
        </div>
    );
};

export default CompanySetup;

const styles = {
    container: {
        display: "flex",
        justifyContent: "center",
        marginTop: "80px",
    },
    form: {
        padding: "30px",
        width: "100%",
        maxWidth: "600px",
        backgroundColor: "#FFF8DC",
        borderRadius: "8px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    },
    headerContainer: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
        marginBottom: "20px",
        backgroundColor: "#FFD700",
        padding: "15px",
        borderRadius: "6px",
    },
    headerText: {
        fontSize: "20px",
        fontWeight: "bold",
    },
    backButton: {
        display: "flex",
        alignItems: "center",
        gap: "5px",
        color: "#555",
        fontWeight: "bold",
        border: "1px solid #C8A415",
        borderRadius: "6px",
        padding: "8px 12px",
    },
    gridContainer: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "15px",
    },
    input: {
        width: "100%",
        padding: "8px",
        fontSize: "16px",
        borderRadius: "6px",
        border: "1px solid #C8A415",
        backgroundColor: "#FFF4D1",
        outline: "none",
    },
    fileInput: {
        width: "100%",
        padding: "8px",
        borderRadius: "6px",
        backgroundColor: "#FFF4D1",
        border: "1px solid #C8A415",
    },
    button: {
        width: "100%",
        marginTop: "20px",
        backgroundColor: "#E1A800",
        color: "#fff",
        fontWeight: "bold",
        padding: "12px",
        borderRadius: "6px",
        cursor: "pointer",
        border: "none",
        transition: "0.3s ease",
    }
};
