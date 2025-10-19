const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;
const LANES = {
  top: GAME_HEIGHT * 0.33,
  bottom: GAME_HEIGHT * 0.66,
};

const CARD_LIBRARY = [
  {
    key: "walker",
    name: "Walker",
    reference: "The Walking Dead",
    color: 0x22c55e,
    cost: 3,
    baseStats: { health: 160, damage: 32, speed: 40, attackInterval: 1.1, range: 32 },
    description: "Zumbi clássico que pressiona a linha.",
  },
  {
    key: "brute",
    name: "Bruto",
    reference: "Resident Evil",
    color: 0xf97316,
    cost: 4,
    baseStats: { health: 320, damage: 55, speed: 28, attackInterval: 1.4, range: 36 },
    description: "Pesadelo blindado que aguenta muitas flechas.",
  },
  {
    key: "ranger",
    name: "Atiradora",
    reference: "Left 4 Dead",
    color: 0x38bdf8,
    cost: 5,
    baseStats: { health: 190, damage: 48, speed: 36, attackInterval: 0.9, range: 120 },
    description: "Sobrevivente com rifle capaz de atacar à distância.",
  },
];

class ClashScene extends Phaser.Scene {
  constructor() {
    super("ClashScene");
    this.selectedCard = null;
    this.units = [];
    this.towers = { player: [], enemy: [] };
    this.elapsed = 0;
    this.overtimeElapsed = 0;
    this.phase = "battle"; // battle -> overtime -> finished
    this.doubleElixir = false;
    this.totalBattleTime = 180;
    this.overtimeDuration = 60;
    this.playerData = { elixir: 5, crowns: 0, gold: 150 };
    this.enemyData = { elixir: 5, crowns: 0, gold: 150 };
  }

  create() {
    this.units = [];
    this.towers = { player: [], enemy: [] };
    this.elapsed = 0;
    this.overtimeElapsed = 0;
    this.phase = "battle";
    this.doubleElixir = false;
    this.playerData = { elixir: 5, crowns: 0, gold: 150 };
    this.enemyData = { elixir: 5, crowns: 0, gold: 150 };

    this.addBattlefield();
    this.createTowers();
    this.createCardBar();
    this.createHUD();

    this.input.on("pointerdown", this.handleBattlefieldPointer, this);

    this.time.addEvent({
      delay: 3500,
      loop: true,
      callback: this.enemyRoutine,
      callbackScope: this,
    });
  }

  addBattlefield() {
    this.cameras.main.setBackgroundColor("#111827");
    const arena = this.add.rectangle(
      GAME_WIDTH / 2,
      GAME_HEIGHT / 2,
      GAME_WIDTH,
      GAME_HEIGHT,
      0x1f2937
    );
    arena.setDepth(-2);

    const river = this.add.rectangle(
      GAME_WIDTH / 2,
      GAME_HEIGHT / 2,
      GAME_WIDTH,
      20,
      0x0f172a
    );
    river.setDepth(-1);

    Object.values(LANES).forEach((laneY) => {
      const laneLine = this.add.line(
        0,
        0,
        80,
        laneY,
        GAME_WIDTH - 80,
        laneY,
        0x0f172a
      );
      laneLine.setOrigin(0, 0);
      laneLine.setLineWidth(4);
      laneLine.setDepth(-1);
    });

    this.add
      .text(GAME_WIDTH / 2, 40, "Clash of Zombie", {
        fontFamily: "Roboto",
        fontSize: "32px",
        fontStyle: "700",
        color: "#facc15",
      })
      .setOrigin(0.5);

    this.add
      .text(GAME_WIDTH / 2, 70, "Defenda suas torres e destrua o rei inimigo!", {
        fontFamily: "Roboto",
        fontSize: "16px",
        color: "#e2e8f0",
      })
      .setOrigin(0.5);
  }

  createTowers() {
    const towerLayout = {
      player: [
        { x: 170, y: LANES.top, type: "top" },
        { x: 170, y: LANES.bottom, type: "bottom" },
        { x: 80, y: GAME_HEIGHT / 2, type: "king" },
      ],
      enemy: [
        { x: GAME_WIDTH - 170, y: LANES.top, type: "top" },
        { x: GAME_WIDTH - 170, y: LANES.bottom, type: "bottom" },
        { x: GAME_WIDTH - 80, y: GAME_HEIGHT / 2, type: "king" },
      ],
    };

    ["player", "enemy"].forEach((side) => {
      towerLayout[side].forEach((layout) => {
        const tower = this.buildTower(side, layout.type, layout.x, layout.y);
        this.towers[side].push(tower);
      });
    });
  }

