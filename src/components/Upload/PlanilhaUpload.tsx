import { useState } from "react";
import { FiUpload } from "react-icons/fi";
import styled from "styled-components";

interface PlanilhaUploadProps {
  onUpload: (file: File) => void;
}

export default function PlanilhaUpload({ onUpload }: PlanilhaUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      if (!file.name.endsWith(".xls") && !file.name.endsWith(".xlsx")) {
        setError("Por favor, selecione um arquivo válido (.xls ou .xlsx).");
        setSelectedFile(null);
        return;
      }
      setSelectedFile(file);
      setError(null);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      onUpload(selectedFile);
    }
  };

  return (
    <UploadContainer>
      <InputContainer>
        <input
          type="file"
          id="file-input"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
        <label htmlFor="file-input">
          <FiUpload size={24} />
          {selectedFile ? selectedFile.name : "Selecionar arquivo"}
        </label>
      </InputContainer>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <UploadButton onClick={handleUpload} disabled={!selectedFile}>
        Enviar Planilha
      </UploadButton>
    </UploadContainer>
  );
}

const UploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  margin-top: 20px;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;

  label {
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 16px;
    border: 2px dashed #4f46e5;
    border-radius: 8px;
    background-color: #f9fafb;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: #eef2ff;
    }
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.85rem;
`;

const UploadButton = styled.button`
  padding: 10px 16px;
  background-color: #4f46e5;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  &:hover:enabled {
    background-color: #3730a3;
  }
`;
