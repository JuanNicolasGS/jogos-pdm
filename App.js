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
import { Home } from './src/pages/Home';
import { Discover } from './src/pages/Discover';
import { ModalCadastro } from './src/components/ModalCadastro';

export default function App() {
  const [abaAtual, setAbaAtual] = useState('home');
  const [modalVisivel, setModalVisivel] = useState(false);
  const [jogos, setJogos] = useState(gamesData);

  const handleSalvarJogo = (novoJogo) => {
    setJogos((jogosAnteriores) => [novoJogo, ...jogosAnteriores]);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1e293b" />
      
      {/* Menu Superior */}
      <View style={styles.navbar}>
        <Text style={styles.logo}>GAME<Text style={{ color: '#6366f1' }}>RANK</Text></Text>
        <View style={styles.navMenu}>
          <TouchableOpacity onPress={() => setAbaAtual('home')}>
            <Text style={[styles.navItem, abaAtual === 'home' && styles.navActive]}>Início</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setAbaAtual('discover')}>
            <Text style={[styles.navItem, abaAtual === 'discover' && styles.navActive]}>Descobrir</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setModalVisivel(true)}>
            <Text style={styles.navItem}>+ Cadastrar</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Conteúdo das Telas */}
      <View style={{ flex: 1 }}>
        {abaAtual === 'home' && (
          <Home 
            setAbaAtual={setAbaAtual} 
            abrirModalCadastro={() => setModalVisivel(true)} 
          />
        )}
        {abaAtual === 'discover' && <Discover jogos={jogos} />}
      </View>

      {/* Modal de Cadastro */}
      <ModalCadastro 
        visible={modalVisivel} 
        onClose={() => setModalVisivel(false)} 
        onSalvarJogo={handleSalvarJogo}
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
    paddingHorizontal: 20, 
    paddingVertical: 16, 
    backgroundColor: '#1e293b', 
    borderBottomWidth: 1, 
    borderBottomColor: '#334155' 
  },
  logo: { fontSize: 18, fontWeight: 'bold', color: '#fff' },
  navMenu: { flexDirection: 'row', gap: 16 },
  navItem: { color: '#94a3b8', fontSize: 14, fontWeight: '500' },
  navActive: { color: '#6366f1', fontWeight: 'bold' },
});