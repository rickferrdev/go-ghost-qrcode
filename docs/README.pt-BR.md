# 👻 Go Ghost QRCode - Frontend

Uma interface de gerador de QR Code elegante, minimalista e privada, construída com **React 19**, **TypeScript** e **Tailwind CSS 4**. Este projeto serve como um estudo sobre a manipulação de dados binários (blobs) no navegador e a implementação de feedback de limite de taxa (rate-limiting) na UI.

## ✨ Funcionalidades

*   **Geração Instantânea**: Converta qualquer texto ou URL em uma imagem de QR Code de alta qualidade em milissegundos.
*   **Download Automático**: Aciona automaticamente o download do arquivo usando `file-saver` assim que o backend processa a requisição.
*   **Proteção contra Spam**: Salvaguardas de interface integradas, incluindo debouncing no botão e um período de espera (cooldown) de 2 segundos após cada geração.
*   **Privacidade em Primeiro Lugar**: Nenhum dado é armazenado; o texto é enviado para a API, convertido em PNG e entregue imediatamente a você.
*   **Design Responsivo**: Uma interface limpa e moderna estilizada com a versão mais recente do Tailwind CSS.

## 🛠️ Stack Tecnológica

*   **React 19**
*   **Vite** (Ferramenta de Build)
*   **TypeScript**
*   **Tailwind CSS 4**
*   **File-Saver**: Para manipulação de downloads de arquivos no lado do navegador.

## 🚀 Primeiros Passos

### Pré-requisitos

*   Node.js (LTS mais recente recomendado)
*   Uma instância em execução do **Go Ghost QRCode Backend**

### Instalação

1.  **Clonar o repositório**:
    ```bash
    git clone https://github.com/rickferrdev/go-ghost-qrcode
    cd page
    ```

2.  **Instalar dependências**:
    ```bash
    bun install
    ```

3.  **Configurar Variáveis de Ambiente**:
    Crie um arquivo `.env` no diretório raiz e adicione a URL da API do seu backend:
    ```env
    VITE_API_URL=http://localhost:8080/api/v1/qrcode
    ```

4.  **Executar Servidor de Desenvolvimento**:
    ```bash
    npm run dev
    ```

## 📂 Estrutura do Projeto

*   `src/App.tsx`: Lógica principal da aplicação, incluindo chamadas de fetch e gerenciamento de estado.
*   `src/index.css`: Ponto de entrada para as diretivas do Tailwind CSS 4.
*   `vite.config.ts`: Configuração do Vite e do plugin Tailwind CSS.

---

> **Nota**: Este é um projeto de estudo. A interface inclui um tratamento específico para códigos de status `429 Too Many Requests` para demonstrar o tratamento gracioso de erros para limites de taxa da API.
