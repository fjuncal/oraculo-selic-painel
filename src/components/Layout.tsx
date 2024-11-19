import { useRouter } from "next/router";
import styled from "styled-components";
import {
  FiMenu,
  FiHome,
  FiMessageSquare,
  FiActivity,
  FiFile,
  FiChevronDown,
  FiFileText,
} from "react-icons/fi";
import Image from "next/image";
import { useState } from "react";
import logoSelic from "../../public/selic-logo/selic-logo.png";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpenCenario, setIsDropdownOpenCenario] = useState(false);
  const [isDropdownOpenPassoTeste, setIsDropdownOpenPassoTeste] =
    useState(false);

  const router = useRouter();
  return (
    <AppContainer>
      <TopBar>
        <LogoContainer onClick={() => router.push("/")}>
          <StyledImage src={logoSelic} alt="Logo SELIC" priority />
        </LogoContainer>
        <NavLinks>
          <NavItem onClick={() => router.push("/")}>
            <FiHome size={20} />
            <span>Início</span>
          </NavItem>

          {/* Dropdown para Cenários */}
          <DropdownContainer
            onMouseEnter={() => setIsDropdownOpenCenario(true)}
            onMouseLeave={() => setIsDropdownOpenCenario(false)}
          >
            <NavItem>
              <FiFileText size={20} />
              <span>Cenário</span>
              <FiChevronDown size={16} style={{ marginLeft: "5px" }} />
            </NavItem>
            {isDropdownOpenCenario && (
              <DropdownMenu>
                <DropdownItem onClick={() => router.push("/cenarios/criar")}>
                  Criar
                </DropdownItem>
                <DropdownItem
                  onClick={() => router.push("/cenarios/relacionar")}
                >
                  Relacionar
                </DropdownItem>
              </DropdownMenu>
            )}
          </DropdownContainer>

          {/* Dropdown para Passo Teste */}
          <DropdownContainer
            onMouseEnter={() => setIsDropdownOpenPassoTeste(true)}
            onMouseLeave={() => setIsDropdownOpenPassoTeste(false)}
          >
            <NavItem>
              <FiFile size={20} />
              <span>Passo Teste</span>
              <FiChevronDown size={16} style={{ marginLeft: "5px" }} />
            </NavItem>
            {isDropdownOpenPassoTeste && (
              <DropdownMenu>
                <DropdownItem
                  onClick={() => router.push("/passo-teste/cadastrar")}
                >
                  Cadastrar
                </DropdownItem>
                <DropdownItem
                  onClick={() => router.push("/passo-teste/consultar")}
                >
                  Consultar
                </DropdownItem>
              </DropdownMenu>
            )}
          </DropdownContainer>

          <NavItem onClick={() => router.push("/mensagens")}>
            <FiMessageSquare size={20} />
            <span>Mensagens</span>
          </NavItem>
        </NavLinks>

        <HamburgerMenu onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <FiMenu size={24} />
        </HamburgerMenu>
      </TopBar>

      {isMenuOpen && (
        <MobileMenu>
          <MobileNavItem onClick={() => router.push("/")}>Início</MobileNavItem>
          <MobileNavItem onClick={() => router.push("/mensagens")}>
            Mensagens
          </MobileNavItem>
          <MobileNavItem onClick={() => router.push("/status")}>
            Status
          </MobileNavItem>
          <MobileNavItem onClick={() => router.push("/passo-teste/cadastrar")}>
            Cadastrar Passos Testes
          </MobileNavItem>
          <MobileNavItem onClick={() => router.push("/passo-teste/consultar")}>
            Consultar Passos Testes
          </MobileNavItem>
          <MobileNavItem onClick={() => router.push("/cenarios/criar")}>
            Criar Cenários
          </MobileNavItem>
          <MobileNavItem onClick={() => router.push("/cenarios/relacionar")}>
            Relacionar Cenários
          </MobileNavItem>
        </MobileMenu>
      )}
      <ContentContainer>{children}</ContentContainer>
    </AppContainer>
  );
}

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const TopBar = styled.div`
  width: 100%;
  height: 60px;
  background-color: #4f46e5;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 15px 10px 0px;
  position: relative;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const StyledImage = styled(Image)`
  width: 270px;
  height: auto;
  max-height: 270px;
  margin-right: 8px;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 20px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavItem = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    color: #ddd;
  }

  & span {
    font-weight: normal;
  }
`;

// Dropdown components
const DropdownContainer = styled.div`
  position: relative;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  padding: 5px 0;
  z-index: 1000;
`;

const DropdownItem = styled.div`
  padding: 8px 16px;
  cursor: pointer;
  font-size: 0.9rem;
  color: #333;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const HamburgerMenu = styled.div`
  display: none;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileMenu = styled.div`
  background-color: #4f46e5;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  padding: 10px;
  position: absolute;
  top: 60px;
  left: 0;
  width: 100%;
  z-index: 1000;
`;

const MobileNavItem = styled.div`
  padding: 10px 20px;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background-color: #3730a3;
  }
`;

const ContentContainer = styled.div`
  flex-grow: 1;
  background-color: #f9fafb;
  padding: 20px;
  overflow-y: auto;
`;
