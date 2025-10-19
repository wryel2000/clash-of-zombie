const GAME_WIDTH = 720;
const GAME_HEIGHT = 1280;
const ARENA = {
  top: 160,
  height: 880,
  left: 40,
  width: 640,
};

const CARD_LIBRARY = [
  {
    key: "walker",
    name: "Walker",
    emoji: "🧟",
    reference: "The Walking Dead",
    type: "unit",
    cost: 3,
    description: "Zumbi lento que pressiona o centro da arena.",
    baseStats: {
      health: 260,
      damage: 34,
      speed: 45,
      range: 40,
      attackInterval: 1.2,
      attackType: "melee",
    },
  },
  {
    key: "brute",
    name: "Brutamontes",
    emoji: "🧟‍♂️",
    reference: "Resident Evil",
    type: "unit",
    cost: 4,
    description: "Colosso resistente focado em destruir torres.",
    baseStats: {
      health: 520,
      damage: 72,
      speed: 30,
      range: 40,
      attackInterval: 1.6,
      attackType: "melee",
    },
  },
  {
    key: "sprinter",
    name: "Corredor",
    emoji: "🏃‍♂️",
    reference: "World War Z",
    type: "unit",
    cost: 2,
    description: "Infectado veloz ideal para pressionar rapidamente.",
    baseStats: {
      health: 150,
      damage: 28,
      speed: 90,
      range: 45,
      attackInterval: 1.1,
      attackType: "melee",
    },
  },
  {
    key: "ghoul",
    name: "Carniçal",
    emoji: "🧟‍♀️",
    reference: "Dying Light",
    type: "unit",
    cost: 3,
    description: "Saltadora que causa dano em área ao atacar.",
    baseStats: {
      health: 210,
      damage: 38,
      speed: 70,
      range: 55,
      attackInterval: 1.4,
      attackType: "splash",
    },
  },
  {
    key: "puker",
    name: "Ácido Vivo",
    emoji: "🤮",
    reference: "Left 4 Dead",
    type: "unit",
    cost: 4,
    description: "Cuspidor corrosivo de longo alcance.",
    baseStats: {
      health: 190,
      damage: 42,
      speed: 55,
      range: 200,
      attackInterval: 1.5,
      attackType: "ranged",
      projectileEmoji: "🧪",
    },
  },
  {
    key: "bomber",
    name: "Suicida",
    emoji: "💣",
    reference: "Back 4 Blood",
    type: "unit",
    cost: 3,
    description: "Corre até o alvo e explode causando grande dano.",
    baseStats: {
      health: 160,
      damage: 220,
      speed: 80,
      range: 30,
      attackInterval: 2.5,
      attackType: "suicide",
    },
  },
  {
    key: "tank",
    name: "Tanque",
    emoji: "🛡️",
    reference: "The Last of Us",
    type: "unit",
    cost: 5,
    description: "Gigante extremamente resistente com escudo.",
    baseStats: {
      health: 720,
      damage: 60,
      speed: 26,
      range: 50,
      attackInterval: 1.8,
      attackType: "melee",
    },
  },
  {
    key: "inferno",
    name: "Infernal",
    emoji: "🔥",
    reference: "Days Gone",
    type: "unit",
    cost: 4,
    description: "Zumbi flamejante que causa dano prolongado.",
    baseStats: {
      health: 230,
      damage: 34,
      speed: 60,
      range: 60,
      attackInterval: 0.9,
      attackType: "burn",
    },
  },
  {
    key: "reaper",
    name: "Ceifador",
    emoji: "🪓",
    reference: "Dead by Daylight",
    type: "unit",
    cost: 4,
    description: "Combatente de médio alcance com golpes cortantes.",
    baseStats: {
      health: 280,
      damage: 48,
      speed: 55,
      range: 80,
      attackInterval: 1.2,
      attackType: "melee",
    },
  },
  {
    key: "banshee",
    name: "Banshee",
    emoji: "🦇",
    reference: "Castlevania",
    type: "unit",
    cost: 3,
    description: "Criatura voadora que ignora obstáculos.",
    baseStats: {
      health: 170,
      damage: 32,
      speed: 95,
      range: 120,
      attackInterval: 1.0,
      attackType: "ranged",
      projectileEmoji: "🔊",
    },
  },
  {
    key: "butcher",
    name: "Açougueiro",
    emoji: "🔪",
    reference: "House of the Dead",
    type: "unit",
    cost: 5,
    description: "Carrasco devastador com ataques em arco.",
    baseStats: {
      health: 430,
      damage: 78,
      speed: 40,
      range: 60,
      attackInterval: 1.3,
      attackType: "splash",
    },
  },
  {
    key: "stalker",
    name: "Perseguidor",
    emoji: "🕵️",
    reference: "State of Decay",
    type: "unit",
    cost: 3,
    description: "Aproxima-se furtivamente causando dano crítico.",
    baseStats: {
      health: 200,
      damage: 56,
      speed: 70,
      range: 50,
      attackInterval: 1.6,
      attackType: "ambush",
    },
  },
  {
    key: "shaman",
    name: "Xamã",
    emoji: "🪄",
    reference: "Diablo",
    type: "unit",
    cost: 4,
    description: "Canaliza chamas etéreas que atingem múltiplos.",
    baseStats: {
      health: 240,
      damage: 38,
      speed: 45,
      range: 150,
      attackInterval: 1.1,
      attackType: "ranged",
      projectileEmoji: "✨",
    },
  },
  {
    key: "gargoyle",
    name: "Gárgula",
    emoji: "🪨",
    reference: "Dark Souls",
    type: "unit",
    cost: 4,
    description: "Guardião aéreo resistente ideal para defesa.",
    baseStats: {
      health: 300,
      damage: 40,
      speed: 50,
      range: 100,
      attackInterval: 1.3,
      attackType: "ranged",
      projectileEmoji: "🗿",
    },
  },
  {
    key: "hound",
    name: "Cão Infectado",
    emoji: "🐕‍🦺",
    reference: "Resident Evil",
    type: "unit",
    cost: 2,
    description: "Rastreia unidades com mordidas rápidas.",
    baseStats: {
      health: 150,
      damage: 30,
      speed: 100,
      range: 40,
      attackInterval: 0.9,
      attackType: "melee",
    },
  },
  {
    key: "knight",
    name: "Cavaleiro Caído",
    emoji: "🛡️",
    reference: "Game of Thrones",
    type: "unit",
    cost: 4,
    description: "Ex-guarda real com escudo e espada pesada.",
    baseStats: {
      health: 400,
      damage: 54,
      speed: 48,
      range: 60,
      attackInterval: 1.2,
      attackType: "melee",
    },
  },
  {
    key: "sniper",
    name: "Atiradora",
    emoji: "🎯",
    reference: "Sniper Elite",
    type: "unit",
    cost: 3,
    description: "Sobrevivente de elite com tiros perfurantes.",
    baseStats: {
      health: 150,
      damage: 60,
      speed: 45,
      range: 260,
      attackInterval: 1.8,
      attackType: "ranged",
      projectileEmoji: "🎯",
    },
  },
  {
    key: "engineer",
    name: "Engenheiro",
    emoji: "🛠️",
    reference: "Fortnite Save the World",
    type: "unit",
    cost: 3,
    description: "Constrói minas ao caminhar causando armadilhas.",
    baseStats: {
      health: 220,
      damage: 26,
      speed: 50,
      range: 70,
      attackInterval: 1.0,
      attackType: "melee",
    },
  },
  {
    key: "necromancer",
    name: "Necromante",
    emoji: "☠️",
    reference: "Warcraft",
    type: "unit",
    cost: 5,
    description: "Invoca esqueletos que auxiliam no combate.",
    baseStats: {
      health: 250,
      damage: 32,
      speed: 40,
      range: 180,
      attackInterval: 1.4,
      attackType: "summoner",
      projectileEmoji: "💀",
    },
  },
  {
    key: "titan",
    name: "Titã",
    emoji: "🗿",
    reference: "Attack on Titan",
    type: "unit",
    cost: 6,
    description: "Monstruosidade devastadora que avança lentamente.",
    baseStats: {
      health: 900,
      damage: 110,
      speed: 24,
      range: 70,
      attackInterval: 2.0,
      attackType: "melee",
    },
  },
  {
    key: "firestorm",
    name: "Tempestade Ígnea",
    emoji: "☄️",
    reference: "Call of Duty Zombies",
    type: "spell",
    cost: 4,
    description: "Chuva de fogo que explode ao impacto.",
    effect: "fire",
    radius: 140,
  },
  {
    key: "iceblast",
    name: "Rajada Glacial",
    emoji: "❄️",
    reference: "Frostpunk",
    type: "spell",
    cost: 3,
    description: "Congela inimigos reduzindo sua velocidade.",
    effect: "ice",
    radius: 150,
  },
  {
    key: "toxiccloud",
    name: "Névoa Tóxica",
    emoji: "☠️",
    reference: "Resident Evil",
    type: "spell",
    cost: 3,
    description: "Cria uma nuvem que corrói inimigos ao longo do tempo.",
    effect: "toxic",
    radius: 170,
  },
  {
    key: "healingwave",
    name: "Onda Curativa",
    emoji: "💚",
    reference: "Overwatch",
    type: "spell",
    cost: 2,
    description: "Cura aliados e fortalece sua regeneração.",
    effect: "heal",
    radius: 150,
  },
  {
    key: "stunorb",
    name: "Orbe Atordoante",
    emoji: "💫",
    reference: "Valorant",
    type: "spell",
    cost: 3,
    description: "Explosão luminosa que paralisa inimigos.",
    effect: "stun",
    radius: 130,
  },
  {
    key: "meteor",
    name: "Queda Meteórica",
    emoji: "🌠",
    reference: "Final Fantasy",
    type: "spell",
    cost: 5,
    description: "Um meteoro concentrado para destruir torres.",
    effect: "meteor",
    radius: 110,
  },
  {
    key: "arrowrain",
    name: "Chuva de Flechas",
    emoji: "🏹",
    reference: "Clash of Clans",
    type: "spell",
    cost: 3,
    description: "Projéteis perfurantes caem repetidamente.",
    effect: "arrows",
    radius: 200,
  },
  {
    key: "bonewall",
    name: "Muralha de Ossos",
    emoji: "🦴",
    reference: "Diablo",
    type: "spell",
    cost: 2,
    description: "Ergue uma barricada para travar inimigos.",
    effect: "wall",
    radius: 120,
  },
  {
    key: "bloodboil",
    name: "Fervor Sanguíneo",
    emoji: "🩸",
    reference: "V Rising",
    type: "spell",
    cost: 2,
    description: "Aumenta temporariamente o dano dos aliados.",
    effect: "buff",
    radius: 160,
  },
  {
    key: "shadowstep",
    name: "Passo Sombrio",
    emoji: "🕳️",
    reference: "Dishonored",
    type: "spell",
    cost: 2,
    description: "Teleporta o aliado mais próximo para o alvo.",
    effect: "teleport",
    radius: 100,
  },
];

