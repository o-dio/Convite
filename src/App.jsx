import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';

const convidadosDb = {
  "Família Silva": ["João Silva", "Maria Silva", "Tia Joana"],
  "Amigos da Faculdade": ["Carlos", "Ana", "Lucas"],
  "Trabalho": ["Chefe", "Colega 1"]
};

export default function App() {
  const [grupoSelecionado, setGrupoSelecionado] = useState(null);
  const [nomeSelecionado, setNomeSelecionado] = useState(null);
  const [modalAberto, setModalAberto] = useState(null); 

  const abrirNomes = (grupo) => {
    setGrupoSelecionado(grupo);
    setModalAberto('nomes');
  };

  const abrirConfirmacao = (nome) => {
    setNomeSelecionado(nome);
    setModalAberto('confirmacao');
  };

  const abrirEndereco = () => {
    setModalAberto('endereco');
  };

  const fecharModais = () => {
    setModalAberto(null);
    setTimeout(() => {
      setGrupoSelecionado(null);
      setNomeSelecionado(null);
    }, 300);
  };

  const carrosselRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const foiArrastado = useRef(false);

  const handleMouseDown = (e) => {
    isDragging.current = true;
    foiArrastado.current = false;
    startX.current = e.pageX - carrosselRef.current.offsetLeft;
    scrollLeft.current = carrosselRef.current.scrollLeft;
    
    // Adicionamos a classe no lugar de injetar o estilo direto
    if (carrosselRef.current) carrosselRef.current.classList.add('sem-ima');
  };

  // Unimos o "soltar" e o "sair da área" em uma função só para manter o código limpo
  const handleMouseUpOrLeave = () => {
    isDragging.current = false;
    // Removemos a classe para o ímã voltar a agir
    if (carrosselRef.current) carrosselRef.current.classList.remove('sem-ima');
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    
    const x = e.pageX - carrosselRef.current.offsetLeft;
    const movimento = (x - startX.current) * 1.5;
    
    if (Math.abs(movimento) > 10) {
      foiArrastado.current = true; 
    }
    
    carrosselRef.current.scrollLeft = scrollLeft.current - movimento;
  };

  useEffect(() => {
    if (carrosselRef.current) {
      const container = carrosselRef.current;

      const centroExato = (container.scrollWidth - container.clientWidth) / 2;
      
      container.scrollLeft = centroExato;
    }
  }, []);

const handleUberRedirect = () => {
    const url = "https://m.uber.com/ul/?action=setPickup&pickup=my_location&dropoff[latitude]=-29.9565&dropoff[longitude]=-50.235361&dropoff[nickname]=Destino%20Selecionado";
    
    window.open(url, '_blank', 'noopener,noreferrer');
  };

const handleRotasRedirect = () => {
  const url = 'https://www.google.com/maps/dir/?api=1&origin=Current+Location&destination=-29.95646,-50.23519&travelmode=driving'
  
  window.open(url, '_blank', 'noopener,noreferrer');
};

  return (
    <main className="mobile-container">
      <motion.div 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="intro"
      >
        <h1>O aniversário mais assustador da paróquia</h1>
        <p>Sábado, 10/10 • Minha Casinha</p>
        <p>👻 Chegar a partir das 20h 👻</p>
        <button className='btn-secundario' onClick={() => abrirEndereco()}>Como chegar</button>
      </motion.div>

      <div
        className="lista-grupos"
        ref={carrosselRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseUpOrLeave}
        onMouseUp={handleMouseUpOrLeave}
        onMouseMove={handleMouseMove}
        >
          {Object.keys(convidadosDb).map((grupo) => (
            <button
              key={grupo} 
              className="btn-largo"
              draggable="false" 
              onClick={(e) => {
                if (foiArrastado.current) {
                  e.preventDefault();
                  return;
                }
                abrirNomes(grupo);
              }}
            >
              {grupo}
            </button>
          ))}
      </div>

      <AnimatePresence>
        {modalAberto === 'nomes' && (
          <motion.div
            className="overlay"
            onClick={fecharModais}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="modal"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <button className="btn-fechar" onClick={fecharModais}>X</button>
              <h2>{grupoSelecionado}</h2>
              <div className="lista-nomes">
                {convidadosDb[grupoSelecionado].map((nome) => (
                  <button key={nome} onClick={() => abrirConfirmacao(nome)} className="btn-largo btn-secundario">
                    {nome}
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}

        {modalAberto === 'confirmacao' && (
          <motion.div
            className="overlay"
            onClick={fecharModais}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="modal"
              onClick={(e) => e.stopPropagation()}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
            >
              <button className="btn-fechar" onClick={fecharModais}>X</button>
              <h2>Olá, {nomeSelecionado}!</h2>
              <div className="acoes-confirmacao">
                <div className="grupo-botoes-confirmar">
                  <button 
                    className="btn-largo btn-sucesso btn-principal-confirmar"
                    onClick={() => {
                      alert(`Vai salvar no Firebase: ${nomeSelecionado} (Sem opção de comida)`);
                      fecharModais();
                    }}
                  >
                    Confirmar Presença
                  </button>
                  <button 
                    className="btn-largo btn-sucesso btn-seta" 
                    onClick={() => setModalAberto('comidinha')}
                  >
                    ➔
                  </button>
                </div>
                <button className="btn-largo btn-recusar" onClick={fecharModais}>
                  Não poderei ir
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {modalAberto == 'endereco' && (

          <motion.div
            className="overlay"
            onClick={fecharModais}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
              <motion.div
                className="modal"
                onClick={(e) => e.stopPropagation()}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
              >
                <div className='popup-endereco'>
                  <button className="btn-fechar" onClick={fecharModais}>X</button>
                  <h1>Como chegar:</h1>
                  <div className='descricao-endereco'>
                    <text>
                      Rodovia: ERS - 030<br/>
                      Número: 9200<br/>
                      Bairro: Emboaba II<br/>
                      CEP: 95520-000<br/>
                      Cidade: Osório<br/>
                      Estado: RS<br/>
                    </text>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3456.792912577233!2d-50.23784512325086!3d-29.956634727212077!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95180d11a525a1bd%3A0x5005ce10025c4b24!2sLua%20Cheia%20Instituto%20Espiritual%20Xam%C3%A2nico!5e0!3m2!1spt-BR!2sbr!4v1790741707841!5m2!1spt-BR!2sbr" allowfullscreen="" loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe>
                  </div>
                  <div className='botao-rotas'>
                    <button onClick={() => handleUberRedirect()} className='btn-secundario'>Uber</button>
                    <button onClick={() => handleRotasRedirect()} className='btn-secundario'>Rotas</button>
                  </div>
                </div>
              </motion.div>
          </motion.div>
        )}

        {modalAberto === 'comidinha' && (
          <motion.div
            className="overlay"
            onClick={setModalAberto('confirmacao')}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="modal"
              onClick={(e) => e.stopPropagation()}
              initial={{ x: 50, opacity: 0 }} 
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 50, opacity: 0 }}
            >
              <button className="btn-fechar" onClick={setModalAberto('confirmacao')}>X</button>
              <h2>E a comidinha? 🍕</h2>
              <p>Como você prefere contribuir, {nomeSelecionado}?</p>
              <div className="acoes-confirmacao">
                <button 
                  className="btn-largo btn-secundario"
                  onClick={() => {
                    alert(`Vai salvar no Firebase: ${nomeSelecionado} - Levará comida`);
                    fecharModais();
                  }}
                >
                  Vou levar comida para dividir
                </button>
                <button 
                  className="btn-largo btn-secundario"
                  onClick={() => {
                    alert(`Vai salvar no Firebase: ${nomeSelecionado} - Contribuirá para pizza`);
                    fecharModais();
                  }}
                >
                  Vou contribuir para a pizza
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}