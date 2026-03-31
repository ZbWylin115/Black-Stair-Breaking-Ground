const SAVE_KEY = "black_stair_breaking_ground_save";

// ======================================================
// DOM
// ======================================================
const els = {
  saveBtn: document.getElementById("saveBtn"),
  loadBtn: document.getElementById("loadBtn"),
  newRunBtn: document.getElementById("newRunBtn"),
  clearLogBtn: document.getElementById("clearLogBtn"),
  townBtn: document.getElementById("townBtn"),
  statsBtn: document.getElementById("statsBtn"),

  sceneTitle: document.getElementById("sceneTitle"),
  sceneTag: document.getElementById("sceneTag"),
  sceneArtGlyph: document.getElementById("sceneArtGlyph"),
  mainText: document.getElementById("mainText"),
  choices: document.getElementById("choices"),
  log: document.getElementById("log"),

  enemyPanel: document.getElementById("enemyPanel"),
  enemyName: document.getElementById("enemyName"),
  enemyStatuses: document.getElementById("enemyStatuses"),
  enemyHpBar: document.getElementById("enemyHpBar"),
  enemyHpText: document.getElementById("enemyHpText"),
  enemyPortrait: document.getElementById("enemyPortrait"),

  playerName: document.getElementById("playerName"),
  playerClass: document.getElementById("playerClass"),
  playerLevel: document.getElementById("playerLevel"),
  playerGold: document.getElementById("playerGold"),
  playerDepth: document.getElementById("playerDepth"),
  playerWeapon: document.getElementById("playerWeapon"),
  playerArmor: document.getElementById("playerArmor"),
  playerSkill: document.getElementById("playerSkill"),
  playerDefense: document.getElementById("playerDefense"),
  hpBar: document.getElementById("hpBar"),
  hpText: document.getElementById("hpText"),
  xpBar: document.getElementById("xpBar"),
  xpText: document.getElementById("xpText"),
  playerPortrait: document.getElementById("playerPortrait"),

  companionPortrait: document.getElementById("companionPortrait"),
  companionName: document.getElementById("companionName"),
  companionDesc: document.getElementById("companionDesc"),

  inventoryList: document.getElementById("inventoryList"),
  relicList: document.getElementById("relicList"),
  statusList: document.getElementById("statusList"),
};

// ======================================================
// DATA
// ======================================================
const CLASS_DATA = {
  Knight: {
    glyph: "🛡",
    maxHp: 54,
    strength: 2,
    defenseBonus: 1,
    startingWeapon: "Iron Sword",
    startingArmor: "Leather Coat",
    skill: "Shield Bash",
    desc: "High HP, strong defense, reliable control."
  },
  Rogue: {
    glyph: "🗡",
    maxHp: 42,
    strength: 1,
    defenseBonus: 0,
    startingWeapon: "Twin Daggers",
    startingArmor: "Shadow Cloak",
    skill: "Backstab",
    desc: "Fast crits, bleed pressure, bursty turns."
  },
  Occultist: {
    glyph: "🩸",
    maxHp: 38,
    strength: 0,
    defenseBonus: 0,
    startingWeapon: "Ritual Knife",
    startingArmor: "Torn Robes",
    skill: "Blood Rite",
    desc: "Trades health for power and inflicts burn."
  },
  Mage: {
    glyph: "🔮",
    maxHp: 40,
    strength: 1,
    defenseBonus: 0,
    startingWeapon: "Ash Staff",
    startingArmor: "Runed Cloak",
    skill: "Fire Lance",
    desc: "Fragile caster with strong burn and control."
  }
};

const WEAPONS = {
  "Iron Sword": { min: 4, max: 8, price: 0, mod: null },
  "Twin Daggers": { min: 3, max: 7, price: 0, mod: "bleed" },
  "Ritual Knife": { min: 3, max: 6, price: 0, mod: "burn" },
  "Ash Staff": { min: 4, max: 7, price: 0, mod: "burn" },
  "Falchion": { min: 5, max: 9, price: 45, mod: null },
  "War Hammer": { min: 6, max: 10, price: 55, mod: "weak" },
  "Firebrand": { min: 5, max: 9, price: 65, mod: "burn" },
  "Jagged Blade": { min: 5, max: 9, price: 68, mod: "bleed" },
  "Spell Rod": { min: 6, max: 9, price: 70, mod: "burn" },
  "Executioner Blade": { min: 7, max: 12, price: 95, mod: null }
};

const ARMORS = {
  "Leather Coat": { defense: 1, price: 0 },
  "Shadow Cloak": { defense: 0, price: 0 },
  "Torn Robes": { defense: 0, price: 0 },
  "Runed Cloak": { defense: 1, price: 0 },
  "Chain Shirt": { defense: 2, price: 35 },
  "Brigandine": { defense: 3, price: 55 },
  "Ash Mail": { defense: 4, price: 75 },
  "Black Plate": { defense: 5, price: 105 }
};

const ITEMS = {
  Potion: { type: "heal", heal: 22, price: 12 },
  "Hi-Potion": { type: "heal", heal: 40, price: 22 },
  Bomb: { type: "bomb", damageMin: 18, damageMax: 28, price: 18 },
  "Smoke Bomb": { type: "escape", price: 16 },
  Elixir: { type: "elixir", hpGain: 6, heal: 18, price: 32 }
};

const RELICS = [
  { name: "Wolf Fang", desc: "+1 attack damage.", effect: "plusAttack" },
  { name: "Iron Rosary", desc: "+1 defense.", effect: "plusDefense" },
  { name: "Gambler's Coin", desc: "Higher crit chance.", effect: "plusCrit" },
  { name: "Saint's Fingerbone", desc: "Healing items restore more HP.", effect: "plusHeal" },
  { name: "Mirror Nail", desc: "Defending reflects 2 damage.", effect: "thornsGuard" },
  { name: "Ashen Charm", desc: "Burn deals +1 damage.", effect: "burnPlus" },
  { name: "Butcher's Hook", desc: "Bleed deals +1 damage.", effect: "bleedPlus" },
  { name: "Crown Shard", desc: "Gain more gold from fights.", effect: "plusGold" }
];

const COMPANIONS = [
  {
    name: "Scout",
    glyph: "🏹",
    desc: "Deals light damage and sometimes helps you evade.",
    attackMin: 2,
    attackMax: 4,
    bonus: "dodge"
  },
  {
    name: "Mercenary",
    glyph: "⚔",
    desc: "Deals solid damage and boosts your attacks.",
    attackMin: 3,
    attackMax: 5,
    bonus: "attack"
  },
  {
    name: "Acolyte",
    glyph: "🕯",
    desc: "Deals light damage and sometimes heals you.",
    attackMin: 1,
    attackMax: 3,
    bonus: "heal"
  },
  {
    name: "Apprentice",
    glyph: "📘",
    desc: "Deals magical chip damage and strengthens burn.",
    attackMin: 2,
    attackMax: 3,
    bonus: "burn"
  }
];

