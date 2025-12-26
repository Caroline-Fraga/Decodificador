// Mapeamento de criptografia:
// a -> ai
// e -> enter
// i -> imes
// o -> ober
// u -> ufat

// Seleciona elementos pelo novo HTML (IDs padronizados)
const entrada = document.getElementById('entrada-texto');
const saida = document.getElementById('saida-texto');
const btnCriptografar = document.getElementById('btn-criptografar');
const btnDescriptografar = document.getElementById('btn-descriptografar');
const btnCopiar = document.getElementById('btn-copiar');
const mensagem = document.getElementById('mensagem-estado');

// Remove acentos (compatível com navegadores modernos)
function removerAcentos(texto) {
    return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

// Criptografa o texto (entrada: string)
function criptografarTexto(texto) {
    const t = removerAcentos(String(texto).toLowerCase());
    return t
        .replace(/e/g, 'enter')
        .replace(/i/g, 'imes')
        .replace(/a/g, 'ai')
        .replace(/o/g, 'ober')
        .replace(/u/g, 'ufat');
}

// Descriptografa o texto (substitui sequências maiores primeiro)
function descriptografarTexto(texto) {
    const t = removerAcentos(String(texto).toLowerCase());
    return t
        .replace(/enter/g, 'e')
        .replace(/imes/g, 'i')
        .replace(/ober/g, 'o')
        .replace(/ufat/g, 'u')
        .replace(/ai/g, 'a');
}

function atualizarInterfaceComResultado(valor) {
    if (!saida) return;
    saida.value = valor;
    if (mensagem) mensagem.style.display = 'none';
    saida.style.backgroundImage = 'none';
}

function restaurarEstadoInicial() {
    if (!saida) return;
    if (mensagem) {
        mensagem.style.display = '';
        const titulo = mensagem.querySelector('.mensagem-titulo');
        const texto = mensagem.querySelector('.mensagem-texto');
        if (titulo) titulo.textContent = 'Nenhuma mensagem encontrada';
        if (texto) texto.textContent = 'Digite um texto que você deseja criptografar ou descriptografar.';
    }
    saida.style.backgroundImage = "url('imagens/boneco.png')";
}

// Liga eventos quando DOM pronto
document.addEventListener('DOMContentLoaded', () => {
    if (btnCriptografar) {
        btnCriptografar.addEventListener('click', () => {
            if (!entrada) return;
            const texto = entrada.value || '';
            if (!texto.trim()) return;
            const resultado = criptografarTexto(texto);
            atualizarInterfaceComResultado(resultado);
            entrada.value = '';
        });
    }

    if (btnDescriptografar) {
        btnDescriptografar.addEventListener('click', () => {
            if (!entrada) return;
            const texto = entrada.value || '';
            if (!texto.trim()) return;
            const resultado = descriptografarTexto(texto);
            atualizarInterfaceComResultado(resultado);
            entrada.value = '';
        });
    }

    if (btnCopiar) {
        btnCopiar.addEventListener('click', () => {
            if (!saida) return;
            const texto = saida.value || '';
            if (!texto) return;
            navigator.clipboard.writeText(texto)
                .then(() => {
                    // feedback simples
                    if (mensagem) {
                        const titulo = mensagem.querySelector('.mensagem-titulo');
                        const textoEl = mensagem.querySelector('.mensagem-texto');
                        if (titulo) titulo.textContent = 'Copiado para a área de transferência';
                        if (textoEl) textoEl.textContent = 'O texto foi copiado com sucesso.';
                        mensagem.style.display = '';
                    }
                    // opcional: limpar saída para indicar conclusão
                    saida.value = '';
                    setTimeout(() => {
                        restaurarEstadoInicial();
                    }, 1500);
                })
                .catch(err => console.error('Erro ao copiar:', err));
        });
    }

    // garante estado inicial (imagem + mensagem)
    restaurarEstadoInicial();
});