  buildTower(side, type, x, y) {
    const baseColor = side === "player" ? 0x38bdf8 : 0xf87171;
    const width = type === "king" ? 56 : 48;
    const height = type === "king" ? 90 : 70;
    const sprite = this.add.rectangle(x, y, width, height, baseColor);
    sprite.setStrokeStyle(4, 0x0f172a);

    const maxHealth = type === "king" ? 2400 : 1600;
    const attackInterval = type === "king" ? 1.2 : 1.0;
    const damage = type === "king" ? 140 : 90;
    const range = type === "king" ? 220 : 180;

    const healthBarBg = this.add.rectangle(
      x,
      y - height / 2 - 12,
      width,
      8,
      0x1f2937
    );
    const healthBar = this.add.rectangle(
      x,
      y - height / 2 - 12,
      width - 4,
      6,
      0x22c55e
    );

    return {
      side,
      type,
      x,
      y,
      sprite,
      healthBarBg,
      healthBar,
      maxHealth,
      health: maxHealth,
      attackInterval,
      attackCooldown: 0,
      damage,
      range,
      alive: true,
      lane: type === "king" ? null : type,
    };
  }

  createCardBar() {
    this.cards = CARD_LIBRARY.map((card) => ({
      ...card,
      level: 1,
      upgradeCost: 60,
    }));

    const barHeight = 120;
    const graphics = this.add.rectangle(
      GAME_WIDTH / 2,
      GAME_HEIGHT - barHeight / 2,
      GAME_WIDTH,
      barHeight,
      0x0f172a
    );
    graphics.setDepth(10);
    graphics.setAlpha(0.95);

    this.cardTextElements = [];

    this.cards.forEach((card, index) => {
      const cardWidth = 220;
      const offset = 30 + index * (cardWidth + 10);
      const container = this.add.rectangle(
        offset + cardWidth / 2,
        GAME_HEIGHT - barHeight / 2,
        cardWidth,
        barHeight - 16,
        0x1f2937
      );
      container.setStrokeStyle(2, 0x334155);
      container.setDepth(11);
      container.setInteractive({ useHandCursor: true });
      container.on("pointerdown", () => this.selectCard(card));

      const title = this.add
        .text(container.x - cardWidth / 2 + 12, container.y - 40, card.name, {
          fontFamily: "Roboto",
          fontSize: "18px",
          color: "#f1f5f9",
        })
        .setDepth(12)
        .setInteractive({ useHandCursor: true })
        .on("pointerdown", () => this.selectCard(card));

      const desc = this.add
        .text(
          container.x - cardWidth / 2 + 12,
          container.y - 12,
          `${card.reference} | ${card.description}`,
          {
            fontFamily: "Roboto",
            fontSize: "12px",
            color: "#cbd5f5",
            wordWrap: { width: cardWidth - 24 },
          }
        )
        .setDepth(12);

      const statsText = this.add
        .text(
          container.x - cardWidth / 2 + 12,
          container.y + 18,
          this.getCardStatsText(card),
          {
            fontFamily: "Roboto",
            fontSize: "12px",
            color: "#e2e8f0",
          }
        )
        .setDepth(12);

      const upgradeButton = this.add
        .rectangle(
          container.x + cardWidth / 2 - 60,
          container.y + 36,
          90,
          26,
          0x22c55e
        )
        .setDepth(12)
        .setInteractive({ useHandCursor: true })
        .on("pointerdown", (pointer) => {
          pointer.event.stopPropagation();
          this.upgradeCard(card);
        });

      const upgradeText = this.add
        .text(upgradeButton.x, upgradeButton.y, "UPAR", {
          fontFamily: "Roboto",
          fontSize: "12px",
          color: "#0f172a",
          fontStyle: "700",
        })
        .setDepth(13)
        .setOrigin(0.5);

      const costText = this.add
        .text(upgradeButton.x, upgradeButton.y + 18, `Custo ${card.upgradeCost}`, {
          fontFamily: "Roboto",
          fontSize: "11px",
          color: "#facc15",
        })
        .setDepth(13)
        .setOrigin(0.5);

      this.cardTextElements.push({
        card,
        container,
        title,
        desc,
        statsText,
        upgradeText,
        costText,
      });
    });
  }

  getCardStatsText(card) {
    const multiplier = 1 + (card.level - 1) * 0.25;
    const stats = card.baseStats;
    return `Nível ${card.level} | Custo ${card.cost} | Vida ${Math.round(
      stats.health * multiplier
    )} | Dano ${Math.round(stats.damage * multiplier)}`;
  }

