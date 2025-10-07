import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View, Alert, ImageBackground } from 'react-native';
import styles from './assets/stylesheet.js';

const operacoes = [
  { label: 'Adição', value: 'soma' },
  { label: 'Divisão', value: 'divisao' },
  { label: 'Multiplicação', value: 'multiplicacao' },
  { label: 'Subtrair', value: 'subtracao' },
];

const App = () => {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [operacao, setOperacao] = useState('soma');
  const [resultado, setResultado] = useState(null);

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [mensagem, setMensagem] = useState('');

  const calcular = () => {
    const n1 = parseFloat(num1);
    const n2 = parseFloat(num2);

    if (isNaN(n1) || isNaN(n2)) {
      Alert.alert('Erro!', 'Por favor, coloque números que sejam válidos.');
      setResultado(null);
      return;
    }

    let res;
    switch (operacao) {
      case 'soma':
        res = n1 + n2;
        break;
      case 'subtracao':
        res = n1 - n2;
        break;
      case 'multiplicacao':
        res = n1 * n2;
        break;
      case 'divisao':
        if (n2 === 0) {
          Alert.alert('Erro!', 'Divisão por zero não é permitida.');
          setResultado(null);
          return;
        }
        res = n1 / n2;
        break;
      default:
        Alert.alert('Erro!', 'Operação inválida!');
        return;
    }
    setResultado(res);
  };

  const limpar = () => {
    setNum1('');
    setNum2('');
    setResultado(null);
  };

  const cadastrar = () => {
    if (!nome || !email) {
      Alert.alert('Atenção!', 'Preencha nome e e-mail.');
      return;
    }
    setMensagem(`Bem-vindo, ${nome}! Seu e-mail (${email}) foi cadastrado.`);
  };

  return (
    <ImageBackground
      source={{ uri: 'https://i.pinimg.com/originals/9c/d7/e2/9cd7e290d9ce58d88b23acc48f54aec3.jpg' }}
      style={styles.bg}
      resizeMode="cover"
    >
      <View style={styles.box}>
        {/* Formulário 2: Cadastro (em cima) */}
        <View style={{ width: '100%', alignItems: 'center' }}>
          <Text style={styles.label}>Nome:</Text>
          <TextInput
            style={[styles.input, { width: '90%' }]}
            value={nome}
            onChangeText={setNome}
            placeholder="Digite seu nome"
            placeholderTextColor="#fff"
          />
          <Text style={styles.label}>E-mail:</Text>
          <TextInput
            style={[styles.input, { width: '90%' }]}
            value={email}
            onChangeText={setEmail}
            placeholder="Digite seu e-mail"
            keyboardType="email-address"
            placeholderTextColor="#fff"
          />
          <TouchableOpacity style={[styles.opcao, { width: '90%' }]} onPress={cadastrar}>
            <Text style={styles.opcaoTexto}>Cadastrar</Text>
          </TouchableOpacity>
          {mensagem ? (
            <Text style={styles.resultado}>{mensagem}</Text>
          ) : null}
        </View>

        {/* Formulário 1: Calculadora (embaixo) */}
        <View style={{ marginTop: 30, width: '100%', alignItems: 'center' }}>
          <Text style={styles.label}>Número 1:</Text>
          <TextInput
            style={[styles.input, { width: '90%' }]}
            keyboardType="numeric"
            value={num1}
            onChangeText={setNum1}
            placeholder="Digite o primeiro número"
            placeholderTextColor="#fff"
          />
          <Text style={styles.label}>Número 2:</Text>
          <TextInput
            style={[styles.input, { width: '90%' }]}
            keyboardType="numeric"
            value={num2}
            onChangeText={setNum2}
            placeholder="Digite o segundo número"
            placeholderTextColor="#fff"
          />
          <Text style={styles.label}>Operação:</Text>
          <View style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 15,
            width: '100%',
          }}>
            {operacoes.map(op => (
              <TouchableOpacity
                key={op.value}
                style={[
                  styles.opcao,
                  {
                    minWidth: 110,
                    maxWidth: 140,
                    margin: 4,
                    backgroundColor: operacao === op.value ? '#b71c1c' : '#d32f2f',
                  }
                ]}
                onPress={() => setOperacao(op.value)}
              >
                <Text style={styles.opcaoTexto}>{op.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
            <TouchableOpacity style={[styles.opcao, { flex: 1, marginRight: 8 }]} onPress={limpar}>
              <Text style={styles.opcaoTexto}>Limpar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.opcao, { flex: 1, marginLeft: 8 }]} onPress={calcular}>
              <Text style={styles.opcaoTexto}>Calcular</Text>
            </TouchableOpacity>
          </View>
          {resultado !== null && (
            <Text style={styles.resultado}>Resultado: {resultado}</Text>
          )}
        </View>
      </View>
    </ImageBackground>
  );
};

export default App;