const ENEMIES = [
  { name: "Grave Hound", glyph: "🐺", hp: [16, 22], atk: [3, 6], gold: [18, 28], xp: [14, 22], ai: "aggressive" },
  { name: "Bandit Cutthroat", glyph: "🗡", hp: [17, 24], atk: [3, 6], gold: [20, 30], xp: [15, 24], ai: "bleeder" },
  { name: "Catacomb Skeleton", glyph: "☠", hp: [20, 28], atk: [4, 7], gold: [18, 30], xp: [18, 26], ai: "guarder" },
  { name: "Ash Cultist", glyph: "🔥", hp: [17, 25], atk: [4, 7], gold: [20, 32], xp: [18, 28], ai: "burner" },
  { name: "Old Soldier", glyph: "🪖", hp: [22, 30], atk: [5, 8], gold: [22, 34], xp: [20, 30], ai: "weaken" }
];

const ELITES = [
  { name: "Carrion Knight", glyph: "🛡", hp: 42, atk: [6, 10], gold: 60, xp: 52, ai: "guarder" },
  { name: "Fever Apostle", glyph: "🔥", hp: 40, atk: [7, 11], gold: 64, xp: 54, ai: "burner" },
  { name: "Ghoul Captain", glyph: "☠", hp: 44, atk: [7, 11], gold: 66, xp: 56, ai: "bleeder" }
];

const MINIBOSSES = [
  { name: "The Bell Butcher", glyph: "🔔", hp: 62, atk: [8, 13], gold: 100, xp: 86, ai: "bleeder" },
  { name: "Widow-of-Knives", glyph: "🕷", hp: 58, atk: [8, 13], gold: 104, xp: 88, ai: "aggressive" }
];

const BOSS = {
  name: "The King Beneath Ash",
  glyph: "👑",
  phase1Hp: 85,
  phase2Hp: 100,
  atk1: [8, 13],
  atk2: [10, 16],
  gold: 300,
  xp: 210
};

const RUMORS = [
  "A sellsword is looking for coin and trouble.",
  "Something nasty waits below, but the loot should be good.",
  "A relic was seen deeper in the stair.",
  "A quiet floor may be coming. Could be a good time to rest.",
  "An apprentice mage keeps asking who is brave enough to descend.",
  "A scout claims they know the lower halls."
];

// ======================================================
// GAME STATE
// ======================================================
let game = {
  mode: "menu",
  player: null,
  enemy: null,
  defending: false,
  rumorCompanion: null,
  lastRumor: null,
  bossPhase: 1
};

// ======================================================
// HELPERS
// ======================================================
function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function chance(p) {
  return Math.random() < p;
}

function clamp(v, min, max) {
  return Math.max(min, Math.min(max, v));
}

function pct(current, max) {
  if (max <= 0) return 0;
  return clamp((current / max) * 100, 0, 100);
}

