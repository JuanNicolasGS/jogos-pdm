import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  StatusBar, 
  Platform 
} from 'react-native';

import { gamesData } from './src/data/games';
import { developersData } from './src/data/developers';

import { Home } from './src/pages/Home';
import { Discover } from './src/pages/Discover';
import { Developers } from './src/pages/Developers';
import { ModalCadastro } from './src/components/ModalCadastro';

export default function App() {
  const [abaAtual, setAbaAtual] = useState('home');
  const [modalVisivel, setModalVisivel] = useState(false);
  const [jogos, setJogos] = useState(gamesData);
  const [desenvolvedoras] = useState(developersData);
  const [jogoSelecionado, setJogoSelecionado] = useState(null);

  const handleAbrirNovo = () => {
    setJogoSelecionado(null);
    setModalVisivel(true);
  };

  const handleAbrirEdicao = (jogo) => {
    setJogoSelecionado(jogo);
    setModalVisivel(true);
  };

  const handleSalvarJogo = (jogoData) => {
    if (jogoSelecionado) {
      setJogos(prev => prev.map(j => j.id === jogoData.id ? jogoData : j));
    } else {
      setJogos(prev => [jogoData, ...prev]);
    }
  };

  const handleExcluirJogo = (id) => {
    setJogos(prev => prev.filter(j => j.id !== id));
  };

  return (
    <View style={styles.container}>
      {/* Configure a StatusBar sem ser translucida */}
      <StatusBar 
        barStyle="light-content" 
        backgroundColor="#1e293b" 
        translucent={false} 
      />
      
      {/* Menu Superior */}
      <View style={styles.navbar}>
        <Text style={styles.logo}>GAME<Text style={{ color: '#6366f1' }}>RANK</Text></Text>
        <View style={styles.navMenu}>
          <TouchableOpacity onPress={() => setAbaAtual('home')}>
            <Text style={[styles.navItem, abaAtual === 'home' && styles.navActive]}>Início</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setAbaAtual('discover')}>
            <Text style={[styles.navItem, abaAtual === 'discover' && styles.navActive]}>Jogos</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setAbaAtual('developers')}>
            <Text style={[styles.navItem, abaAtual === 'developers' && styles.navActive]}>Estúdios</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleAbrirNovo}>
            <Text style={styles.navItem}>+ Criar</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Conteúdo das Telas */}
      <View style={{ flex: 1 }}>
        {abaAtual === 'home' && <Home setAbaAtual={setAbaAtual} abrirModalCadastro={handleAbrirNovo} />}
        {abaAtual === 'discover' && (
          <Discover 
            jogos={jogos} 
            onEditar={handleAbrirEdicao} 
            onExcluir={handleExcluirJogo} 
          />
        )}
        {abaAtual === 'developers' && <Developers desenvolvedoras={desenvolvedoras} />}
      </View>

      <ModalCadastro 
        visible={modalVisivel} 
        onClose={() => setModalVisivel(false)} 
        onSalvarJogo={handleSalvarJogo}
        jogoSelecionado={jogoSelecionado}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#0f172a',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  navbar: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingHorizontal: 16, 
    paddingVertical: 16, 
    backgroundColor: '#1e293b', 
    borderBottomWidth: 1, 
    borderBottomColor: '#334155' 
  },
  logo: { fontSize: 16, fontWeight: 'bold', color: '#fff' },
  navMenu: { flexDirection: 'row', gap: 12 },
  navItem: { color: '#94a3b8', fontSize: 13, fontWeight: '500' },
  navActive: { color: '#6366f1', fontWeight: 'bold' },
});