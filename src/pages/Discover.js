import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

export function Discover({ jogos }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Descobrir Jogos</Text>
      <Text style={styles.subtitle}>Confira a lista de jogos cadastrados ({jogos.length}):</Text>

      <FlatList
        data={jogos}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View style={styles.gameCard}>
            <View style={styles.infoContainer}>
              <Text style={styles.gameName}>{item.nome}</Text>
              <Text style={styles.gameDate}>Lançamento: {item.dataLancamento}</Text>
            </View>
            <View style={styles.badge}>
              <Text style={styles.badgeLabel}>Nota</Text>
              <Text style={styles.badgeValue}>★ {item.nota}</Text>
            </View>
          </View>
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
  badge: { backgroundColor: '#312e81', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8, alignItems: 'center' },
  badgeLabel: { fontSize: 10, color: '#a5b4fc' },
  badgeValue: { fontSize: 14, fontWeight: 'bold', color: '#818cf8' },
});