  createHUD() {
    this.elixirText = this.add
      .text(20, 20, "Elixir: 5/10", {
        fontFamily: "Roboto",
        fontSize: "18px",
        color: "#f8fafc",
      })
      .setDepth(20);

    this.goldText = this.add
      .text(20, 48, "Ouro: 150", {
        fontFamily: "Roboto",
        fontSize: "16px",
        color: "#facc15",
      })
      .setDepth(20);

    this.timerText = this.add
      .text(GAME_WIDTH / 2, 20, "03:00", {
        fontFamily: "Roboto",
        fontSize: "22px",
        color: "#bfdbfe",
      })
      .setDepth(20)
      .setOrigin(0.5);

    this.statusText = this.add
      .text(GAME_WIDTH / 2, 52, "Modo batalha", {
        fontFamily: "Roboto",
        fontSize: "16px",
        color: "#facc15",
      })
      .setDepth(20)
      .setOrigin(0.5);

    this.crownText = this.add
      .text(GAME_WIDTH - 220, 20, "👑 Jogador 0 x 0 Robô", {
        fontFamily: "Roboto",
        fontSize: "18px",
        color: "#f8fafc",
      })
      .setDepth(20);

    this.messageText = this.add
      .text(GAME_WIDTH / 2, GAME_HEIGHT / 2, "", {
        fontFamily: "Roboto",
        fontSize: "32px",
        color: "#f8fafc",
        fontStyle: "700",
        align: "center",
        wordWrap: { width: 600 },
      })
      .setDepth(50)
      .setOrigin(0.5);
  }

  selectCard(card) {
    if (this.phase === "finished") {
      return;
    }
    this.selectedCard = card;
    this.showToast(`Carta selecionada: ${card.name}`);

    this.cardTextElements.forEach(({ card: current, container }) => {
      container.setStrokeStyle(
        current === card ? 4 : 2,
        current === card ? 0xfacc15 : 0x334155
      );
    });
  }

  upgradeCard(card) {
    if (this.phase === "finished") {
      return;
    }
    if (this.playerData.gold < card.upgradeCost) {
      this.showToast("Ouro insuficiente para upar esta carta!");
      return;
    }
    this.playerData.gold -= card.upgradeCost;
    card.level += 1;
    card.upgradeCost = Math.round(card.upgradeCost * 1.5 + 20);
    this.goldText.setText(`Ouro: ${this.playerData.gold}`);
    this.showToast(`${card.name} evoluiu para o nível ${card.level}!`);
    this.cardTextElements
      .find((entry) => entry.card === card)
      .statsText.setText(this.getCardStatsText(card));
    this.cardTextElements
      .find((entry) => entry.card === card)
      .costText.setText(`Custo ${card.upgradeCost}`);
  }

  handleBattlefieldPointer(pointer) {
    if (this.phase === "finished") {
      return;
    }
    if (!this.selectedCard) {
      return;
    }
    if (pointer.y > GAME_HEIGHT - 150) {
      return;
    }

    const lane = pointer.y < GAME_HEIGHT / 2 ? "top" : "bottom";
    this.deployUnit("player", this.selectedCard, lane);
  }

  deployUnit(side, card, lane) {
    const owner = side === "player" ? this.playerData : this.enemyData;
    if (owner.elixir < card.cost) {
      if (side === "player") {
        this.showToast("Elixir insuficiente!");
      }
      return false;
    }

    owner.elixir -= card.cost;
    if (side === "player") {
      this.updateElixirText();
    }

    const multiplier = 1 + (card.level - 1) * 0.25;
    const stats = card.baseStats;
    const maxHealth = stats.health * multiplier;
    const damage = stats.damage * multiplier;
    const speed = stats.speed;
    const range = stats.range;

    const laneY = lane === "top" ? LANES.top : LANES.bottom;
    const startX = side === "player" ? 210 : GAME_WIDTH - 210;

    const sprite = this.add.rectangle(startX, laneY, 34, 34, card.color);
    sprite.setStrokeStyle(2, 0x000000);

    const healthBarBg = this.add.rectangle(startX, laneY - 26, 36, 6, 0x1f2937);
    const healthBar = this.add.rectangle(startX, laneY - 26, 32, 4, 0x22c55e);

    const unit = {
      side,
      lane,
      card,
      sprite,
      healthBar,
      healthBarBg,
      maxHealth,
      health: maxHealth,
      damage,
      speed,
      range,
      attackInterval: stats.attackInterval,
      attackCooldown: 0,
      target: null,
      alive: true,
    };

    this.units.push(unit);
    return true;
  }

