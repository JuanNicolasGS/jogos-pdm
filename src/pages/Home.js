import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  FlatList, 
  Image, 
  Dimensions 
} from 'react-native';
import { gamesData } from '../data/games';

const { width } = Dimensions.get('window');
const CAROUSEL_WIDTH = width - 40; // Largura ajustada com padding da tela

export function Home({ setAbaAtual, abrirModalCadastro }) {
  // Ordena os jogos por nota decrescente e pega os 3 primeiros
  const top3Games = [...gamesData]
    .sort((a, b) => b.nota - a.nota)
    .slice(0, 3);

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>🏆 Top 3 Melhores Avaliados</Text>

      {/* Carrossel Horizontal */}
      <View style={styles.carouselContainer}>
        <FlatList
          data={top3Games}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item, index }) => (
            <View style={styles.cardCarrossel}>
              <Image source={{ uri: item.imagem }} style={styles.cardImage} />
              <View style={styles.overlay}>
                <View style={styles.rankBadge}>
                  <Text style={styles.rankText}>#{index + 1}</Text>
                </View>
                <View style={styles.cardInfo}>
                  <Text style={styles.gameTitle} numberOfLines={1}>{item.nome}</Text>
                  <Text style={styles.gameNota}>★ {item.nota}</Text>
                </View>
              </View>
            </View>
          )}
        />
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>Sobre o GameRank</Text>
        <Text style={styles.infoText}>
          Sua futura plataforma para avaliar, ranquear e descobrir novos títulos no mundo dos games.
        </Text>
      </View>

      <View style={styles.buttonGroup}>
        <TouchableOpacity 
          style={styles.primaryButton} 
          onPress={() => setAbaAtual('discover')}
        >
          <Text style={styles.buttonText}>Explorar Todos os Jogos</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.secondaryButton} 
          onPress={abrirModalCadastro}
        >
          <Text style={styles.buttonText}>+ Cadastrar Novo Jogo</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#818cf8', marginBottom: 12 },
  carouselContainer: { height: 180, marginBottom: 20 },
  cardCarrossel: { 
    width: CAROUSEL_WIDTH, 
    height: 180, 
    borderRadius: 16, 
    overflow: 'hidden', 
    backgroundColor: '#1e293b',
    marginRight: 10
  },
  cardImage: { width: '100%', height: '100%', resizeMode: 'cover' },
  overlay: { 
    ...StyleSheet.absoluteFillObject, 
    backgroundColor: 'rgba(15, 23, 42, 0.55)', 
    justify: 'space-between', 
    padding: 12 
  },
  rankBadge: { 
    backgroundColor: '#6366f1', 
    alignSelf: 'flex-start', 
    paddingHorizontal: 10, 
    paddingVertical: 4, 
    borderRadius: 8 
  },
  rankText: { color: '#fff', fontWeight: 'bold', fontSize: 12 },
  cardInfo: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  gameTitle: { color: '#fff', fontSize: 16, fontWeight: 'bold', flex: 1, marginRight: 8 },
  gameNota: { color: '#facc15', fontSize: 16, fontWeight: 'bold' },
  infoBox: { backgroundColor: '#1e293b', padding: 16, borderRadius: 12, marginBottom: 20, borderWidth: 1, borderColor: '#334155' },
  infoTitle: { color: '#fff', fontWeight: 'bold', fontSize: 16, marginBottom: 4 },
  infoText: { color: '#94a3b8', fontSize: 13, lineHeight: 18 },
  buttonGroup: { gap: 10 },
  primaryButton: { backgroundColor: '#6366f1', padding: 14, borderRadius: 8, alignItems: 'center' },
  secondaryButton: { backgroundColor: '#334155', padding: 14, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});