const MAX_DECK_SIZE = 8;
const BASE_UPGRADE_COST = 120;

const GameStore = {
  gold: 1200,
  collection: CARD_LIBRARY.map((card, index) => ({
    key: card.key,
    level: 1,
    inDeck: index < MAX_DECK_SIZE,
  })),
  getCardDefinition(key) {
    return CARD_LIBRARY.find((card) => card.key === key);
  },
  getCardState(key) {
    return this.collection.find((entry) => entry.key === key);
  },
  getDeck() {
    return this.collection.filter((entry) => entry.inDeck).slice(0, MAX_DECK_SIZE);
  },
  toggleDeck(key) {
    const entry = this.getCardState(key);
    if (!entry) return false;
    if (entry.inDeck) {
      entry.inDeck = false;
      return true;
    }
    const currentDeck = this.getDeck();
    if (currentDeck.length >= MAX_DECK_SIZE) {
      return false;
    }
    entry.inDeck = true;
    return true;
  },
  upgradeCard(key) {
    const entry = this.getCardState(key);
    if (!entry) return { success: false, message: "Carta não encontrada." };
    const cost = this.getUpgradeCost(entry.level);
    if (this.gold < cost) {
      return { success: false, message: "Ouro insuficiente." };
    }
    this.gold -= cost;
    entry.level += 1;
    return { success: true, message: `${this.getCardDefinition(key).name} subiu para o nível ${entry.level}!` };
  },
  getUpgradeCost(level) {
    return Math.round(BASE_UPGRADE_COST * Math.pow(1.45, level - 1));
  },
};

function getCardStats(cardDef, level) {
  if (cardDef.type !== "unit") {
    return {};
  }
  const scale = 1 + (level - 1) * 0.22;
  return {
    health: Math.round(cardDef.baseStats.health * scale),
    damage: Math.round(cardDef.baseStats.damage * scale),
    speed: cardDef.baseStats.speed,
    range: cardDef.baseStats.range,
    attackInterval: Math.max(0.5, cardDef.baseStats.attackInterval * (1 - (level - 1) * 0.03)),
    attackType: cardDef.baseStats.attackType,
    projectileEmoji: cardDef.baseStats.projectileEmoji ?? "💥",
  };
}

function createButton(scene, x, y, width, height, label, callback, color = 0x38bdf8) {
  const rect = scene.add.rectangle(x, y, width, height, color, 1);
  rect.setStrokeStyle(3, 0x0f172a);
  rect.setInteractive({ useHandCursor: true });
  const text = scene.add
    .text(x, y, label, {
      fontFamily: "Roboto",
      fontSize: "28px",
      color: "#0f172a",
      fontStyle: "700",
    })
    .setOrigin(0.5);
  rect.on("pointerdown", () => {
    scene.sound?.play?.("click", { volume: 0.4 });
    callback();
  });
  return { rect, text };
}

class MenuScene extends Phaser.Scene {
  constructor() {
    super("MenuScene");
  }

  create() {
    this.cameras.main.setBackgroundColor("#0f172a");
    this.add
      .text(GAME_WIDTH / 2, 180, "Clash of Zombie", {
        fontFamily: "Roboto",
        fontSize: "64px",
        color: "#facc15",
        fontStyle: "900",
      })
      .setOrigin(0.5);

    this.add
      .text(GAME_WIDTH / 2, 260, "Arena vertical com batalhas de cartas e zumbis.", {
        fontFamily: "Roboto",
        fontSize: "24px",
        color: "#e2e8f0",
      })
      .setOrigin(0.5);

    this.add
      .text(GAME_WIDTH / 2, 320, "Monte seu deck de 8 cartas e enfrente o rei robô!", {
        fontFamily: "Roboto",
        fontSize: "22px",
        color: "#cbd5f5",
      })
      .setOrigin(0.5);

    createButton(this, GAME_WIDTH / 2, 440, 360, 90, "Iniciar Batalha", () => {
      if (GameStore.getDeck().length < MAX_DECK_SIZE) {
        this.showNotification("Selecione 8 cartas no deck antes de batalhar.");
        return;
      }
      this.scene.start("BattleScene");
    });

    createButton(this, GAME_WIDTH / 2, 560, 360, 90, "Preparar Deck", () => {
      this.scene.start("DeckScene");
    });

    this.goldText = this.add
      .text(GAME_WIDTH / 2, 680, `Ouro disponível: ${GameStore.gold}`, {
        fontFamily: "Roboto",
        fontSize: "24px",
        color: "#22c55e",
      })
      .setOrigin(0.5);

    this.tips = this.add
      .text(
        GAME_WIDTH / 2,
        GAME_HEIGHT - 200,
        "Use emojis para identificar unidades e feitiços. Elixir dobra após 1 minuto!",
        {
          fontFamily: "Roboto",
          fontSize: "20px",
          color: "#94a3b8",
          wordWrap: { width: GAME_WIDTH - 120 },
          align: "center",
        }
      )
      .setOrigin(0.5);

    this.message = this.add
      .text(GAME_WIDTH / 2, GAME_HEIGHT - 120, "", {
        fontFamily: "Roboto",
        fontSize: "22px",
        color: "#f87171",
      })
      .setOrigin(0.5);
  }

