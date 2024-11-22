import Head from "next/head";
import styles from "@/styles/Home.module.css";
import SelicGrupo from "../../public/selic-logo/Selic-Grupo.jpg";
import styled from "styled-components";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Head>
        <title>Oráculo SELIC</title>
        <meta name="description" content="Aplicação para gestão de mensagens" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageContainer>
        <Title>Bem-vindo ao Oráculo Selic</Title>
        <ImageContainer>
          <StyledImage src={SelicGrupo} alt="Logo SELIC" priority />
        </ImageContainer>
        <Subtitle>Escolha uma opção no menu para começar.</Subtitle>
      </PageContainer>
    </>
  );
}

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-top: 20px;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 20px;
`;

const ImageContainer = styled.div`
  width: 100%;
  max-width: 1200px; /* Define o tamanho máximo da imagem */
  margin-bottom: 20px;
`;

const StyledImage = styled(Image)`
  width: 80%;
  height: auto; /* Mantém a proporção da imagem */
  border-radius: 12px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #555;
`;
