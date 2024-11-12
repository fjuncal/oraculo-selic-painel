import { useRouter } from "next/router";
import styled from "styled-components";

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  return (
    <AppContainer>
      <Sidebar>
        <NavItem onClick={() => router.push("/")}>Início</NavItem>
        <NavItem onClick={() => router.push("/mensagens")}>Mensagens</NavItem>
        <NavItem onClick={() => router.push("/status")}>
          Status de Processamento
        </NavItem>
      </Sidebar>
      <ContentContainer>{children}</ContentContainer>
    </AppContainer>
  );
}

const AppContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
`;

const Sidebar = styled.div`
  width: 250px;
  background-color: #4f46e5;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const NavItem = styled.button`
  background: none;
  border: none;
  color: #ffffff;
  font-size: 1rem;
  margin: 10px 0;
  text-align: left;
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover {
    color: #ddd;
  }
`;

const ContentContainer = styled.div`
  flex-grow: 1;
  background-color: #f9fafb;
  padding: 20px;
  overflow-y: auto;
`;