  showNotification(message) {
    this.message.setText(message);
    this.time.addEvent({
      delay: 2200,
      callback: () => this.message.setText(""),
    });
  }
}

class DeckScene extends Phaser.Scene {
  constructor() {
    super("DeckScene");
    this.scrollOffset = 0;
  }

  create() {
    this.cameras.main.setBackgroundColor("#0b1220");

    this.add
      .text(GAME_WIDTH / 2, 100, "Preparar Deck", {
        fontFamily: "Roboto",
        fontSize: "52px",
        color: "#facc15",
        fontStyle: "900",
      })
      .setOrigin(0.5);

    this.infoText = this.add
      .text(
        GAME_WIDTH / 2,
        160,
        "Escolha 8 cartas. Clique em uma carta para adicionar/remover do deck. Botão verde aumenta o nível (fora de batalha).",
        {
          fontFamily: "Roboto",
          fontSize: "20px",
          color: "#e2e8f0",
          wordWrap: { width: GAME_WIDTH - 120 },
          align: "center",
        }
      )
      .setOrigin(0.5);

    this.goldText = this.add
      .text(80, 200, `Ouro: ${GameStore.gold}`, {
        fontFamily: "Roboto",
        fontSize: "22px",
        color: "#22c55e",
      });

    this.deckText = this.add
      .text(GAME_WIDTH - 80, 200, `Deck: ${GameStore.getDeck().length}/${MAX_DECK_SIZE}`, {
        fontFamily: "Roboto",
        fontSize: "22px",
        color: "#f8fafc",
        align: "right",
      })
      .setOrigin(1, 0);

    this.cardContainer = this.add.container(0, 240);
    this.renderCollection();

    createButton(this, GAME_WIDTH / 2, GAME_HEIGHT - 160, 360, 80, "Voltar ao Menu", () => {
      this.scene.start("MenuScene");
    });

    this.message = this.add
      .text(GAME_WIDTH / 2, GAME_HEIGHT - 80, "", {
        fontFamily: "Roboto",
        fontSize: "22px",
        color: "#f87171",
      })
      .setOrigin(0.5);

    this.input.on("wheel", (pointer, over, dx, dy) => {
      this.scrollOffset = Phaser.Math.Clamp(this.scrollOffset - dy, -800, 0);
      this.cardContainer.y = 240 + this.scrollOffset;
    });
  }

  renderCollection() {
    this.cardContainer.removeAll(true);
    const cols = 4;
    const cardWidth = 150;
    const cardHeight = 180;
    const paddingX = (GAME_WIDTH - cols * cardWidth) / (cols + 1);

    GameStore.collection.forEach((entry, index) => {
      const card = GameStore.getCardDefinition(entry.key);
      const col = index % cols;
      const row = Math.floor(index / cols);
      const x = paddingX + col * (cardWidth + paddingX) + cardWidth / 2;
      const y = row * (cardHeight + 24) + cardHeight / 2;

      const bg = this.add.rectangle(x, y, cardWidth, cardHeight, 0x1f2937, 0.95);
      bg.setStrokeStyle(3, entry.inDeck ? 0xfacc15 : 0x334155);
      bg.setInteractive({ useHandCursor: true });
      bg.on("pointerdown", () => {
        const success = GameStore.toggleDeck(entry.key);
        if (!success) {
          this.showMessage("Deck já possui 8 cartas.");
        } else {
          this.deckText.setText(`Deck: ${GameStore.getDeck().length}/${MAX_DECK_SIZE}`);
          this.renderCollection();
        }
      });

      const emoji = this.add
        .text(x, y - 40, card.emoji, {
          fontFamily: "Segoe UI Emoji",
          fontSize: "48px",
        })
        .setOrigin(0.5);

      const name = this.add
        .text(x, y + 5, card.name, {
          fontFamily: "Roboto",
          fontSize: "18px",
          color: "#f8fafc",
        })
        .setOrigin(0.5);

      const detail = this.add
        .text(x, y + 36, `${card.type === "spell" ? "Feitiço" : "Unidade"} • Custo ${card.cost}`, {
          fontFamily: "Roboto",
          fontSize: "14px",
          color: "#94a3b8",
        })
        .setOrigin(0.5);

      const levelText = this.add
        .text(x, y - cardHeight / 2 + 16, `Nv. ${entry.level}`, {
          fontFamily: "Roboto",
          fontSize: "16px",
          color: "#c4b5fd",
        })
        .setOrigin(0.5);

      const upgradeRect = this.add.rectangle(x, y + cardHeight / 2 - 22, cardWidth - 24, 32, 0x22c55e, 0.95);
      upgradeRect.setInteractive({ useHandCursor: true });
      upgradeRect.on("pointerdown", (pointer) => {
        pointer.event.stopPropagation();
        const result = GameStore.upgradeCard(entry.key);
        if (result.success) {
          this.goldText.setText(`Ouro: ${GameStore.gold}`);
          this.showMessage(result.message, "success");
          this.renderCollection();
        } else {
          this.showMessage(result.message);
        }
      });

      const upgradeText = this.add
        .text(x, upgradeRect.y, `Upar (${GameStore.getUpgradeCost(entry.level)} ouro)`, {
          fontFamily: "Roboto",
          fontSize: "14px",
          color: "#0f172a",
          fontStyle: "700",
        })
        .setOrigin(0.5);

      this.cardContainer.add(bg);
      this.cardContainer.add(emoji);
      this.cardContainer.add(name);
      this.cardContainer.add(detail);
      this.cardContainer.add(levelText);
      this.cardContainer.add(upgradeRect);
      this.cardContainer.add(upgradeText);
    });
  }

  showMessage(message, variant = "error") {
    const color = variant === "success" ? "#22c55e" : "#f87171";
    this.message.setStyle({ color });
    this.message.setText(message);
    this.time.addEvent({
      delay: 2200,
      callback: () => this.message.setText(""),
    });
  }
}

class BattleScene extends Phaser.Scene {
  constructor() {
    super("BattleScene");
    this.units = [];
    this.towers = { player: [], enemy: [] };
    this.projectiles = [];
    this.spellZones = [];
  }

  create() {
    this.deck = GameStore.getDeck().map((entry) => ({
      ...entry,
      definition: GameStore.getCardDefinition(entry.key),
    }));

    this.enemyDeck = Phaser.Utils.Array.Shuffle(CARD_LIBRARY.slice()).slice(0, MAX_DECK_SIZE).map((card) => ({
      key: card.key,
      level: Phaser.Math.Between(1, 3),
      definition: card,
    }));

    this.units = [];
    this.projectiles = [];
    this.spellZones = [];
    this.towers = { player: [], enemy: [] };
    this.elapsed = 0;
    this.overtimeElapsed = 0;
    this.doubleElixir = false;
    this.phase = "battle";
    this.totalBattleTime = 180;
    this.overtimeDuration = 60;

    this.playerState = {
      elixir: 5,
      crowns: 0,
    };

    this.enemyState = {
      elixir: 5,
      crowns: 0,
    };

    this.cameras.main.setBackgroundColor("#0f172a");
    this.addArena();
    this.createTowers();
    this.createHUD();
    this.createCardBar();

    this.input.on("pointerdown", this.handlePointerDown, this);

    this.time.addEvent({
      delay: 3800,
      loop: true,
      callback: this.enemyRoutine,
      callbackScope: this,
    });
  }

