import styled from "styled-components";

export const BotaoVisualizar = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 8px;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

export const Title = styled.h2`
  color: #4f46e5;
  font-size: 2rem;
  margin: 0;
`;

export const VisualizeButton = styled.button`
  padding: 8px 16px;
  background-color: #4f46e5;
  color: #fff;
  font-size: 0.9rem;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-left: auto;

  &:hover {
    background-color: #3730a3;
  }
`;

export const PageContainer = styled.div`
  padding: 20px;
  background-color: #f9fafb;
`;

export const FixedFieldsContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-bottom: 15px;
`;

export const Label = styled.label`
  font-size: 1.1rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 8px;
`;

export const TextArea = styled.textarea`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  background-color: #ffffff;
  resize: vertical;
  min-height: 40px; /* Controla a altura mínima */
  max-height: 120px; /* Controla a altura máxima */
  &:focus {
    border-color: #4f46e5;
    outline: none;
  }
  &.erro {
    border-color: red;
  }
`;

export const Select = styled.select`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  background-color: #ffffff;
  &:focus {
    border-color: #4f46e5;
    outline: none;
  }
  &.erro {
    border-color: red;
  }
`;

export const SelectWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 40px;
`;

export const CustomSelect = styled.select`
  padding: 10px 15px;
  font-size: 1rem;
  font-weight: bold;
  color: #4f46e5;
  border: 2px solid #4f46e5;
  border-radius: 8px;
  background-color: #ffffff;
  cursor: pointer;
  transition: border-color 0.3s ease;
  appearance: none;

  &:hover {
    border-color: #3730a3;
  }

  &:focus {
    outline: none;
    border-color: #4f46e5;
    box-shadow: 0 0 5px rgba(79, 70, 229, 0.5);
  }
`;

export const FormContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

export const Sector = styled.div`
  flex: 1 1 48%; /* Ocupa 48% da largura para permitir dois setores lado a lado */
  max-width: 48%; /* Limita a largura máxima do setor a 48% */
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.05);
  margin-bottom: 20px;

  /* Alinha o setor no centro se houver apenas um setor na linha */
  &:only-child {
    margin-left: auto;
    margin-right: auto;
  }
`;
export const SectorTitle = styled.h3`
  color: #4f46e5;
  font-size: 1.5rem;
  margin-bottom: 15px;
`;

export const FieldsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px; /* Espaçamento entre os campos */

  /* Define que cada campo ocupe 100% da largura em telas pequenas */
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;
export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end; /* Alinha o conteúdo (botão) à direita */
  margin-top: 16px;
`;

export const SubmitButton = styled.button`
  padding: 12px;
  border: none;
  border-radius: 8px;
  background-color: #4f46e5;
  color: #ffffff;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #3730a3;
  }
`;

export const ErrorMessage = styled.span`
  color: red;
  font-size: 0.8rem;
  margin-top: 5px;
`;

export const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%; /* Faz com que cada campo ocupe a largura total do container */

  /* Define o comportamento responsivo para exibir lado a lado em telas maiores */
  @media (min-width: 768px) {
    width: 48%; /* Define a largura para caber dois campos por linha */
  }
`;
export const Input = styled.input`
  padding: 6px 10px; /* Reduz o padding para tornar o campo menor */
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 0.9rem; /* Diminui o tamanho da fonte */
  background-color: #f9f9f9;
  color: #333;
  margin-top: 5px;
  transition: border-color 0.2s;

  &:focus {
    border-color: #4f46e5;
    outline: none;
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background: #ffffff;
  border-radius: 8px;
  width: 80%;
  max-width: 600px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
`;

export const ModalTitle = styled.h2`
  font-size: 1.25rem;
  color: #4f46e5;
  margin: 0;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #4f46e5;
  cursor: pointer;
`;

export const ModalBody = styled.div`
  padding-top: 20px;
  font-family: monospace;
`;
export const StyledInput = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.3s;

  &:focus {
    border-color: #4f46e5;
    outline: none;
  }
  &.erro {
    border-color: red;
  }
`;

export const MensagemErroCampoObrigatorio = styled.span`
  margin: 4px;
  font-size: 0.8rem;
  color: red;
`;
