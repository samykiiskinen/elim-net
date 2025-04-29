import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import axios from "axios";
import { ProjectFormProps } from "../../types/interfaces";

const ProjectForm: React.FC<ProjectFormProps> = ({ onClose }) => {
  const [verification, setVerification] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [accountNo, setAccountNo] = useState<string>("");
  const [accountName, setAccountName] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [receiver, setReceiver] = useState<string>("");
  const [purpose, setPurpose] = useState<string>("");
  const [decision, setDecision] = useState<string>("");
  const [income, setIncome] = useState<string>("");
  const [payment, setPayment] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const newProject = {
      verification,
      date,
      accountNo,
      accountName,
      country,
      receiver,
      purpose,
      decision,
      income,
      payment,
    };

    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.post(
        "https://localhost:44343/api/AidProjects",
        newProject,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Project added:", response.data);
      setVerification("");
      setDate("");
      setAccountNo("");
      setAccountName("");
      setCountry("");
      setReceiver("");
      setPurpose("");
      setDecision("");
      setIncome("");
      setPayment("");
      onClose();
    } catch (error) {
      console.error("There was an error adding the project: ", error);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, margin: "auto" }}>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Verifikation"
          variant="outlined"
          value={verification}
          onChange={(e) => setVerification(e.target.value)}
          required
          margin="normal"
        />
        <TextField
          fullWidth
          label="Datum"
          variant="outlined"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          margin="normal"
        />
        <TextField
          fullWidth
          label="Kontonummer"
          variant="outlined"
          value={accountNo}
          onChange={(e) => setAccountNo(e.target.value)}
          required
          margin="normal"
        />
        <TextField
          fullWidth
          label="Konto"
          variant="outlined"
          value={accountName}
          onChange={(e) => setAccountName(e.target.value)}
          required
          margin="normal"
        />
        <TextField
          fullWidth
          label="Land"
          variant="outlined"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          required
          margin="normal"
        />
        <TextField
          fullWidth
          label="Mottagare"
          variant="outlined"
          value={receiver}
          onChange={(e) => setReceiver(e.target.value)}
          required
          margin="normal"
        />
        <TextField
          fullWidth
          label="Ändamål"
          variant="outlined"
          value={purpose}
          onChange={(e) => setPurpose(e.target.value)}
          required
          margin="normal"
        />
        <TextField
          fullWidth
          label="Beslut"
          variant="outlined"
          value={decision}
          onChange={(e) => setDecision(e.target.value)}
          required
          margin="normal"
        />
        <TextField
          fullWidth
          label="Insättning"
          variant="outlined"
          value={income}
          onChange={(e) => setIncome(e.target.value)}
          required
          margin="normal"
        />
        <TextField
          fullWidth
          label="Utbetalning"
          variant="outlined"
          value={payment}
          onChange={(e) => setPayment(e.target.value)}
          required
          margin="normal"
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          sx={{ fontSize: "medium", marginTop: "0.5rem" }}
        >
          LÄGG TILL
        </Button>
      </form>
    </Box>
  );
};

export default ProjectForm;