  addArena() {
    const arena = this.add.rectangle(
      ARENA.left + ARENA.width / 2,
      ARENA.top + ARENA.height / 2,
      ARENA.width,
      ARENA.height,
      0x1f2937,
      1
    );
    arena.setStrokeStyle(6, 0x334155);

    this.add
      .text(GAME_WIDTH / 2, ARENA.top - 40, "Arena das Ruínas", {
        fontFamily: "Roboto",
        fontSize: "28px",
        color: "#94a3b8",
      })
      .setOrigin(0.5);

    this.add
      .text(GAME_WIDTH / 2, ARENA.top + ARENA.height / 2, "~ rio sinistro ~", {
        fontFamily: "Roboto",
        fontSize: "18px",
        color: "#334155",
        fontStyle: "italic",
      })
      .setOrigin(0.5);
  }

  createTowers() {
    const playerPositions = [
      { x: ARENA.left + 140, y: ARENA.top + ARENA.height - 140, type: "side" },
      { x: ARENA.left + ARENA.width - 140, y: ARENA.top + ARENA.height - 140, type: "side" },
      { x: ARENA.left + ARENA.width / 2, y: ARENA.top + ARENA.height - 60, type: "king" },
    ];

    const enemyPositions = [
      { x: ARENA.left + 140, y: ARENA.top + 140, type: "side" },
      { x: ARENA.left + ARENA.width - 140, y: ARENA.top + 140, type: "side" },
      { x: ARENA.left + ARENA.width / 2, y: ARENA.top + 60, type: "king" },
    ];

    playerPositions.forEach((pos) => {
      const tower = this.buildTower("player", pos.type, pos.x, pos.y);
      this.towers.player.push(tower);
    });

    enemyPositions.forEach((pos) => {
      const tower = this.buildTower("enemy", pos.type, pos.x, pos.y);
      this.towers.enemy.push(tower);
    });
  }

  buildTower(side, type, x, y) {
    const emoji = type === "king" ? "👑" : side === "player" ? "🏰" : "🩸";
    const sprite = this.add
      .text(x, y, emoji, {
        fontFamily: "Segoe UI Emoji",
        fontSize: type === "king" ? 72 : 60,
      })
      .setOrigin(0.5);

    const maxHealth = type === "king" ? 3200 : 2000;
    const damage = type === "king" ? 160 : 110;
    const attackInterval = type === "king" ? 1.1 : 0.9;
    const range = type === "king" ? 280 : 240;

    const healthBarBg = this.add.rectangle(x, y - (type === "king" ? 80 : 70), 120, 12, 0x0f172a);
    const healthBar = this.add.rectangle(x, healthBarBg.y, 116, 8, 0x22c55e);

    return {
      side,
      type,
      x,
      y,
      sprite,
      maxHealth,
      health: maxHealth,
      attackInterval,
      attackCooldown: attackInterval,
      damage,
      range,
      healthBar,
      healthBarBg,
      alive: true,
    };
  }

  createHUD() {
    this.elixirText = this.add
      .text(60, 40, "Elixir: 5/10", {
        fontFamily: "Roboto",
        fontSize: "26px",
        color: "#f8fafc",
      })
      .setOrigin(0, 0.5);

    this.timerText = this.add
      .text(GAME_WIDTH / 2, 40, "03:00", {
        fontFamily: "Roboto",
        fontSize: "30px",
        color: "#bfdbfe",
      })
      .setOrigin(0.5);

    this.statusText = this.add
      .text(GAME_WIDTH / 2, 80, "Modo batalha", {
        fontFamily: "Roboto",
        fontSize: "24px",
        color: "#facc15",
      })
      .setOrigin(0.5);

    this.crownText = this.add
      .text(GAME_WIDTH - 60, 40, "👑 0 x 0", {
        fontFamily: "Roboto",
        fontSize: "26px",
        color: "#f8fafc",
      })
      .setOrigin(1, 0.5);

    this.toastText = this.add
      .text(GAME_WIDTH / 2, ARENA.top + ARENA.height / 2, "", {
        fontFamily: "Roboto",
        fontSize: "30px",
        color: "#f8fafc",
        fontStyle: "700",
        align: "center",
        wordWrap: { width: 560 },
      })
      .setOrigin(0.5);
  }

  createCardBar() {
    this.cardButtons = [];
    const barHeight = 240;
    const bar = this.add.rectangle(GAME_WIDTH / 2, GAME_HEIGHT - barHeight / 2, GAME_WIDTH, barHeight, 0x0b1220, 0.95);
    bar.setDepth(5);

    const cardsPerRow = 4;
    const cardWidth = 150;
    const cardHeight = 120;
    const gap = 20;
    const startX = (GAME_WIDTH - cardsPerRow * cardWidth - (cardsPerRow - 1) * gap) / 2 + cardWidth / 2;
    const startY = GAME_HEIGHT - barHeight + 70;

    this.deck.forEach((cardEntry, index) => {
      const col = index % cardsPerRow;
      const row = Math.floor(index / cardsPerRow);
      const x = startX + col * (cardWidth + gap);
      const y = startY + row * (cardHeight + 30);

      const container = this.add.rectangle(x, y, cardWidth, cardHeight, 0x1f2937, 1);
      container.setStrokeStyle(3, 0x334155);
      container.setDepth(6);
      container.setInteractive({ useHandCursor: true });

      const emoji = this.add
        .text(x, y - 20, cardEntry.definition.emoji, {
          fontFamily: "Segoe UI Emoji",
          fontSize: "48px",
        })
        .setOrigin(0.5)
        .setDepth(7);

      const cost = this.add
        .text(x, y + 10, `Custo ${cardEntry.definition.cost}`, {
          fontFamily: "Roboto",
          fontSize: "18px",
          color: "#f8fafc",
        })
        .setOrigin(0.5)
        .setDepth(7);

      const level = this.add
        .text(x, y + 40, `Nv. ${cardEntry.level}`, {
          fontFamily: "Roboto",
          fontSize: "16px",
          color: "#c084fc",
        })
        .setOrigin(0.5)
        .setDepth(7);

      container.on("pointerdown", () => {
        this.selectCard(index);
      });

      this.cardButtons.push({ container, emoji, cost, level, cardEntry });
    });

    this.selectedCardIndex = 0;
    this.highlightSelectedCard();
  }
  selectCard(index) {
    this.selectedCardIndex = index;
    this.highlightSelectedCard();
  }

  highlightSelectedCard() {
    this.cardButtons.forEach((button, idx) => {
      button.container.setStrokeStyle(3, idx === this.selectedCardIndex ? 0xfacc15 : 0x334155);
    });
  }

  handlePointerDown(pointer) {
    if (this.phase === "finished") {
      this.scene.start("MenuScene");
      return;
    }

    if (!this.deck[this.selectedCardIndex]) {
      return;
    }

    const cardEntry = this.deck[this.selectedCardIndex];
    const cardDef = cardEntry.definition;
    const owner = this.playerState;

    if (owner.elixir < cardDef.cost) {
      this.showToast("Elixir insuficiente!");
      return;
    }

    if (pointer.y > GAME_HEIGHT - 240) {
      const clicked = this.cardButtons.findIndex((btn) => btn.container.getBounds().contains(pointer.x, pointer.y));
      if (clicked >= 0) {
        this.selectCard(clicked);
      }
      return;
    }

    if (cardDef.type === "unit") {
      if (pointer.y < ARENA.top + ARENA.height / 2) {
        this.showToast("Unidades só podem ser posicionadas na metade inferior!");
        return;
      }
      this.deployUnit("player", cardEntry, pointer.x, pointer.y);
      owner.elixir -= cardDef.cost;
      this.updateElixirText();
    } else {
      this.castSpell("player", cardEntry, pointer.x, pointer.y);
      owner.elixir -= cardDef.cost;
      this.updateElixirText();
    }
  }

