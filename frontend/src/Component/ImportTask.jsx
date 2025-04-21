import React, { useState } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { toast } from 'react-hot-toast';
import axiosInstance from '../lib/axios';


const ImportTask = ({ setRefreh }) => {
  const [sheetUrl, setSheetUrl] = useState("");

  const handleImport = async(e) => {
    try {
      console.log(`sheeturl`, sheetUrl);
          const response = await axiosInstance.post(`/taskroutes/importdata`, {sheetUrl: sheetUrl});
          
          if (response.status === 200) {
            toast.success(response.data.message);
            setRefreh((prev) => !prev);
          }
        } catch (error) {
          toast.error(error.response?.data?.message || 'Failed to import');
        }

  };

  return (
    <Form className="mb-4">
      <Form.Label>Import Tasks from Google Sheet</Form.Label>
      <InputGroup>
        <Form.Control
          type="text"
          placeholder="Enter Google Sheet URL"
          value={sheetUrl}
          onChange={(e) => setSheetUrl(e.target.value)}
        />
        <Button variant="success" onClick={handleImport}>
          Import
        </Button>
      </InputGroup>
    </Form>
  );
};

export default ImportTask;
  