  enemyRoutine() {
    if (this.phase === "finished") {
      return;
    }
    const availableCards = this.cards.filter((card) => this.enemyData.elixir >= card.cost);
    if (availableCards.length === 0) {
      return;
    }

    const card = Phaser.Utils.Array.GetRandom(availableCards);
    const lane = Math.random() > 0.5 ? "top" : "bottom";
    const deployed = this.deployUnit("enemy", card, lane);
    if (deployed) {
      this.showToast(`Robô lançou ${card.name} na linha ${lane === "top" ? "superior" : "inferior"}.`);
    }
  }

  update(time, delta) {
    if (this.phase === "finished") {
      return;
    }
    const dt = delta / 1000;
    this.elapsed += dt;

    if (!this.doubleElixir && this.elapsed >= 60) {
      this.doubleElixir = true;
      this.showToast("💥 Elixir em dobro!");
    }

    const regen = (this.doubleElixir ? 0.5 : 0.25) * dt;
    this.playerData.elixir = Math.min(10, this.playerData.elixir + regen);
    this.enemyData.elixir = Math.min(10, this.enemyData.elixir + regen);
    this.updateElixirText();

    this.updateUnits(dt);
    this.updateTowers(dt);
    this.cleanupEntities();
    if (this.phase === "overtime") {
      this.overtimeElapsed += dt;
    }
    this.updateTimer();
    this.checkWinConditions();
  }

  updateUnits(dt) {
    this.units.forEach((unit) => {
      if (!unit.alive) {
        return;
      }

      const direction = unit.side === "player" ? 1 : -1;
      const laneY = unit.lane === "top" ? LANES.top : LANES.bottom;

      // Acquire target
      if (!unit.target || !unit.target.alive) {
        const enemyUnits = this.units.filter(
          (other) =>
            other.alive &&
            other.side !== unit.side &&
            other.lane === unit.lane &&
            Phaser.Math.Distance.Between(
              unit.sprite.x,
              laneY,
              other.sprite.x,
              laneY
            ) <= unit.range
        );

        if (enemyUnits.length > 0) {
          unit.target = enemyUnits[0];
        } else {
          const towers = this.towers[unit.side === "player" ? "enemy" : "player"].filter(
            (tower) =>
              tower.alive &&
              (tower.lane === unit.lane || tower.type === "king") &&
              Phaser.Math.Distance.Between(
                unit.sprite.x,
                laneY,
                tower.sprite.x,
                tower.sprite.y
              ) <= unit.range
          );
          unit.target = towers.length > 0 ? towers[0] : null;
        }
      }

      // Move if no target in range
      if (!unit.target) {
        unit.sprite.x += unit.speed * dt * direction;
      } else {
        if (unit.target.sprite) {
          const distance = Phaser.Math.Distance.Between(
            unit.sprite.x,
            laneY,
            unit.target.sprite.x,
            unit.target.sprite.y
          );
          if (distance > unit.range) {
            unit.sprite.x += unit.speed * dt * direction;
          }
        }

        unit.attackCooldown -= dt;
        if (unit.attackCooldown <= 0) {
          this.damageTarget(unit, unit.target, unit.damage);
          unit.attackCooldown = unit.attackInterval;
        }
      }

      unit.healthBar.x = unit.sprite.x;
      unit.healthBarBg.x = unit.sprite.x;
      unit.healthBar.setScale(Phaser.Math.Clamp(unit.health / unit.maxHealth, 0, 1), 1);
      unit.healthBarBg.setScale(1, 1);
      unit.healthBar.y = laneY - 26;
      unit.healthBarBg.y = laneY - 26;

      // Prevent units from entering river until bridges (simple clamp)
      if (unit.sprite.x < 110) unit.sprite.x = 110;
      if (unit.sprite.x > GAME_WIDTH - 110) unit.sprite.x = GAME_WIDTH - 110;
    });
  }

  damageTarget(source, target, damage) {
    if (!target || !target.alive) {
      return;
    }

    if (target.sprite) {
      target.health -= damage;
      if (target.health <= 0) {
        target.alive = false;
        target.sprite.destroy();
        if (target.healthBar) target.healthBar.destroy();
        if (target.healthBarBg) target.healthBarBg.destroy();
        if (source.side === "player") {
          this.playerData.gold += 8;
          this.goldText.setText(`Ouro: ${this.playerData.gold}`);
        } else {
          this.enemyData.gold += 8;
        }
      } else {
        if (target.healthBar) {
          target.healthBar.setScale(
            Phaser.Math.Clamp(target.health / target.maxHealth, 0, 1),
            1
          );
        }
      }
    } else {
      this.hitTower(source, target, damage);
    }
  }