  deployUnit(side, cardEntry, x, y) {
    const stats = getCardStats(cardEntry.definition, cardEntry.level);
    const sprite = this.add
      .text(x, y, cardEntry.definition.emoji, {
        fontFamily: "Segoe UI Emoji",
        fontSize: 48,
      })
      .setOrigin(0.5);

    const healthBarBg = this.add.rectangle(x, y - 48, 60, 8, 0x0f172a);
    const healthBar = this.add.rectangle(x, y - 48, 56, 6, 0x22c55e);

    const unit = {
      side,
      card: cardEntry.definition,
      level: cardEntry.level,
      sprite,
      healthBar,
      healthBarBg,
      x,
      y,
      stats,
      maxHealth: stats.health,
      health: stats.health,
      attackCooldown: stats.attackInterval,
      alive: true,
      effects: {},
    };

    this.units.push(unit);
    this.showToast(`${side === "player" ? "Você" : "Robô"} lançou ${cardEntry.definition.emoji} ${cardEntry.definition.name}!`);

    if (cardEntry.definition.key === "engineer") {
      unit.effects.mineCooldown = 3;
    }
    if (cardEntry.definition.key === "necromancer") {
      unit.effects.summonCooldown = 4;
    }
    return unit;
  }

  castSpell(side, cardEntry, x, y) {
    const card = cardEntry.definition;
    const level = cardEntry.level;
    const radius = card.radius;
    const visual = this.add.circle(x, y, radius, 0xffffff, 0.18);
    visual.setStrokeStyle(4, side === "player" ? 0x38bdf8 : 0xf87171);
    this.time.addEvent({ delay: 400, callback: () => visual.destroy() });

    switch (card.effect) {
      case "fire":
        this.spellZones.push({
          side,
          x,
          y,
          radius,
          duration: 0.4,
          elapsed: 0,
          type: "instant-damage",
          damage: 160 + level * 26,
          burn: 40 + level * 10,
        });
        this.spawnSpellEmoji(x, y, "☄️");
        break;
      case "ice":
        this.spellZones.push({
          side,
          x,
          y,
          radius,
          duration: 0.6,
          elapsed: 0,
          type: "slow",
          slowAmount: 0.4,
          damage: 80 + level * 14,
        });
        this.spawnSpellEmoji(x, y, "❄️");
        break;
      case "toxic":
        this.spellZones.push({
          side,
          x,
          y,
          radius,
          duration: 4,
          tick: 0.6,
          elapsed: 0,
          type: "damage-over-time",
          damage: 55 + level * 12,
        });
        this.spawnSpellEmoji(x, y, "☠️");
        break;
      case "heal":
        this.spellZones.push({
          side,
          x,
          y,
          radius,
          duration: 0.5,
          elapsed: 0,
          type: "heal",
          amount: 120 + level * 30,
        });
        this.spawnSpellEmoji(x, y, "💚");
        break;
      case "stun":
        this.spellZones.push({
          side,
          x,
          y,
          radius,
          duration: 0.4,
          elapsed: 0,
          type: "stun",
          stunDuration: 2,
        });
        this.spawnSpellEmoji(x, y, "💫");
        break;
      case "meteor":
        this.spellZones.push({
          side,
          x,
          y,
          radius,
          duration: 0.3,
          elapsed: 0,
          type: "tower-damage",
          damage: 300 + level * 80,
        });
        this.spawnSpellEmoji(x, y, "🌠");
        break;
      case "arrows":
        this.spellZones.push({
          side,
          x,
          y,
          radius,
          duration: 3,
          tick: 0.4,
          elapsed: 0,
          type: "arrow-rain",
          damage: 70 + level * 18,
        });
        this.spawnSpellEmoji(x, y, "🏹");
        break;
      case "wall":
        this.spawnSpellEmoji(x, y, "🦴");
        for (let i = -1; i <= 1; i++) {
          this.deployTemporaryWall(side, x + i * 50, y);
        }
        break;
      case "buff":
        this.spellZones.push({
          side,
          x,
          y,
          radius,
          duration: 5,
          elapsed: 0,
          type: "buff",
          bonus: 0.35 + level * 0.05,
        });
        this.spawnSpellEmoji(x, y, "🩸");
        break;
      case "teleport":
        this.spawnSpellEmoji(x, y, "🕳️");
        this.teleportAlly(side, x, y, 120 + level * 20);
        break;
    }

    this.showToast(`${side === "player" ? "Você" : "Robô"} lançou ${card.emoji} ${card.name}!`);
  }

  spawnSpellEmoji(x, y, emoji) {
    const sprite = this.add
      .text(x, y, emoji, {
        fontFamily: "Segoe UI Emoji",
        fontSize: 64,
      })
      .setOrigin(0.5);
    this.tweens.add({
      targets: sprite,
      alpha: 0,
      y: y - 40,
      duration: 600,
      onComplete: () => sprite.destroy(),
    });
  }

  deployTemporaryWall(side, x, y) {
    const sprite = this.add
      .text(x, y, "🦴", {
        fontFamily: "Segoe UI Emoji",
        fontSize: 44,
      })
      .setOrigin(0.5);
    const healthBarBg = this.add.rectangle(x, y - 40, 50, 8, 0x0f172a);
    const healthBar = this.add.rectangle(x, y - 40, 46, 6, 0x38bdf8);
    const unit = {
      side,
      card: { name: "Muralha de Ossos", baseStats: { attackType: "wall" } },
      level: 1,
      sprite,
      healthBar,
      healthBarBg,
      x,
      y,
      stats: { speed: 0, attackInterval: 999, range: 0, attackType: "wall" },
      maxHealth: 420,
      health: 420,
      attackCooldown: 999,
      alive: true,
      effects: {},
    };
    unit.decayTimer = 8;
    this.units.push(unit);
  }

  teleportAlly(side, x, y, bonus) {
    const candidates = this.units.filter((unit) => unit.side === side);
    if (candidates.length === 0) return;
    const unit = candidates.sort((a, b) => Phaser.Math.Distance.Between(a.x, a.y, x, y) - Phaser.Math.Distance.Between(b.x, b.y, x, y))[0];
    unit.x = x;
    unit.y = y;
    unit.sprite.setPosition(x, y);
    unit.healthBar.setPosition(x, y - 48);
    unit.healthBarBg.setPosition(x, y - 48);
    unit.effects.speedBoost = { duration: 4, amount: 1.4 };
    unit.effects.damageBoost = { duration: 4, amount: bonus / 100 };
  }

  enemyRoutine() {
    if (this.phase === "finished") {
      return;
    }
    const affordable = this.enemyDeck.filter((entry) => this.enemyState.elixir >= entry.definition.cost);
    if (affordable.length === 0) {
      return;
    }
    const cardEntry = Phaser.Utils.Array.GetRandom(affordable);
    const x = Phaser.Math.Between(ARENA.left + 60, ARENA.left + ARENA.width - 60);
    const y = Phaser.Math.Between(ARENA.top + 60, ARENA.top + ARENA.height / 2 - 30);
    if (cardEntry.definition.type === "unit") {
      this.deployUnit("enemy", cardEntry, x, y);
    } else {
      const targetX = this.pickEnemySpellTargetX();
      const targetY = this.pickEnemySpellTargetY(cardEntry.definition.effect);
      this.castSpell("enemy", cardEntry, targetX, targetY);
    }
    this.enemyState.elixir -= cardEntry.definition.cost;
  }

