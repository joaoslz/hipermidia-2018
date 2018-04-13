// console.log('Olá Mundo!');
// console.log(11 * 15);

const fs = require('fs');
const http = require('http');

fs.writeFile(__dirname + '/index.html', '<h1>Olá NodeJS</h1>', function(error) {
   if (error) {
    return console.log(error);
   } else {
       console.log('arquivo criado com sucesso.' );
   }
});

console.log('executou depois do writeFile' );

let linkImagem = 'http://www.picturetopeople.org/logos/generator/examples/3d-html5-logo-icon.jpg';

http.get(linkImagem, function(response ) {
    response.pipe(fs.createWriteStream(__dirname + '/logo-html.jpg' ) );
});