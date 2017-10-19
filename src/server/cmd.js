// Тут похоже надо создавать nodemon
// И у него слушать stdin 
// Т.к. сервер буде...
// погодь. Сервер будет запускаться 
// через forever nodemon, т.е. надо 
// у forever слушать stdin ?

process.stdin.setEncoding('utf8');

process.stdin.on('readable', () => {
    let input = process.stdin.read();
    
    if (input !== null) {
        let cmd = input.trim();

        console.log('cmd: ', cmd);
        if (cmd === 'exit') {
            process.exit(0);
        } else if (cmd === 'require') {
            console.log(require);
        }
    }
});