  pickEnemySpellTargetX() {
    if (this.units.some((u) => u.side === "player")) {
      const target = Phaser.Utils.Array.GetRandom(this.units.filter((u) => u.side === "player"));
      return target.x;
    }
    const tower = Phaser.Utils.Array.GetRandom(this.towers.player.filter((t) => t.alive));
    return tower ? tower.x : ARENA.left + ARENA.width / 2;
  }

  pickEnemySpellTargetY(effect) {
    if (effect === "heal" || effect === "buff" || effect === "teleport") {
      const ally = Phaser.Utils.Array.GetRandom(this.units.filter((u) => u.side === "enemy"));
      return ally ? ally.y : ARENA.top + ARENA.height / 3;
    }
    if (this.units.some((u) => u.side === "player")) {
      const target = Phaser.Utils.Array.GetRandom(this.units.filter((u) => u.side === "player"));
      return target.y;
    }
    const tower = Phaser.Utils.Array.GetRandom(this.towers.player.filter((t) => t.alive));
    return tower ? tower.y : ARENA.top + ARENA.height - 120;
  }
  update(time, delta) {
    if (this.phase === "finished") {
      return;
    }
    const dt = delta / 1000;
    this.elapsed += dt;

    if (!this.doubleElixir && this.elapsed >= 60) {
      this.doubleElixir = true;
      this.showToast("⚡ Elixir em dobro!");
    }

    const regen = (this.doubleElixir ? 0.6 : 0.3) * dt;
    this.playerState.elixir = Math.min(10, this.playerState.elixir + regen);
    this.enemyState.elixir = Math.min(10, this.enemyState.elixir + regen);
    this.updateElixirText();

    this.updateUnits(dt);
    this.updateTowers(dt);
    this.updateProjectiles(dt);
    this.updateSpellZones(dt);
    if (this.phase === "overtime") {
      this.overtimeElapsed += dt;
    }
    this.cleanupEntities();
    this.updateTimer();
    this.checkWinConditions();
  }

  updateUnits(dt) {
    this.units.forEach((unit) => {
      if (!unit.alive) return;
      if (unit.decayTimer) {
        unit.decayTimer -= dt;
        if (unit.decayTimer <= 0) {
          this.damageUnit(unit, unit.health);
          return;
        }
      }

      if (unit.effects.stun) {
        unit.effects.stun -= dt;
        return;
      }

      const target = this.findUnitTarget(unit);
      if (target) {
        const distance = Phaser.Math.Distance.Between(unit.x, unit.y, target.x, target.y);
        const range = unit.stats.range;
        if (distance <= range) {
          unit.attackCooldown -= dt;
          if (unit.attackCooldown <= 0) {
            this.attackTarget(unit, target);
            unit.attackCooldown = unit.stats.attackInterval;
          }
        } else {
          this.moveUnitToward(unit, target, dt);
        }
      } else {
        const towerTarget = this.findTowerTarget(unit);
        if (towerTarget) {
          const distance = Phaser.Math.Distance.Between(unit.x, unit.y, towerTarget.x, towerTarget.y);
          if (distance <= unit.stats.range) {
            unit.attackCooldown -= dt;
            if (unit.attackCooldown <= 0) {
              this.attackTower(unit, towerTarget);
              unit.attackCooldown = unit.stats.attackInterval;
            }
          } else {
            this.moveUnitToward(unit, towerTarget, dt);
          }
        }
      }

      if (unit.effects.mineCooldown !== undefined) {
        unit.effects.mineCooldown -= dt;
        if (unit.effects.mineCooldown <= 0) {
          unit.effects.mineCooldown = 4;
          this.spawnMine(unit);
        }
      }

      if (unit.effects.summonCooldown !== undefined) {
        unit.effects.summonCooldown -= dt;
        if (unit.effects.summonCooldown <= 0) {
          unit.effects.summonCooldown = 6;
          const offset = Phaser.Math.Between(-40, 40);
          this.spawnSkeleton(unit.side, unit.x + offset, unit.y + 30);
        }
      }

      if (unit.effects.speedBoost) {
        unit.effects.speedBoost.duration -= dt;
        if (unit.effects.speedBoost.duration <= 0) {
          delete unit.effects.speedBoost;
        }
      }

      if (unit.effects.damageBoost) {
        unit.effects.damageBoost.duration -= dt;
        if (unit.effects.damageBoost.duration <= 0) {
          delete unit.effects.damageBoost;
        }
      }

      if (unit.effects.slow) {
        unit.effects.slow.duration -= dt;
        if (unit.effects.slow.duration <= 0) {
          delete unit.effects.slow;
        }
      }

      if (unit.effects.burn) {
        unit.effects.burn.timer -= dt;
        if (unit.effects.burn.timer <= 0) {
          this.damageUnit(unit, unit.effects.burn.damage);
          unit.effects.burn.timer = 1;
          unit.effects.burn.duration -= 1;
          if (unit.effects.burn.duration <= 0) {
            delete unit.effects.burn;
          }
        }
      }
    });
  }

  moveUnitToward(unit, target, dt) {
    const speedMultiplier = unit.effects.speedBoost ? unit.effects.speedBoost.amount : 1;
    const slowMultiplier = unit.effects.slow ? unit.effects.slow.multiplier : 1;
    const speed = unit.stats.speed * dt * speedMultiplier * slowMultiplier;
    const angle = Phaser.Math.Angle.Between(unit.x, unit.y, target.x, target.y);
    unit.x += Math.cos(angle) * speed;
    unit.y += Math.sin(angle) * speed;
    unit.sprite.setPosition(unit.x, unit.y);
    unit.healthBar.setPosition(unit.x, unit.y - 48);
    unit.healthBarBg.setPosition(unit.x, unit.y - 48);
  }

  findUnitTarget(unit) {
    const enemies = this.units.filter((candidate) => candidate.side !== unit.side && candidate.alive);
    if (enemies.length === 0) return null;
    enemies.sort(
      (a, b) =>
        Phaser.Math.Distance.Between(unit.x, unit.y, a.x, a.y) -
        Phaser.Math.Distance.Between(unit.x, unit.y, b.x, b.y)
    );
    return enemies[0];
  }

  findTowerTarget(unit) {
    const enemyTowers = this.towers[unit.side === "player" ? "enemy" : "player"].filter((tower) => tower.alive);
    if (enemyTowers.length === 0) return null;
    enemyTowers.sort(
      (a, b) =>
        Phaser.Math.Distance.Between(unit.x, unit.y, a.x, a.y) -
        Phaser.Math.Distance.Between(unit.x, unit.y, b.x, b.y)
    );
    return enemyTowers[0];
  }

  attackTarget(attacker, target) {
    if (!target.alive) return;
    let damage = attacker.stats.damage;
    if (attacker.effects.damageBoost) {
      damage = Math.round(damage * (1 + attacker.effects.damageBoost.amount));
    }
    if (attacker.stats.attackType === "suicide") {
      this.damageUnit(attacker, attacker.health);
      this.damageUnit(target, damage);
      this.spawnImpact(attacker.x, attacker.y, "💥");
      return;
    }
    if (attacker.stats.attackType === "burn") {
      this.damageUnit(target, damage);
      target.effects.burn = { duration: 3, damage: Math.round(damage * 0.3), timer: 1 };
      this.spawnImpact(target.x, target.y, "🔥");
      return;
    }
    if (attacker.stats.attackType === "ambush") {
      damage = Math.round(damage * 1.8);
    }
    if (attacker.stats.attackType === "summoner") {
      this.fireProjectile(attacker, target, damage, attacker.stats.projectileEmoji ?? "💀");
      return;
    }
    if (attacker.card.baseStats.attackType === "ranged") {
      this.fireProjectile(attacker, target, damage, attacker.stats.projectileEmoji ?? "💥");
    } else if (attacker.card.baseStats.attackType === "splash") {
      this.damageUnit(target, damage);
      this.units
        .filter((unit) => unit.side !== attacker.side && unit !== target)
        .forEach((unit) => {
          if (Phaser.Math.Distance.Between(unit.x, unit.y, target.x, target.y) < 80) {
            this.damageUnit(unit, Math.round(damage * 0.6));
          }
        });
      this.spawnImpact(target.x, target.y, "💢");
    } else {
      this.damageUnit(target, damage);
      this.spawnImpact(target.x, target.y, "🗡️");
    }
  }

