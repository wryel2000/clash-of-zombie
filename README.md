# Clash of Zombie

Jogo inspirado em Clash Royale desenvolvido com Phaser para rodar em ambiente estático, perfeito para deploy no Netlify.

## Como jogar

1. Abra o arquivo `index.html` em um navegador moderno ou sirva o diretório com qualquer servidor HTTP estático.
2. Clique em uma carta para selecioná-la e depois clique no campo na linha desejada para lançar a unidade.
3. Use o ouro ganho eliminando inimigos para upar as cartas e fortalecer seus zumbis.
4. Gerencie o elixir (que dobra após 1 minuto) e destrua o rei inimigo antes que o robô acabe com suas torres.

## Recursos principais

- Campo dividido em duas pistas com três torres para cada lado, replicando o fluxo de Clash Royale.
- Sistema de elixir com limite 10 e modo 2x a partir de 60 segundos.
- Partidas single-player contra um robô com baralho inspirado em franquias de zumbis famosas como *The Walking Dead*, *Resident Evil* e *Left 4 Dead*.
- Cartas evoluíveis diretamente na interface, aumentando vida e dano das unidades.
- Fim de partida baseado nas regras tradicionais: contagem de coroas em 3 minutos e morte súbita em caso de empate.

## Desenvolvimento

Todo o jogo está no arquivo `js/main.js` utilizando Phaser 3 via CDN, portanto não há etapa de build. Basta fazer upload dos arquivos para o Netlify.