function deepCopy(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function makeStatuses() {
  return {
    bleed: 0,
    burn: 0,
    weak: 0,
    guard: 0
  };
}

function statusText(statuses) {
  const active = Object.entries(statuses)
    .filter(([, v]) => v > 0)
    .map(([k, v]) => `${k}:${v}`);
  return active.length ? active.join(", ") : "none";
}

function addLog(text) {
  const div = document.createElement("div");
  div.className = "log-entry";
  div.textContent = text;
  els.log.prepend(div);
}

function clearChoices() {
  els.choices.innerHTML = "";
}

function setScene(title, tag, text, glyph = "🜃") {
  els.sceneTitle.textContent = title;
  els.sceneTag.textContent = tag;
  els.mainText.innerHTML = text;
  els.sceneArtGlyph.textContent = glyph;
}

function addChoice(title, sub, handler, disabled = false) {
  const btn = document.createElement("button");
  btn.className = "choice-btn";
  btn.disabled = disabled;
  btn.innerHTML = `
    <span class="choice-title">${title}</span>
    <span class="choice-sub">${sub}</span>
  `;
  btn.addEventListener("click", handler);
  els.choices.appendChild(btn);
}

function hasRelic(effect) {
  return !!game.player?.relics?.some(r => r.effect === effect);
}

function getPlayerClassData() {
  return CLASS_DATA[game.player.className];
}

function playerDefense() {
  if (!game.player) return 0;
  let value = ARMORS[game.player.armor].defense + game.player.defenseBonus;
  if (hasRelic("plusDefense")) value += 1;
  if (game.player.statuses.guard > 0) value += 4;
  return value;
}

function playerCritChance() {
  if (!game.player) return 0.14;
  let value = 0.14;
  if (game.player.className === "Rogue") value += 0.10;
  if (hasRelic("plusCrit")) value += 0.08;
  return value;
}

function playerCompanionAttackBonus() {
  return game.player?.companion?.bonus === "attack" ? 1 : 0;
}

function playerBurnBonus() {
  let bonus = 0;
  if (hasRelic("burnPlus")) bonus += 1;
  if (game.player?.companion?.bonus === "burn") bonus += 1;
  if (game.player?.className === "Mage") bonus += 1;
  return bonus;
}

function playerBleedBonus() {
  return hasRelic("bleedPlus") ? 1 : 0;
}

function gainGold(amount) {
  let final = amount;
  if (hasRelic("plusGold")) {
    final += Math.max(2, Math.floor(amount / 5));
  }
  game.player.gold += final;
  return final;
}

function healPlayer(amount) {
  let final = amount;
  if (hasRelic("plusHeal")) final += 5;
  const before = game.player.hp;
  game.player.hp = clamp(game.player.hp + final, 0, game.player.maxHp);
  return game.player.hp - before;
}

function weaponMod() {
  return WEAPONS[game.player.weapon].mod;
}

function applyStatus(target, statusName, amount) {
  if (target.statuses[statusName] !== undefined) {
    target.statuses[statusName] += amount;
  }
}

function tickStatuses(unit, isEnemy = false) {
  const messages = [];

  if (unit.statuses.bleed > 0) {
    let dmg = 2;
    if (isEnemy) dmg += playerBleedBonus();
    unit.hp -= dmg;
    unit.statuses.bleed -= 1;
    messages.push(`${unit.name} bleeds for ${dmg} damage.`);
  }

  if (unit.statuses.burn > 0) {
    let dmg = 3;
    if (isEnemy) dmg += playerBurnBonus();
    unit.hp -= dmg;
    unit.statuses.burn -= 1;
    messages.push(`${unit.name} burns for ${dmg} damage.`);
  }

  if (unit.statuses.weak > 0) {
    unit.statuses.weak -= 1;
  }

  if (unit.statuses.guard > 0) {
    unit.statuses.guard -= 1;
  }

  return messages;
}

function levelUpIfNeeded() {
  let leveled = false;
  while (game.player.xp >= game.player.xpToNext) {
    game.player.xp -= game.player.xpToNext;
    game.player.level += 1;
    game.player.xpToNext = Math.floor(game.player.xpToNext * 1.4);
    game.player.maxHp += 8;
    game.player.hp = game.player.maxHp;
    if (game.player.level % 2 === 0) {
      game.player.strength += 1;
    }
    leveled = true;
  }
  return leveled;
}

function updateUI() {
  if (!game.player) {
    els.playerName.textContent = "-";
    els.playerClass.textContent = "-";
    els.playerLevel.textContent = "-";
    els.playerGold.textContent = "-";
    els.playerDepth.textContent = "-";
    els.playerWeapon.textContent = "-";
    els.playerArmor.textContent = "-";
    els.playerSkill.textContent = "-";
    els.playerDefense.textContent = "-";
    els.hpBar.style.width = "0%";
    els.hpText.textContent = "0 / 0";
    els.xpBar.style.width = "0%";
    els.xpText.textContent = "0 / 0";
    els.playerPortrait.innerHTML = "<span>?</span>";
    els.inventoryList.innerHTML = `<div class="list-item empty-item">No run active.</div>`;
    els.relicList.innerHTML = `<div class="list-item empty-item">No relics.</div>`;
    els.statusList.innerHTML = `<div class="list-item empty-item">No statuses.</div>`;
    els.companionPortrait.innerHTML = "<span>-</span>";
    els.companionName.textContent = "None";
    els.companionDesc.textContent = "No companion recruited.";
    els.enemyPanel.classList.add("hidden");
    return;
  }

  els.playerName.textContent = game.player.name;
  els.playerClass.textContent = game.player.className;
  els.playerLevel.textContent = String(game.player.level);
  els.playerGold.textContent = String(game.player.gold);
  els.playerDepth.textContent = String(game.player.depth);
  els.playerWeapon.textContent = game.player.weapon;
  els.playerArmor.textContent = game.player.armor;
  els.playerSkill.textContent = `${game.player.skill} (CD ${game.player.skillCd})`;
  els.playerDefense.textContent = String(playerDefense());
  els.hpBar.style.width = `${pct(game.player.hp, game.player.maxHp)}%`;
  els.hpText.textContent = `${game.player.hp} / ${game.player.maxHp}`;
  els.xpBar.style.width = `${pct(game.player.xp, game.player.xpToNext)}%`;
  els.xpText.textContent = `${game.player.xp} / ${game.player.xpToNext}`;
  els.playerPortrait.innerHTML = `<span>${CLASS_DATA[game.player.className].glyph}</span>`;

  if (game.player.companion) {
    els.companionPortrait.innerHTML = `<span>${game.player.companion.glyph}</span>`;
    els.companionName.textContent = game.player.companion.name;
    els.companionDesc.textContent = game.player.companion.desc;
  } else {
    els.companionPortrait.innerHTML = `<span>-</span>`;
    els.companionName.textContent = "None";
    els.companionDesc.textContent = "No companion recruited.";
  }

  els.inventoryList.innerHTML = "";
  const invEntries = Object.entries(game.player.inventory);
  invEntries.forEach(([name, qty]) => {
    const item = document.createElement("div");
    item.className = "list-item";
    item.textContent = `${name} x${qty}`;
    els.inventoryList.appendChild(item);
  });

  els.relicList.innerHTML = "";
  if (game.player.relics.length === 0) {
    els.relicList.innerHTML = `<div class="list-item empty-item">No relics yet.</div>`;
  } else {
    game.player.relics.forEach(relic => {
      const item = document.createElement("div");
      item.className = "list-item";
      item.innerHTML = `<strong>${relic.name}</strong><br><span class="muted">${relic.desc}</span>`;
      els.relicList.appendChild(item);
    });
  }

  els.statusList.innerHTML = "";
  const playerStatusEntries = Object.entries(game.player.statuses).filter(([, v]) => v > 0);
  if (playerStatusEntries.length === 0) {
    els.statusList.innerHTML = `<div class="list-item empty-item">No active statuses.</div>`;
  } else {
    playerStatusEntries.forEach(([name, value]) => {
      const item = document.createElement("div");
      item.className = "list-item";
      item.textContent = `${name}: ${value}`;
      els.statusList.appendChild(item);
    });
  }

  if (game.enemy) {
    els.enemyPanel.classList.remove("hidden");
    els.enemyName.textContent = game.enemy.name;
    els.enemyStatuses.textContent = `Statuses: ${statusText(game.enemy.statuses)}`;
    els.enemyHpBar.style.width = `${pct(game.enemy.hp, game.enemy.maxHp)}%`;
    els.enemyHpText.textContent = `${Math.max(0, game.enemy.hp)} / ${game.enemy.maxHp}`;
    els.enemyPortrait.innerHTML = `<span>${game.enemy.glyph || "☠"}</span>`;
  } else {
    els.enemyPanel.classList.add("hidden");
  }
}

function resetEnemy() {
  game.enemy = null;
  game.defending = false;
  updateUI();
}

function saveGame() {
  if (!game.player) {
    addLog("No active run to save.");
    return;
  }
  localStorage.setItem(SAVE_KEY, JSON.stringify(game));
  addLog("Game saved.");
}

function loadGame() {
  const raw = localStorage.getItem(SAVE_KEY);
  if (!raw) {
    addLog("No save found.");
    return;
  }
  try {
    const data = JSON.parse(raw);
    game = data;
    addLog("Game loaded.");
    updateUI();
    if (game.mode === "town") {
      showTown();
    } else if (game.mode === "combat" && game.enemy) {
      showCombat();
    } else if (game.mode === "path") {
      showPathChoice();
    } else {
      showTown();
    }
  } catch (err) {
    console.error(err);
    addLog("Save data was invalid.");
  }
}

function clearLog() {
  els.log.innerHTML = "";
}

function randomRelic() {
  const owned = new Set(game.player.relics.map(r => r.name));
  const pool = RELICS.filter(r => !owned.has(r.name));
  if (!pool.length) return null;
  return deepCopy(pool[randInt(0, pool.length - 1)]);
}

function randomCompanion() {
  const pool = COMPANIONS.filter(c => !game.player.companion || c.name !== game.player.companion.name);
  if (!pool.length) return null;
  return deepCopy(pool[randInt(0, pool.length - 1)]);
}

function createPlayer(name, className) {
  const c = CLASS_DATA[className];
  return {
    name,
    className,
    level: 1,
    xp: 0,
    xpToNext: 40,
    maxHp: c.maxHp,
    hp: c.maxHp,
    strength: c.strength,
    defenseBonus: c.defenseBonus,
    gold: 45,
    depth: 0,
    weapon: c.startingWeapon,
    armor: c.startingArmor,
    skill: c.skill,
    skillCd: 0,
    maxSkillCd: 3,
    inventory: {
      Potion: 3,
      "Hi-Potion": 1,
      Bomb: 1,
      "Smoke Bomb": 1,
      Elixir: 0
    },
    relics: [],
    companion: null,
    statuses: makeStatuses(),
    flags: {
      blessed: false,
      cursed: false,
      rescuedScout: false,
      bloodOath: false,
      beatMiniboss: false
    }
  };
}

// ======================================================
// NEW RUN FLOW
// ======================================================
function startNewRunFlow() {
  game = {
    mode: "menu",
    player: null,
    enemy: null,
    defending: false,
    rumorCompanion: null,
    lastRumor: null,
    bossPhase: 1
  };

  clearChoices();
  resetEnemy();
  setScene(
    "Black Stair: Breaking Ground",
    "New Run",
    "Enter a name, then choose a class. This is the reboot: cleaner structure, stronger presentation, and just enough bad decisions to feel right.",
    "🜃"
  );

  const nameInput = document.createElement("input");
  nameInput.type = "text";
  nameInput.placeholder = "Adventurer name";
  nameInput.value = "Nameless";
  nameInput.style.width = "100%";
  nameInput.style.padding = "0.8rem";
  nameInput.style.borderRadius = "10px";
  nameInput.style.border = "1px solid #2c2c38";
  nameInput.style.background = "#111118";
  nameInput.style.color = "#ece7dc";
  nameInput.style.marginBottom = "1rem";

  els.choices.appendChild(nameInput);

  Object.entries(CLASS_DATA).forEach(([className, data]) => {
    addChoice(
      `${data.glyph} ${className}`,
      `${data.desc} | HP ${data.maxHp} | Skill: ${data.skill}`,
      () => {
        const name = nameInput.value.trim() || "Nameless";
        game.player = createPlayer(name, className);
        chooseStartingBonus();
      }
    );
  });

  updateUI();
}

function chooseStartingBonus() {
  game.mode = "setup";
  clearChoices();
  resetEnemy();
  setScene(
    "Choose Starting Bonus",
    "Setup",
    "Pick one starting edge. This is a light nudge, not a whole destiny.",
    "🎒"
  );

  addChoice(
    "Random Relic",
    "Start with a relic.",
    () => {
      const relic = randomRelic();
      if (relic) {
        game.player.relics.push(relic);
        addLog(`You start with relic: ${relic.name}.`);
      }
      showTown();
    }
  );

  addChoice(
    "Random Companion",
    "Start with a companion.",
    () => {
      const companion = randomCompanion();
      if (companion) {
        game.player.companion = companion;
        addLog(`${companion.name} joins you at the start.`);
      }
      showTown();
    }
  );

  addChoice(
    "Extra Supplies",
    "+2 Potion, +1 Bomb, +25 gold.",
    () => {
      game.player.inventory.Potion += 2;
      game.player.inventory.Bomb += 1;
      game.player.gold += 25;
      addLog("You pack extra supplies.");
      showTown();
    }
  );

  updateUI();
}

// ======================================================
// TOWN
// ======================================================
function showTown() {
  game.mode = "town";
  resetEnemy();
  clearChoices();

  setScene(
    "Ashen Town",
    "Town",
    "The black stair waits below. For now, the town still holds: steel, candles, ale, rumors, and people with just enough poor judgment to follow you.",
    "🏘"
  );

  addChoice("Descend", "Head toward the stair.", showPathChoice);
  addChoice("Blacksmith", "Buy weapons and armor.", showBlacksmith);
  addChoice("Apothecary", "Buy healing and utility items.", showApothecary);
  addChoice("Tavern", "Rest, gamble, and hear rumors.", showTavern);
  addChoice("Chapel", "Seek blessing or make a darker bargain.", showChapel);

  updateUI();
}

function showBlacksmith() {
  clearChoices();
  setScene("Blacksmith", "Town", "Steel for sale. Buy carefully: numbers matter more than confidence.", "⚒");

  Object.entries(WEAPONS).forEach(([name, data]) => {
    if (data.price <= 0) return;
    const owned = game.player.weapon === name;
    addChoice(
      `${name}`,
      `${data.min}-${data.max} dmg${data.mod ? ` | ${data.mod}` : ""} | ${data.price} gold${owned ? " | equipped" : ""}`,
      () => {
        if (owned) {
          addLog(`${name} is already equipped.`);
          showBlacksmith();
          return;
        }
        if (game.player.gold < data.price) {
          addLog("Not enough gold.");
          showBlacksmith();
          return;
        }
        game.player.gold -= data.price;
        game.player.weapon = name;
        addLog(`You equip ${name}.`);
        showBlacksmith();
      }
    );
  });

  Object.entries(ARMORS).forEach(([name, data]) => {
    if (data.price <= 0) return;
    const owned = game.player.armor === name;
    addChoice(
      `${name}`,
      `+${data.defense} defense | ${data.price} gold${owned ? " | equipped" : ""}`,
      () => {
        if (owned) {
          addLog(`${name} is already equipped.`);
          showBlacksmith();
          return;
        }
        if (game.player.gold < data.price) {
          addLog("Not enough gold.");
          showBlacksmith();
          return;
        }
        game.player.gold -= data.price;
        game.player.armor = name;
        addLog(`You equip ${name}.`);
        showBlacksmith();
      }
    );
  });

  addChoice("Back", "Return to town.", showTown);
  updateUI();
}

function showApothecary() {
  clearChoices();
  setScene("Apothecary", "Town", "Bottles, powders, and improvised solutions to violent problems.", "🧪");

  Object.entries(ITEMS).forEach(([name, data]) => {
    addChoice(
      name,
      `${data.type === "heal" ? `Heals ${data.heal}` : data.type === "bomb" ? "Deals damage" : data.type === "escape" ? "Escape a non-forced fight" : `+${data.hpGain} max HP and heal`} | ${data.price} gold`,
      () => {
        if (game.player.gold < data.price) {
          addLog("Not enough gold.");
          showApothecary();
          return;
        }
        game.player.gold -= data.price;
        game.player.inventory[name] += 1;
        addLog(`Bought ${name}.`);
        showApothecary();
      }
    );
  });

  addChoice("Back", "Return to town.", showTown);
  updateUI();
}

function showTavern() {
  clearChoices();
  const rumorLine = game.lastRumor ? `<br><span class="accent">Latest rumor:</span> ${game.lastRumor}` : "";
  setScene(
    "Tavern",
    "Town",
    `A room full of warm food, stale air, and people pretending not to think about the stair.${rumorLine}`,
    "🍺"
  );

  addChoice(
    "Meal and Rest",
    "Recover 20 HP for 10 gold.",
    () => {
      if (game.player.gold < 10) {
        addLog("Not enough gold.");
      } else {
        game.player.gold -= 10;
        const healed = healPlayer(20);
        addLog(`You recover ${healed} HP.`);
      }
      showTavern();
    }
  );

  addChoice(
    "Gamble",
    "Roll dice against the house.",
    () => {
      const betRaw = prompt("Bet how much gold?", "10");
      if (!betRaw) {
        showTavern();
        return;
      }
      const bet = Number(betRaw);
      if (!Number.isInteger(bet) || bet <= 0) {
        addLog("That is not a valid bet.");
        showTavern();
        return;
      }
      if (bet > game.player.gold) {
        addLog("Not enough gold.");
        showTavern();
        return;
      }
      const playerRoll = randInt(1, 6);
      const houseRoll = randInt(1, 6);
      addLog(`You roll ${playerRoll}. The house rolls ${houseRoll}.`);
      if (playerRoll > houseRoll) {
        game.player.gold += bet;
        addLog(`You win ${bet} gold.`);
      } else if (playerRoll < houseRoll) {
        game.player.gold -= bet;
        addLog(`You lose ${bet} gold.`);
      } else {
        addLog("Tie.");
      }
      showTavern();
    }
  );

  addChoice(
    "Hear Rumors",
    "Sometimes information. Sometimes company.",
    () => {
      resolveRumor();
      showTavern();
    }
  );

  if (game.rumorCompanion) {
    addChoice(
      `Recruit ${game.rumorCompanion.name}`,
      "Someone in the tavern is willing to descend with you.",
      () => {
        game.player.companion = deepCopy(game.rumorCompanion);
        addLog(`${game.rumorCompanion.name} joins you from the tavern.`);
        game.rumorCompanion = null;
        showTavern();
      }
    );
  }

  addChoice("Back", "Return to town.", showTown);
  updateUI();
}

function resolveRumor() {
  const rumor = RUMORS[randInt(0, RUMORS.length - 1)];
  game.lastRumor = rumor;
  addLog(`Rumor: ${rumor}`);

  if (chance(0.45)) {
    const companion = randomCompanion();
    if (companion) {
      game.rumorCompanion = companion;
      addLog(`${companion.name} can be recruited at the tavern.`);
    }
  } else {
    game.rumorCompanion = null;
  }
}

function showChapel() {
  clearChoices();
  setScene("Chapel", "Town", "Candles, stone, and the sort of silence that either comforts or evaluates you.", "🕯");

  addChoice(
    "Donate",
    "15 gold. Gain blessing and recover some HP.",
    () => {
      if (game.player.gold < 15) {
        addLog("Not enough gold.");
        showChapel();
        return;
      }
      game.player.gold -= 15;
      game.player.flags.blessed = true;
      game.player.flags.cursed = false;
      const healed = healPlayer(12);
      addLog(`You are blessed and recover ${healed} HP.`);
      showChapel();
    }
  );

  addChoice(
    "Blood Oath",
    "Once only. Lose 3 max HP, gain 2 strength.",
    () => {
      if (game.player.flags.bloodOath) {
        addLog("You have already taken the blood oath.");
        showChapel();
        return;
      }
      game.player.flags.bloodOath = true;
      game.player.maxHp = Math.max(10, game.player.maxHp - 3);
      game.player.hp = Math.min(game.player.hp, game.player.maxHp);
      game.player.strength += 2;
      addLog("You lose 3 max HP and gain 2 strength.");
      showChapel();
    }
  );

  addChoice(
    "Cleanse Curse",
    "18 gold to remove curse.",
    () => {
      if (game.player.gold < 18) {
        addLog("Not enough gold.");
        showChapel();
        return;
      }
      game.player.gold -= 18;
      game.player.flags.cursed = false;
      addLog("Your curse is lifted.");
      showChapel();
    }
  );

  addChoice("Back", "Return to town.", showTown);
  updateUI();
}

// ======================================================
// DUNGEON / PATH
// ======================================================
function showPathChoice() {
  game.mode = "path";
  clearChoices();
  resetEnemy();

  setScene(
    `Depth ${game.player.depth + 1}`,
    "Dungeon",
    "Choose your next room. This is where runs start to become stories, good or otherwise.",
    "🪜"
  );

  addChoice("Fight", "A standard encounter.", () => enterRoom("fight"));
  addChoice("Event", "Shrine, treasure, rumor, or stranger.", () => enterRoom("event"));
  addChoice("Elite", "More dangerous, better rewards.", () => enterRoom("elite"));
  addChoice("Rest", "Recover some HP.", () => enterRoom("rest"));
  addChoice("Return to Town", "Play it safe and head back.", showTown);

  updateUI();
}

function enterRoom(type) {
  const nextDepth = game.player.depth + 1;

  if (nextDepth === 5 || nextDepth === 9) {
    game.player.depth = nextDepth;
    const boss = makeMiniboss(nextDepth);
    startCombat(boss, true);
    return;
  }

  if (nextDepth >= 10) {
    game.player.depth = nextDepth;
    startBossFight();
    return;
  }

  game.player.depth = nextDepth;

  if (type === "fight") {
    startCombat(makeEnemy(nextDepth), false);
  } else if (type === "elite") {
    startCombat(makeElite(nextDepth), false);
  } else if (type === "event") {
    resolveEvent();
  } else if (type === "rest") {
    const amount = randInt(16, 24) + (game.player.flags.blessed ? 4 : 0);
    const healed = healPlayer(amount);
    addLog(`You rest and recover ${healed} HP.`);
    showPathChoice();
  }
}

function resolveEvent() {
  const roll = randInt(1, 100);

  if (roll <= 24) {
    const gold = gainGold(randInt(24, 42) + game.player.depth * 2);
    addLog(`You find ${gold} gold.`);
    if (chance(0.55)) {
      const itemName = ["Potion", "Bomb", "Hi-Potion"][randInt(0, 2)];
      game.player.inventory[itemName] += 1;
      addLog(`You also find: ${itemName}.`);
    }
    showPathChoice();
    return;
  }

  if (roll <= 46) {
    clearChoices();
    setScene("Shrine", "Event", "A dark little shrine waits in the dust.", "⛩");
    addChoice("Pray", "Chance to be blessed or recover HP.", () => {
      if (chance(0.75)) {
        game.player.flags.blessed = true;
        game.player.flags.cursed = false;
        const healed = healPlayer(12);
        addLog(`You are blessed and recover ${healed} HP.`);
      } else {
        const healed = healPlayer(8);
        addLog(`You recover ${healed} HP.`);
      }
      showPathChoice();
    });
    addChoice("Steal Offering", "Gain gold, become cursed.", () => {
      const gold = gainGold(randInt(24, 44));
      game.player.flags.cursed = true;
      game.player.flags.blessed = false;
      addLog(`You steal ${gold} gold and become cursed.`);
      showPathChoice();
    });
    addChoice("Leave", "Walk on.", showPathChoice);
    updateUI();
    return;
  }

  if (roll <= 62) {
    clearChoices();
    setScene("Wounded Scout", "Event", "A scout from town is in bad shape.", "🏹");
    addChoice("Give Potion", "Help them with a Potion.", () => {
      if (game.player.inventory.Potion <= 0) {
        addLog("You have no Potion.");
      } else {
        game.player.inventory.Potion -= 1;
        game.player.flags.rescuedScout = true;
        const gold = gainGold(30);
        addLog(`You help the scout and gain ${gold} gold.`);
        if (chance(0.25)) {
          const relic = randomRelic();
          if (relic) {
            game.player.relics.push(relic);
            addLog(`The scout gives you relic: ${relic.name}.`);
          }
        }
      }
      showPathChoice();
    });
    addChoice("Help Them Back", "No item needed.", () => {
      game.player.flags.rescuedScout = true;
      const healed = healPlayer(10);
      addLog(`You help the scout back and recover ${healed} HP.`);
      showPathChoice();
    });
    addChoice("Search Their Bag", "Take gold, become cursed.", () => {
      const gold = gainGold(randInt(18, 28));
      game.player.flags.cursed = true;
      addLog(`You take ${gold} gold and become cursed.`);
      showPathChoice();
    });
    addChoice("Leave", "Walk on.", showPathChoice);
    updateUI();
    return;
  }

  if (roll <= 78) {
    const companion = randomCompanion();
    if (companion) {
      clearChoices();
      setScene("Wanderer", "Event", `${companion.name} is willing to join you.`, companion.glyph);
      addChoice("Recruit", companion.desc, () => {
        game.player.companion = companion;
        addLog(`${companion.name} joins you.`);
        showPathChoice();
      });
      addChoice("Decline", "Continue alone.", showPathChoice);
      updateUI();
      return;
    }
  }

  if (roll <= 90) {
    clearChoices();
    setScene("Shadow Peddler", "Event", "A traveling merchant offers a few practical sins.", "🧳");
    addChoice("Buy Potion", "14 gold.", () => quickBuy("Potion", 14));
    addChoice("Buy Bomb", "20 gold.", () => quickBuy("Bomb", 20));
    addChoice("Buy Smoke Bomb", "18 gold.", () => quickBuy("Smoke Bomb", 18));
    addChoice("Buy Hi-Potion", "26 gold.", () => quickBuy("Hi-Potion", 26));
    addChoice("Leave", "Move on.", showPathChoice);
    updateUI();
    return;
  }

  const relic = randomRelic();
  if (relic) {
    game.player.relics.push(relic);
    addLog(`You discover relic: ${relic.name}.`);
  } else {
    const gold = gainGold(35);
    addLog(`The pedestal is empty, but you find ${gold} gold nearby.`);
  }
  showPathChoice();
}

function quickBuy(itemName, cost) {
  if (game.player.gold < cost) {
    addLog("Not enough gold.");
  } else {
    game.player.gold -= cost;
    game.player.inventory[itemName] += 1;
    addLog(`Bought ${itemName}.`);
  }
  showPathChoice();
}

// ======================================================
// ENEMIES
// ======================================================
function makeEnemy(depth) {
  const t = ENEMIES[randInt(0, ENEMIES.length - 1)];
  const bonus = Math.floor(depth / 3);
  return {
    name: t.name,
    glyph: t.glyph,
    hp: randInt(t.hp[0], t.hp[1]) + bonus * 2,
    maxHp: randInt(t.hp[0], t.hp[1]) + bonus * 2,
    atkMin: t.atk[0] + bonus,
    atkMax: t.atk[1] + bonus,
    gold: randInt(t.gold[0], t.gold[1]) + bonus * 3,
    xp: randInt(t.xp[0], t.xp[1]) + bonus * 2,
    ai: t.ai,
    elite: false,
    miniboss: false,
    statuses: makeStatuses()
  };
}

function makeElite(depth) {
  const t = ELITES[randInt(0, ELITES.length - 1)];
  const bonus = Math.floor(depth / 4);
  return {
    name: t.name,
    glyph: t.glyph,
    hp: t.hp + bonus * 4,
    maxHp: t.hp + bonus * 4,
    atkMin: t.atk[0] + bonus,
    atkMax: t.atk[1] + bonus,
    gold: t.gold + bonus * 8,
    xp: t.xp + bonus * 6,
    ai: t.ai,
    elite: true,
    miniboss: false,
    statuses: makeStatuses()
  };
}

function makeMiniboss(depth) {
  const t = MINIBOSSES[randInt(0, MINIBOSSES.length - 1)];
  const bonus = Math.floor(depth / 5);
  return {
    name: t.name,
    glyph: t.glyph,
    hp: t.hp + bonus * 5,
    maxHp: t.hp + bonus * 5,
    atkMin: t.atk[0] + bonus,
    atkMax: t.atk[1] + bonus,
    gold: t.gold + bonus * 12,
    xp: t.xp + bonus * 8,
    ai: t.ai,
    elite: true,
    miniboss: true,
    statuses: makeStatuses()
  };
}

// ======================================================
// COMBAT
// ======================================================
function startCombat(enemy, forced) {
  game.mode = "combat";
  game.enemy = enemy;
  game.defending = false;
  game.forcedFight = forced;

  let tag = "Combat";
  if (enemy.miniboss) tag = "Miniboss";
  else if (enemy.elite) tag = "Elite";

  setScene(
    enemy.name,
    tag,
    `The fight begins.`,
    enemy.glyph
  );

  addLog(`Combat begins: ${enemy.name}.`);
  showCombat();
}

function startBossFight() {
  game.mode = "combat";
  game.bossPhase = 1;
  game.forcedFight = true;
  game.enemy = {
    name: BOSS.name,
    glyph: BOSS.glyph,
    hp: BOSS.phase1Hp,
    maxHp: BOSS.phase1Hp,
    atkMin: BOSS.atk1[0],
    atkMax: BOSS.atk1[1],
    gold: BOSS.gold,
    xp: BOSS.xp,
    ai: "boss1",
    elite: true,
    miniboss: true,
    statuses: makeStatuses()
  };

  setScene(
    "The Ashen Throne",
    "Boss",
    "The king rises. Slowly. Which somehow makes it worse.",
    BOSS.glyph
  );

  addLog("Boss fight begins.");
  showCombat();
}

function showCombat() {
  clearChoices();

  const enemy = game.enemy;
  const enemyType = enemy.miniboss ? "Miniboss" : enemy.elite ? "Elite" : "Enemy";
  setScene(
    enemy.name,
    enemyType,
    `Choose your action. HP and statuses now matter enough to stop pretending otherwise.`,
    enemy.glyph
  );

  addChoice("Attack", "Make a standard attack.", playerAttack);
  addChoice("Skill", `${game.player.skill}${game.player.skillCd > 0 ? ` | cooldown ${game.player.skillCd}` : ""}`, useSkill, game.player.skillCd > 0);
  addChoice("Item", "Use a consumable.", chooseCombatItem);
  addChoice("Defend", "Gain guard and reduce incoming damage.", defendTurn);

  if (!game.forcedFight) {
    addChoice("Run", "Attempt escape.", attemptRun);
  }

  updateUI();
}

function playerAttack() {
  runCombatRound(() => {
    let dmg = randInt(WEAPONS[game.player.weapon].min, WEAPONS[game.player.weapon].max) + game.player.strength + playerCompanionAttackBonus();
    if (hasRelic("plusAttack")) dmg += 1;
    if (game.player.flags.cursed) dmg = Math.max(1, dmg - 1);
    if (game.player.statuses.weak > 0) dmg = Math.max(1, dmg - 2);

    const crit = chance(playerCritChance());
    if (crit) dmg += randInt(3, 6);

    if (game.enemy.statuses.guard > 0) dmg = Math.max(1, dmg - 3);

    game.enemy.hp -= dmg;
    addLog(`You hit ${game.enemy.name} for ${dmg} damage${crit ? " (critical)" : ""}.`);

    const mod = weaponMod();
    if (mod) {
      applyStatus(game.enemy, mod, 2);
      addLog(`${game.enemy.name} gains ${mod}.`);
    }
  });
}

function useSkill() {
  runCombatRound(() => {
    if (game.player.skillCd > 0) {
      addLog("Your skill is not ready.");
      return false;
    }

    if (game.player.skill === "Shield Bash") {
      const dmg = randInt(8, 12) + game.player.strength;
      game.enemy.hp -= dmg;
      applyStatus(game.enemy, "weak", 2);
      game.player.skillCd = game.player.maxSkillCd;
      addLog(`You Shield Bash ${game.enemy.name} for ${dmg} damage and inflict weak.`);
      return true;
    }

    if (game.player.skill === "Backstab") {
      const dmg = randInt(10, 15) + game.player.strength;
      game.enemy.hp -= dmg;
      applyStatus(game.enemy, "bleed", 2);
      game.player.skillCd = game.player.maxSkillCd;
      addLog(`You Backstab ${game.enemy.name} for ${dmg} damage and inflict bleed.`);
      return true;
    }

    if (game.player.skill === "Blood Rite") {
      const selfDmg = randInt(2, 4);
      game.player.hp -= selfDmg;
      const dmg = randInt(14, 20) + game.player.strength;
      game.enemy.hp -= dmg;
      applyStatus(game.enemy, "burn", 2);
      game.player.skillCd = game.player.maxSkillCd;
      addLog(`You spend ${selfDmg} HP to deal ${dmg} damage and inflict burn.`);
      return true;
    }

    if (game.player.skill === "Fire Lance") {
      const dmg = randInt(12, 18) + game.player.strength;
      game.enemy.hp -= dmg;
      applyStatus(game.enemy, "burn", 3);
      if (chance(0.35)) {
        applyStatus(game.enemy, "weak", 1);
        addLog(`You cast Fire Lance for ${dmg} damage, inflicting burn and weak.`);
      } else {
        addLog(`You cast Fire Lance for ${dmg} damage and inflict burn.`);
      }
      game.player.skillCd = game.player.maxSkillCd;
      return true;
    }

    return false;
  });
}

function defendTurn() {
  runCombatRound(() => {
    applyStatus(game.player, "guard", 1);
    game.defending = true;
    addLog("You defend and gain guard.");
  });
}

function attemptRun() {
  if (game.forcedFight) {
    addLog("There is nowhere to run.");
    showCombat();
    return;
  }
  if (chance(0.65)) {
    addLog(`You escape from ${game.enemy.name}.`);
    resetEnemy();
    showPathChoice();
    return;
  }
  addLog("You fail to escape.");
  enemyPhase();
}

function chooseCombatItem() {
  clearChoices();
  setScene("Use Item", "Combat", "Choose a consumable.", "🎒");

  Object.entries(game.player.inventory).forEach(([itemName, qty]) => {
    addChoice(
      itemName,
      `x${qty}`,
      () => useCombatItem(itemName),
      qty <= 0
    );
  });

  addChoice("Back", "Return to combat menu.", showCombat);
  updateUI();
}

function useCombatItem(itemName) {
  if (game.player.inventory[itemName] <= 0) {
    addLog(`You do not have ${itemName}.`);
    showCombat();
    return;
  }

  runCombatRound(() => {
    const item = ITEMS[itemName];
    game.player.inventory[itemName] -= 1;

    if (item.type === "heal") {
      const healed = healPlayer(item.heal);
      addLog(`You use ${itemName} and recover ${healed} HP.`);
      return;
    }

    if (item.type === "bomb") {
      const dmg = randInt(item.damageMin, item.damageMax);
      game.enemy.hp -= dmg;
      addLog(`You throw ${itemName} for ${dmg} damage.`);
      return;
    }

    if (item.type === "escape") {
      if (game.forcedFight) {
        addLog("The smoke helps, but you cannot escape this fight.");
      } else {
        addLog("You vanish in smoke and escape.");
        resetEnemy();
        showPathChoice();
        throw new Error("__escape__");
      }
      return;
    }

    if (item.type === "elixir") {
      game.player.maxHp += item.hpGain;
      const healed = healPlayer(item.heal);
      addLog(`You gain +${item.hpGain} max HP and recover ${healed} HP.`);
    }
  });
}

function runCombatRound(playerAction) {
  try {
    const playerTicks = tickStatuses(game.player, false);
    playerTicks.forEach(m => addLog(m));
    if (game.player.hp <= 0) {
      handleDeath();
      return;
    }

    const result = playerAction();
    if (result === false) {
      showCombat();
      return;
    }

    if (game.enemy && game.enemy.hp <= 0) {
      handleVictory();
      return;
    }

    companionPhase();
    if (game.enemy && game.enemy.hp <= 0) {
      handleVictory();
      return;
    }

    const enemyTicks = tickStatuses(game.enemy, true);
    enemyTicks.forEach(m => addLog(m));
    if (game.enemy && game.enemy.hp <= 0) {
      handleVictory();
      return;
    }

    enemyPhase();
  } catch (err) {
    if (err.message !== "__escape__") {
      console.error(err);
      addLog("Something went wrong in combat.");
      showCombat();
    }
  }
}

function companionPhase() {
  if (!game.player.companion || !game.enemy) return;

  const c = game.player.companion;
  const dmg = randInt(c.attackMin, c.attackMax);
  game.enemy.hp -= dmg;
  addLog(`${c.name} hits ${game.enemy.name} for ${dmg} damage.`);

  if (c.bonus === "heal" && chance(0.30)) {
    const healed = healPlayer(4);
    if (healed > 0) addLog(`${c.name} restores ${healed} HP to you.`);
  }
}

function enemyPhase() {
  if (!game.enemy) return;

  const e = game.enemy;

  if (e.ai === "guarder" && e.hp < Math.floor(e.maxHp / 2) && chance(0.25)) {
    applyStatus(e, "guard", 1);
    addLog(`${e.name} braces and gains guard.`);
    endRound();
    return;
  }

  if (e.ai === "burner" && chance(0.18)) {
    const raw = randInt(Math.max(1, e.atkMin - 1), e.atkMax);
    const taken = damagePlayer(raw);
    applyStatus(game.player, "burn", 2);
    addLog(`${e.name} scorches you for ${taken} damage and inflicts burn.`);
    endRound();
    return;
  }

  if (e.ai === "bleeder" && chance(0.18)) {
    const raw = randInt(e.atkMin, e.atkMax);
    const taken = damagePlayer(raw);
    applyStatus(game.player, "bleed", 2);
    addLog(`${e.name} cuts you for ${taken} damage and inflicts bleed.`);
    endRound();
    return;
  }

  if (e.ai === "weaken" && chance(0.16)) {
    const raw = randInt(e.atkMin, e.atkMax);
    const taken = damagePlayer(raw);
    applyStatus(game.player, "weak", 2);
    addLog(`${e.name} strikes for ${taken} damage and inflicts weak.`);
    endRound();
    return;
  }

  if (e.ai === "boss1" && chance(0.18)) {
    applyStatus(game.player, "weak", 2);
    addLog("The king's presence weakens you.");
  }

  if (e.ai === "boss2" && chance(0.20)) {
    applyStatus(game.player, "burn", 2);
    addLog("Ash-fire lashes across the room. You are burning.");
  }

  if ((e.ai === "boss1" || e.ai === "boss2") && chance(0.20)) {
    applyStatus(e, "guard", 1);
    addLog("The king gathers a shell of ash.");
  }

  let dmg = randInt(e.atkMin, e.atkMax);
  if (e.statuses.weak > 0) dmg = Math.max(1, dmg - 2);
  const crit = chance(e.elite ? 0.12 : 0.08);
  if (crit) dmg += randInt(2, 4);

  const taken = damagePlayer(dmg);
  if (taken <= 0) {
    addLog(`${e.name} attacks, but you avoid the blow.`);
  } else {
    addLog(`${e.name} hits you for ${taken} damage${crit ? " (critical)" : ""}.`);
  }

  endRound();
}

function damagePlayer(raw) {
  if (game.player.companion?.bonus === "dodge" && chance(0.10)) {
    return 0;
  }
  const reduced = Math.max(1, raw - playerDefense());
  game.player.hp -= reduced;
  return reduced;
}

function endRound() {
  if (game.defending && hasRelic("thornsGuard") && game.enemy && game.enemy.hp > 0) {
    game.enemy.hp -= 2;
    addLog("Mirror Nail reflects 2 damage.");
  }

  game.defending = false;

  if (game.player.skillCd > 0) {
    game.player.skillCd -= 1;
  }

  if (game.enemy && game.enemy.hp <= 0) {
    handleVictory();
    return;
  }

  if (game.player.hp <= 0) {
    handleDeath();
    return;
  }

  updateUI();
  showCombat();
}

function handleVictory() {
  if (!game.enemy) return;

  const enemy = game.enemy;
  const gold = gainGold(enemy.gold);
  game.player.xp += enemy.xp;

  addLog(`You defeat ${enemy.name}.`);
  addLog(`You gain ${gold} gold and ${enemy.xp} XP.`);

  if (enemy.elite) {
    const relic = randomRelic();
    if (relic) {
      game.player.relics.push(relic);
      addLog(`You gain relic: ${relic.name}.`);
    }
  }

  if (enemy.miniboss && enemy.name !== BOSS.name) {
    game.player.flags.beatMiniboss = true;
    const healed = healPlayer(16);
    addLog(`You recover ${healed} HP after the miniboss.`);
  }

  const leveled = levelUpIfNeeded();
  if (leveled) {
    addLog(`You reach level ${game.player.level} and fully recover.`);
  }

  if (chance(0.25)) {
    const found = ["Potion", "Bomb", "Hi-Potion"][randInt(0, 2)];
    game.player.inventory[found] += 1;
    addLog(`You also find: ${found}.`);
  }

  if (enemy.name === BOSS.name) {
    handleBossVictory();
    return;
  }

  resetEnemy();
  showPathChoice();
}

function handleBossVictory() {
  clearChoices();
  resetEnemy();

  let ending = "SURVIVOR OF THE THIRD DESCENT";
  if (game.player.flags.rescuedScout && game.player.flags.blessed && !game.player.flags.cursed) {
    ending = "KINGBREAKER, STILL HUMAN";
  } else if (game.player.flags.bloodOath && game.player.flags.cursed) {
    ending = "THRONE-THIEF OF ASH";
  } else if (game.player.companion && game.player.relics.length >= 3) {
    ending = "RELIC-LORD";
  }

  setScene(
    "Victory",
    "Ending",
    `You defeat the King Beneath Ash.<br><br><span class="accent">${ending}</span>`,
    "👑"
  );

  addChoice("Return to Town", "The stair is quiet, for now.", showTown);
  updateUI();
}

function handleDeath() {
  clearChoices();
  resetEnemy();
  game.mode = "dead";
  setScene(
    "You Died",
    "Defeat",
    `${game.player.name} the ${game.player.className} fell at depth ${game.player.depth}.`,
    "☠"
  );
  addLog("You died.");
  addChoice("New Run", "Try again.", startNewRunFlow);
  addChoice("Load Save", "Return from a prior save.", loadGame);
  updateUI();
}

// ======================================================
// BOSS PHASES
// ======================================================
function maybeAdvanceBossPhase() {
  if (!game.enemy || game.enemy.name !== BOSS.name) return false;
  if (game.bossPhase === 1 && game.enemy.hp <= 0) {
    game.bossPhase = 2;
    game.enemy = {
      name: BOSS.name,
      glyph: BOSS.glyph,
      hp: BOSS.phase2Hp,
      maxHp: BOSS.phase2Hp,
      atkMin: BOSS.atk2[0],
      atkMax: BOSS.atk2[1],
      gold: BOSS.gold,
      xp: BOSS.xp,
      ai: "boss2",
      elite: true,
      miniboss: true,
      statuses: makeStatuses()
    };
    addLog("The king collapses... then rises again in ash.");
    showCombat();
    return true;
  }
  return false;
}

// monkey-patch victory handler entry for boss phase
const originalHandleVictory = handleVictory;
handleVictory = function wrappedHandleVictory() {
  if (game.enemy && game.enemy.name === BOSS.name && game.bossPhase === 1 && game.enemy.hp <= 0) {
    if (maybeAdvanceBossPhase()) {
      updateUI();
      return;
    }
  }
  originalHandleVictory();
};

// ======================================================
// GLOBAL BUTTONS
// ======================================================
els.newRunBtn.addEventListener("click", startNewRunFlow);
els.saveBtn.addEventListener("click", saveGame);
els.loadBtn.addEventListener("click", loadGame);
els.clearLogBtn.addEventListener("click", clearLog);
els.townBtn.addEventListener("click", () => {
  if (game.player) showTown();
});
els.statsBtn.addEventListener("click", updateUI);

// ======================================================
// INITIAL
// ======================================================
(function init() {
  setScene(
    "Black Stair: Breaking Ground",
    "Menu",
    "The black stair has opened. Press <strong>New Run</strong> to begin.",
    "🪜"
  );
  clearChoices();
  updateUI();
})();