  attackTower(unit, tower) {
    let damage = unit.stats.damage;
    if (unit.effects.damageBoost) {
      damage = Math.round(damage * (1 + unit.effects.damageBoost.amount));
    }
    if (unit.stats.attackType === "suicide") {
      this.damageUnit(unit, unit.health);
      this.hitTower(unit, tower, damage);
      this.spawnImpact(tower.x, tower.y, "💥");
      return;
    }
    if (unit.stats.attackType === "splash") {
      this.hitTower(unit, tower, damage);
      this.spawnImpact(tower.x, tower.y, "💥");
      return;
    }
    if (unit.card.baseStats.attackType === "ranged" || unit.stats.attackType === "summoner") {
      this.fireProjectile(unit, tower, damage, unit.stats.projectileEmoji ?? "💥");
    } else {
      this.hitTower(unit, tower, damage);
      this.spawnImpact(tower.x, tower.y, "⚔️");
    }
  }

  spawnMine(unit) {
    const sprite = this.add
      .text(unit.x, unit.y, "💣", {
        fontFamily: "Segoe UI Emoji",
        fontSize: 36,
      })
      .setOrigin(0.5);
    const mine = {
      side: unit.side,
      x: unit.x,
      y: unit.y,
      sprite,
      damage: 180,
      radius: 90,
    };
    this.time.addEvent({
      delay: 8000,
      callback: () => {
        if (!sprite.active) return;
        sprite.destroy();
      },
    });
    this.projectiles.push({ type: "mine", data: mine });
  }

  spawnSkeleton(side, x, y) {
    const definition = {
      emoji: "💀",
      key: "skeleton",
      name: "Esqueleto",
      type: "unit",
      cost: 1,
      baseStats: {
        health: 120,
        damage: 32,
        speed: 70,
        range: 40,
        attackInterval: 1.1,
        attackType: "melee",
      },
    };
    const cardEntry = { definition, level: 1 };
    this.deployUnit(side, cardEntry, x, y);
  }

  fireProjectile(attacker, target, damage, emoji = "💥") {
    const sprite = this.add
      .text(attacker.x, attacker.y, emoji, {
        fontFamily: "Segoe UI Emoji",
        fontSize: 32,
      })
      .setOrigin(0.5);
    this.projectiles.push({
      type: "projectile",
      sprite,
      x: attacker.x,
      y: attacker.y,
      target,
      speed: 340,
      damage,
      source: attacker,
    });
  }

  spawnImpact(x, y, emoji) {
    const sprite = this.add
      .text(x, y, emoji, {
        fontFamily: "Segoe UI Emoji",
        fontSize: 36,
      })
      .setOrigin(0.5);
    this.tweens.add({
      targets: sprite,
      alpha: 0,
      scale: 1.6,
      duration: 400,
      onComplete: () => sprite.destroy(),
    });
  }

  updateProjectiles(dt) {
    this.projectiles = this.projectiles.filter((projectile) => {
      if (projectile.type === "mine") {
        if (!projectile.data.sprite.active) {
          return false;
        }
        const hit = this.units.find(
          (unit) =>
            unit.side !== projectile.data.side &&
            Phaser.Math.Distance.Between(unit.x, unit.y, projectile.data.x, projectile.data.y) <= projectile.data.radius
        );
        if (hit) {
          this.spawnImpact(projectile.data.x, projectile.data.y, "💣");
          this.units
            .filter((unit) => unit.side !== projectile.data.side)
            .forEach((unit) => {
              if (Phaser.Math.Distance.Between(unit.x, unit.y, projectile.data.x, projectile.data.y) <= projectile.data.radius) {
                this.damageUnit(unit, projectile.data.damage);
              }
            });
          projectile.data.sprite.destroy();
          return false;
        }
        return true;
      }

      const proj = projectile;
      if (!proj.target || !proj.target.alive) {
        proj.sprite.destroy();
        return false;
      }
      const angle = Phaser.Math.Angle.Between(proj.x, proj.y, proj.target.x, proj.target.y);
      const speed = proj.speed * dt;
      proj.x += Math.cos(angle) * speed;
      proj.y += Math.sin(angle) * speed;
      proj.sprite.setPosition(proj.x, proj.y);
      if (Phaser.Math.Distance.Between(proj.x, proj.y, proj.target.x, proj.target.y) < 18) {
        if (proj.target.health !== undefined) {
          this.damageUnit(proj.target, proj.damage);
        } else {
          this.hitTower(proj.source, proj.target, proj.damage);
        }
        this.spawnImpact(proj.target.x, proj.target.y, "💥");
        proj.sprite.destroy();
        return false;
      }
      return true;
    });
  }
  updateSpellZones(dt) {
    this.spellZones = this.spellZones.filter((zone) => {
      zone.elapsed += dt;
      if (zone.tick) {
        zone.tickCounter = (zone.tickCounter ?? zone.tick) - dt;
        if (zone.tickCounter <= 0) {
          this.applyZoneEffect(zone);
          zone.tickCounter = zone.tick;
        }
      } else if (zone.elapsed <= zone.duration) {
        this.applyZoneEffect(zone);
      }
      return zone.elapsed < zone.duration;
    });
  }

  applyZoneEffect(zone) {
    if (zone.type === "instant-damage") {
      this.units
        .filter((unit) => unit.side !== zone.side)
        .forEach((unit) => {
          if (Phaser.Math.Distance.Between(unit.x, unit.y, zone.x, zone.y) <= zone.radius) {
            this.damageUnit(unit, zone.damage);
            unit.effects.burn = { duration: 3, damage: zone.burn, timer: 1 };
          }
        });
      const towers = this.towers[zone.side === "player" ? "enemy" : "player"];
      towers
        .filter((tower) => tower.alive)
        .forEach((tower) => {
          if (Phaser.Math.Distance.Between(tower.x, tower.y, zone.x, zone.y) <= zone.radius) {
            this.hitTower({ side: zone.side }, tower, Math.round(zone.damage * 0.6));
          }
        });
    } else if (zone.type === "slow") {
      this.units
        .filter((unit) => unit.side !== zone.side)
        .forEach((unit) => {
          if (Phaser.Math.Distance.Between(unit.x, unit.y, zone.x, zone.y) <= zone.radius) {
            this.damageUnit(unit, zone.damage * 0.4);
            unit.effects.slow = { multiplier: zone.slowAmount ?? 0.5, duration: 2 };
            unit.effects.stun = Math.max(unit.effects.stun ?? 0, 0.6);
          }
        });
    } else if (zone.type === "damage-over-time") {
      this.units
        .filter((unit) => unit.side !== zone.side)
        .forEach((unit) => {
          if (Phaser.Math.Distance.Between(unit.x, unit.y, zone.x, zone.y) <= zone.radius) {
            this.damageUnit(unit, zone.damage);
          }
        });
    } else if (zone.type === "heal") {
      this.units
        .filter((unit) => unit.side === zone.side)
        .forEach((unit) => {
          if (Phaser.Math.Distance.Between(unit.x, unit.y, zone.x, zone.y) <= zone.radius) {
            this.healUnit(unit, zone.amount);
          }
        });
    } else if (zone.type === "stun") {
      this.units
        .filter((unit) => unit.side !== zone.side)
        .forEach((unit) => {
          if (Phaser.Math.Distance.Between(unit.x, unit.y, zone.x, zone.y) <= zone.radius) {
            unit.effects.stun = Math.max(unit.effects.stun ?? 0, zone.stunDuration);
          }
        });
    } else if (zone.type === "tower-damage") {
      this.towers[zone.side === "player" ? "enemy" : "player"].forEach((tower) => {
        if (tower.alive && Phaser.Math.Distance.Between(tower.x, tower.y, zone.x, zone.y) <= zone.radius) {
          this.hitTower({ side: zone.side }, tower, zone.damage);
        }
      });
    } else if (zone.type === "arrow-rain") {
      this.units
        .filter((unit) => unit.side !== zone.side)
        .forEach((unit) => {
          if (Phaser.Math.Distance.Between(unit.x, unit.y, zone.x, zone.y) <= zone.radius) {
            this.damageUnit(unit, zone.damage);
          }
        });
    } else if (zone.type === "buff") {
      this.units
        .filter((unit) => unit.side === zone.side)
        .forEach((unit) => {
          if (Phaser.Math.Distance.Between(unit.x, unit.y, zone.x, zone.y) <= zone.radius) {
            unit.effects.damageBoost = { duration: 4, amount: zone.bonus };
          }
        });
    }
  }

