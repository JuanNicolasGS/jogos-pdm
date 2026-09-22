import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  Modal, 
  Alert 
} from 'react-native';

export function ModalCadastro({ visible, onClose, onSalvarJogo }) {
  const [nome, setNome] = useState('');
  const [dataLancamento, setDataLancamento] = useState('');
  const [nota, setNota] = useState('');

  const handleSalvar = () => {
    if (!nome.trim() || !nota.trim()) {
      Alert.alert("Erro", "Por favor, preencha o nome e a nota do jogo.");
      return;
    }

    const novoJogo = {
      id: String(Date.now()),
      nome,
      dataLancamento: dataLancamento || "Não informada",
      nota: parseFloat(nota) || 0,
      imagem: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=60"
    };

    onSalvarJogo(novoJogo);

    // Limpa o formulário e fecha o modal
    setNome('');
    setDataLancamento('');
    setNota('');
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
            <Text style={styles.label}>Nome do Jogo *</Text>
            <TextInput 
              style={styles.input} 
              placeholder="Ex: Red Dead Redemption 2" 
              placeholderTextColor="#64748b" 
              value={nome}
              onChangeText={setNome}
            />

            <Text style={styles.label}>Data de Lançamento</Text>
            <TextInput 
              style={styles.input} 
              placeholder="Ex: 26/10/2018" 
              placeholderTextColor="#64748b" 
              value={dataLancamento}
              onChangeText={setDataLancamento}
            />

            <Text style={styles.label}>Nota Inicial (0 a 10) *</Text>
            <TextInput 
              style={styles.input} 
              placeholder="Ex: 9.5" 
              keyboardType="numeric"
              placeholderTextColor="#64748b" 
              value={nota}
              onChangeText={setNota}
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
    justify: 'flex-end' 
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