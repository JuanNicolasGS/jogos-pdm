import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';

export function Discover({ jogos, onEditar, onExcluir }) {

  const confirmarExclusao = (jogo) => {
    Alert.alert(
      "Excluir Jogo",
      `Deseja mesmo remover "${jogo.nome}"?`,
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Excluir", 
          style: "destructive", 
          onPress: () => onExcluir(jogo.id)
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Descobrir Jogos</Text>
      <Text style={styles.subtitle}>Toque no card para editar ou no ícone para excluir:</Text>

      <FlatList
        data={jogos}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.gameCard} 
            onPress={() => onEditar(item)} 
            activeOpacity={0.7}
          >
            <View style={styles.infoContainer}>
              <Text style={styles.gameName}>{item.nome}</Text>
              <Text style={styles.gameDate}>Lançamento: {item.dataLancamento}</Text>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
              <View style={styles.badge}>
                <Text style={styles.badgeLabel}>Nota</Text>
                <Text style={styles.badgeValue}>★ {item.nota}</Text>
              </View>

              {/* Botão de Excluir Direto */}
              <TouchableOpacity onPress={() => confirmarExclusao(item)} style={styles.deleteBtn}>
                <Text style={{ fontSize: 16 }}>🗑️</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#fff', marginBottom: 4 },
  subtitle: { fontSize: 14, color: '#94a3b8', marginBottom: 16 },
  gameCard: { 
    backgroundColor: '#1e293b', 
    padding: 16, 
    borderRadius: 12, 
    marginBottom: 12, 
    flexDirection: 'row', 
    alignItems: 'center', 
    borderWidth: 1, 
    borderColor: '#334155' 
  },
  infoContainer: { flex: 1 },
  gameName: { fontSize: 16, fontWeight: 'bold', color: '#fff', marginBottom: 4 },
  gameDate: { fontSize: 12, color: '#94a3b8' },
  badge: { backgroundColor: '#312e81', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8, alignItems: 'center' },
  badgeLabel: { fontSize: 10, color: '#a5b4fc' },
  badgeValue: { fontSize: 13, fontWeight: 'bold', color: '#818cf8' },
  deleteBtn: { padding: 6, backgroundColor: '#451a1a', borderRadius: 8 }
});