  damageUnit(unit, amount) {
    if (!unit.alive) return;
    unit.health -= amount;
    if (unit.health <= 0) {
      unit.alive = false;
      unit.sprite.destroy();
      unit.healthBar.destroy();
      unit.healthBarBg.destroy();
      return;
    }
    unit.healthBar.setScale(Phaser.Math.Clamp(unit.health / unit.maxHealth, 0, 1), 1);
  }

  healUnit(unit, amount) {
    if (!unit.alive) return;
    unit.health = Math.min(unit.maxHealth, unit.health + amount);
    unit.healthBar.setScale(Phaser.Math.Clamp(unit.health / unit.maxHealth, 0, 1), 1);
    this.spawnImpact(unit.x, unit.y - 20, "💚");
  }

  updateTowers(dt) {
    ["player", "enemy"].forEach((side) => {
      this.towers[side].forEach((tower) => {
        if (!tower.alive) return;
        tower.attackCooldown -= dt;
        if (tower.attackCooldown <= 0) {
          const target = this.findNearestUnitForTower(side, tower);
          if (target) {
            this.fireTowerProjectile(tower, target);
            tower.attackCooldown = tower.attackInterval;
          }
        }
      });
    });
  }

  findNearestUnitForTower(side, tower) {
    const enemies = this.units.filter((unit) => unit.side !== side && unit.alive);
    if (enemies.length === 0) return null;
    enemies.sort(
      (a, b) =>
        Phaser.Math.Distance.Between(tower.x, tower.y, a.x, a.y) -
        Phaser.Math.Distance.Between(tower.x, tower.y, b.x, b.y)
    );
    if (Phaser.Math.Distance.Between(tower.x, tower.y, enemies[0].x, enemies[0].y) <= tower.range) {
      return enemies[0];
    }
    return null;
  }

  fireTowerProjectile(tower, target) {
    const sprite = this.add
      .text(tower.x, tower.y, "💥", {
        fontFamily: "Segoe UI Emoji",
        fontSize: 40,
      })
      .setOrigin(0.5);
    this.projectiles.push({
      type: "projectile",
      sprite,
      x: tower.x,
      y: tower.y,
      target,
      speed: 360,
      damage: tower.damage,
      source: tower,
    });
  }

  hitTower(source, tower, damage) {
    if (!tower.alive) return;
    tower.health -= damage;
    if (tower.health <= 0) {
      tower.alive = false;
      tower.sprite.destroy();
      tower.healthBar.destroy();
      tower.healthBarBg.destroy();
      const crowns = tower.type === "king" ? 3 : 1;
      if (source.side === "player") {
        this.playerState.crowns += crowns;
      } else {
        this.enemyState.crowns += crowns;
      }
      this.updateCrowns();
      this.showToast(`${source.side === "player" ? "Você" : "Robô"} destruiu uma torre!`);
    } else {
      tower.healthBar.setScale(Phaser.Math.Clamp(tower.health / tower.maxHealth, 0, 1), 1);
    }
  }

  cleanupEntities() {
    this.units = this.units.filter((unit) => unit.alive);
  }

  updateElixirText() {
    this.elixirText.setText(`Elixir: ${Math.floor(this.playerState.elixir * 10) / 10}/10`);
  }

  updateCrowns() {
    this.crownText.setText(`👑 ${this.playerState.crowns} x ${this.enemyState.crowns}`);
  }

  updateTimer() {
    if (this.phase === "battle") {
      const remaining = Math.max(0, this.totalBattleTime - this.elapsed);
      this.timerText.setText(this.formatTime(remaining));
      this.statusText.setText(this.doubleElixir ? "Modo batalha (2x)" : "Modo batalha");
      if (remaining <= 0) {
        if (this.playerState.crowns === this.enemyState.crowns) {
          this.phase = "overtime";
          this.overtimeElapsed = 0;
          this.showToast("⏱️ Morte súbita! Próxima torre vence.");
          this.timerText.setText(this.formatTime(this.overtimeDuration));
          this.statusText.setText("Morte súbita");
        } else {
          this.endMatch(this.playerState.crowns > this.enemyState.crowns ? "Vitória por coroas!" : "Derrota por coroas.");
        }
      }
    } else if (this.phase === "overtime") {
      const remaining = Math.max(0, this.overtimeDuration - this.overtimeElapsed);
      this.timerText.setText(this.formatTime(remaining));
      this.statusText.setText("Morte súbita");
    }
  }

  checkWinConditions() {
    const enemyKing = this.towers.enemy.find((tower) => tower.type === "king");
    const playerKing = this.towers.player.find((tower) => tower.type === "king");
    if (enemyKing && !enemyKing.alive) {
      this.endMatch("Vitória! Rei inimigo abatido.");
      return;
    }
    if (playerKing && !playerKing.alive) {
      this.endMatch("Derrota! Seu rei caiu.");
      return;
    }

    if (this.phase === "overtime") {
      const remaining = Math.max(0, this.overtimeDuration - this.overtimeElapsed);
      if (remaining <= 0) {
        if (this.playerState.crowns === this.enemyState.crowns) {
          this.endMatch("Empate épico!");
        } else {
          this.endMatch(
            this.playerState.crowns > this.enemyState.crowns
              ? "Vitória na morte súbita!"
              : "Derrota na morte súbita."
          );
        }
      }
    }
  }

  endMatch(message) {
    this.phase = "finished";
    this.showToast(`${message}\nToque para voltar ao menu.`);
    this.input.once("pointerdown", () => {
      this.scene.start("MenuScene");
    });
  }

  formatTime(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60)
      .toString()
      .padStart(2, "0");
    const seconds = Math.floor(totalSeconds % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  }

  showToast(message) {
    this.toastText.setText(message);
    this.time.addEvent({
      delay: 2300,
      callback: () => {
        if (this.phase !== "finished") {
          this.toastText.setText("");
        }
      },
    });
  }
}

const config = {
  type: Phaser.AUTO,
  width: GAME_WIDTH,
  height: GAME_HEIGHT,
  parent: "game-root",
  backgroundColor: "#0f172a",
  scene: [MenuScene, DeckScene, BattleScene],
};

new Phaser.Game(config);

