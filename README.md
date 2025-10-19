# Clash of Zombie

Jogo inspirado em Clash Royale desenvolvido com Phaser para rodar em ambiente estático, perfeito para deploy no Netlify.

## Como jogar

1. Abra o arquivo `index.html` em um navegador moderno ou sirva o diretório com qualquer servidor HTTP estático.
2. Na tela inicial, clique em **Preparar Deck** para montar um baralho com 8 cartas dentre 20 unidades e 10 feitiços. É possível upar cartas gastando ouro apenas fora da batalha.
3. Retorne ao menu e escolha **Iniciar Batalha** para enfrentar o rei robô. Selecione uma carta na barra inferior (ícones em emoji) e depois toque no campo para posicionar a unidade ou lançar o feitiço.
4. Gerencie o elixir (que dobra após 1 minuto), aproveite o modo arena aberta em orientação vertical e destrua o rei inimigo antes que o robô derrube suas torres.

## Recursos principais

- Arena vertical com mapa livre (sem pistas) e três torres por lado, com tiros visíveis em emoji.
- Sistema de elixir com limite 10 e modo 2x a partir de 60 segundos.
- Biblioteca com 30 cartas (20 unidades e 10 feitiços lançáveis) inspiradas em franquias como *The Walking Dead*, *Resident Evil*, *Left 4 Dead* e outras séries de zumbis.
- Deck builder dedicado para selecionar cartas e fazer upgrades usando ouro fora da batalha.
- Partidas single-player contra IA com projéteis visíveis, efeitos de feitiço em área e fim baseado nas regras clássicas: 3 minutos mais morte súbita em caso de empate.

## Desenvolvimento

Todo o jogo está no arquivo `js/main.js` utilizando Phaser 3 via CDN, portanto não há etapa de build. Basta fazer upload dos arquivos para o Netlify.
