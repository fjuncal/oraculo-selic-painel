import styled from "styled-components";

export const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
`;

export const Select = styled.select`
  width: 100%;
  padding: 8px;
  margin-bottom: 16px;
`;

export const PassosTestesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const PassoTesteItem = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const RelateButton = styled.button`
  margin-top: 16px;
  padding: 10px 16px;
  background-color: #34d399;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;
