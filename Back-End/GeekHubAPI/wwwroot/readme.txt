O que é o wwwroot?

wwwroot é a pasta raiz pública do seu servidor. Em outras palavras, é a única pasta do seu projeto C# que o navegador (Chrome, Firefox, etc.) tem permissão de acessar diretamente pela internet.

Quando você roda sua API em https://localhost:7001 e digita https://localhost:7001/images/megumin.png, o servidor olha dentro da pasta wwwroot e procura a pasta images/megumin.png. Se existir, ele envia a imagem para o navegador. Se não existir, ele retorna um erro 404.
Por que ele existe?

Imagine que seu projeto C# tem duas "áreas":

    A Área Privada (Código-Fonte): Onde ficam os .cs, os controllers, o banco de dados, as configurações. O usuário nunca pode ver isso. (Se ele visse, poderia roubar seu código e quebrar seu banco).

    A Área Pública (Arquivos Estáticos): Onde ficam imagens, CSS, JS e arquivos de download. O usuário precisa ver isso para o site funcionar.

O wwwroot é a fronteira entre essas duas áreas. O ASP.NET Core bloqueia qualquer acesso à pasta privada, mas libera completamente o acesso à pasta wwwroot.
O que pode ser colocado dentro do wwwroot?

Tudo que é estático (que não muda):

    Imagens (.png, .jpg, .svg)

    Arquivos de estilo (.css)

    Arquivos de script (.js)

    Fontes (.woff, .ttf)

    PDFs, vídeos, etc.

No seu caso específico (Geek Hub):

Como você tem uma wiki de personagens, suas imagens são os assets estáticos que o seu Front-End vai consumir. Quando você fizer o fetch para a API C#:
javascript

fetch('https://localhost:7001/api/characters/random')
  .then(response => response.json())
  .then(personagem => {
      // O JSON retornado terá algo assim:
      // { "id": 1, "name": "Megumin", "imageUrl": "/images/megumin.png", "glowColor": "#eab308" }
      
      // O navegador vai pegar esse caminho e acessar:
      // https://localhost:7001/images/megumin.png
      // O servidor vai procurar em wwwroot/images/megumin.png e enviar a imagem
  });

Diferença importante: wwwroot vs assets

Você tem uma pasta assets no seu Front-End. Elas são parecidas, mas têm papéis diferentes:

    Front-End/assets: É a pasta onde você guarda as imagens para o seu código HTML/CSS/JS consumir localmente enquanto você desenvolve o front sem depender do C#.

    Back-End/GeekHubAPI/wwwroot/images: É a pasta onde você guarda as imagens para o servidor C# entregar ao navegador quando o backend estiver rodando.

Quando o C# estiver funcionando, você não vai mais depender do Front-End/assets. As imagens estarão servidas pelo servidor, e o seu HTML/JS vai apontar para os URLs do C# (ex: http://localhost:7001/images/megumin.png).
E se eu NÃO usar o wwwroot?

Se você não usar, suas imagens ficarão inacessíveis para o mundo externo. O navegador nunca vai conseguir carregar uma imagem se ela não estiver dentro dessa pasta (a menos que você configure explicitamente outras rotas estáticas, mas o padrão é sempre wwwroot).