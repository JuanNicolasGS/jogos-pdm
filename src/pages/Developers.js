import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

export function Developers({ desenvolvedoras }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Desenvolvedoras</Text>
      <Text style={styles.subtitle}>Estúdios cadastrados ({desenvolvedoras.length}):</Text>

      <FlatList
        data={desenvolvedoras}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.info}>
              <Text style={styles.devName}>{item.nome}</Text>
              <Text style={styles.devCountry}>Origem: {item.paisOrigem}</Text>
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
  card: { 
    backgroundColor: '#1e293b', 
    padding: 16, 
    borderRadius: 12, 
    marginBottom: 12, 
    borderWidth: 1, 
    borderColor: '#334155' 
  },
  info: { flex: 1 },
  devName: { fontSize: 16, fontWeight: 'bold', color: '#fff', marginBottom: 4 },
  devCountry: { fontSize: 12, color: '#94a3b8' },
}); 