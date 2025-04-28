import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import CompaniesTable from "./CompaniesTable";
import { useNavigate } from "react-router-dom";
import useGetAllCompanies from "@/hooks/useGetAllCompanies";
import { useDispatch } from "react-redux";
import { setSearchCompanyByText } from "@/redux/companySlice";

const Companies = () => {
  useGetAllCompanies();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchCompanyByText(input));
  }, [input]);

  return (
    <div>
      <Navbar />
      
      <div style={styles.searchContainer}>
        <Input
          placeholder="🔍 Filter by name..."
          onChange={(e) => setInput(e.target.value)}
          style={styles.input}
        />
        <Button onClick={() => navigate("/admin/companies/create")} style={styles.button}>
          ➕ New Company
        </Button>
      </div>

      <div style={styles.contentContainer}>
        <CompaniesTable />
      </div>
    </div>
  );
};

export default Companies;

// CSS-in-JSX Styles
const styles = {
  searchContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFD700", // Gold
    padding: "35px 30px",
    marginTop: "70px",
    borderRadius: "6px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  },
  input: {
    flex: 1,
    padding: "10px",
    fontSize: "16px",
    borderRadius: "6px",
    border: "1px solid #C8A415",
    backgroundColor: "#FFF4D1",
    outline: "none",
  },
  button: {
    marginLeft: "15px",
    backgroundColor: "#E1A800",
    color: "#fff",
    fontWeight: "bold",
    padding: "10px 18px",
    borderRadius: "6px",
    cursor: "pointer",
    border: "none",
    transition: "0.3s ease",
  },
  contentContainer: {
    maxWidth: "1100px",
    margin: "30px auto",
  },
};
