# Apresentação Motor V6 em 3D para Conexão 2026 CEEP

Projeto interativo criado para a feira conexão do CEEP de 2026. O objetivo é explicar de forma visual as peças de um motor V6.

## Como o código foi feito:
- **HTML/CSS/JS raiz**: A base da internet, eles juntos conseguem fazer a análise completa da biblioteca 3D, identificar os toques e colocar os textos na tela.
- **Three.js**: Biblioteca responsável por renderizar a malha 3D e lidar com os cliques.

## Estrutura dos Arquivos
* `index.html`: A base do site.
* `style.css`: O design, principalmente o fundo.
* `script.js`: Onde é feita a lógica, reconhecimento de interações e carregamento do modelo 3D.
* `motor_leve.glb`: Arquivo 3D comprimido.

## Como testar

**Acessando online (GitHub Pages):**
O projeto tá no ar e pronto pra apresentação aqui: [Link do Projeto](https://joaomarceloguastala09.github.io/PATOASSADOEBOM/)

**Rodando no seu PC:**
Se baixar os arquivos, não tente abrir o `index.html` diretamento no explorar do Windows porque o navegador vai bloquear o modelo 3D. Abra a pasta no VS Code e use a extensão **Live Server**.