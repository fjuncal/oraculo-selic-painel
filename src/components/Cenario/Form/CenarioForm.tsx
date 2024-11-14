import { getCamposParaCodigoMensagem } from "@/assets/config-form/configHelper";
import { FormularioConfig } from "@/assets/formulariosConfig";
import { salvarCenario } from "@/services/cenarioService";
import { generatePositionalString } from "@/utils/generatePositionalString";
import { useState } from "react";
import { mensagemConfig } from "../../../assets/mensagemConfig";
import { generateXML } from "../../../utils/generateXML";
import CenarioFormField from "./CenarioFormField";
import Modal from "./Modal";
import {
  BotaoVisualizar,
  ButtonContainer,
  CustomSelect,
  FieldsContainer,
  FixedFieldsContainer,
  FormContainer,
  Header,
  InputWrapper,
  Label,
  MensagemErroCampoObrigatorio,
  PageContainer,
  Sector,
  SectorTitle,
  Select,
  SelectWrapper,
  StyledInput,
  SubmitButton,
  TextArea,
  Title,
  VisualizeButton,
} from "./styles";
import { Alert, Snackbar } from "@mui/material";

export default function CenarioForm() {
  const [codigoMensagem, setCodigoMensagem] = useState<string>("");
  const [formData, setFormData] = useState<{ [key: string]: any }>({});
  const [descricao, setDescricao] = useState<string>("");
  const [tipoCenario, setTipoCenario] = useState<string>("");
  const [canal, setCanal] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: boolean }>({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    const parsedValue = type === "number" ? parseFloat(value) : value; // Converte para número se for do tipo number
    setFormData((prevData) => ({ ...prevData, [name]: parsedValue }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: false }));
  };

  const handleCodigoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCodigoMensagem(e.target.value);
    setFormData({});
    setErrors({});
  };

  const handleCanalChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCanal(e.target.value);
  };

  const validateFields = () => {
    const newErrors: { [key: string]: boolean } = {};
    // Verifica se os campos obrigatórios estão preenchidos
    if (!descricao) newErrors.descricao = true;
    if (!tipoCenario) newErrors.tipoCenario = true;
    if (!canal) newErrors.canal = true;

    const campos = getCamposParaCodigoMensagem(
      codigoMensagem as keyof typeof mensagemConfig
    );

    // Valida os campos específicos com base na configuração
    Object.entries(campos || {}).forEach(([sector, fields]) => {
      if (Array.isArray(fields)) {
        (fields as FormularioConfig[]).forEach((field) => {
          if (field?.required && !formData[field.name]) {
            newErrors[field.name] = true;
          }
        });
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateFields()) {
      const xmlContent =
        canal === "MENSAGERIA" ? generateXML(formData, codigoMensagem) : null;
      const stringSelicContent =
        canal === "IOS"
          ? generatePositionalString(formData, codigoMensagem)
          : null;

      const cenarioData = {
        descricao,
        tipoCenario,
        canal,
        codigoMsg: codigoMensagem,
        ...formData, // Inclui os campos dinâmicos do formulário
        XML: xmlContent,
        stringSelic: stringSelicContent,
      };

      try {
        const result = await salvarCenario(cenarioData);
        setSnackbarMessage("Cenário cadastrado com sucesso!");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
        setDescricao("");
        setTipoCenario("");
        setCanal("");
        setCodigoMensagem("");
        setFormData({});
        setErrors({});
      } catch (error) {
        setSnackbarMessage("Erro ao cadastrar cenário.");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      }
    } else {
      setSnackbarMessage("Campos obrigatórios precisam ser preenchidos.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleVisualizeClick = () => {
    let title = "";
    let content = "";
    console.log("Dados do formData:", formData);
    if (canal === "MENSAGERIA") {
      title = "Visualizar XML";
      content = generateXML(formData, codigoMensagem);
    } else {
      title = "Visualizar String SELIC";
      content = generatePositionalString(formData, codigoMensagem);
    }

    setModalTitle(title);
    setModalContent(content);
    setIsModalOpen(true);
  };

  const campos =
    codigoMensagem in mensagemConfig
      ? getCamposParaCodigoMensagem(
          codigoMensagem as keyof typeof mensagemConfig
        )
      : null;

  return (
    <PageContainer>
      <Header>
        <Title>Cadastrar Cenário</Title>
      </Header>
      <FixedFieldsContainer>
        <InputWrapper>
          <Label>Descrição do Cenário:</Label>
          <TextArea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            placeholder="Digite uma descrição para o cenário"
            required
            className={errors.descricao ? "erro" : ""}
          />
          {errors.descricao && (
            <MensagemErroCampoObrigatorio>
              Campo obrigatório
            </MensagemErroCampoObrigatorio>
          )}
        </InputWrapper>

        <InputWrapper>
          <Label>Tipo de Cenário:</Label>
          <StyledInput
            type="text"
            value={tipoCenario}
            onChange={(e) => setTipoCenario(e.target.value)}
            placeholder="Digite o tipo de cenário"
            required
            className={errors.descricao ? "erro" : ""}
          />
          {errors.tipoCenario && (
            <MensagemErroCampoObrigatorio>
              Campo obrigatório
            </MensagemErroCampoObrigatorio>
          )}
        </InputWrapper>

        <InputWrapper>
          <Label>Canal:</Label>
          <Select
            value={canal}
            onChange={handleCanalChange}
            required
            className={errors.descricao ? "erro" : ""}
          >
            <option value="">Selecione o Canal</option>
            <option value="MENSAGERIA">Mensageria</option>
            <option value="IOS">IOS</option>
          </Select>
          {errors.canal && (
            <MensagemErroCampoObrigatorio>
              Campo obrigatório
            </MensagemErroCampoObrigatorio>
          )}
        </InputWrapper>
      </FixedFieldsContainer>
      <SelectWrapper>
        <Label>Código da Mensagem:</Label>
        <CustomSelect value={codigoMensagem} onChange={handleCodigoChange}>
          <option value="">Selecione</option>
          {Object.keys(mensagemConfig).map((key) => (
            <option key={key} value={key}>
              {key}
            </option>
          ))}
        </CustomSelect>
      </SelectWrapper>
      <BotaoVisualizar>
        {canal && (
          <VisualizeButton onClick={handleVisualizeClick}>
            {canal === "MENSAGERIA"
              ? "Visualizar XML"
              : "Visualizar String SELIC"}
          </VisualizeButton>
        )}
      </BotaoVisualizar>
      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalTitle}
        content={modalContent}
      />
      {campos && (
        <FormContainer>
          {/* Renderiza dinamicamente os setores com base no arquivo de configuração */}
          {Object.entries(campos).map(([sector, fields]) => (
            <Sector key={sector}>
              <SectorTitle>{sector}</SectorTitle>
              <FieldsContainer>
                {(fields as FormularioConfig[])
                  .filter(
                    (
                      field: FormularioConfig | undefined
                    ): field is FormularioConfig => field !== undefined
                  )
                  .map((field: FormularioConfig) => (
                    <CenarioFormField
                      key={field.name}
                      field={field}
                      value={formData[field.name] || ""}
                      onChange={handleInputChange}
                      error={!!errors[field.name]}
                    />
                  ))}
              </FieldsContainer>
            </Sector>
          ))}
        </FormContainer>
      )}
      {codigoMensagem && (
        <ButtonContainer>
          <SubmitButton onClick={handleFormSubmit}>Salvar Cenário</SubmitButton>
        </ButtonContainer>
      )}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </PageContainer>
  );
}
