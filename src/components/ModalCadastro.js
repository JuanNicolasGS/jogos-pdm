import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  Modal, 
  Alert 
} from 'react-native';

export function ModalCadastro({ visible, onClose }) {
  const handleSalvar = () => {
    Alert.alert("Aviso", "Interface apenas visual por enquanto!");
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.title}>Cadastrar Jogo</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.closeButton}>✕</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.subtitle}>Adicione um novo título ao catálogo.</Text>

          <View style={styles.form}>
            <Text style={styles.label}>Nome do Jogo</Text>
            <TextInput 
              style={styles.input} 
              placeholder="Ex: Red Dead Redemption 2" 
              placeholderTextColor="#64748b" 
            />

            <Text style={styles.label}>Data de Lançamento</Text>
            <TextInput 
              style={styles.input} 
              placeholder="Ex: 26/10/2018" 
              placeholderTextColor="#64748b" 
            />

            <Text style={styles.label}>Nota Inicial (0 a 10)</Text>
            <TextInput 
              style={styles.input} 
              placeholder="Ex: 9.5" 
              keyboardType="numeric"
              placeholderTextColor="#64748b" 
            />

            <TouchableOpacity style={styles.button} onPress={handleSalvar}>
              <Text style={styles.buttonText}>Salvar Jogo</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: { 
    flex: 1, 
    backgroundColor: 'rgba(0,0,0,0.75)', 
    justifyContent: 'flex-end' 
  },
  modalContent: { 
    backgroundColor: '#1e293b', 
    borderTopLeftRadius: 20, 
    borderTopRightRadius: 20, 
    padding: 20, 
    borderWidth: 1, 
    borderColor: '#334155' 
  },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { fontSize: 20, fontWeight: 'bold', color: '#fff' },
  closeButton: { color: '#94a3b8', fontSize: 20, fontWeight: 'bold', padding: 4 },
  subtitle: { fontSize: 13, color: '#94a3b8', marginBottom: 16, marginTop: 2 },
  form: { gap: 10 },
  label: { color: '#cbd5e1', fontSize: 13 },
  input: { backgroundColor: '#0f172a', borderColor: '#334155', borderWidth: 1, borderRadius: 8, padding: 10, color: '#fff' },
  button: { backgroundColor: '#6366f1', padding: 14, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});