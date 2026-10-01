import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 3, 7); 

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; 
controls.dampingFactor = 0.05;
controls.autoRotate = false; 

const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1.2);
hemiLight.position.set(0, 20, 0);
scene.add(hemiLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 2);
dirLight.position.set(5, 10, 7);
scene.add(dirLight);

const loader = new GLTFLoader();
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('https://unpkg.com/three@0.160.0/examples/jsm/libs/draco/');
loader.setDRACOLoader(dracoLoader);

let modelData;

loader.load('motor_leve.glb', 
    (gltf) => {
        modelData = gltf.scene;
        scene.add(modelData);
        console.log("Model loaded successfully.");
    },
    (xhr) => {
        console.log(`Loading: ${Math.round(xhr.loaded / xhr.total * 100)}%`);
    },
    (error) => {
        console.error('Model load error:', error);
    }
);

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

const uiPanel = document.getElementById('painel-info');
const uiTitle = document.getElementById('titulo-peca');
const uiDesc = document.getElementById('desc-peca');

window.addEventListener('click', (e) => {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    if (modelData) {
        const intersects = raycaster.intersectObject(modelData, true);

        if (intersects.length > 0) {
            const target = intersects[0].object;
            const nome = target.name.toLowerCase();
            
            uiPanel.style.display = 'block';
            
            if (nome.includes("plane018_collector_0") || nome.includes("cylinder010") || nome.includes("cylinder028") || nome.includes("plane009")){
                uiTitle.innerText = "Coletor de Escape (Exhaust Manifold)";
                uiDesc.innerText = "Recolhe os gases residuais em alta pressão e temperatura imediatamente após a combustão, canalizando-os de forma eficiente dos cilindros para o sistema de exaustão ou turbocompressor..";
            
            } else if (nome.includes("cylinder010_collector_0")) {
                uiTitle.innerText = "Coletor de Escape (Exhaust Manifold)";
                uiDesc.innerText = "Recolhe os gases residuais em alta pressão e temperatura imediatamente após a combustão, canalizando-os de forma eficiente dos cilindros para o sistema de exaustão ou turbocompressor..";
            
            } else if (nome.includes("plug_low")) {
                uiTitle.innerText = "Vela de Ignição (Isolador Cerâmico)";
                uiDesc.innerText = "Isola a alta tensão elétrica necessária para gerar o arco voltaico (faísca), servindo como o gatilho da detonação da mistura comprimida.";
                
            } else if (nome.includes("cube008") || nome.includes("cube010")) {
                uiTitle.innerText = "Alavanca do Acelerador (Braço do eixo da borboleta)";
                uiDesc.innerText = "A alavanca do acelerador converte o movimento do pedal em rotação do eixo da borboleta, controlando a quantidade de ar e mistura que entra no motor.";

            } else if (nome.includes("cylinder014") || nome.includes("cylinder007")){
                uiTitle.innerText = "Conjunto de Válvula e Mola";
                uiDesc.innerText = "Controla o fluxo. Abre para permitir a entrada de ar/combustível ou a saída de gases. A mola exerce força elástica para garantir o fechamento hermético da câmara de combustão em frações de segundo.";
            
            } else if (nome.includes("cylinder013") || nome.includes("cylinder006")) {
                uiTitle.innerText = "Eixo de Comando de Válvulas (Camshaft)";
                uiDesc.innerText = "Eixo rotativo contendo ressaltos (cames) com geometria matematicamente calculada. Ele empurra as válvulas, ditando o tempo e a duração exata da abertura delas durante o ciclo mecânico.";
            
            } else if (nome.includes("gearbox")) {
                uiTitle.innerText = "Caixa de Câmbio (Transmissão)";
                uiDesc.innerText = "Utiliza relações matemáticas através de conjuntos de engrenagens para multiplicar o torque (força) ou a velocidade de rotação gerada pelo motor, adaptando a energia cinética antes de enviá-la às rodas.";
            
            } else if (nome.includes("plane014") || nome.includes("pan") || nome.includes("sump") || nome.includes("plane003_metall2")) {
                uiTitle.innerText = "Cárter de Óleo";
                uiDesc.innerText = "Reservatório inferior responsável por armazenar o fluido lubrificante. A lubrificação reduz drasticamente o coeficiente de atrito mecânico entre as peças móveis e ajuda na dissipação da energia térmica (calor).";
            
            } else if (nome.includes("plane012") || nome.includes("plane015") || nome.includes("plane001") || nome.includes("plane005")) {
                uiTitle.innerText = "Cabeça do Motor";
                uiDesc.innerText = "Atua como o teto da câmara de combustão. É projetada para suportar e direcionar os picos extremos de pressão e energia térmica gerados durante a detonação da mistura ar/combustível.";
            
            } else if (nome.includes("plane016") || nome.includes("plane013")) {
                uiTitle.innerText = "Junta da Cabeça (Head Gasket)";
                uiDesc.innerText = "Elemento crucial de vedação física. Resiste a altíssimas tensões mecânicas e térmicas para selar a câmara de combustão, impedindo que os gases pressurizados, o óleo e o líquido de refrigeração se misturem.";
                
            } else if (nome.includes("cylinder029")) {
                uiTitle.innerText = "Árvore de Cames (Eixo de Distribuição)";
                uiDesc.innerText = "Converte energia cinética rotacional em movimento linear. A sua geometria excêntrica dita o tempo exato e a amplitude de abertura das válvulas, sincronizando a respiração do motor mecânico.";

            } else if (nome.includes("hute_pulley")){
                uiTitle.innerText = "Ventoinha de Arrefecimento";
                uiDesc.innerText = "Gera um fluxo de ar forçado. É um elemento crucial para a termodinâmica do sistema, facilitando a troca de calor por convecção e garantindo que o motor opere na sua temperatura ideal.";
            
            } else if (nome.includes("plane020") || nome.includes("plane008")) {
                uiTitle.innerText = "Correia de Transmissão";
                uiDesc.innerText = "Sistema de transmissão por polias. Utiliza o atrito mecânico e a tensão para transferir a energia cinética rotacional do eixo principal para os componentes auxiliares do motor.";
                
            } else if (nome.includes("NOME_DO_ALTERNADOR_AQUI")) {
                uiTitle.innerText = "Alternador / Componentes Auxiliares";
                uiDesc.innerText = "Gerador elétrico acionado mecanicamente. Baseado nos princípios do eletromagnetismo, converte a energia mecânica de rotação em energia elétrica para alimentar o sistema de ignição.";
            
            } else if (nome.includes("cube020") || nome.includes("cube003") || nome.includes("cylinder020")) {
                uiTitle.innerText = "Chapa de Fixação Dos Componentes Da Correia";
                uiDesc.innerText = "Suporte estrutural. Mantém a geometria e o alinhamento corretos dos componentes auxiliares do motor, garantindo que a correia de transmissão funcione de forma eficiente e sem falhas.";
            
            } else if (nome.includes("ziercurve")) {
                uiTitle.innerText = "Tubos de Arrefecimento";
                uiDesc.innerText = "Condutas de dinâmica de fluidos. Transportam o líquido de refrigeração sob alta pressão e temperatura, permitindo a troca térmica por convecção no radiador.";

            } else if (nome.includes("cylinder031") || nome.includes("cylinder030") || nome.includes("plane019") || nome.includes("cylinder032") || nome.includes("cylinder023") || nome.includes("plane007") || nome.includes("cylinder027")) {
                uiTitle.innerText = "Acessórios Acionados (Bombas e Compressores)";
                uiDesc.innerText = "Polias movidas pela correia periférica. Convertem o binário excedente do motor em trabalho físico auxiliar, como pressão hidráulica ou geração eletromagnética.";

            } else if (nome.includes("cube015") || nome.includes("cube007")) {
                uiTitle.innerText = "Coletor de Admissão";
                uiDesc.innerText = "Sistema de condutas concebido para equalizar o volume e a velocidade do fluxo de ar, distribuindo-o de forma equitativa para as câmaras de combustão.";
            
            } else if (nome.includes("bielle_sup")) {
                uiTitle.innerText = "Biela (Connecting Rod)";
                uiDesc.innerText = "Haste metálica que atua como elo de transferência cinética. Liga o pistão à cambota, convertendo o impacto linear da explosão em força de alavanca rotacional.";
                
            } else if (nome.includes("piston")) {
                uiTitle.innerText = "Pistão";
                uiDesc.innerText = "Êmbolo cilíndrico que comprime a mistura gasosa. É a primeira peça a absorver a energia térmica e de pressão gerada pela combustão, dando início ao ciclo mecânico.";
                
            } else if (nome.includes("cube016") || nome.includes("cube012") || nome.includes("cube009") || nome.includes("cube002") || nome.includes("cube004") || nome.includes("cube017") || nome.includes("cube006")) {
                uiTitle.innerText = "Carburador / Corpo de Borboleta";
                uiDesc.innerText = "Responsável pela estequiometria (mistura ideal de ar e combustível). Através do Efeito Venturi, pulveriza o combustível no fluxo de ar que é sugado pelo vácuo dos cilindros.";
            
            } else if (nome.includes("cylinder022") || nome.includes("cylinder039") || nome.includes("cylinder017") || nome.includes("cylinder024") || nome.includes("cylinder038")){
                uiTitle.innerText = "Filtro de Ar (Air Cleaner)";
                uiDesc.innerText = "Sistema de filtragem mecânica. Retém partículas suspensas, garantindo que apenas fluido (ar) limpo entre nos carburadores. É vital para prevenir o desgasteabrasivo e manter a vedação e compressão matemática dos cilindros.";

            } else if (nome.includes("cylinder012")) {
                uiTitle.innerText = "Virabrequim (Cambota / Eixo de Manivelas)";
                uiDesc.innerText = "O coração mecânico da transformação vetorial. Converte o movimento linear alternativo dos pistões em momento angular (força rotacional) constante, aplicando os princípios físicos de alavanca e inércia.";
            
            } else if (nome.includes("cylinder033")) {
                uiTitle.innerText = "Articulação de Aceleração (Linkage)";
                uiDesc.innerText = "Sistema de varões articulados. Garante a sincronização mecânica exata da abertura das válvulas borboleta dos três carburadores simultaneamente, equalizando a dinâmica de fluidos na admissão.";
                
            } else if (nome.includes("cube014") || nome.includes("cube011")) {
                uiTitle.innerText = "Torres do Coletor de Admissão";
                uiDesc.innerText = "Dutos de transição com volume calculado. Direcionam a mistura ar/combustível diretamente para as válvulas, otimizando a velocidade do fluxo e minimizando a perda de carga aerodinâmica.";

            } else if (nome.includes("cylinder036")) {
                uiTitle.innerText = "Cornetas de Admissão (Velocity Stacks)";
                uiDesc.innerText = "Dutos com geometria parabólica otimizada. Utilizam o Princípio de Bernoulli para acelerar o fluxo de ar e reduzir a turbulência aerodinâmica, maximizando a eficiência volumétrica em altas rotações.";

            } else if (nome.includes("cylinder008") || nome.includes("cylinder015") || nome.includes("cylinder005") || nome.includes("cylinder021")) {
                uiTitle.innerText = "Cabos de Ignição (Alta Tensão)";
                uiDesc.innerText = "Condutores com alto isolamento dielétrico. Transportam a alta tensão até às velas, minimizando a resistência ôhmica para gerar o arco voltaico que inicia a combustão.";

            } else if (nome.includes("plane011") || nome.includes("plane017") || nome.includes("plane010") || nome.includes("plane006")) {
                uiTitle.innerText = "Tampas de Válvulas";
                uiDesc.innerText = "Barreira hermética de contenção. Mantém o sistema dinâmico de válvulas isolado, preservando a pressão do fluido lubrificante e evitando a dissipação de energia sonora.";
                
            } else if (nome.includes("cube018") || nome.includes("cube005")) {
                uiTitle.innerText = "Bloco do Motor (Configuração em V)";
                uiDesc.innerText = "Estrutura central maciça. Suporta gradientes térmicos extremos. A sua geometria em 'V' é matematicamente projetada para o balanceamento e cancelamento de forças inerciais destrutivas.";

            } else if (nome.includes("cylinder016") || nome.includes("cylinder019")) {
                uiTitle.innerText = "Tampa de Óleo / Válvula de Respiro";
                uiDesc.innerText = "Ponto de entrada do fluido lubrificante. Atua na equalização da pressão interna, aliviando os gases acumulados no cárter durante o ciclo mecânico.";

            } else if (nome.includes("cylinder042") || nome.includes("cylinder026") || nome.includes("cylinder041") || nome.includes("cylinder043")) {
                uiTitle.innerText = "Filtro de Ar Circular (Carburador Único)";
                uiDesc.innerText = "Filtro com duto direcional. Capta ar externo em menor temperatura para aumentar a densidade do fluido admitido, melhorando a eficiência volumétrica e o rendimento térmico da combustão.";

            } else {
                uiTitle.innerText = target.name;
                uiDesc.innerText = "Not mapped";
            }
            
        } else {
            uiPanel.style.display = 'none';
        }
    }
});

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();
