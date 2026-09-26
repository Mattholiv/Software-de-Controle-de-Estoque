# Controle de Estoque

Prints do projeto: https://drive.google.com/drive/folders/1tAiyUjCDXk1640YA-HJGRwa3SydnqHHZ

Instruções rápidas para rodar o projeto em ambiente de desenvolvimento.

Backend (Python/Flask):

1. Criar e ativar virtualenv (Windows PowerShell):

```powershell
python -m venv venv
.\venv\Scripts\Activate.ps1
```

2. Instalar dependências e rodar:

```powershell
pip install -r "Back-end/requirements.txt"
cd "Back-end"
python server.py
```

O backend ficará disponível em `http://localhost:5000`.

Frontend (Vite + React + TypeScript):

1. No diretório `Front-end` execute:

```powershell
cd "Front-end"
npm install
npm run dev
```

Por padrão o Vite serve em `http://localhost:5173`.

Observações:
- O frontend faz requisições para `http://localhost:5000/products`.
- Em desenvolvimento o `CORS` está aberto. Para produção restrinja as origens.
