const fs = require('fs');
const { rl, isBlank } = require('./db');

let usuarioLogado = null;

function cadastrarUsuario(callback) {
    rl.question('Digite o nome do usuário: ', (username) => {
        if (isBlank(username)) {
            console.log('Nome do usuário é obrigatório!');
            callback();
            return;
        }
        console.log('Nome do usuário:', username);

        rl.question('Digite a senha: ', (password) => {
            if (isBlank(password)) {
                console.log('Senha é obrigatória!');
                callback();
                return;
            }
            console.log('Senha do usuário:', password);

            // Salvar os dados no arquivo usuarios.txt
            const userData = `Nome: ${username}, Senha: ${password}\n`;
            fs.appendFile('usuarios.txt', userData, (err) => {
                if (err) throw err;
                console.log('Dados salvos com sucesso!');
                callback();
            });
        });
    });
}

function entrarConta(callback) {
    rl.question('Digite o nome do usuário: ', (username) => {
        rl.question('Digite a senha: ', (password) => {
            fs.readFile('usuarios.txt', 'utf8', (err, data) => {
                if (err) {
                    console.error('Erro ao ler o arquivo:', err);
                    callback();
                    return;
                }

                const usuarios = data.split('\n').filter(line => line.trim() !== '');
                const usuarioValido = usuarios.some(user => {
                    const [nome, senha] = user.split(', ').map(field => field.split(': ')[1]);
                    return nome === username && senha === password;
                });

                if (usuarioValido) {
                    usuarioLogado = username;
                    console.log(`Usuário ${username} logado com sucesso!`);
                } else {
                    console.log('Dados inválidos!');
                }
                callback();
            });
        });
    });
}

function getUsuarioLogado() {
    return usuarioLogado;
}

exports.cadastrarUsuario = cadastrarUsuario;
exports.entrarConta = entrarConta;
exports.getUsuarioLogado = getUsuarioLogado;