// Selecionar os elementos da calculadora
const display = document.querySelector('.calculator__display');
const keys = document.querySelector('.calculator__keys');

// Variáveis para armazenar os números e operações
let currentInput = '0'; // Exibe o número atual
let previousInput = ''; // Armazena o número anterior
let operator = ''; // Armazena a operação selecionada

// Função para atualizar a tela
function updateDisplay() {
  display.textContent = currentInput;
}

// Função para lidar com os botões de número
function handleNumber(number) {
  if (currentInput === '0') {
    currentInput = number; // Substitui o '0' inicial com o número clicado
  } else {
    currentInput += number; // Adiciona o número ao final da entrada
  }
  updateDisplay();
}

// Função para lidar com os operadores (+, -, ×, ÷)
function handleOperator(op) {
  if (operator && previousInput) {
    // Se já houver uma operação anterior, faz o cálculo antes de atualizar
    calculate();
  }
  operator = op;
  previousInput = currentInput;
  currentInput = '0'; // Zera a tela para o próximo número
}

// Função para lidar com o cálculo
function calculate() {
  if (previousInput === '' || currentInput === '') return;
  
  let result;
  const prev = parseFloat(previousInput);
  const current = parseFloat(currentInput);

  // Realiza a operação selecionada
  switch (operator) {
    case 'add':
      result = prev + current;
      break;
    case 'subtract':
      result = prev - current;
      break;
    case 'multiply':
      result = prev * current;
      break;
    case 'divide':
      if (current === 0) {
        result = 'Erro'; // Impede a divisão por zero
      } else {
        result = prev / current;
      }
      break;
    default:
      return;
  }

  // Exibe o resultado
  currentInput = result.toString();
  operator = '';
  previousInput = '';
  updateDisplay();
}

// Função para limpar a tela
function clearDisplay() {
  currentInput = '0';
  previousInput = '';
  operator = '';
  updateDisplay();
}

// Função para adicionar o ponto decimal
function addDecimal() {
  if (!currentInput.includes('.')) {
    currentInput += '.';
  }
  updateDisplay();
}

// Adiciona os eventos aos botões
keys.addEventListener('click', event => {
  const target = event.target;

  if (!target.matches('button')) return; // Ignora qualquer clique fora de um botão
  
  const action = target.dataset.action;

  if (target.textContent === 'C') {
    clearDisplay(); // Limpa a tela
  } else if (target.textContent === '.') {
    addDecimal(); // Adiciona um ponto decimal
  } else if (action === 'add' || action === 'subtract' || action === 'multiply' || action === 'divide') {
    handleOperator(action); // Trata os operadores
  } else if (action === 'calculate') {
    calculate(); // Realiza o cálculo
  } else {
    handleNumber(target.textContent); // Trata os números
  }
});


// Funcionalidade com teclado
// Adiciona os eventos aos botões
keys.addEventListener('click', event => {
  const target = event.target;

  if (!target.matches('button')) return; // Ignora qualquer clique fora de um botão
  
  const action = target.dataset.action;

  if (target.textContent === 'C') {
    clearDisplay(); // Limpa a tela
  } else if (target.textContent === '.') {
    addDecimal(); // Adiciona um ponto decimal
  } else if (action === 'add' || action === 'subtract' || action === 'multiply' || action === 'divide') {
    handleOperator(action); // Trata os operadores
  } else if (action === 'calculate') {
    calculate(); // Realiza o cálculo
  } else {
    handleNumber(target.textContent); // Trata os números
  }
});

// Adiciona suporte ao teclado
document.addEventListener('keydown', event => {
  const key = event.key;

  if (!isNaN(key)) {
    // Se for um número
    handleNumber(key);
  } else if (key === '.') {
    // Se for um ponto decimal
    addDecimal();
  } else if (key === '+' || key === '-' || key === '*' || key === '/') {
    // Se for um operador
    const operatorMap = {
      '+': 'add',
      '-': 'subtract',
      '*': 'multiply',
      '/': 'divide'
    };
    handleOperator(operatorMap[key]);
  } else if (key === 'Enter' || key === '=') {
    // Se for a tecla Enter ou igual
    calculate();
  } else if (key === 'Backspace') {
    // Apaga o último caractere
    if (currentInput.length > 1) {
      currentInput = currentInput.slice(0, -1);
    } else {
      currentInput = '0';
    }
    updateDisplay();
  } else if (key === 'Escape') {
    // Limpa a tela com a tecla Escape
    clearDisplay();
  }
});
