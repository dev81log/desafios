const { rl } = require('./db');
const { cadastrarUsuario, entrarConta, getUsuarioLogado } = require('./usuario');

function mostrarMenu() {
    console.log('Menu:');
    console.log('1. Cadastrar usuário');
    console.log('2. Entrar na conta');
    console.log('3. Sair');
    const usuarioLogado = getUsuarioLogado();
    if (usuarioLogado) {
        console.log(`Usuário logado: ${usuarioLogado}`);
    }
    rl.question('Escolha uma opção: ', (opcao) => {
        switch (opcao) {
            case '1':
                cadastrarUsuario(mostrarMenu);
                break;
            case '2':
                entrarConta(mostrarMenu);
                break;
            case '3':
                rl.close();
                break;
            default:
                console.log('Opção inválida!');
                mostrarMenu();
                break;
        }
    });
}

exports.mostrarMenu = mostrarMenu;