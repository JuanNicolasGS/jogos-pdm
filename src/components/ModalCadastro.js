import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  Modal, 
  Alert 
} from 'react-native';

export function ModalCadastro({ visible, onClose, onSalvarJogo, jogoSelecionado }) {
  const [nome, setNome] = useState('');
  const [dataLancamento, setDataLancamento] = useState('');
  const [nota, setNota] = useState('');

  useEffect(() => {
    if (jogoSelecionado) {
      setNome(jogoSelecionado.nome || '');
      setDataLancamento(jogoSelecionado.dataLancamento || '');
      setNota(String(jogoSelecionado.nota || ''));
    } else {
      setNome('');
      setDataLancamento('');
      setNota('');
    }
  }, [jogoSelecionado, visible]);

  const handleSalvar = () => {
    if (!nome.trim() || !nota.trim()) {
      Alert.alert("Erro", "Por favor, preencha o nome e a nota do jogo.");
      return;
    }

    const jogoData = {
      id: jogoSelecionado ? jogoSelecionado.id : String(Date.now()),
      nome,
      dataLancamento: dataLancamento || "Não informada",
      nota: parseFloat(nota) || 0,
    };

    onSalvarJogo(jogoData);
    onClose();
  };

  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.title}>{jogoSelecionado ? "Editar Jogo" : "Cadastrar Jogo"}</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.closeButton}>✕</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.form}>
            <Text style={styles.label}>Nome do Jogo *</Text>
            <TextInput 
              style={styles.input} 
              value={nome}
              onChangeText={setNome}
              placeholder="Ex: Red Dead Redemption 2" 
              placeholderTextColor="#64748b" 
            />

            <Text style={styles.label}>Data de Lançamento</Text>
            <TextInput 
              style={styles.input} 
              value={dataLancamento}
              onChangeText={setDataLancamento}
              placeholder="Ex: 26/10/2018" 
              placeholderTextColor="#64748b" 
            />

            <Text style={styles.label}>Nota Inicial (0 a 10) *</Text>
            <TextInput 
              style={styles.input} 
              value={nota}
              onChangeText={setNota}
              keyboardType="numeric"
              placeholder="Ex: 9.5" 
              placeholderTextColor="#64748b" 
            />

            <TouchableOpacity style={styles.button} onPress={handleSalvar}>
              <Text style={styles.buttonText}>{jogoSelecionado ? "Atualizar" : "Salvar"}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.75)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: '#1e293b', borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20, borderWidth: 1, borderColor: '#334155' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  title: { fontSize: 20, fontWeight: 'bold', color: '#fff' },
  closeButton: { color: '#94a3b8', fontSize: 20, fontWeight: 'bold', padding: 4 },
  form: { gap: 10 },
  label: { color: '#cbd5e1', fontSize: 13 },
  input: { backgroundColor: '#0f172a', borderColor: '#334155', borderWidth: 1, borderRadius: 8, padding: 10, color: '#fff' },
  button: { backgroundColor: '#6366f1', padding: 14, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});