  updateTowers(dt) {
    ["player", "enemy"].forEach((side) => {
      this.towers[side].forEach((tower) => {
        if (!tower.alive) {
          return;
        }
        tower.attackCooldown -= dt;
        if (tower.attackCooldown > 0) {
          return;
        }
        const enemyUnits = this.units.filter(
          (unit) =>
            unit.alive &&
            unit.side !== side &&
            Phaser.Math.Distance.Between(
              unit.sprite.x,
              unit.lane === "top" ? LANES.top : LANES.bottom,
              tower.sprite.x,
              tower.sprite.y
            ) <= tower.range
        );
        if (enemyUnits.length > 0) {
          const target = enemyUnits[0];
          this.damageTarget(tower, target, tower.damage);
          tower.attackCooldown = tower.attackInterval;
        }
      });
    });
  }

  hitTower(source, tower, damage) {
    if (!tower.alive) {
      return;
    }
    tower.health -= damage;
    if (tower.health <= 0) {
      tower.alive = false;
      tower.sprite.destroy();
      tower.healthBar.destroy();
      tower.healthBarBg.destroy();
      this.showToast(`${source.side === "player" ? "Você" : "Robô"} destruiu a torre ${tower.type}!`);
      if (source.side === "player") {
        this.playerData.crowns += tower.type === "king" ? 3 : 1;
        this.playerData.gold += 40;
        this.goldText.setText(`Ouro: ${this.playerData.gold}`);
      } else {
        this.enemyData.crowns += tower.type === "king" ? 3 : 1;
      }
      this.updateCrowns();
    } else {
      tower.healthBar.setScale(Phaser.Math.Clamp(tower.health / tower.maxHealth, 0, 1), 1);
    }
  }

  cleanupEntities() {
    this.units = this.units.filter((unit) => unit.alive);
  }

  updateElixirText() {
    this.elixirText.setText(`Elixir: ${Math.floor(this.playerData.elixir * 10) / 10}/10`);
  }

  updateCrowns() {
    this.crownText.setText(
      `👑 Jogador ${this.playerData.crowns} x ${this.enemyData.crowns} Robô`
    );
  }

  updateTimer() {
    if (this.phase === "battle") {
      const remaining = Math.max(0, this.totalBattleTime - this.elapsed);
      this.timerText.setText(this.formatTime(remaining));
      this.statusText.setText(this.doubleElixir ? "Modo batalha (2x)" : "Modo batalha");
    } else if (this.phase === "overtime") {
      const remaining = Math.max(0, this.overtimeDuration - this.overtimeElapsed);
      this.timerText.setText(this.formatTime(remaining));
      this.statusText.setText("Morte súbita");
    }
  }

  checkWinConditions() {
    const enemyKingAlive = this.towers.enemy.find((t) => t.type === "king")?.alive;
    const playerKingAlive = this.towers.player.find((t) => t.type === "king")?.alive;

    if (!enemyKingAlive) {
      this.endMatch("Vitória! Você destruiu o Rei inimigo.");
      return;
    }
    if (!playerKingAlive) {
      this.endMatch("Derrota! Seu Rei foi destruído.");
      return;
    }

    if (this.phase === "battle" && this.elapsed >= this.totalBattleTime) {
      if (this.playerData.crowns === this.enemyData.crowns) {
        this.phase = "overtime";
        this.overtimeElapsed = 0;
        this.showToast("⏱️ Morte súbita! Próxima torre decide.");
      } else {
        this.endMatch(this.playerData.crowns > this.enemyData.crowns ? "Vitória por coroas!" : "Derrota por coroas.");
      }
    } else if (this.phase === "overtime") {
      if (this.playerData.crowns !== this.enemyData.crowns) {
        this.endMatch(
          this.playerData.crowns > this.enemyData.crowns
            ? "Vitória na morte súbita!"
            : "Derrota na morte súbita."
        );
      } else if (this.overtimeElapsed >= this.overtimeDuration) {
        this.endMatch("Empate heroico! Ninguém prevaleceu.");
      }
    }
  }

  endMatch(message) {
    this.phase = "finished";
    this.messageText.setText(`${message}\nClique em qualquer lugar para reiniciar.`);
    this.input.once("pointerdown", () => this.scene.restart(), this);
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
    this.messageText.setText(message);
    this.time.addEvent({
      delay: 2000,
      callback: () => {
        if (this.phase !== "finished") {
          this.messageText.setText("");
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
  backgroundColor: "#111827",
  scene: [ClashScene],
};

new Phaser.Game(config);
