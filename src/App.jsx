import { useState } from 'react';
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

const handleUberRedirect = () => {
    const url = "https://m.uber.com/ul/?action=setPickup&pickup=my_location&dropoff[latitude]=-29.9565&dropoff[longitude]=-50.235361&dropoff[nickname]=Destino%20Selecionado";
    
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <main className="mobile-container">
      <motion.div 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="intro"
      >
        <h1>O aniversário mais assustador da paróquia 🫣</h1>
        <p>Sábado, 10/10 • Minha Casinha</p>
        <p>👻 Chegar a partir das 20h 👻</p>
        <button className='Endereco' onClick={() => abrirEndereco()}>Como chegar</button>
        <p className="instrucao">Selecione seu grupo para confirmar presença:</p>
      </motion.div>

      <div className="lista-grupos">
        {Object.keys(convidadosDb).map((grupo) => (
          <button key={grupo} onClick={() => abrirNomes(grupo)} className="btn-largo">
            {grupo}
          </button>
        ))}
      </div>

      <AnimatePresence>
        {modalAberto === 'nomes' && (
          <motion.div
            className="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="modal"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <button className="btn-fechar" onClick={fecharModais}>X</button>
              <h2>{grupoSelecionado}</h2>
              <p>Quem é você?</p>
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="modal"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
            >
              <button className="btn-fechar" onClick={fecharModais}>X</button>
              <h2>Olá, {nomeSelecionado}!</h2>
              <p>Podemos contar com a sua presença?</p>
              <div className="acoes-confirmacao">
                <button 
                  className="btn-largo btn-sucesso"
                  onClick={() => {
                    alert(`O código do Firebase vai aqui para salvar: ${nomeSelecionado}`);
                    fecharModais();
                  }}
                >
                  Confirmar Presença
                </button>
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
              <motion.div
                className="modal"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
              >
                <div className='popup-endereco'>
                  <button className="btn-fechar" onClick={fecharModais}>X</button>
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
                  <div className='botao-uber'>
                    <button onClick={() => handleUberRedirect()}>Uber</button>
                  </div>
                </div>
              </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}