import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

const PostJob = () => {
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: 0,
    companyId: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { companies } = useSelector((store) => store.company);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const selectChangeHandler = (value) => {
    const selectedCompany = companies.find(
      (company) => company.name.toLowerCase() === value
    );
    setInput({ ...input, companyId: selectedCompany._id });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />

      <div style={styles.headerContainer}>
        <h1 style={styles.headerText}>📌 Post a New Job</h1>
      </div>
      <div style={styles.formContainer}>
        <form onSubmit={submitHandler} style={styles.form}>
          <div style={styles.gridContainer}>
            {[
              { label: "Title", name: "title" },
              { label: "Description", name: "description" },
              { label: "Requirements", name: "requirements" },
              { label: "Salary/Stipend", name: "salary" },
              { label: "Location", name: "location" },
              { label: "Job Type", name: "jobType" },
              { label: "Experience(in years)", name: "experience" },
              { label: "Number of Positions", name: "position", type: "number" },
            ].map((field, index) => (
              <div key={index}>
                <Label>{field.label}</Label>
                <Input
                  type={field.type || "text"}
                  name={field.name}
                  value={input[field.name]}
                  onChange={changeEventHandler}
                  style={styles.input}
                />
              </div>
            ))}

            {companies.length > 0 && (
              <Select onValueChange={selectChangeHandler}>
                <SelectTrigger style={styles.selectTrigger}>
                  <SelectValue placeholder="Select a Company" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {companies.map((company, index) => (
                      <SelectItem key={index} value={company?.name?.toLowerCase()}>
                        {company.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          </div>

          {loading ? (
            <Button style={styles.button}>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
            </Button>
          ) : (
            <Button type="submit" style={styles.button}>
              🚀 Post New Job
            </Button>
          )}

          {companies.length === 0 && (
            <p style={styles.warningText}>
              *Please register a company first before posting a job.
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default PostJob;

// CSS-in-JSX Styles
const styles = {
  headerContainer: {
    backgroundColor: "#FFD700", // Gold
    padding: "20px",
    marginTop: "70px",
    textAlign: "center",
    borderRadius: "6px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  },
  headerText: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#333",
  },
  formContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: "30px",
  },
  form: {
    padding: "30px",
    width: "100%",
    maxWidth: "800px",
    backgroundColor: "#FFF8DC",
    borderRadius: "8px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
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
  selectTrigger: {
    width: "100%",
    padding: "8px",
    borderRadius: "6px",
    backgroundColor: "#FFF4D1",
    border: "1px solid #C8A415",
    cursor: "pointer",
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
  },
  warningText: {
    textAlign: "center",
    color: "#D72638",
    fontWeight: "bold",
    marginTop: "10px",
  },
};
