const hands = {
  rock: { label: "ぐー", symbol: "●", image: "assets/images/janken_gu.png", beats: "scissors" },
  scissors: { label: "ちょき", symbol: "✌", image: "assets/images/janken_choki.png", beats: "paper" },
  paper: { label: "ぱー", symbol: "▰", image: "assets/images/janken_pa.png", beats: "rock" },
};

function characterVariant(prefix, index) {
  const id = String(index).padStart(2, "0");
  const paddedBase = `assets/images/character_${prefix}_${id}`;

  // 本番では存在する .png を優先し、旧形式 .png.png だけを保険にする。
  // .webp/.jpg/番号ゼロなし総当たりは、スマホで404連打になりやすいので使わない。
  return [
    `${paddedBase}.png`,
    `${paddedBase}.png.png`,
  ];
}

function characterVariants(prefix, count) {
  return Array.from({ length: count }, (_, index) => characterVariant(prefix, index + 1));
}

const characterImages = {
  normal: characterVariants("normal", 6),
  draw: characterVariants("draw", 3),
  happy: characterVariants("happy", 6),
  smug: characterVariants("smug", 6),
  worried: characterVariants("worried", 6),
  panic: characterVariants("panic", 6),
  excited: characterVariants("excited", 6),
  shocked: characterVariants("shocked", 4),
  win: characterVariants("happy", 6),
  lose: [...characterVariants("worried", 6), ...characterVariants("panic", 6)],
};


const CHARACTER_POSE_META = {
  normal: [
    { hand: "neutral", vibe: "calm" },
    { hand: "neutral", vibe: "gentle" },
    { hand: "neutral", vibe: "quiet" },
    { hand: "paper", vibe: "open" },
    { hand: "neutral", vibe: "thinking" },
    { hand: "paper", vibe: "wave" },
  ],
  draw: [
    { hand: "neutral", vibe: "soft" },
    { hand: "paper", vibe: "invite" },
    { hand: "neutral", vibe: "secret" },
  ],
  happy: [
    { hand: "neutral", vibe: "sweet" },
    { hand: "neutral", vibe: "up" },
    { hand: "neutral", vibe: "cheer" },
    { hand: "neutral", vibe: "close" },
    { hand: "paper", vibe: "welcome" },
    { hand: "scissors", vibe: "sign" },
  ],
  smug: [
    { hand: "paper", vibe: "show" },
    { hand: "neutral", vibe: "thinking" },
    { hand: "neutral", vibe: "quiet" },
    { hand: "neutral", vibe: "pose" },
    { hand: "neutral", vibe: "tease" },
    { hand: "paper", vibe: "shrug" },
  ],
  worried: [
    { hand: "neutral", vibe: "prayer" },
    { hand: "neutral", vibe: "shy" },
    { hand: "neutral", vibe: "uneasy" },
    { hand: "neutral", vibe: "heart" },
    { hand: "neutral", vibe: "small" },
    { hand: "neutral", vibe: "quiet" },
  ],
  panic: [
    { hand: "paper", vibe: "shock" },
    { hand: "paper", vibe: "rush" },
    { hand: "neutral", vibe: "flustered" },
    { hand: "neutral", vibe: "uneasy" },
    { hand: "paper", vibe: "wide" },
    { hand: "paper", vibe: "wide" },
  ],
  excited: [
    { hand: "neutral", vibe: "spark" },
    { hand: "rock", vibe: "pump" },
    { hand: "paper", vibe: "reach" },
    { hand: "paper", vibe: "welcome" },
    { hand: "rock", vibe: "pump" },
    { hand: "neutral", vibe: "call" },
  ],
  shocked: [
    { hand: "neutral", vibe: "surprised" },
    { hand: "neutral", vibe: "gasp" },
    { hand: "neutral", vibe: "taken" },
    { hand: "neutral", vibe: "stunned" },
  ],
  win: [
    { hand: "neutral", vibe: "sweet" },
    { hand: "neutral", vibe: "up" },
    { hand: "neutral", vibe: "cheer" },
    { hand: "neutral", vibe: "close" },
    { hand: "paper", vibe: "welcome" },
    { hand: "scissors", vibe: "sign" },
  ],
  lose: [
    { hand: "neutral", vibe: "prayer" },
    { hand: "neutral", vibe: "shy" },
    { hand: "neutral", vibe: "uneasy" },
    { hand: "neutral", vibe: "heart" },
    { hand: "neutral", vibe: "small" },
    { hand: "neutral", vibe: "quiet" },
  ],
};

const CHARACTER_SHOT_PRESETS = {
  calm: [
    { shot: "mid", height: 146, scale: 1.00, x: 0, y: -3, rot: 0 },
    { shot: "close-left", height: 152, scale: 1.06, x: -10, y: -7, rot: -2.2 },
    { shot: "close-right", height: 152, scale: 1.06, x: 10, y: -7, rot: 2.2 },
  ],
  gentle: [
    { shot: "close-left", height: 156, scale: 1.10, x: -12, y: -9, rot: -2.8 },
    { shot: "close-right", height: 156, scale: 1.10, x: 10, y: -8, rot: 2.0 },
    { shot: "mid", height: 150, scale: 1.02, x: 0, y: -4, rot: 0 },
  ],
  excited: [
    { shot: "close-left", height: 162, scale: 1.12, x: -8, y: -8, rot: -1.8 },
    { shot: "close-right", height: 162, scale: 1.12, x: 8, y: -8, rot: 1.8 },
    { shot: "mid", height: 156, scale: 1.04, x: 0, y: -4, rot: 0 },
  ],
  panic: [
    { shot: "close-left", height: 160, scale: 1.11, x: -12, y: -7, rot: -3.2 },
    { shot: "close-right", height: 160, scale: 1.11, x: 12, y: -7, rot: 3.2 },
    { shot: "mid", height: 154, scale: 1.05, x: 0, y: -3, rot: 0 },
  ],
  smug: [
    { shot: "close-left", height: 158, scale: 1.12, x: -14, y: -8, rot: -2.4 },
    { shot: "close-right", height: 158, scale: 1.12, x: 12, y: -8, rot: 2.4 },
    { shot: "mid", height: 152, scale: 1.04, x: 0, y: -4, rot: 0 },
  ],
};

function characterPoseMetaFor(mood, index) {
  const list = CHARACTER_POSE_META[mood] || CHARACTER_POSE_META.normal;
  return list[index - 1] || { hand: "neutral", vibe: "calm" };
}

function characterEntriesForMood(mood) {
  const characterMood = characterImages[mood] ? mood : "normal";
  return normalizeImageGroups(characterImages[characterMood]).map((sources, index) => ({
    mood: characterMood,
    index: index + 1,
    sources,
    meta: characterPoseMetaFor(characterMood, index + 1),
  }));
}

function randomFromList(list) {
  if (!list || !list.length) {
    return null;
  }
  return list[Math.floor(Math.random() * list.length)] || list[0] || null;
}

function scoreCharacterEntry(entry, context = null) {
  const meta = entry.meta || {};
  const shownHand = meta.hand || "neutral";
  let score = Math.random() * 0.35;

  if (meta.vibe === "close" || meta.vibe === "welcome" || meta.vibe === "reach") {
    score += 0.4;
  }

  if (!context) {
    return score;
  }

  const feeling = context.feeling || "";
  const targetHand = context.targetVisualHand || context.cpuHand || null;
  const fakeHand = context.wordHand || null;

  if (["match", "honest", "panic", "trueEnd"].includes(feeling)) {
    if (shownHand === targetHand) {
      score += 9;
    } else if (shownHand === "neutral") {
      score += 4;
    } else {
      score -= 0.8;
    }
  } else if (feeling === "bait") {
    if (shownHand === fakeHand) {
      score += 9;
    } else if (shownHand === "neutral") {
      score += 3.6;
    } else if (shownHand === targetHand) {
      score += 0.8;
    }
  } else if (feeling === "hide") {
    if (shownHand === "neutral") {
      score += 8.2;
    } else {
      score -= 1.8;
    }
  } else if (feeling === "mirror") {
    if (shownHand === "neutral") {
      score += 7.0;
    } else {
      score += 2.4;
    }
    if (meta.vibe === "welcome" || meta.vibe === "reach" || meta.vibe === "soft") {
      score += 2.0;
    }
  } else if (feeling === "hesitate") {
    if (shownHand === "neutral") {
      score += 7.0;
    }
    if (meta.vibe === "shy" || meta.vibe === "uneasy" || meta.vibe === "thinking") {
      score += 2.2;
    }
    if (shownHand === fakeHand || shownHand === targetHand) {
      score += 1.0;
    }
  }

  if (context.preferCloseUp) {
    score += meta.vibe === "close" ? 1.6 : 0.4;
  }

  return score;
}

function orderedSourcesForEntries(entries) {
  return uniqueImageSources(entries.flatMap((entry) => entry.sources || []));
}

function shotPresetBucketForMood(mood, context = null) {
  if (context && (context.feeling === "panic" || mood === "panic" || mood === "shocked")) {
    return CHARACTER_SHOT_PRESETS.panic;
  }

  if (mood === "excited" || mood === "draw") {
    return CHARACTER_SHOT_PRESETS.excited;
  }

  if (mood === "smug") {
    return CHARACTER_SHOT_PRESETS.smug;
  }

  if (mood === "happy" || mood === "win") {
    return CHARACTER_SHOT_PRESETS.gentle;
  }

  return CHARACTER_SHOT_PRESETS.calm;
}

function chooseCharacterPresentation(mood, context = null) {
  const entries = characterEntriesForMood(mood);
  if (!entries.length) {
    return {
      sources: commonCharacterFallbackSources(),
      meta: { hand: "neutral", vibe: "calm" },
      shot: randomFromList(CHARACTER_SHOT_PRESETS.calm),
    };
  }

  const ranked = entries
    .map((entry) => ({ ...entry, _score: scoreCharacterEntry(entry, context) }))
    .sort((a, b) => b._score - a._score);

  const picked = ranked[0] || entries[0];
  const others = ranked.filter((entry) => entry !== picked);
  const shot = randomFromList(shotPresetBucketForMood(picked.mood, context)) || randomFromList(CHARACTER_SHOT_PRESETS.calm);

  return {
    entry: picked,
    meta: picked.meta,
    shot,
    sources: uniqueImageSources([
      ...(picked.sources || []),
      ...orderedSourcesForEntries(others),
      ...commonCharacterFallbackSources(),
    ]),
  };
}

function applyCharacterPresentation(presentation) {
  if (!characterFrame) {
    return;
  }

  const shot = presentation?.shot || {};
  const meta = presentation?.meta || {};

  characterFrame.dataset.shot = shot.shot || "mid";
  characterFrame.dataset.poseHand = meta.hand || "neutral";
  characterFrame.style.setProperty("--char-height", `${shot.height || 152}%`);
  characterFrame.style.setProperty("--char-scale", `${shot.scale || 1}`);
  characterFrame.style.setProperty("--char-x", `${shot.x || 0}px`);
  characterFrame.style.setProperty("--char-y", `${shot.y || 0}px`);
  characterFrame.style.setProperty("--char-rot", `${shot.rot || 0}deg`);
}

const sceneImages = {
  intro: "assets/images/scene_intro.png",
  playerWin: "assets/images/scene_player_win.png",
  playerLose: "assets/images/scene_player_lose.png",
  chanceWin: "assets/images/scene_chance_win.png",
  finalWin: "assets/images/scene_final_win.png",
  trueEnd: "assets/images/scene_true_end.png",
};

const galleryItems = [
  {
    id: "normalWin",
    title: "ふつうの かち",
    lockedTitle: "ないしょ",
    src: "assets/images/scene_player_win.png",
    type: "ending",
    unlockText: "まずは 30まいで勝つ",
  },
  {
    id: "chanceWin",
    title: "あいこ チャンス",
    lockedTitle: "ないしょ",
    src: "assets/images/scene_chance_win.png",
    fallbackSrc: "assets/images/scene_player_win.png",
    type: "ending",
    unlockText: "あいこを続けて チャンスで勝つ",
  },
  {
    id: "finalWin",
    title: "さいごの かち",
    lockedTitle: "ないしょ",
    src: "assets/images/scene_final_win.png",
    fallbackSrc: "assets/images/scene_player_win.png",
    type: "ending",
    unlockText: "さらにあいこを続けて 最後の勝負で勝つ",
  },
  {
    id: "gameOver",
    title: "おしまい",
    lockedTitle: "ないしょ",
    src: "assets/images/scene_player_lose.png",
    fallbackSrc: "assets/images/scene_player_win.png",
    type: "ending",
    unlockText: "あいてに30まい取られた後 つづけずに終わる",
  },
  {
    id: "trueEnd",
    title: "ほんとの おわり",
    lockedTitle: "ないしょ",
    src: "assets/images/scene_true_end.png",
    fallbackSrc: "assets/images/scene_player_win.png",
    type: "trueEnd",
    unlockText: "4つの思い出を ぜんぶ集める",
    requiresComplete: true,
  },
];

const imageCache = new Map();
const imageFailCache = new Map();
let characterRetryTimer = null;
let sceneCharacterRetryTimer = null;
let characterRequestId = 0;
let sceneCharacterRequestId = 0;
let sceneIllustrationRequestId = 0;
let resultLabelTimer = null;
let startupAssetsReady = null;
let messageTypingTimer = null;
let messageTypingId = 0;
let sceneTypingTimer = null;
let sceneTypingId = 0;
let sceneCurrentFullText = "";
let sceneCurrentDone = false;
let sceneTypingResolve = null;
let sceneAdvanceResolve = null;
let sceneDialogActive = false;
let sceneSequenceId = 0;
let characterBeatId = 0;
let cutInTimer = null;
let galleryIndex = 0;
let galleryRequestId = 0;
let galleryPreloadQueued = false;
let lastChoiceActivationAt = 0;
let pendingChoiceHand = null;
let pendingChoiceAt = 0;
let pendingChoiceTimer = null;
let psychCueMessageTimer = null;
let lastSpecialCueSignalAt = 0;

const CHOICE_POINTER_ACTIVATION_SUPPRESS_MS = 420;
const CHOICE_ACTIVATION_GUARD_MS = 120;
const CHOICE_BUFFER_MS = 900;

const urlParams = new URLSearchParams(window.location.search);
const DEBUG_MODE = urlParams.has("debug");
const ASSET_VERSION = "20260613-guide-mirror-fix1";

function assetPath(src) {
  if (!src || /^(?:data:|blob:|https?:)/.test(src) || src.includes("?v=")) {
    return src;
  }

  return `${src}?v=${ASSET_VERSION}`;
}

function clearAllJankenStorage() {
  try {
    Object.keys(window.localStorage || {})
      .filter((key) => key.startsWith("janken"))
      .forEach((key) => window.localStorage.removeItem(key));
  } catch (error) {
    // localStorage may be unavailable.
  }
}

function resetSavedGameIfRequested() {
  if (!urlParams.has("reset")) {
    return;
  }

  clearAllJankenStorage();
}

resetSavedGameIfRequested();

function detectLowPowerDevice() {
  try {
    const forcedLite = urlParams.has("lite") || urlParams.get("perf") === "lite";
    const forcedFull = urlParams.has("full") || urlParams.get("perf") === "full";

    if (forcedLite) {
      return true;
    }

    if (forcedFull) {
      return false;
    }

    const ua = navigator.userAgent || "";
    const platform = navigator.platform || "";
    const cores = Number(navigator.hardwareConcurrency || 0);
    const memory = Number(navigator.deviceMemory || 0);
    const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches === true;
    const coarsePointer = window.matchMedia?.("(pointer: coarse)")?.matches === true;
    const touchPoints = Number(navigator.maxTouchPoints || 0);
    const isIOS = /iPhone|iPad|iPod/.test(ua) || (platform === "MacIntel" && touchPoints > 1);
    const isAndroid = /Android/i.test(ua);
    const isMobile = isIOS || isAndroid || /Mobile|AQUOS|SH-51C/i.test(ua) || coarsePointer || touchPoints > 0;

    // SH-51C級を基準に、スマホは基本的に軽量モードへ倒す。
    return Boolean(
      reducedMotion ||
        isMobile ||
        (cores > 0 && cores <= 6) ||
        (memory > 0 && memory <= 4)
    );
  } catch (error) {
    return true;
  }
}

const LOW_POWER_MODE = detectLowPowerDevice();
const IMAGE_FAIL_CACHE_MS = LOW_POWER_MODE ? 60000 : 15000;
const TOUCH_DEVICE = (() => {
  try {
    return Number(navigator.maxTouchPoints || 0) > 0 ||
      window.matchMedia?.("(pointer: coarse)")?.matches === true;
  } catch (error) {
    return false;
  }
})();
const FAST_MOBILE_MODE = urlParams.has("fast") || LOW_POWER_MODE || TOUCH_DEVICE;
const JANKEN_CALL_STEP_MS = FAST_MOBILE_MODE ? 170 : 330;
const JANKEN_REVEAL_TO_HAND_MS = FAST_MOBILE_MODE ? 10 : 26;
const HAND_REVEAL_PAUSE_MS = FAST_MOBILE_MODE ? 55 : 90;
const RESULT_PAUSE_SCALE = FAST_MOBILE_MODE ? 0.98 : 1;
const MATCH_POINT = 30;
const BASE_メダル = 5;
const MAX_メダル = BASE_メダル * (2 ** 100);
const JACKメダル_MULTIPLIER = 2;
const CONTINUE_SECONDS = 10;
const DRAW_WARNING_COUNT = 5;
const CHANCE_DRAW_COUNT = 10;
const FINAL_DRAW_COUNT = 15;
const POST_TRUE_COMPLETE_DRAW_COUNT = 100;
const CHANCE_MESSAGES = ["メダル大！", "ねらって！", "あわせる？", "まだいける！"];
const INTRO_LINES = ["よろしくね！", "じゃんけんしよ♪", "てをえらんでね", "はじめるよ！", "あいこ、できる？"];
const CHANCE_ENTRY_LINES = ["チャンスタイム！", "あいこ成功！", "メダル大！", "ここからチャンス"];
const DRAW_WARNING_LINES = ["あいこ いいね", "メダルふえた", "まだつづく？"];
const FINAL_JANKEN_ENTRY_LINES = ["さいごのじゃんけん！", "ここからノーヒント", "よく考えてね"];
const FINAL_JANKEN_IDLE_LINES = ["つぎで きまるよ", "よく見て", "さいごだよ"];
const FINAL_CONFIRM_LINES = ["それでいい？", "もういちど おして", "きめる？"];
const PSYCH_EVENT_CHANCE = 0.12;
const POST_TRUE_DRAW_RECORD_KEY = "jankenPostTrueDrawRecordV1";
const BEST_MEDAL_RECORD_KEY = "jankenBestMedalRecordV1";
const HINT_GUIDE_KEY = "jankenHintGuideSeenV1";
const HAND_NAMES = {
  rock: "ぐー",
  scissors: "ちょき",
  paper: "ぱー",
};

const RELATIONSHIP_INTENT = "continueAiko";

const MOOD_LABELS = {
  normal: "きもち：よめない",
  draw: "きもち：あわせたい",
  happy: "きもち：あわせたい",
  smug: "きもち：ためす",
  worried: "きもち：すなお",
  panic: "きもち：あせり",
  excited: "きもち：チャンス",
  shocked: "きもち：びっくり",
  win: "きもち：あわせたい",
  lose: "きもち：すなお",
};

const FEELING_LABELS = {
  honest: {
    label: "きもち：すなお",
    rule: "そのまま",
    hint: "言った手を出す",
  },
  match: {
    label: "きもち：あわせたい",
    rule: "同じ手",
    hint: "同じ手で続く",
  },
  bait: {
    label: "きもち：ためす",
    rule: "見せ手を外す",
    hint: "見せた手以外なら合わせる",
  },
  mirror: {
    label: "きもち：みてる",
    rule: "あなたに合わせる",
    hint: "先に出してみて",
  },
  hide: {
    label: "きもち：ないしょ",
    rule: "隠した手",
    hint: "ないしょの手を見る",
  },
  hesitate: {
    label: "きもち：まよい",
    rule: "今の言葉に合わせる",
    hint: "表示中の手を見る",
  },
  panic: {
    label: "きもち：あせり",
    rule: "見えてる手",
    hint: "あいての手を見る",
  },
  trueEnd: {
    label: "きもち：ぴったり",
    rule: "同じ手",
    hint: "同じ手で続く",
  },
};
const SCENE_INTRO_LINES = [
  "よろしくね！",
  "じゃんけんしよ♪",
  "あいこも ねらってね。",
  "メダルを とろう！",
];
const SCENE_PLAYER_WIN_LINES = [
  "すごいね、あなたの勝ちだよ。楽しかったから、また勝負してね！",
  "まけちゃった…。でもすごく楽しかったよ。また遊びに来てね。",
  "あなたの勝ちだね。次はもっと強くなって待ってるね！",
  "くやしいけど、楽しかったよ。よかったら、また勝負しよ？",
];
const SCENE_PLAYER_LOSE_LINES = [
  "ここまで遊んでくれてありがとう。もう一回だけ、勝負してみる？",
  "おつかれさま。あと少しだったね。よかったら、また挑戦してね。",
  "最後まで遊んでくれてうれしいよ。また一緒に勝負しようね。",
  "また来てくれたらうれしいな。次の勝負、待ってるね。",
];

const dialogue = {
  final: {
    idle: FINAL_JANKEN_IDLE_LINES,
    cpuWin: ["きまったね！", "とったよ！", "また続けよ"],
    cpuLose: ["あなたが読んだね！", "すごい！", "よまれた…！"],
    draw: ["またあいこ！", "まだつづく！", "ぴったりだね"],
    image: "excited",
  },
  even: {
    idle: ["てをえらんで", "なにを出す？", "よく見てね"],
    cpuWin: ["とれちゃった", "まだ続けよ", "メダルもらうね"],
    cpuLose: ["とられた…", "でも楽しいね", "もう一回ね"],
    draw: ["あいこ！", "もういっかい", "ぴったりだね"],
    image: "normal",
  },
  playerLeadSmall: {
    idle: ["つよいね", "まよっちゃう", "つぎはどう？"],
    cpuWin: ["とれたよ", "まだ続くよ", "ほっとした"],
    cpuLose: ["あっ…", "また読まれた", "ちゃんと見てるね"],
    draw: ["あいこだね", "まだつづくね", "メダルふえるよ"],
    image: "worried",
  },
  playerLeadBig: {
    idle: ["あせってきた", "よく見てるね", "つぎこそ…"],
    cpuWin: ["とれたよ", "まだおわらない", "ほっとした"],
    cpuLose: ["まいったな…", "よく見てるね", "どうしよう"],
    draw: ["またあいこ", "どきどきするね", "メダル大きいよ"],
    image: "panic",
  },
  cpuLeadSmall: {
    idle: ["いい感じ♪", "つぎもいくよ", "よめるかな？"],
    cpuWin: ["メダルもらうね", "まだ続けよ", "いい手だった"],
    cpuLose: ["あれ？", "やるね", "まだ続けたい"],
    draw: ["あいこ！", "おしいね", "まだつづく？"],
    image: "happy",
  },
  cpuLeadBig: {
    idle: ["よゆうかも", "どうする？", "あててみて"],
    cpuWin: ["またとれた♪", "読めるかな？", "ふふっ"],
    cpuLose: ["えっ？", "油断した", "びっくりした"],
    draw: ["あいこだね", "ねばるね", "たのしいね"],
    image: "smug",
  },
  chance: {
    idle: CHANCE_MESSAGES,
    cpuWin: ["メダルもらうね", "まだ続くよ", "チャンス中だよ"],
    cpuLose: ["とられた！", "うまいね", "よく読んだね"],
    draw: ["メダルふえた！", "まだまだ！", "あいこ！"],
    image: "excited",
  },
};

const endgameLines = ["あとすこし", "ここ大事", "よく見て"];

const GALLERY_PROGRESS_KEY = "jankenアルバムProgressV3";
const GALLERY_ROUTE_KEYS = ["normalWin", "chanceWin", "finalWin", "gameOver"];
const TRUE_END_UNLOCK_LINES = ["……全部、見つけてくれたんだね。", "それなら、ほんとのことを話すね。"];
const TRUE_END_LINES = [
  "……全部、\n見つけてくれたんだね。",
  "普通に勝った時も、",
  "チャンスタイムも、",
  "最後の一発勝負まで……",
  "ちゃんと来てくれた。",
  "ほんとはね、",
  "少しだけ気づいてほしかったの。",
  "どうして私が、",
  "あいこを続けたがってたのか。",
  "勝っても、負けても、",
  "そこで終わっちゃうでしょ？",
  "でも、あいこなら……",
  "もう一回って言えるから。",
  "もう少しだけ、",
  "一緒にいられるから。",
  "同じ手を出すのって、",
  "同じ気持ちになれたみたいで、",
  "少し嬉しかったんだ。",
  "だから、最後まで付き合ってくれて……",
  "ありがとう。",
  "あなたとするじゃんけん、",
  "私……好き。",
  "今度は、勝負じゃなくて。",
  "また、最初のあいこから始めよう？",
  "TRUE END\nまた、あいこから始めよう",
];
const DRAW_ROUTE_HINT_LINES = [
  "同じ手なら\nつづくよ",
  "あわせる？",
  "もういっかい",
];
const CHANCE_ROUTE_HINT_LINES = [
  "よく見てね",
  "あわせてみる？",
  "まだつづくよ",
];
const FINAL_ROUTE_HINT_LINES = [
  "あとすこし",
  "まだつづける？",
  "あいこ、できる？",
];

function getDefaultアルバムProgress() {
  return {
    normalWin: false,
    gameOver: false,
    chanceWin: false,
    finalWin: false,
    trueEndSeen: false,
  };
}

function sanitizeアルバムProgress(value) {
  const source = value && typeof value === "object" ? value : {};

  return {
    normalWin: source.normalWin === true,
    gameOver: source.gameOver === true,
    chanceWin: source.chanceWin === true,
    finalWin: source.finalWin === true,
    trueEndSeen: source.trueEndSeen === true,
  };
}

function loadアルバムProgress() {
  try {
    const raw = window.localStorage.getItem(GALLERY_PROGRESS_KEY);
    if (!raw) {
      return getDefaultアルバムProgress();
    }

    return sanitizeアルバムProgress(JSON.parse(raw));
  } catch (error) {
    return getDefaultアルバムProgress();
  }
}

function saveアルバムProgress(progress) {
  try {
    window.localStorage.setItem(GALLERY_PROGRESS_KEY, JSON.stringify(sanitizeアルバムProgress(progress)));
  } catch (error) {
    // localStorage may be unavailable in private or restricted browsers.
  }
}

function loadPostTrueDrawRecord() {
  try {
    const raw = window.localStorage.getItem(POST_TRUE_DRAW_RECORD_KEY);
    const value = Number.parseInt(raw || "0", 10);
    return Number.isFinite(value) && value > 0 ? value : 0;
  } catch (error) {
    return 0;
  }
}

function savePostTrueDrawRecord(value) {
  try {
    window.localStorage.setItem(POST_TRUE_DRAW_RECORD_KEY, String(Math.max(0, value || 0)));
  } catch (error) {
    // Storage errors should not stop the game.
  }
}

function getPostTrueDrawRecord() {
  return loadPostTrueDrawRecord();
}

function normalizeScoreValue(value) {
  const number = Number(value || 0);

  if (!Number.isFinite(number)) {
    return 0;
  }

  return Math.max(0, Math.min(MAX_メダル, Math.floor(number)));
}

function formatScoreValue(value) {
  const score = normalizeScoreValue(value);

  if (score >= 1000000000000000) {
    return score.toExponential(3).replace("e+", "e");
  }

  return score.toLocaleString("ja-JP");
}

function loadBestMedalRecord() {
  try {
    const raw = window.localStorage.getItem(BEST_MEDAL_RECORD_KEY);
    return normalizeScoreValue(raw);
  } catch (error) {
    return 0;
  }
}

function saveBestMedalRecord(value) {
  try {
    window.localStorage.setItem(BEST_MEDAL_RECORD_KEY, String(normalizeScoreValue(value)));
  } catch (error) {
    // Storage errors should not stop gameplay.
  }
}

function getBestMedalRecord() {
  const memoryRecord = typeof state !== "undefined" ? normalizeScoreValue(state.bestMedalRecord || 0) : 0;
  return Math.max(memoryRecord, loadBestMedalRecord());
}

function maybeUpdateBestMedalRecord(value) {
  const score = normalizeScoreValue(value);
  const previous = getBestMedalRecord();

  if (score <= previous) {
    state.medalNewRecord = false;
    updateMedalRecordHud();
    return {
      updated: false,
      previous,
      current: score,
      announce: false,
    };
  }

  state.bestMedalRecord = score;
  state.medalNewRecord = previous > 0;
  state.medalNewRecordValue = score;
  saveBestMedalRecord(score);
  updateMedalRecordHud();

  return {
    updated: true,
    previous,
    current: score,
    announce: previous > 0 && score >= 160,
  };
}

function getScoreTier() {
  // メダル額ではなく、あいこ継続数で難度を上げる。
  // 30回を超えたあたりはまだ読みやすく、60〜100回の間でたまにだけキワドイ読みを出す。
  if (state.draw >= 100) {
    return 4;
  }

  if (state.draw >= 80) {
    return 3;
  }

  if (state.draw >= 60) {
    return 2;
  }

  if (state.draw >= 40) {
    return 1;
  }

  return 0;
}

function getTrainingForcedFeeling() {
  if (!isGalleryTrainingMode()) {
    return null;
  }

  const stage = getGalleryTrainingStage();
  const draw = Math.max(0, state.draw || 0);

  if (stage === "basic") {
    // チャンス勝利までの練習。
    // 同じ手 → そのまま → まよい → ためす、の順で自然に覚える。
    const sequence = [
      "match",
      "honest",
      "match",
      "hesitate",
      "match",
      "bait",
      "mirror",
      "match",
      "hesitate",
      "bait",
      "match",
      "hide",
      "match",
      "hesitate",
    ];

    return sequence[draw] || null;
  }

  if (stage === "advanced") {
    // finalWin へ向かう練習。少しシビアにして、学んだ型を混ぜる。
    const sequence = [
      "match",
      "honest",
      "hesitate",
      "bait",
      "match",
      "hide",
      "hesitate",
      "panic",
      "mirror",
      "bait",
      "honest",
      "match",
      "hide",
    ];

    return sequence[draw] || null;
  }

  if (stage === "review") {
    // 最後の未回収要素へ向かう前の復習。
    const sequence = [
      "honest",
      "match",
      "bait",
      "hesitate",
      "match",
      "hide",
      "panic",
      "mirror",
    ];

    return sequence[draw] || null;
  }

  return null;
}



function loadHintGuideSeen() {
  try {
    return window.localStorage.getItem(HINT_GUIDE_KEY) === "1";
  } catch (error) {
    return false;
  }
}

function saveHintGuideSeen() {
  try {
    window.localStorage.setItem(HINT_GUIDE_KEY, "1");
  } catch (error) {
    // Storage errors should not stop gameplay.
  }
}

const state = {
  started: false,
  busy: false,
  ended: false,
  win: 0,
  lose: 0,
  draw: 0,
  pot: BASE_メダル,
  chance: false,
  drawWarningShown: false,
  finalJanken: false,
  finalConfirmHand: null,
  routeReachedChance: false,
  routeReachedFinal: false,
  psychEvent: null,
  nextCallMode: "normal",
  countdownTimer: null,
  chanceMessageTimer: null,
  chanceMessageIndex: 0,
  debugForceNextResult: null,
  debugAnswerVisible: DEBUG_MODE,
  debugAnswer: null,
  debugPanelVisible: false,
  debugSoundTaps: [],
  galleryUnlockedSession: false,
  galleryJustUnlockedId: null,
  galleryProgress: loadアルバムProgress(),
  trueEndingQueued: false,
  showingTrueEnding: false,
  inputGuideShownOnce: false,
  inputGuideVisible: false,
  postTrueRecordAnnounced: false,
  postTrueNewRecordShownFor: 0,
  bestMedalRecord: loadBestMedalRecord(),
  medalNewRecord: false,
  medalNewRecordValue: 0,
  currentFeeling: null,
  lastLine: "",
  flowId: 0,
};

const cabinet = document.querySelector(".cabinet");
const startButton = document.querySelector("#startButton");
const galleryButton = document.querySelector("#galleryButton");
const relationResetButton = document.querySelector("#relationResetButton");
const choiceButtons = document.querySelectorAll(".choice");
const choiceButtonGroup = document.querySelector(".choice-buttons");
const inputGuide = document.querySelector("#inputGuide");
const message = document.querySelector("#message");
const playerHand = document.querySelector("#playerHand");
const cpuHand = document.querySelector("#cpuHand");
const resultLabel = document.querySelector("#resultLabel");
const endOverlay = document.querySelector("#endOverlay");
const finalTitle = document.querySelector("#finalTitle");
const finalMessage = document.querySelector("#finalMessage");
const retryButton = document.querySelector("#retryButton");
const muteButton = document.querySelector("#muteButton");
const countdown = document.querySelector("#countdown");
const sceneOverlay = document.querySelector("#sceneOverlay");
const sceneIllustration = document.querySelector("#sceneIllustration");
const sceneCharacterImage = document.querySelector("#sceneCharacterImage");
const sceneCharacterFallback = document.querySelector("#sceneCharacterFallback");
const sceneMessage = document.querySelector("#sceneMessage");
const sceneNextButton = document.querySelector("#sceneNextButton");
const galleryOverlay = document.querySelector("#galleryOverlay");
const galleryImage = document.querySelector("#galleryImage");
const galleryLocked = document.querySelector("#galleryLocked");
const galleryProgress = document.querySelector("#galleryProgress");
const galleryCaption = document.querySelector("#galleryCaption");
const galleryCounter = document.querySelector("#galleryCounter");
const galleryCloseButton = document.querySelector("#galleryCloseButton");
const galleryPrevButton = document.querySelector("#galleryPrevButton");
const galleryNextButton = document.querySelector("#galleryNextButton");
const winCount = document.querySelector("#winCount");
const loseCount = document.querySelector("#loseCount");
const drawCount = document.querySelector("#drawCount");
const potCount = document.querySelector("#potCount");
const medalRecordHud = document.querySelector("#medalRecordHud");
const currentMedalRecord = document.querySelector("#currentMedalRecord");
const bestMedalRecord = document.querySelector("#bestMedalRecord");
const newMedalRecordBadge = document.querySelector("#newMedalRecordBadge");
const aikoGuideHud = document.querySelector("#aikoGuideHud");
const phaseLabel = document.querySelector("#phaseLabel");
const nextChanceLabel = document.querySelector("#nextChanceLabel");
const nextFinalLabel = document.querySelector("#nextFinalLabel");
const characterFrame = document.querySelector(".character-frame");
const characterImage = document.querySelector("#characterImage");
const characterFallback = document.querySelector("#characterFallback");

function applyPerformanceModeClass() {
  document.documentElement.classList.toggle("is-lite-performance", LOW_POWER_MODE);
  document.body?.classList.toggle("is-lite-performance", LOW_POWER_MODE);
  cabinet?.classList.toggle("is-lite-performance", LOW_POWER_MODE);
}

function isGameplayOverlayOpen() {
  return Boolean(
    (sceneOverlay && !sceneOverlay.hidden) ||
      (endOverlay && !endOverlay.hidden) ||
      (galleryOverlay && !galleryOverlay.hidden)
  );
}

function clearPendingChoice() {
  pendingChoiceHand = null;
  pendingChoiceAt = 0;
  if (pendingChoiceTimer) {
    window.clearTimeout(pendingChoiceTimer);
    pendingChoiceTimer = null;
  }
}

function canBufferChoiceInput() {
  return Boolean(state.started && state.busy && !state.ended && !isGameplayOverlayOpen());
}

function bufferChoiceInput(hand) {
  if (!hand || !hands[hand] || !canBufferChoiceInput()) {
    return false;
  }

  pendingChoiceHand = hand;
  pendingChoiceAt = performance.now();

  if (pendingChoiceTimer) {
    window.clearTimeout(pendingChoiceTimer);
  }

  pendingChoiceTimer = window.setTimeout(() => {
    clearPendingChoice();
  }, CHOICE_BUFFER_MS);

  return true;
}

function consumePendingChoice() {
  if (!pendingChoiceHand) {
    return false;
  }

  const hand = pendingChoiceHand;
  const queuedAt = pendingChoiceAt;
  clearPendingChoice();

  if (performance.now() - queuedAt > CHOICE_BUFFER_MS) {
    return false;
  }

  const button = choiceButtonForHand(hand);
  if (isChoiceInputLocked(button)) {
    return false;
  }

  window.requestAnimationFrame(() => {
    handleChoiceButtonClick(hand);
  });
  return true;
}

const KEYBOARD_HAND_MAP = {
  "1": "rock",
  g: "rock",
  "2": "scissors",
  c: "scissors",
  "3": "paper",
  p: "paper",
};

function getJankenTempoLevel(drawValue = state.draw) {
  const draw = Math.max(0, Number(drawValue || 0));

  if (draw >= 30) {
    return 4;
  }

  if (draw >= 15) {
    return 3;
  }

  if (draw >= 7) {
    return 2;
  }

  if (draw >= 3) {
    return 1;
  }

  return 0;
}

function getJankenTempo(drawValue = state.draw) {
  const level = getJankenTempoLevel(drawValue);
  const mobileSteps = [300, 240, 200, 165, 135];
  const desktopSteps = [390, 315, 250, 205, 165];
  const callStep = (FAST_MOBILE_MODE ? mobileSteps : desktopSteps)[level] || JANKEN_CALL_STEP_MS;

  return {
    level,
    callStep,
    revealToHand: Math.max(8, Math.round(callStep * 0.12)),
    handPause: Math.max(38, Math.round(callStep * 0.34)),
  };
}


function isTypingTarget(target) {
  const tagName = target?.tagName?.toLowerCase();

  return Boolean(
    target?.isContentEditable ||
      tagName === "input" ||
      tagName === "textarea" ||
      tagName === "select"
  );
}

function choiceButtonForHand(hand) {
  return [...choiceButtons].find((button) => button.dataset.hand === hand) || null;
}

function handleKeyboardShortcut(event) {
  if (isTypingTarget(event.target)) {
    return;
  }

  if (sceneDialogActive && sceneOverlay && !sceneOverlay.hidden) {
    if (event.key === "Enter" || event.key === " ") {
      advanceSceneDialog(event);
    }
    return;
  }

  if (galleryOverlay && !galleryOverlay.hidden) {
    if (event.key === "Escape") {
      event.preventDefault();
      closeアルバム();
      return;
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      moveアルバム(-1);
      return;
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      moveアルバム(1);
      return;
    }

    return;
  }

  if (event.key === "Escape" && state.debugPanelVisible) {
    event.preventDefault();
    toggleDebugMode(false);
    return;
  }

  const hand = KEYBOARD_HAND_MAP[event.key.toLowerCase()];
  if (!hand) {
    return;
  }

  const button = choiceButtonForHand(hand);
  if (isChoiceInputLocked(button)) {
    return;
  }

  event.preventDefault();
  handleChoiceButtonClick(hand);
}

function isChoiceInputLocked(button) {
  return !state.started || state.busy || state.ended || !button || button.disabled;
}

function shouldSuppressBrowserGesture(target) {
  return Boolean(target?.closest?.(".cabinet"));
}

["selectstart", "dragstart"].forEach((eventName) => {
  document.addEventListener(
    eventName,
    (event) => {
      if (shouldSuppressBrowserGesture(event.target)) {
        event.preventDefault();
      }
    },
    { capture: true }
  );
});

document.addEventListener(
  "contextmenu",
  (event) => {
    if (shouldSuppressBrowserGesture(event.target)) {
      event.preventDefault();
    }
  },
  { capture: true }
);


const AudioManager = (() => {
  const storageKey = "jankenRetroMuted";
  const bgmPaths = {
    normal: "assets/sounds/bgm_loop.mp3",
    chance: "assets/sounds/bgm_chance.mp3",
    final: "assets/sounds/bgm_final.mp3",
    trueEnd: "assets/sounds/bgm_true_end.mp3",
  };
  const bgmVolumes = {
    normal: 0.25,
    chance: 0.3,
    final: 0.32,
    trueEnd: 0.34,
  };
  const sfxPaths = {
    cutin: "assets/sounds/cutin_stinger.mp3",
    jankenCall: "assets/sounds/se_janken_call.mp3",
  };
  let context = null;
  let normalBgm = null;
  let chanceBgm = null;
  let finalBgm = null;
  let trueEndBgm = null;
  let cutinSfx = null;
  let jankenCallSfxPool = [];
  let jankenCallSfxIndex = 0;
  let chanceBgmFailed = false;
  let finalBgmFailed = false;
  let trueEndBgmFailed = false;
  let jankenCallSfxFailed = false;
  let currentBgmMode = null;
  let lastCutinSfxAt = 0;
  let gameplayPrepared = false;
  let muted = false;

  function loadMutedPreference() {
    try {
      muted = window.localStorage.getItem(storageKey) === "true";
    } catch (error) {
      muted = false;
    }
  }

  function initAudio() {
    try {
      if (typeof window === "undefined") {
        return;
      }

      loadMutedPreference();

      if (!normalBgm) {
        normalBgm = createBgm("normal");
      }

      // スマホでは起動時に全BGMを読むと重いので、通常BGMだけ作る。
      // チャンス・ファイナル・TRUE ENDは必要になった瞬間に lazy 作成する。
      if (!LOW_POWER_MODE) {
        ensureBgm("chance");
        ensureBgm("final");
        ensureBgm("trueEnd");
      }

      if (!context) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) {
          context = new AudioContext();
        }
      }
    } catch (error) {
      context = null;
    }
  }

  function createBgm(mode) {
    const audio = new Audio(bgmPaths[mode]);
    audio.loop = true;
    audio.volume = bgmVolumes[mode];
    audio.preload = mode === "normal" ? "metadata" : "none";
    audio.addEventListener(
      "error",
      () => {
        if (mode === "trueEnd") {
          console.warn("True End BGM not found: assets/sounds/bgm_true_end.mp3");
          trueEndBgmFailed = true;
          if (currentBgmMode === "trueEnd") {
            currentBgmMode = null;
            switchBgm("final");
          }
          return;
        }

        if (mode === "final") {
          console.warn("Final BGM not found: assets/sounds/bgm_final.mp3");
          finalBgmFailed = true;
          if (currentBgmMode === "final") {
            currentBgmMode = null;
            switchBgm("chance");
          }
          return;
        }

        if (mode === "chance") {
          console.warn("Chance BGM not found: assets/sounds/bgm_chance.mp3");
          chanceBgmFailed = true;
          if (currentBgmMode === "chance") {
            currentBgmMode = null;
            switchBgm("normal");
          }
        }
      },
      { once: true }
    );
    return audio;
  }

  function ensureBgm(mode) {
    if (mode === "trueEnd") {
      if (trueEndBgmFailed) {
        return ensureBgm("final");
      }
      if (!trueEndBgm) {
        trueEndBgm = createBgm("trueEnd");
      }
      return trueEndBgm;
    }

    if (mode === "final") {
      if (finalBgmFailed) {
        return ensureBgm("chance");
      }
      if (!finalBgm) {
        finalBgm = createBgm("final");
      }
      return finalBgm;
    }

    if (mode === "chance") {
      if (chanceBgmFailed) {
        return ensureBgm("normal");
      }
      if (!chanceBgm) {
        chanceBgm = createBgm("chance");
      }
      return chanceBgm;
    }

    if (!normalBgm) {
      normalBgm = createBgm("normal");
    }
    return normalBgm;
  }

  function createCutinSfx() {
    const audio = new Audio(sfxPaths.cutin);
    audio.preload = "metadata";
    audio.volume = 0.66;
    audio.addEventListener(
      "error",
      () => {
        console.warn("Cut-in SFX not found: assets/sounds/cutin_stinger.mp3");
      },
      { once: true }
    );
    return audio;
  }

  function createOneShotSfx(path, volume = 0.72) {
    const audio = new Audio(path);
    audio.preload = "auto";
    audio.volume = volume;
    return audio;
  }

  function initJankenCallSfx() {
    if (jankenCallSfxPool.length || jankenCallSfxFailed) {
      return;
    }

    try {
      const poolSize = LOW_POWER_MODE ? 2 : 3;
      jankenCallSfxPool = Array.from({ length: poolSize }, () => {
        const audio = createOneShotSfx(sfxPaths.jankenCall, 0.68);
        audio.addEventListener(
          "error",
          () => {
            jankenCallSfxFailed = true;
          },
          { once: true }
        );
        return audio;
      });
    } catch (error) {
      jankenCallSfxFailed = true;
    }
  }

  function prepareForGameplay() {
    if (gameplayPrepared) {
      return;
    }

    gameplayPrepared = true;

    try {
      initAudio();
      if (LOW_POWER_MODE) {
        return;
      }

      initJankenCallSfx();
      jankenCallSfxPool.forEach((sfx) => {
        try {
          sfx.load();
        } catch (error) {
          // Warming up audio is optional.
        }
      });

      if (!cutinSfx) {
        cutinSfx = createCutinSfx();
        try {
          cutinSfx.load();
        } catch (error) {
          // Cut-in sound can still be created later on demand.
        }
      }
    } catch (error) {
      // Audio warmup must not block the game.
    }
  }

  function normalizeBgmMode(mode) {
    if (mode === "trueEnd") {
      return trueEndBgmFailed ? normalizeBgmMode("final") : "trueEnd";
    }

    if (mode === "final") {
      return finalBgmFailed ? normalizeBgmMode("chance") : "final";
    }

    if (mode === "chance") {
      return chanceBgmFailed ? "normal" : "chance";
    }

    return "normal";
  }

  function bgmForMode(mode) {
    return ensureBgm(normalizeBgmMode(mode));
  }

  function resumeContext() {
    try {
      initAudio();
      if (context && context.state === "suspended") {
        context.resume().catch(() => {});
      }
    } catch (error) {
      // Audio is optional.
    }
  }


  function unlockAudio() {
    try {
      initAudio();
      resumeContext();
      if (LOW_POWER_MODE) {
        if (context && !muted) {
          tone(880, 0, 0.012, { volume: 0.0006, type: "triangle" });
        }
        return;
      }

      initJankenCallSfx();
      jankenCallSfxPool.forEach((sfx) => {
        try {
          sfx.load();
        } catch (error) {
          // Loading is optional.
        }
      });
      if (!cutinSfx) {
        cutinSfx = createCutinSfx();
        try {
          cutinSfx.load();
        } catch (error) {
          // Loading is optional.
        }
      }
      // Create a near-silent sound in the user's gesture so WebAudio is unlocked on mobile.
      if (context && !muted) {
        tone(880, 0, 0.018, { volume: 0.0008, type: "triangle" });
      }
    } catch (error) {
      // Audio unlock must never block the game.
    }
  }

  function playBgm(mode = "normal") {
    try {
      initAudio();
      const bgm = bgmForMode(mode);
      if (muted || !bgm) {
        return;
      }

      currentBgmMode = normalizeBgmMode(mode);
      bgm.volume = bgmVolumes[currentBgmMode];
      try {
        bgm.load();
      } catch (error) {
        // load is optional.
      }
      bgm.play().catch(() => {
        if (currentBgmMode === "trueEnd") {
          console.warn("True End BGM not found: assets/sounds/bgm_true_end.mp3");
          trueEndBgmFailed = true;
          currentBgmMode = null;
          switchBgm("final");
          return;
        }

        if (currentBgmMode === "final") {
          console.warn("Final BGM not found: assets/sounds/bgm_final.mp3");
          finalBgmFailed = true;
          currentBgmMode = null;
          switchBgm("chance");
          return;
        }

        if (currentBgmMode === "chance") {
          console.warn("Chance BGM not found: assets/sounds/bgm_chance.mp3");
          chanceBgmFailed = true;
          currentBgmMode = null;
          switchBgm("normal");
        }
      });
    } catch (error) {
      // Missing BGM files must not stop the game.
    }
  }

  function switchBgm(mode = "normal") {
    try {
      const nextMode = normalizeBgmMode(mode);
      initAudio();

      if (currentBgmMode === nextMode) {
        playBgm(nextMode);
        return;
      }

      const current = bgmForMode(currentBgmMode);
      if (current) {
        current.pause();
        current.currentTime = 0;
      }

      currentBgmMode = nextMode;
      playBgm(nextMode);
    } catch (error) {
      // BGM switching is optional.
    }
  }

  function stopBgm() {
    try {
      [normalBgm, chanceBgm, finalBgm, trueEndBgm].forEach((bgm) => {
        if (!bgm) {
          return;
        }

        bgm.pause();
        bgm.currentTime = 0;
      });
      currentBgmMode = null;
    } catch (error) {
      // Audio is optional.
    }
  }

  function tone(frequency, start, duration, options = {}) {
    if (!context) {
      return;
    }

    const now = context.currentTime;
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    const volume = options.volume ?? 0.42;

    oscillator.type = options.type || "square";
    oscillator.frequency.setValueAtTime(frequency, now + start);
    if (options.to) {
      oscillator.frequency.exponentialRampToValueAtTime(options.to, now + start + duration);
    }

    gain.gain.setValueAtTime(0.0001, now + start);
    gain.gain.exponentialRampToValueAtTime(volume, now + start + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + start + duration);
    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start(now + start);
    oscillator.stop(now + start + duration + 0.025);
  }

  function playSound(type) {
    try {
      if (muted || (LOW_POWER_MODE && type === "textBlip")) {
        return;
      }

      resumeContext();
      if (!context) {
        return;
      }

      const patterns = {
        start: [[520, 0, 0.08], [780, 0.08, 0.1], [1040, 0.18, 0.12]],
        select: [[880, 0, 0.055]],
        call1: [[360, 0, 0.045, { volume: 0.28 }]],
        call2: [[520, 0, 0.045, { volume: 0.3 }]],
        call3: [[760, 0, 0.065, { volume: 0.34 }], [1120, 0, 0.035, { volume: 0.12, type: "triangle" }]],
        textBlip: [[560, 0, 0.024, { volume: 0.1, type: "square" }]],
        handPop: [[920, 0, 0.032, { volume: 0.16 }]],
        reveal: [[920, 0, 0.032, { volume: 0.16 }]],
        win: [[560, 0, 0.08], [760, 0.08, 0.08], [1020, 0.16, 0.16, { volume: 0.5 }]],
        lose: [[380, 0, 0.15, { to: 220, volume: 0.28, type: "triangle" }]],
        draw: [[440, 0, 0.055, { volume: 0.24 }], [620, 0.16, 0.07, { volume: 0.28 }]],
        chance: [[520, 0, 0.06], [760, 0.07, 0.06], [1040, 0.14, 0.1], [1320, 0.25, 0.18, { volume: 0.5 }]],
        focus: [[660, 0, 0.07, { volume: 0.22, type: "triangle" }], [990, 0.11, 0.08, { volume: 0.26, type: "triangle" }]],
        caution: [[420, 0, 0.08, { volume: 0.22, type: "triangle" }], [740, 0.11, 0.09, { volume: 0.26, type: "square" }]],
        youwin: [[660, 0, 0.1], [880, 0.11, 0.1], [1320, 0.22, 0.25, { volume: 0.52 }]],
        continue: [[330, 0, 0.09], [440, 0.12, 0.09], [330, 0.24, 0.13, { volume: 0.46 }]],
        gameover: [[240, 0, 0.16, { to: 150, type: "sawtooth" }], [160, 0.18, 0.24, { to: 80, volume: 0.42, type: "sawtooth" }]],
        blackout: [[90, 0, 0.06, { to: 50, volume: 0.5 }]],
      };

      (patterns[type] || []).forEach(([frequency, start, duration, options]) => {
        tone(frequency, start, duration, options);
      });
    } catch (error) {
      // Sound effects are optional.
    }
  }

  function playJankenCallSfx(fallbackType = "call1") {
    try {
      if (muted || LOW_POWER_MODE) {
        return;
      }

      initAudio();

      if (LOW_POWER_MODE) {
        playSound(fallbackType);
        return;
      }

      initJankenCallSfx();

      if (jankenCallSfxFailed || !jankenCallSfxPool.length) {
        playSound(fallbackType);
        return;
      }

      const audio = jankenCallSfxPool[jankenCallSfxIndex % jankenCallSfxPool.length];
      jankenCallSfxIndex += 1;
      audio.pause();
      audio.currentTime = 0;
      audio.volume = fallbackType === "call3" ? 0.76 : 0.66;
      audio.play().catch(() => {
        playSound(fallbackType);
      });
    } catch (error) {
      playSound(fallbackType);
    }
  }

  function playCutinSfx() {
    try {
      if (muted) {
        return;
      }

      initAudio();
      if (!cutinSfx) {
        cutinSfx = createCutinSfx();
      }

      const now = Date.now();
      if (now - lastCutinSfxAt < 700) {
        return;
      }

      lastCutinSfxAt = now;
      cutinSfx.pause();
      cutinSfx.currentTime = 0;
      cutinSfx.volume = 0.66;
      cutinSfx.play().catch(() => {});
    } catch (error) {
      // Cut-in sound is optional.
    }
  }

  function setMuted(value) {
    muted = Boolean(value);
    try {
      window.localStorage.setItem(storageKey, String(muted));
    } catch (error) {
      // Storage is optional.
    }

    if (muted) {
      stopBgm();
      jankenCallSfxPool.forEach((sfx) => {
        try {
          sfx.pause();
          sfx.currentTime = 0;
        } catch (error) {
          // One-shot sound is optional.
        }
      });
      if (cutinSfx) {
        try {
          cutinSfx.pause();
          cutinSfx.currentTime = 0;
        } catch (error) {
          // Cut-in sound is optional.
        }
      }
    } else {
      resumeContext();
      if (state.showingTrueEnding) {
        playBgm("trueEnd");
      } else if (state.started && !state.ended) {
        playBgm(state.finalJanken ? "final" : state.chance ? "chance" : "normal");
      }
    }

    updateMuteButton();
  }

  function toggleMute() {
    setMuted(!muted);
  }

  function updateMuteButton() {
    if (!muteButton) {
      return;
    }

    muteButton.textContent = muted ? "おと OFF" : "おと ON";
    muteButton.setAttribute("aria-pressed", String(muted));
  }

  return {
    initAudio,
    loadMutedPreference,
    prepareForGameplay,
    unlockAudio,
    playBgm,
    switchBgm,
    stopBgm,
    playSound,
    playJankenCallSfx,
    playCutinSfx,
    setMuted,
    toggleMute,
    updateMuteButton,
  };
})();

function wait(ms) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

function scheduleIdleTask(callback, delay = 600) {
  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(callback, { timeout: 2000 });
    return;
  }

  window.setTimeout(callback, delay);
}

function scheduleDelayedIdleTask(callback, delay = 600) {
  window.setTimeout(() => {
    scheduleIdleTask(callback, 0);
  }, delay);
}

function restartClassAnimation(element, className) {
  if (!element) {
    return;
  }

  const token = String((Number(element.dataset.animationToken) || 0) + 1);
  element.dataset.animationToken = token;
  element.classList.remove(className);
  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(() => {
      if (element.dataset.animationToken !== token) {
        return;
      }

      element.classList.add(className);
    });
  });
}

function cancelClassAnimation(element, className) {
  if (!element) {
    return;
  }

  element.dataset.animationToken = String((Number(element.dataset.animationToken) || 0) + 1);
  element.classList.remove(className);
}

function playCharacterBeat(className) {
  if (!characterFrame) {
    return;
  }

  const token = String(characterBeatId + 1);
  characterBeatId += 1;
  characterFrame.dataset.beatToken = token;
  characterFrame.classList.remove("is-beat-1", "is-beat-2", "is-beat-3");

  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(() => {
      if (characterFrame.dataset.beatToken !== token) {
        return;
      }

      characterFrame.classList.add(className);
    });
  });
}

function clearCharacterBeat() {
  if (!characterFrame) {
    return;
  }

  characterBeatId += 1;
  characterFrame.dataset.beatToken = String(characterBeatId);
  characterFrame.classList.remove("is-beat-1", "is-beat-2", "is-beat-3");
}

function clearCinematicCutIn() {
  if (cutInTimer) {
    window.clearTimeout(cutInTimer);
    cutInTimer = null;
  }

  cabinet.classList.remove("is-cinematic-cutin", "cutin-psych", "cutin-chance", "cutin-final");
}

function triggerCinematicCutIn(type) {
  clearCinematicCutIn();
}

function setButtonsEnabled(enabled) {
  choiceButtonGroup?.classList.toggle("is-input-locked", !enabled);
  choiceButtons.forEach((button) => {
    const shouldDisableElement = !enabled && !state.started;
    button.disabled = shouldDisableElement;
    button.setAttribute("aria-disabled", String(!enabled));
    if (!enabled) {
      button.classList.remove("is-pressing");
    }
  });
}

function showInputGuideOnce() {
  if (!inputGuide || state.inputGuideShownOnce || state.inputGuideVisible || !state.started || state.busy || state.ended) {
    return;
  }

  state.inputGuideVisible = true;
  inputGuide.hidden = false;
}

function hideInputGuide(markShown = true) {
  if (markShown) {
    state.inputGuideShownOnce = true;
  }

  state.inputGuideVisible = false;

  if (inputGuide) {
    inputGuide.hidden = true;
  }
}

function showFinalChoiceConfirm(hand) {
  stopChanceMessages();
  setSelectedButton(hand);
  setCharacter("excited");
  triggerCinematicCutIn("final");
  AudioManager.playSound("focus");
  showMessage(`${handName(hand)}で決める？\nもう一度押すと勝負`, "is-result is-final-entry is-final-confirm is-cue-caution", {
    typewriter: true,
    maxDuration: 1280,
  });
}

function handleChoiceButtonClick(hand) {
  if (!hand) {
    return;
  }

  const button = choiceButtonForHand(hand);
  if (isChoiceInputLocked(button)) {
    return;
  }

  clearChoicePressState();
  hideInputGuide();

  if (state.finalJanken && !state.busy && !state.ended) {
    if (state.finalConfirmHand === hand) {
      state.finalConfirmHand = null;
      cabinet.classList.remove("is-final-confirm");
      playRound(hand);
      return;
    }

    state.finalConfirmHand = hand;
    showFinalChoiceConfirm(hand);
    return;
  }

  state.finalConfirmHand = null;
  cabinet.classList.remove("is-final-confirm");
  playRound(hand);
}

function getアルバムProgress() {
  return sanitizeアルバムProgress(state.galleryProgress);
}

function hasAnyアルバムUnlock() {
  const progress = getアルバムProgress();
  return Boolean(progress.normalWin || progress.gameOver || progress.chanceWin || progress.finalWin || progress.trueEndSeen);
}

function isアルバムButtonAvailable() {
  return hasAnyアルバムUnlock() || state.galleryUnlockedSession === true;
}

function isアルバムUnlocked() {
  return isアルバムButtonAvailable();
}

function getアルバムCompletionPercent() {
  const progress = getアルバムProgress();
  const unlockedCount = GALLERY_ROUTE_KEYS.filter((key) => progress[key]).length;
  return Math.round((unlockedCount / GALLERY_ROUTE_KEYS.length) * 100);
}

function isアルバムComplete() {
  const progress = getアルバムProgress();
  return GALLERY_ROUTE_KEYS.every((key) => progress[key]);
}

function getMissingアルバムRoutes(progress = getアルバムProgress()) {
  return GALLERY_ROUTE_KEYS.filter((routeId) => progress[routeId] !== true);
}

function getNextTargetRoute(progress = getアルバムProgress()) {
  if (!progress.normalWin) {
    return "normalWin";
  }

  // 1回目の普通勝利後は、まず「あいこを続ける」流れへ案内する。
  // gameOver は最後の回収要素にして、学習導線を邪魔しない。
  if (!progress.chanceWin) {
    return "chanceWin";
  }

  if (!progress.finalWin) {
    return "finalWin";
  }

  if (!progress.gameOver) {
    return "gameOver";
  }

  return "complete";
}

function isScoreAttackMode(progress = getアルバムProgress()) {
  return progress.trueEndSeen === true;
}

function isGalleryTrainingMode(progress = getアルバムProgress()) {
  return Boolean(progress.normalWin && !progress.trueEndSeen && !isアルバムComplete());
}

function getGalleryTrainingStage(progress = getアルバムProgress()) {
  if (!isGalleryTrainingMode(progress)) {
    return "none";
  }

  if (!progress.chanceWin) {
    return "basic";
  }

  if (!progress.finalWin) {
    return "advanced";
  }

  if (!progress.gameOver) {
    return "review";
  }

  return "complete";
}

function isアルバムItemUnlocked(item) {
  const progress = getアルバムProgress();

  if (item.id === "trueEnd") {
    return isアルバムComplete() || progress.trueEndSeen;
  }

  return Boolean(progress[item.id]);
}

function scheduleアルバムPreload() {
  if (galleryPreloadQueued) {
    return;
  }

  galleryPreloadQueued = true;
  scheduleIdleTask(() => {
    const unlockedSources = galleryItems
      .filter((item) => isアルバムItemUnlocked(item))
      .flatMap((item) => [item.src, item.fallbackSrc])
      .filter(Boolean);

    collectImageSources({ gallery: unlockedSources }).forEach((src) => {
      preloadImage(src);
    });
  }, 900);
}

function titleOverlayOpen() {
  return (
    (sceneOverlay && !sceneOverlay.hidden) ||
    (endOverlay && !endOverlay.hidden) ||
    (galleryOverlay && !galleryOverlay.hidden)
  );
}

function updateRelationResetButton() {
  if (!relationResetButton) {
    return;
  }

  const progress = getアルバムProgress();
  const shouldShow =
    progress.trueEndSeen === true &&
    !state.started &&
    !state.busy &&
    !state.ended &&
    !titleOverlayOpen() &&
    startButton &&
    !startButton.hidden;

  relationResetButton.hidden = !shouldShow;
}

function updateアルバムButton() {
  if (!galleryButton) {
    updateRelationResetButton();
    return;
  }

  const shouldShow =
    isアルバムButtonAvailable() &&
    !state.started &&
    !state.busy &&
    !state.ended &&
    !titleOverlayOpen() &&
    startButton &&
    !startButton.hidden;

  galleryButton.hidden = !shouldShow;

  if (!shouldShow) {
    galleryButton.classList.remove("is-new");
    updateRelationResetButton();
    return;
  }

  scheduleアルバムPreload();

  if (state.galleryJustUnlockedId) {
    galleryButton.classList.add("is-new");
    window.setTimeout(() => {
      galleryButton.classList.remove("is-new");
    }, 4200);
    state.galleryJustUnlockedId = null;
  }

  updateRelationResetButton();
}

function unlockアルバムRoute(routeId) {
  if (!GALLERY_ROUTE_KEYS.includes(routeId)) {
    return false;
  }

  const progress = getアルバムProgress();
  const wasUnlocked = Boolean(progress[routeId]);

  if (!wasUnlocked) {
    progress[routeId] = true;
    state.galleryJustUnlockedId = routeId;
    state.galleryUnlockedSession = true;
    state.galleryProgress = progress;
    galleryPreloadQueued = false;
    saveアルバムProgress(progress);
  }

  updateアルバムButton();
  return !wasUnlocked;
}

function unlockアルバム() {
  return unlockアルバムRoute("normalWin");
}

function resetアルバムProgress() {
  try {
    window.localStorage.removeItem(GALLERY_PROGRESS_KEY);
    window.localStorage.removeItem("jankenアルバムProgressV1");
    window.localStorage.removeItem("jankenアルバムProgressV2");
    window.localStorage.removeItem("jankenアルバムProgressV3");
    window.localStorage.removeItem("jankenアルバムUnlocked");
    window.localStorage.removeItem(POST_TRUE_DRAW_RECORD_KEY);
    window.localStorage.removeItem(HINT_GUIDE_KEY);
  } catch (error) {
    // Ignore storage errors; debug reset should never stop the game.
  }

  state.galleryProgress = getDefaultアルバムProgress();
  state.galleryUnlockedSession = false;
  state.galleryJustUnlockedId = null;
  state.trueEndingQueued = false;
  state.showingTrueEnding = false;
  state.postTrueRecordAnnounced = false;
  state.postTrueNewRecordShownFor = 0;
  closeアルバム(false);
  galleryPreloadQueued = false;
  if (galleryButton) {
    galleryButton.hidden = true;
    galleryButton.classList.remove("is-new");
  }
  if (relationResetButton) {
    relationResetButton.hidden = true;
  }
  updateアルバムButton();
}

function lockアルバム() {
  resetアルバムProgress();
}

function updateアルバムProgressText() {
  const unlockedCount = GALLERY_ROUTE_KEYS.filter((key) => getアルバムProgress()[key]).length;
  const percent = getアルバムCompletionPercent();
  const text = `アルバム ${unlockedCount}/${GALLERY_ROUTE_KEYS.length}　${percent}%`;

  if (galleryProgress) {
    galleryProgress.textContent = text;
  }

  return text;
}

function renderアルバムItem() {
  if (!galleryImage || !galleryCaption || !galleryCounter || !galleryItems.length) {
    return;
  }

  const item = galleryItems[galleryIndex];
  const requestId = ++galleryRequestId;
  const unlocked = isアルバムItemUnlocked(item);
  const progressText = updateアルバムProgressText();
  galleryCounter.textContent = `${galleryIndex + 1}/${galleryItems.length}`;
  galleryImage.hidden = true;
  galleryImage.removeAttribute("src");
  galleryImage.dataset.type = "";

  if (galleryLocked) {
    galleryLocked.hidden = unlocked;
    galleryLocked.textContent = unlocked ? "" : item.lockedTitle || "ないしょ";
  }

  if (!unlocked) {
    galleryCaption.textContent = `${item.lockedTitle || "ないしょ"}｜条件：${item.unlockText || "条件未達成"}｜${progressText}`;
    return;
  }

  const src = item.src;
  const fallbackSrc = item.fallbackSrc || sceneImages.playerWin;
  galleryCaption.textContent = item.id === "trueEnd"
    ? `${item.title}｜画像タップで もう一度見る`
    : `${item.title}｜ひらいた`;

  preloadImage(src).then((img) => {
    if (requestId !== galleryRequestId) {
      return;
    }

    const finalSrc = img ? src : fallbackSrc;
    if (!img) {
      console.warn("アルバム image fallback:", src);
    }

    preloadImage(finalSrc).then((fallbackImg) => {
      if (requestId !== galleryRequestId) {
        return;
      }

      if (!fallbackImg) {
        galleryCaption.textContent = `${item.title}｜画像準備中`;
        galleryImage.hidden = true;
        if (galleryLocked) {
          galleryLocked.hidden = false;
          galleryLocked.textContent = "もうすこし";
        }
        return;
      }

      if (galleryLocked) {
        galleryLocked.hidden = true;
      }
      prepareRuntimeImage(galleryImage, "low");
      galleryImage.src = assetPath(finalSrc);
      galleryImage.alt = item.title;
      galleryImage.dataset.type = item.type;
      galleryImage.dataset.itemId = item.id || "";
      galleryImage.hidden = false;
    });
  });
}

function openアルバム() {
  if (
    !isアルバムButtonAvailable() ||
    !galleryOverlay ||
    !startButton ||
    startButton.hidden ||
    state.started ||
    state.busy ||
    state.ended ||
    (sceneOverlay && !sceneOverlay.hidden) ||
    (endOverlay && !endOverlay.hidden) ||
    !galleryOverlay.hidden
  ) {
    return;
  }

  galleryIndex = 0;
  galleryOverlay.hidden = false;
  cabinet.classList.add("is-gallery-open");
  startButton.disabled = true;
  if (galleryButton) {
    galleryButton.hidden = true;
    galleryButton.classList.remove("is-new");
  }
  if (relationResetButton) {
    relationResetButton.hidden = true;
  }
  renderアルバムItem();
  AudioManager.playSound("select");
}

function closeアルバム(playSound = true) {
  if (!galleryOverlay) {
    return;
  }

  galleryOverlay.hidden = true;
  cabinet.classList.remove("is-gallery-open");
  galleryRequestId += 1;
  if (!state.started && !state.busy && !state.ended) {
    startButton.disabled = false;
  }

  if (playSound) {
    AudioManager.playSound("select");
  }

  if (!state.started && !state.busy && !state.ended && startButton && !startButton.hidden) {
    updateアルバムButton();
  }
}

function moveアルバム(step) {
  if (!galleryOverlay || galleryOverlay.hidden || !galleryItems.length) {
    return;
  }

  galleryIndex = (galleryIndex + step + galleryItems.length) % galleryItems.length;
  renderアルバムItem();
  AudioManager.playSound("select");
}

function replayTrueEndFromアルバム() {
  const item = galleryItems[galleryIndex];
  if (!item || item.id !== "trueEnd" || !isアルバムItemUnlocked(item) || state.started || state.busy || state.ended) {
    return;
  }

  closeアルバム(false);
  startButton.disabled = true;
  showTrueEnding({ replay: true }).then(() => {
    if (!state.started && !state.busy && !state.ended) {
      startButton.disabled = false;
      updateアルバムButton();
    }
  });
}

function toggleDebugMode(force) {
  const shouldShow = typeof force === "boolean" ? force : !state.debugPanelVisible;
  state.debugPanelVisible = shouldShow;
  cabinet.classList.toggle("is-debug", shouldShow || DEBUG_MODE);

  if (shouldShow) {
    state.debugAnswerVisible = true;
    createDebugPanel();
    createDebugAnswerHud();
  } else {
    // スマホではデバッグパネルが操作を邪魔しやすいので、
    // パネルを閉じても、こたえHUDは表示状態のまま残す。
    createDebugAnswerHud();
  }

  const panel = document.querySelector("#debugPanel");
  if (panel) {
    panel.hidden = !shouldShow;
  }

  updateDebugAnswerPanel();
}

function createDebugPanel() {
  if (document.querySelector("#debugPanel")) {
    return;
  }

  const panel = document.createElement("div");
  panel.id = "debugPanel";
  panel.className = "debug-panel";
  panel.setAttribute("aria-label", "デバッグパネル");

  const header = document.createElement("div");
  header.className = "debug-header";

  const title = document.createElement("strong");
  title.textContent = "テスト";

  const closeButton = document.createElement("button");
  closeButton.type = "button";
  closeButton.className = "debug-close-button";
  closeButton.textContent = "×";
  closeButton.setAttribute("aria-label", "デバッグパネルを閉じる");
  closeButton.addEventListener("click", () => {
    toggleDebugMode(false);
  });

  header.append(title, closeButton);
  panel.append(header);

  const description = document.createElement("p");
  description.className = "debug-note";
  description.textContent = "開発用です。こたえは左下。リセットで記録も消えます。";
  panel.append(description);

  [
    { label: "ぜんぶリセット", handler: debugResetAllData, danger: true },
    { label: "ヒント出す", handler: debugForceHint },
    { label: "こたえ ON/OFF", handler: debugToggleAnswerPanel },
    { label: "アルバムをけす", handler: debugResetAlbumOnly },
    { label: "アルバム全開", handler: debugUnlockAllRoutes },
    { label: "あいこ 5", handler: () => debugSetDraw(5) },
    { label: "あいこ 10", handler: debugForceChance },
    { label: "あいこ 15", handler: debugForceFinal },
    { label: "つぎ あなた勝ち", handler: () => debugForceNextResult("win") },
    { label: "つぎ あいて勝ち", handler: () => debugForceNextResult("lose") },
    { label: "試合リセット", handler: debugReset },
  ].forEach(({ label, handler, danger }) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = label;
    if (danger) {
      button.classList.add("debug-danger-button");
    }
    button.addEventListener("click", handler);
    panel.append(button);
  });

  document.body.append(panel);
  updateDebugAnswerPanel();
}

function createDebugAnswerHud() {
  if (document.querySelector("#debugAnswerHud")) {
    return;
  }

  const hud = document.createElement("pre");
  hud.id = "debugAnswerHud";
  hud.className = "debug-answer-hud";
  hud.setAttribute("aria-label", "デバッグこたえ表示");
  document.body.append(hud);
  updateDebugAnswerPanel();
}

function debugToggleAnswerPanel() {
  createDebugAnswerHud();
  state.debugAnswerVisible = !state.debugAnswerVisible;
  updateDebugAnswerPanel();
}

function debugForceHint() {
  if (!state.started || state.busy || state.ended) {
    setDebugAnswerText("試合中だけヒントを出せます。\nまずスタートしてください。");
    state.debugAnswerVisible = true;
    updateDebugAnswerPanel();
    return;
  }

  state.psychEvent = null;
  if (!maybeStartPsychEvent(true)) {
    setDebugAnswerText("ヒントを出せませんでした。");
  }
  state.debugAnswerVisible = true;
  updateDebugAnswerPanel();
}

function debugSetDraw(value) {
  state.draw = value;
  state.pot = medalForDrawCount(value);
  state.drawWarningShown = value >= getDrawWarningCount();
  updateScore();
  showMessage(`あいこ ${value} 回 / メダル ${state.pot}`);
  setDebugAnswerText(`あいこ ${value} 回\nメダル ${state.pot} まい`);
}

function debugForceWarning() {
  state.draw = Math.max(state.draw, getDrawWarningCount());
  state.drawWarningShown = true;
  updateScore();
  setCharacter("worried");
  showMessage(`あいこ ${getDrawWarningCount()} 回`, "is-result is-draw player-draw is-draw-warning");
}

function debugForceChance() {
  state.draw = Math.max(state.draw, getChanceDrawCount());
  state.pot = medalForDrawCount(state.draw);
  state.drawWarningShown = true;
  state.finalConfirmHand = null;
  state.routeReachedChance = true;
  setChanceMode(true);
  updateScore();
  setCharacter("excited");
  clearCinematicCutIn();
  AudioManager.switchBgm("chance");
  showMessage(`あいこ ${state.draw} 回 / メダル ${state.pot}`, "is-result is-draw player-draw is-chance-entry");
  setDebugAnswerText(`あいこ ${state.draw} 回\nメダル ${state.pot} まい\nチャンス状態`);
}

function debugForceFinal() {
  state.draw = Math.max(state.draw, getFinalDrawCount());
  state.pot = medalForDrawCount(state.draw);
  state.drawWarningShown = true;
  state.finalConfirmHand = null;
  state.routeReachedChance = true;
  state.routeReachedFinal = true;
  setChanceMode(true);
  setFinalJankenMode(true);
  updateScore();
  setCharacter("excited");
  triggerCinematicCutIn("final");
  AudioManager.switchBgm("final");
  showMessage(`あいこ ${state.draw} 回 / メダル ${state.pot}`, "is-result is-draw player-draw is-final-entry");
  setDebugAnswerText(`あいこ ${state.draw} 回\nメダル ${state.pot} まい\nさいごの勝負`);
}

function debugForceNextResult(result) {
  state.debugForceNextResult = result;
  setDebugAnswerText(result === "win" ? "つぎは あなた勝ち\nあなたが出した手に、あいてが負ける手を出します。" : "つぎは あいて勝ち\nあなたが出した手に、あいてが勝つ手を出します。");
  showMessage(result === "win" ? "つぎは あなた勝ち" : "つぎは あいて勝ち");
}

function debugUnlockアルバムRoute(routeId) {
  unlockアルバムRoute(routeId);
  showMessage("アルバムを開いた");
  updateアルバムButton();
}

function debugForceRouteWin(routeId) {
  state.routeReachedChance = routeId === "chanceWin" || routeId === "finalWin";
  state.routeReachedFinal = routeId === "finalWin";
  unlockアルバムRoute(routeId);

  if (isアルバムComplete() && !getアルバムProgress().trueEndSeen) {
    state.trueEndingQueued = true;
  }

  showMessage("ルートを開いた");
  updateアルバムButton();
}

function resetGameStateAfterStorageClear(messageText = "ぜんぶリセットした") {
  state.debugForceNextResult = null;
  state.debugAnswer = null;
  state.finalConfirmHand = null;
  state.galleryProgress = getDefaultアルバムProgress();
  state.galleryUnlockedSession = false;
  state.galleryJustUnlockedId = null;
  state.trueEndingQueued = false;
  state.showingTrueEnding = false;
  state.inputGuideShownOnce = false;
  state.inputGuideVisible = false;
  state.postTrueRecordAnnounced = false;
  state.postTrueNewRecordShownFor = 0;
  galleryPreloadQueued = false;
  clearPendingChoice();
  stopCountdown();
  stopChanceMessages();
  clearCinematicCutIn();
  cancelMessageTyping();
  clearResultLabel();
  clearCharacterBeat();
  closeアルバム(false);
  showTitle();
  if (galleryButton) {
    galleryButton.hidden = true;
    galleryButton.classList.remove("is-new");
  }
  if (relationResetButton) {
    relationResetButton.hidden = true;
  }
  updateアルバムButton();
  updateRelationResetButton();
  updateDebugAnswerPanel();
  showMessage(messageText);
}

function debugResetAllData() {
  const ok = window.confirm("保存データをぜんぶ消して、最初からにします。よろしいですか？");
  if (!ok) {
    return;
  }

  clearAllJankenStorage();
  resetGameStateAfterStorageClear("ぜんぶリセットした");
}

function debugResetAlbumOnly() {
  resetアルバムProgress();
  resetGameStateAfterStorageClear("アルバムをけした");
}

function debugUnlockAllRoutes() {
  const progress = getDefaultアルバムProgress();
  GALLERY_ROUTE_KEYS.forEach((routeId) => {
    progress[routeId] = true;
  });
  progress.trueEndSeen = true;
  state.galleryProgress = progress;
  state.galleryUnlockedSession = true;
  state.galleryJustUnlockedId = null;
  state.trueEndingQueued = false;
  saveアルバムProgress(progress);
  galleryPreloadQueued = false;
  updateアルバムButton();
  updateRelationResetButton();
  showMessage("アルバム全開");
}

function debugReset() {
  state.debugForceNextResult = null;
  state.debugAnswer = null;
  updateDebugAnswerPanel();
  setDebugAnswerNoHint("試合をリセットしました。");
  state.finalConfirmHand = null;
  resetScore();
  resetRoundView();
  if (state.started && !state.ended) {
    AudioManager.switchBgm("normal");
    showMessage("試合をリセット");
    setButtonsEnabled(!state.busy);
  } else {
    showMessage("");
  }
}

function trackDebugToggleTap() {
  const now = Date.now();
  state.debugSoundTaps = state.debugSoundTaps.filter((time) => now - time < 1800);
  state.debugSoundTaps.push(now);

  if (state.debugSoundTaps.length >= 5) {
    state.debugSoundTaps = [];
    toggleDebugMode();
    return true;
  }

  return false;
}

function clearChoicePressState(targetButton = null) {
  const buttons = targetButton ? [targetButton] : choiceButtons;
  buttons.forEach((button) => {
    button.classList.remove("is-pressing");
  });
}

function setSelectedButton(hand) {
  const hasSelection = Boolean(hand);
  choiceButtons.forEach((button) => {
    const selected = button.dataset.hand === hand;
    button.classList.toggle("is-selected", selected);
    button.classList.toggle("is-unselected", hasSelection && !selected);
  });
}


function updateMedalRecordHud() {
  if (!medalRecordHud) {
    return;
  }

  const current = normalizeScoreValue(state.pot);
  const best = Math.max(getBestMedalRecord(), current);
  if (currentMedalRecord) {
    currentMedalRecord.textContent = formatScoreValue(current);
  }
  if (bestMedalRecord) {
    bestMedalRecord.textContent = formatScoreValue(best);
  }
  if (newMedalRecordBadge) {
    newMedalRecordBadge.hidden = !state.medalNewRecord;
  }
  medalRecordHud.classList.toggle("is-new-record", state.medalNewRecord === true);
}

function scoreStars(score) {
  const step = MATCH_POINT / 3;
  const filled = score >= MATCH_POINT ? 3 : score > 0 ? Math.max(1, Math.ceil(score / step)) : 0;
  return "★".repeat(filled) + "☆".repeat(3 - filled);
}

function phaseTextForHud() {
  const progress = getアルバムProgress();

  if (progress.trueEndSeen) {
    return "スコア";
  }

  if (state.finalJanken || state.draw >= getFinalDrawCount()) {
    return "さいご";
  }

  if (state.chance || state.draw >= getChanceDrawCount()) {
    return "チャンス";
  }

  if (isGalleryTrainingMode(progress)) {
    return "練習";
  }

  return isReadModeUnlocked() ? "読み" : "ふつう";
}

function updateAikoGuideHud() {
  if (!aikoGuideHud) {
    return;
  }

  // スマホ実機でこの3連チップがセリフ枠に重なりやすかったため、
  // いったん通常画面では非表示にする。必要な情報はセリフとスコアに寄せる。
  aikoGuideHud.hidden = true;
  return;

  const draw = Math.max(0, state.draw || 0);
  const chanceCount = getChanceDrawCount();
  const finalCount = getFinalDrawCount();
  const chanceRemain = Math.max(0, chanceCount - draw);
  const finalRemain = Math.max(0, finalCount - draw);
  const progress = getアルバムProgress();
  const phaseText = phaseTextForHud();

  // スマホで横に潰れないように、短い3つのチップ表示にする。
  // 長い説明はメッセージ側に任せ、ここは現在地と目標だけを見せる。
  if (!progress.normalWin && !progress.trueEndSeen) {
    if (phaseLabel) {
      phaseLabel.textContent = "ふつう";
    }
    if (nextChanceLabel) {
      nextChanceLabel.textContent = `あいこ${formatScoreValue(draw)}`;
    }
    if (nextFinalLabel) {
      nextFinalLabel.textContent = "目標30";
    }
  } else if (progress.trueEndSeen) {
    if (phaseLabel) {
      phaseLabel.textContent = "スコア";
    }
    if (nextChanceLabel) {
      nextChanceLabel.textContent = `あいこ${formatScoreValue(draw)}`;
    }
    if (nextFinalLabel) {
      nextFinalLabel.textContent = "記録へ";
    }
  } else {
    if (phaseLabel) {
      phaseLabel.textContent = phaseText;
    }
    if (nextChanceLabel) {
      nextChanceLabel.textContent = state.chance || draw >= chanceCount
        ? "チャンス中"
        : `チャンスあと${chanceRemain}`;
    }

    if (nextFinalLabel) {
      nextFinalLabel.textContent = state.finalJanken || draw >= finalCount
        ? "ノーヒント"
        : `さいごあと${finalRemain}`;
    }
  }

  aikoGuideHud.classList.toggle("is-normal-phase", !progress.normalWin && !progress.trueEndSeen);
  aikoGuideHud.classList.toggle("is-chance", state.chance && !state.finalJanken);
  aikoGuideHud.classList.toggle("is-final", state.finalJanken);
  aikoGuideHud.classList.toggle("is-score-attack", progress.trueEndSeen === true);
}

function updateScore() {
  const previousPotText = potCount?.textContent;
  winCount.textContent = formatScoreValue(state.win);
  loseCount.textContent = formatScoreValue(state.lose);
  if (drawCount) {
    drawCount.textContent = formatScoreValue(state.draw);
  }
  if (potCount) {
    const potText = formatScoreValue(state.pot);
    potCount.textContent = potText;
    const potBox = potCount.closest(".score-pot");
    if (previousPotText && previousPotText !== potText) {
      restartClassAnimation(potBox, "is-medal-up");
      window.setTimeout(() => potBox?.classList.remove("is-medal-up"), 480);
    }
  }
  updateMedalRecordHud();
  updateAikoGuideHud();
}

function setChanceMode(enabled) {
  state.chance = enabled;
  cabinet.classList.toggle("is-chance", enabled);

  if (enabled) {
    AudioManager.playSound("chance");
  }

  if (!enabled) {
    stopChanceMessages();
  }

  updateAikoGuideHud();
}

function setFinalJankenMode(enabled) {
  state.finalJanken = enabled;
  cabinet.classList.toggle("is-final-janken", enabled);

  if (enabled) {
    AudioManager.playSound("chance");
  }

  if (!enabled) {
    state.finalConfirmHand = null;
    cabinet.classList.remove("is-final-confirm");
  }

  updateAikoGuideHud();
}

function setStageMood(mood) {
  cabinet.classList.remove(
    "is-calling",
    "is-result",
    "is-win",
    "is-lose",
    "is-draw",
    "player-win",
    "player-lose",
    "player-draw",
    "is-double",
    "is-chance-entry",
    "is-draw-warning",
    "is-final-entry",
    "is-final-confirm",
    "is-cue-caution",
    "is-cue-focus",
    "is-cue-special",
    "is-cue-sway"
  );

  if (mood) {
    cabinet.classList.add(...mood.split(" "));
  }
}

function scoreMood() {
  const diff = state.win - state.lose;

  if (state.finalJanken) {
    return "final";
  }

  if (state.chance) {
    return "chance";
  }

  if (diff >= 12) {
    return "playerLeadBig";
  }

  if (diff >= 5) {
    return "playerLeadSmall";
  }

  if (diff <= -12) {
    return "cpuLeadBig";
  }

  if (diff <= -5) {
    return "cpuLeadSmall";
  }

  return "even";
}

function currentDialogue() {
  return dialogue[scoreMood()] || dialogue.even;
}

function randomLine(lines) {
  const cleanLines = lines.filter((line) => line && line.trim());

  if (!cleanLines.length) {
    return "いくよ！";
  }

  const candidates = cleanLines.length > 1 ? cleanLines.filter((line) => line !== state.lastLine) : cleanLines;
  const line = candidates[Math.floor(Math.random() * candidates.length)];
  state.lastLine = line;
  return line;
}

function isReadModeUnlocked() {
  const progress = getアルバムProgress();

  return Boolean(
    progress.normalWin ||
      progress.chanceWin ||
      progress.finalWin ||
      progress.trueEndSeen ||
      loadHintGuideSeen()
  );
}

function getDrawWarningCount() {
  if (isGalleryTrainingMode()) {
    return 2;
  }

  if (isScoreAttackMode()) {
    return 5;
  }

  return isReadModeUnlocked() ? 2 : DRAW_WARNING_COUNT;
}

function getChanceDrawCount() {
  if (isGalleryTrainingMode()) {
    const stage = getGalleryTrainingStage();
    return stage === "basic" ? 7 : 5;
  }

  if (isScoreAttackMode()) {
    return 4;
  }

  return isReadModeUnlocked() ? 4 : CHANCE_DRAW_COUNT;
}

function getFinalDrawCount() {
  if (isGalleryTrainingMode()) {
    const stage = getGalleryTrainingStage();
    // チュートリアル中は少し長めにして、読み方を覚える時間を作る。
    return stage === "basic" ? 14 : 12;
  }

  if (isScoreAttackMode()) {
    return FINAL_DRAW_COUNT;
  }

  return isReadModeUnlocked() ? 7 : FINAL_DRAW_COUNT;
}

function getRelationshipPhase() {
  const progress = getアルバムProgress();
  const warningCount = getDrawWarningCount();
  const chanceCount = getChanceDrawCount();
  const finalCount = getFinalDrawCount();

  if (progress.trueEndSeen) {
    return "afterTrueEnd";
  }

  if (state.finalJanken || state.draw >= finalCount) {
    return "final";
  }

  if (state.draw >= chanceCount || getNextTargetRoute() === "finalWin") {
    return "near";
  }

  if (state.draw >= warningCount || getNextTargetRoute() === "chanceWin") {
    return "aware";
  }

  return isReadModeUnlocked() ? "read" : "battle";
}

function routeHintLinesForCurrentTarget() {
  const phase = getRelationshipPhase();
  const targetRoute = getNextTargetRoute();

  if (phase === "afterTrueEnd") {
    return ["また同じ手、出せるかな。", "今度は勝負じゃなくてもいいよ。", "手、見なくてもわかるかも。", "また、あいこから始めよ？"];
  }

  if (targetRoute === "finalWin" || phase === "final" || phase === "near") {
    return ["まよいは\nあとが本音", "ためすは\n見せた手を外す", "よく見れば\nまだ続くよ", "最後まで\nあわせられる？"];
  }

  if (targetRoute === "chanceWin" || phase === "aware" || phase === "read") {
    return ["あわせたいは\n同じ手", "すなおは\nそのまま", "まよいは\nあとを見て", "あいこ、続けよう"];
  }

  return [];
}

function postTrueStartLine() {
  const record = getPostTrueDrawRecord();
  const medalRecord = getBestMedalRecord();

  if (record > 0 || medalRecord > 0) {
    return `きろく ${formatScoreValue(medalRecord)} メダル\n今日は超えられるかな？`;
  }

  return "今度は勝負じゃなくて、\nどこまでメダルを伸ばせるかな？";
}


function createGuideMirrorCue(line = "まずは練習。\n同じ手であいこ") {
  return {
    relationshipIntent: RELATIONSHIP_INTENT,
    type: "mirror",
    feeling: "mirror",
    feelingLabel: FEELING_LABELS.mirror.label,
    ruleText: "あなたに合わせる",
    formulaText: "あなたの手＝あいての手",
    cpuHand: null,
    wordHand: null,
    saidHand: null,
    predictedHand: null,
    requestedHand: null,
    avoidHand: null,
    dynamicAvoidHand: null,
    dynamicMode: "mirror",
    imageMood: "happy",
    mood: "happy",
    honest: true,
    presentation: "guide",
    line,
  };
}

function showPostTrueStartMessage() {
  if (!getアルバムProgress().trueEndSeen || state.postTrueRecordAnnounced) {
    return false;
  }

  state.postTrueRecordAnnounced = true;
  setCharacter("happy");
  showMessage(postTrueStartLine(), undefined, {
    typewriter: true,
    maxDuration: 900,
  });
  return true;
}

function showHintGuideMessage() {
  const progress = getアルバムProgress();

  if (!progress.normalWin || progress.trueEndSeen || loadHintGuideSeen()) {
    return false;
  }

  saveHintGuideSeen();

  // ここはただの説明文ではなく、実際に「相手が合わせる」約束として扱う。
  // 以前は psychEvent を作っていなかったため、この文の直後でも通常じゃんけんになり、
  // 別の手を出されることがあった。
  const cue = createGuideMirrorCue("まずは練習。\n同じ手であいこ");
  state.psychEvent = cue;
  setCharacter("happy", "mirror", cue);
  setDebugAnswerFromPsychEvent(cue, cue.line);
  showMessage(cue.line, "is-cue-focus", {
    typewriter: true,
    maxDuration: 1280,
  });
  markReadCueDifficulty(cue);
  return true;
}

function checkPostTrueDrawRecord() {
  if (!getアルバムProgress().trueEndSeen) {
    return false;
  }

  const currentDraws = state.draw;
  const record = getPostTrueDrawRecord();

  if (currentDraws <= record) {
    return false;
  }

  savePostTrueDrawRecord(currentDraws);
  state.postTrueNewRecordShownFor = currentDraws;
  return true;
}

function postTrueNewRecordLine() {
  const currentDraws = state.draw;

  if (currentDraws >= 20) {
    return `すごい……${currentDraws}回目。\nもう言わなくても合うね。`;
  }

  if (currentDraws >= 15) {
    return `${currentDraws}回目のあいこ……\nまだ一緒にいられるね。`;
  }

  if (currentDraws >= 10) {
    return `新記録、${currentDraws}回だよ。\n気持ち、合ってきたね。`;
  }

  return `新記録！ ${currentDraws}回目のあいこだよ。`;
}

function medalNewRecordLine(scoreChange) {
  const current = scoreChange?.medalRecordCurrent || state.pot;
  const previous = scoreChange?.medalRecordPrevious || 0;

  if (current >= 1000000000000000) {
    return `新記録！\n${formatScoreValue(current)} メダル！`;
  }

  if (current >= 1000000) {
    return `記録更新！\n${formatScoreValue(current)} メダル`;
  }

  return `新記録！\n${formatScoreValue(previous)} → ${formatScoreValue(current)}`;
}


function lineFor(scene) {
  const set = currentDialogue();
  const lines = [...(set[scene] || dialogue.even[scene] || [])];

  if ((state.win >= MATCH_POINT * 0.78 || state.lose >= MATCH_POINT * 0.78) && scene === "idle") {
    lines.push(...endgameLines);
  }

  if (scene === "idle" && Math.random() < 0.34) {
    lines.push(...routeHintLinesForCurrentTarget());
  }

  return randomLine(lines);
}

function handName(handKey) {
  return HAND_NAMES[handKey] || hands[handKey]?.label || "?";
}

function handThatBeats(handKey) {
  return Object.keys(hands).find((key) => hands[key]?.beats === handKey) || null;
}

function handThatLosesTo(handKey) {
  return hands[handKey]?.beats || null;
}

function medalForDrawCount(drawCount) {
  let value = BASE_メダル;
  const count = Math.max(0, Number(drawCount) || 0);

  for (let i = 0; i < count; i += 1) {
    value = Math.min(MAX_メダル, value * JACKメダル_MULTIPLIER);
  }

  return value;
}

function buildDebugAnswerFromPsychEvent(event, line = "") {
  if (!event) {
    return null;
  }

  const dynamicMode = event.dynamicMode ||
    (event.feeling === "bait" ? "avoid" : event.feeling === "mirror" ? "mirror" : event.feeling === "hesitate" ? "sway" : "");
  const avoidHand = event.avoidHand || event.dynamicAvoidHand || event.wordHand || event.saidHand || event.predictedHand || null;
  const resolvedCpuHand = event.resolvedCpuHand || null;
  const cpuHand = resolvedCpuHand || event.cpuHand || event.predictedHand || event.requestedHand || null;
  const wordHand = event.wordHand || event.saidHand || event.predictedHand || event.requestedHand || cpuHand || avoidHand;
  const hintHand = event.hintHand || wordHand;
  const winHand = cpuHand ? handThatBeats(cpuHand) : null;
  const loseHand = cpuHand ? handThatLosesTo(cpuHand) : null;
  const feeling = event.feeling || "";
  const feelingInfo = FEELING_LABELS[feeling] || null;

  return {
    kind: "hint",
    line,
    wordHand,
    hintHand,
    cpuHand,
    winHand,
    loseHand,
    dynamicMode,
    avoidHand,
    resolvedPlayerHand: event.resolvedPlayerHand || null,
    mood: event.mood || event.imageMood || "",
    moodLabel: event.feelingLabel || feelingInfo?.label || MOOD_LABELS[event.mood] || "きもち：？",
    feeling,
    ruleText: event.ruleText || feelingInfo?.rule || "",
    formulaText: event.formulaText || "",
    honest: event.honest !== false,
    type: event.type || "predict",
    presentation: event.presentation || "quiet",
  };
}

function setDebugAnswerFromPsychEvent(event, line = "") {
  state.debugAnswer = buildDebugAnswerFromPsychEvent(event, line);
  updateDebugAnswerPanel();
}

function setDebugAnswerText(text) {
  state.debugAnswer = { kind: "note", text };
  updateDebugAnswerPanel();
}

function shouldMaintainDebugAnswerHud() {
  return Boolean(DEBUG_MODE || state.debugPanelVisible || state.debugAnswerVisible || document.querySelector("#debugAnswerHud"));
}

function setDebugAnswerNoHint(reason = "") {
  if (!shouldMaintainDebugAnswerHud()) {
    return;
  }

  state.debugAnswer = {
    kind: "note",
    text: [
      "いまはヒントなし",
      reason || "このセリフは、手を読むヒントではありません。",
      "",
      "ヒント時は",
      "セリフ＋きもち＝合わせ方",
    ].filter(Boolean).join("\n"),
  };
  updateDebugAnswerPanel();
}

function formatDebugAnswer(answer = state.debugAnswer) {
  if (!answer) {
    return [
      "こたえ",
      "いまはヒントなし",
      "",
      "ヒント時は",
      "セリフ＋きもち＝合わせ方",
    ].join("\n");
  }

  if (answer.kind === "note") {
    return ["こたえ", answer.text || "情報なし"].join("\n");
  }

  const line = answer.line ? answer.line.replace(/\n/g, " / ") : "ヒント文なし";
  const wordName = handName(answer.wordHand);
  const cpuName = handName(answer.cpuHand);
  const winName = handName(answer.winHand);
  const loseName = handName(answer.loseHand);
  const avoidName = handName(answer.avoidHand);
  const playerName = handName(answer.resolvedPlayerHand);
  const feelingText = answer.moodLabel.replace("きもち：", "");
  const ruleText = answer.ruleText || (answer.honest ? "ことばどおり" : "見せ手を外す");

  if (answer.dynamicMode === "mirror") {
    return [
      "こたえ",
      `セリフ：${line}`,
      `きもち：${feelingText}`,
      `読み方：${ruleText}`,
      "本心：あなたに合わせたい",
      answer.resolvedPlayerHand ? `あなた：${playerName}` : "あなた：先に出す",
      answer.resolvedPlayerHand ? `あいて：${playerName}` : "あいて：あなたと同じ",
      "あいこ：どの手でもOK",
    ].join("\n");
  }

  if (answer.dynamicMode === "avoid") {
    return [
      "こたえ",
      `セリフ：${line}`,
      `きもち：${feelingText}`,
      `読み方：${ruleText}`,
      "本心：引っかからなければ合わせる",
      `見せ手：${avoidName}`,
      `成功：${avoidName}以外ならあいこ`,
      answer.resolvedPlayerHand ? `あなた：${playerName}` : "あなた：まだ未選択",
      answer.cpuHand ? `あいて：${cpuName}` : "あいて：選んだ手に合わせる",
    ].join("\n");
  }

  if (answer.dynamicMode === "sway") {
    return [
      "こたえ",
      `セリフ：${line}`,
      `きもち：${feelingText}`,
      `読み方：${ruleText}`,
      "本心：今の気持ちに合わせてほしい",
      answer.resolvedPlayerHand ? `あなた：${playerName}` : "あなた：まだ未選択",
      answer.cpuHand ? `あいて：${cpuName}` : "あいて：表示中の手に合わせる",
      "あいこ：押した時に出ている手",
    ].join("\n");
  }

  return [
    "こたえ",
    `セリフ：${line}`,
    `きもち：${feelingText}`,
    `読み方：${ruleText}`,
    `本心：あいこを続けたい`,
    `ことばの手：${wordName}`,
    `あいて：${cpuName}`,
    `あいこ：${cpuName}`,
    `勝つ手：${winName}`,
    `負ける手：${loseName}`,
  ].join("\n");
}

function updateDebugAnswerPanel() {
  const text = formatDebugAnswer();
  const panel = document.querySelector("#debugAnswerPanel");
  if (panel) {
    panel.hidden = !state.debugAnswerVisible;
    panel.textContent = text;
  }

  const hud = document.querySelector("#debugAnswerHud");
  if (hud) {
    // HUD自体が作られているなら、デバッグパネルを閉じても表示を残す。
    // 表示/非表示はデバッグパネルの「こたえ ON/OFF」で切り替える。
    hud.hidden = !state.debugAnswerVisible;
    hud.textContent = text;
  }
}


function weightedChoice(items) {
  const total = items.reduce((sum, item) => sum + Math.max(0, Number(item.weight) || 0), 0);
  if (total <= 0) {
    return items[0]?.value ?? null;
  }

  let roll = Math.random() * total;
  for (const item of items) {
    roll -= Math.max(0, Number(item.weight) || 0);
    if (roll <= 0) {
      return item.value;
    }
  }

  return items[items.length - 1]?.value ?? null;
}

function anotherHand(exceptHand) {
  const keys = Object.keys(hands).filter((key) => key !== exceptHand);
  return keys[Math.floor(Math.random() * keys.length)] || randomCpuHand();
}

function feelingInfo(feeling) {
  return FEELING_LABELS[feeling] || FEELING_LABELS.honest;
}

function isSpecialCueFeeling(feeling) {
  return feeling === "bait" ||
    feeling === "hide" ||
    feeling === "hesitate" ||
    feeling === "panic" ||
    feeling === "mirror";
}

function specialCueMoodClasses(cue) {
  if (!cue || !isSpecialCueFeeling(cue.feeling)) {
    return undefined;
  }

  const classes = ["is-cue-special"];

  if (cue.feeling === "hesitate") {
    classes.push("is-cue-sway", "is-cue-caution");
  } else if (cue.feeling === "mirror") {
    classes.push("is-cue-focus");
  } else {
    classes.push("is-cue-caution");
  }

  return classes.join(" ");
}

function stopPsychCueMotion() {
  if (psychCueMessageTimer) {
    window.clearTimeout(psychCueMessageTimer);
    psychCueMessageTimer = null;
  }
}

function swayIntervalForCue() {
  const level = getJankenTempoLevel(state.draw);
  if (level >= 3) {
    return 2000;
  }

  if (level >= 2) {
    return 2300;
  }

  return 2800;
}

function swayCueLine(cue) {
  const hand = cue?.activeHand || cue?.cpuHand || cue?.wordHand || randomCpuHand();
  return `${handName(hand)}に\nしようかな…`;
}

function advanceSwayCue(cue, first = false) {
  if (!cue || cue.dynamicMode !== "sway") {
    return;
  }

  const choices = Array.isArray(cue.swayHands) && cue.swayHands.length >= 2
    ? cue.swayHands
    : [cue.wordHand || randomCpuHand(), cue.cpuHand || anotherHand(cue.wordHand || randomCpuHand())];

  if (!cue.activeHand) {
    cue.activeHand = choices[0];
  } else if (!first) {
    const nextIndex = (Math.max(0, choices.indexOf(cue.activeHand)) + 1) % choices.length;
    cue.previousHand = cue.activeHand;
    cue.activeHand = choices[nextIndex];
    cue.changedAt = performance.now();
  }

  cue.cpuHand = cue.activeHand;
  cue.line = swayCueLine(cue);
  setDebugAnswerFromPsychEvent(cue, cue.line);
  showMessage(cue.line, specialCueMoodClasses(cue), {
    typewriter: first,
    maxDuration: first ? 1550 : 900,
    speed: first ? 54 : 32,
  });
}

function startSwayCueMotion(cue) {
  stopPsychCueMotion();

  if (!cue || cue.dynamicMode !== "sway") {
    return false;
  }

  if (!cue.swayHands || cue.swayHands.length < 2) {
    const first = cue.wordHand || randomCpuHand();
    cue.swayHands = [first, anotherHand(first)];
  }

  cue.activeHand = cue.activeHand || cue.swayHands[0];
  cue.previousHand = null;
  cue.changedAt = performance.now();
  advanceSwayCue(cue, true);

  const interval = swayIntervalForCue();
  const tick = () => {
    if (state.psychEvent !== cue || !state.started || state.busy || state.ended) {
      stopPsychCueMotion();
      return;
    }

    advanceSwayCue(cue, false);
    psychCueMessageTimer = window.setTimeout(tick, interval);
  };

  psychCueMessageTimer = window.setTimeout(tick, interval);
  return true;
}

function signalSpecialCue(cue) {
  if (!cue || !isSpecialCueFeeling(cue.feeling)) {
    return;
  }

  const now = Date.now();
  if (now - lastSpecialCueSignalAt < 450) {
    return;
  }

  lastSpecialCueSignalAt = now;
  if (cue.feeling === "mirror") {
    AudioManager.playSound("focus");
  } else {
    AudioManager.playCutinSfx();
    AudioManager.playSound(cue.feeling === "hesitate" ? "focus" : "caution");
  }
}

function isDifficultFeeling(feeling) {
  return feeling === "bait" || feeling === "hide" || feeling === "hesitate" || feeling === "panic";
}

function markReadCueDifficulty(cue) {
  cabinet.classList.remove("is-cue-caution", "is-cue-focus", "is-cue-special", "is-cue-sway");

  if (!cue || !cue.feeling) {
    return;
  }

  if (isSpecialCueFeeling(cue.feeling)) {
    cabinet.classList.add("is-cue-special");
    if (cue.feeling === "hesitate") {
      cabinet.classList.add("is-cue-sway", "is-cue-caution");
    } else if (cue.feeling === "mirror") {
      cabinet.classList.add("is-cue-focus");
    } else {
      cabinet.classList.add("is-cue-caution");
    }
    signalSpecialCue(cue);
  } else if (cue.feeling === "match" && state.draw >= getChanceDrawCount()) {
    cabinet.classList.add("is-cue-focus");
  }
}


function lineTemplatesForCue(cue) {
  const word = handName(cue.wordHand);
  const cpu = handName(cue.cpuHand);

  // 画像で見えている雰囲気と、セリフの意図がズレにくい短文に寄せる。
  // 基本は「まだ続けたい」が本心で、その中で見せ方だけを少し変える。
  if (cue.feeling === "match") {
    return [
      `${cpu}で
あいこにしよ`,
      `${cpu}で
待ってるね`,
    ];
  }

  if (cue.feeling === "bait") {
    return [
      `${word}っぽく\n見えるかな？`,
      `${word}に\n見せてみるね`,
    ];
  }

  if (cue.feeling === "mirror") {
    return [
      `先に\n出してみて`,
      `今度は\nわたしが見るね`,
      `あなたの手に\n合わせるね`,
    ];
  }

  if (cue.feeling === "hide") {
    return [
      `ほんとは
${cpu}で続きたい`,
      `${cpu}を
小さく言うね`,
    ];
  }

  if (cue.feeling === "hesitate") {
    return [
      swayCueLine(cue),
    ];
  }

  if (cue.feeling === "panic") {
    return [
      `あっ…\nもう出しちゃった`,
      `まって…\n手が見えてる…`,
      `見ないで…\n出ちゃった`,
    ];
  }

  if (cue.feeling === "trueEnd") {
    return [
      `${cpu}で
あいこにしよ`,
      `${cpu}で
待ってるね`,
    ];
  }

  return [
    `つぎは
${cpu}だよ`,
    `わたしは
${cpu}を出すね`,
  ];
}

function createReadCue() {
  const progress = getアルバムProgress();
  const trueEndSeen = progress.trueEndSeen === true;
  const phase = getRelationshipPhase();
  const draw = state.draw;
  const playerAhead = state.win - state.lose;
  const cpuAhead = state.lose - state.win;

  let pool;

  if (isGalleryTrainingMode(progress)) {
    const stage = getGalleryTrainingStage(progress);

    if (stage === "basic") {
      // ギャラリー回収の2回目。学習機会を増やし、でも理不尽にはしない。
      pool = draw >= getChanceDrawCount()
        ? [
            { value: "match", weight: 38 },
            { value: "honest", weight: 18 },
            { value: "hesitate", weight: 24 },
            { value: "bait", weight: 14 },
            { value: "mirror", weight: 10 },
            { value: "hide", weight: 4 },
          ]
        : [
            { value: "match", weight: 44 },
            { value: "honest", weight: 28 },
            { value: "hesitate", weight: 18 },
            { value: "mirror", weight: 8 },
            { value: "bait", weight: 6 },
          ];
    } else if (stage === "advanced") {
      // ギャラリー回収の3回目。スコアアタックより少しシビアにして、型を身につける。
      pool = [
        { value: "match", weight: 32 },
        { value: "honest", weight: 16 },
        { value: "hesitate", weight: 24 },
        { value: "bait", weight: 16 },
        { value: "mirror", weight: 8 },
        { value: "hide", weight: 7 },
        { value: "panic", weight: 3 },
      ];
    } else {
      // 回収終盤の復習。
      pool = [
        { value: "match", weight: 34 },
        { value: "honest", weight: 20 },
        { value: "hesitate", weight: 20 },
        { value: "bait", weight: 16 },
        { value: "mirror", weight: 10 },
        { value: "hide", weight: 6 },
        { value: "panic", weight: 2 },
      ];
    }
  } else if (trueEndSeen || phase === "afterTrueEnd") {
    // TRUE END後は、覚えた型でスコアを伸ばす。難しすぎない。
    pool = [
      { value: "trueEnd", weight: 54 },
      { value: "match", weight: 30 },
      { value: "mirror", weight: 8 },
      { value: "panic", weight: 8 },
      { value: "honest", weight: 6 },
    ];
  } else if (draw >= getFinalDrawCount()) {
    pool = [
      { value: "match", weight: 34 },
      { value: "hesitate", weight: 24 },
      { value: "bait", weight: 18 },
      { value: "mirror", weight: 8 },
      { value: "panic", weight: 14 },
      { value: "hide", weight: 8 },
    ];
  } else if (draw >= getChanceDrawCount()) {
    pool = [
      { value: "match", weight: 42 },
      { value: "honest", weight: 22 },
      { value: "hesitate", weight: 18 },
      { value: "mirror", weight: 8 },
      { value: "bait", weight: 14 },
    ];
  } else if (draw >= getDrawWarningCount()) {
    pool = [
      { value: "match", weight: 48 },
      { value: "honest", weight: 30 },
      { value: "hesitate", weight: 16 },
      { value: "bait", weight: 6 },
    ];
  } else {
    pool = [
      { value: "match", weight: 52 },
      { value: "honest", weight: 40 },
      { value: "hesitate", weight: 8 },
    ];
  }

  // 点差で少しだけ気持ちが揺れる。ただし難度は急に上げない。
  if (playerAhead >= 15) {
    pool = [
      ...pool,
      { value: "panic", weight: 6 },
    ];
  } else if (cpuAhead >= 15) {
    pool = [
      ...pool,
      { value: "bait", weight: 6 },
    ];
  }

  // TRUE END後のスコアアタックでは、60〜100回くらいの間でたまにだけキワドイ読みを混ぜる。
  // ギャラリー回収中は、上のチュートリアル用プールで学習させる。
  if (isScoreAttackMode(progress)) {
    const scoreTier = getScoreTier();
    if (scoreTier >= 1) {
      pool = [...pool, { value: "hesitate", weight: 1 }];
    }
    if (scoreTier >= 2) {
      pool = [...pool, { value: "bait", weight: 2 }, { value: "hide", weight: 1 }];
    }
    if (scoreTier >= 3) {
      pool = [...pool, { value: "bait", weight: 2 }, { value: "hesitate", weight: 1 }];
    }
    if (scoreTier >= 4) {
      pool = [...pool, { value: "hide", weight: 2 }, { value: "panic", weight: 2 }];
    }
  }

  const trainingFeeling = getTrainingForcedFeeling();
  const feeling = trainingFeeling || weightedChoice(pool) || "honest";
  let cpuHand = randomCpuHand();
  let wordHand = cpuHand;
  let imageMood = "worried";
  let honest = true;
  let ruleText = "そのまま";
  let dynamicMode = "";
  let avoidHand = null;
  let secondHand = null;

  if (feeling === "match") {
    imageMood = draw >= getChanceDrawCount() ? "draw" : "happy";
    ruleText = "同じ手";
  } else if (feeling === "bait") {
    wordHand = randomCpuHand();
    cpuHand = null;
    avoidHand = wordHand;
    dynamicMode = "avoid";
    imageMood = "smug";
    honest = false;
    ruleText = "見せ手を外す";
  } else if (feeling === "mirror") {
    wordHand = null;
    cpuHand = null;
    dynamicMode = "mirror";
    imageMood = draw >= getChanceDrawCount() ? "draw" : "happy";
    ruleText = "あなたに合わせる";
  } else if (feeling === "hide") {
    cpuHand = randomCpuHand();
    wordHand = cpuHand;
    imageMood = "smug";
    honest = false;
    ruleText = "隠した手";
  } else if (feeling === "hesitate") {
    wordHand = randomCpuHand();
    secondHand = anotherHand(wordHand);
    cpuHand = wordHand;
    dynamicMode = "sway";
    imageMood = draw >= getChanceDrawCount() ? "panic" : "worried";
    ruleText = "今の言葉に合わせる";
  } else if (feeling === "panic") {
    imageMood = "panic";
    ruleText = "そのまま";
  } else if (feeling === "trueEnd") {
    imageMood = "happy";
    ruleText = "同じ手";
  } else {
    imageMood = playerAhead >= 12 ? "worried" : cpuAhead >= 12 ? "smug" : "normal";
    ruleText = "そのまま";
  }

  const info = feelingInfo(feeling);
  const cue = {
    relationshipIntent: RELATIONSHIP_INTENT,
    type: feeling === "match" || feeling === "trueEnd" ? "request" : dynamicMode || "predict",
    feeling,
    feelingLabel: info.label,
    ruleText,
    formulaText: dynamicMode === "mirror"
      ? "あなたの手＝あいての手"
      : dynamicMode === "avoid"
        ? `${handName(avoidHand)}以外＝あいてが合わせる`
        : dynamicMode === "sway"
          ? "今の言葉＝あいてが合わせる"
          : feeling === "panic"
            ? "見えてる手＝あいこ"
            : `セリフ＋${info.label.replace("きもち：", "")}＝${handName(cpuHand)}`,
    cpuHand,
    wordHand,
    saidHand: wordHand,
    predictedHand: dynamicMode === "avoid" ? wordHand : cpuHand,
    requestedHand: cpuHand,
    avoidHand,
    dynamicAvoidHand: avoidHand,
    dynamicMode,
    swayHands: feeling === "hesitate" ? [wordHand, secondHand] : null,
    activeHand: feeling === "hesitate" ? wordHand : null,
    previousHand: null,
    changedAt: performance.now(),
    imageMood,
    mood: imageMood,
    honest,
    presentation: "formula",
  };

  cue.line = randomLine(lineTemplatesForCue(cue));
  return cue;
}

function psychEventLine(event) {
  if (!event) {
    return "";
  }

  if (event.line) {
    return event.line;
  }

  return randomLine(lineTemplatesForCue(event));
}

function getPredictionHonestyRate() {
  return 1;
}

function getPsychEventChance() {
  if (state.finalJanken) {
    return 0;
  }

  const progress = getアルバムProgress();
  const trueEndSeen = progress.trueEndSeen === true;

  if (!isReadModeUnlocked() && !trueEndSeen) {
    return state.draw >= DRAW_WARNING_COUNT ? 0.28 : 0;
  }

  return 1;
}

function getPsychEventType() {
  return "formula";
}

function getPsychPresentation() {
  return "formula";
}

function maybeStartPsychEvent(force = false) {
  if (!state.started || state.busy || state.ended || state.finalJanken || state.psychEvent) {
    return false;
  }

  if (!force && Math.random() >= getPsychEventChance()) {
    return false;
  }

  const cue = createReadCue();
  state.psychEvent = cue;

  setCharacter(cue.imageMood || cue.mood || "normal", cue.feeling, cue);
  clearCinematicCutIn();

  if (cue.feeling === "panic") {
    showPanicPreReveal(cue);
  }

  if (cue.dynamicMode === "sway") {
    startSwayCueMotion(cue);
    markReadCueDifficulty(cue);
    return true;
  }

  const line = psychEventLine(state.psychEvent);
  setDebugAnswerFromPsychEvent(state.psychEvent, line);
  showMessage(line, specialCueMoodClasses(cue), {
    typewriter: true,
    maxDuration: isDifficultFeeling(cue.feeling) || isSpecialCueFeeling(cue.feeling) ? 1840 : 1620,
  });
  markReadCueDifficulty(cue);
  return true;
}

function showNextInputPrompt() {
  // 次の入力待ちに入ったら、前のターンの「こたえ」を残さない。
  // ヒントが出る場合は maybeStartPsychEvent() 側で新しい答えに上書きする。
  setDebugAnswerNoHint("まだ、あいての手は出ていません。");

  if (showPostTrueStartMessage()) {
    setDebugAnswerNoHint("これは説明メッセージです。");
    showInputGuideOnce();
    return;
  }

  if (showHintGuideMessage()) {
    setDebugAnswerNoHint("これは遊び方の説明です。");
    showInputGuideOnce();
    return;
  }

  if (maybeStartPsychEvent()) {
    showInputGuideOnce();
    return;
  }

  if (state.chance) {
    startChanceMessages();
  } else if (isReadModeUnlocked()) {
    setCharacter(currentDialogue().image || "normal");
    showMessage(lineFor("idle"), undefined, { typewriter: true, maxDuration: 1180 });
  } else {
    showMessage(lineFor("idle"), undefined, { typewriter: true });
  }

  showInputGuideOnce();
}

function updateCharacterByScore() {
  setCharacter(currentDialogue().image || "normal");
}

function cancelMessageTyping() {
  messageTypingId += 1;
  if (messageTypingTimer) {
    window.clearTimeout(messageTypingTimer);
    messageTypingTimer = null;
  }
}

function shouldPlayTextBlip(char, index) {
  if (!char || /\s/.test(char)) {
    return false;
  }

  if ("。、！？!?…♪・,.:-/".includes(char)) {
    return false;
  }

  return index % 3 === 1;
}

function typeMessage(text, options = {}) {
  cancelMessageTyping();

  const fullText = text || "いくよ！";
  const typingId = messageTypingId;
  // 読み合いゲームなので、スマホでも読めるテンポを優先する。
  // 速すぎる文字送りは、考える前に流れてしまうため少しゆっくりにする。
  const maxDuration = options.maxDuration ?? (FAST_MOBILE_MODE ? 1240 : 1120);
  const baseSpeed = options.speed ?? (fullText.length > 18 ? 36 : 44);
  const speed = Math.max(22, Math.min(baseSpeed, Math.floor(maxDuration / Math.max(fullText.length, 1))));
  const sound = options.sound !== false;
  let index = 0;

  message.textContent = "";

  function step() {
    if (typingId !== messageTypingId) {
      return;
    }

    index += 1;
    message.textContent = fullText.slice(0, index);

    const char = fullText[index - 1];
    if (sound && shouldPlayTextBlip(char, index)) {
      AudioManager.playSound("textBlip");
    }

    if (index < fullText.length) {
      messageTypingTimer = window.setTimeout(step, speed);
    } else {
      messageTypingTimer = null;
    }
  }

  step();
}

function setMessageLengthClass(text) {
  if (!message) {
    return;
  }

  const plainText = String(text || "").replace(/\n/g, "");
  message.classList.toggle("is-long-message", plainText.length >= 14);
  message.classList.toggle("is-very-long-message", plainText.length >= 24);
}

function showMessage(text, mood, options = {}) {
  message.textContent = text || "いくよ！";
  setMessageLengthClass(text || "いくよ！");
  setStageMood(mood);

  if (mood === "is-calling") {
    cancelMessageTyping();
    restartClassAnimation(message, "is-message-pop");
    return;
  }

  cancelClassAnimation(message, "is-message-pop");

  if (options.typewriter) {
    typeMessage(text, options);
    return;
  }

  cancelMessageTyping();
}

function stopChanceMessages() {
  if (state.chanceMessageTimer) {
    window.clearInterval(state.chanceMessageTimer);
    state.chanceMessageTimer = null;
  }
}

async function showIntroThenReady() {
  const flowId = state.flowId;
  state.busy = true;
  stopChanceMessages();
  setButtonsEnabled(false);
  resetRoundView();

  // 最初だけは、プレイヤーが目的を読めるように丁寧に流す。
  showMessage("まずは 30まい。\nメダルをあつめよう", undefined, {
    typewriter: true,
    maxDuration: 3400,
    speed: 88,
  });
  await wait(2200);

  if (flowId !== state.flowId || !state.started || state.ended) {
    return;
  }

  showMessage("あいこが続くと\nメダルも大きくなるよ", undefined, {
    typewriter: true,
    maxDuration: 3600,
    speed: 82,
  });
  await wait(2450);

  if (flowId !== state.flowId || !state.started || state.ended) {
    return;
  }

  state.busy = false;
  updateCharacterByScore();
  if (showPostTrueStartMessage()) {
    setButtonsEnabled(true);
    showInputGuideOnce();
    return;
  }

  if (maybeStartPsychEvent()) {
    setButtonsEnabled(true);
    showInputGuideOnce();
    return;
  }

  showMessage("てを えらんでね");
  setButtonsEnabled(true);
  showInputGuideOnce();
}

function startChanceMessages() {
  if ((!state.chance && !state.finalJanken) || state.busy || state.ended || !state.started) {
    return;
  }

  stopChanceMessages();
  setDebugAnswerNoHint("チャンス中の通常セリフです。");
  if (state.finalJanken) {
    showMessage(randomLine(FINAL_JANKEN_IDLE_LINES), undefined, { typewriter: true, maxDuration: 1320 });
  } else {
    state.chanceMessageIndex %= CHANCE_MESSAGES.length;
    showMessage(lineFor("idle"), undefined, { typewriter: true, maxDuration: 1320 });
  }

  state.chanceMessageTimer = window.setInterval(() => {
    if ((!state.chance && !state.finalJanken) || state.busy || state.ended || !state.started) {
      stopChanceMessages();
      return;
    }

    setDebugAnswerNoHint("チャンス中の通常セリフです。");
    if (state.finalJanken) {
      showMessage(randomLine(FINAL_JANKEN_IDLE_LINES), undefined, { typewriter: true, maxDuration: 1320 });
    } else {
      state.chanceMessageIndex = (state.chanceMessageIndex + 1) % CHANCE_MESSAGES.length;
      showMessage(lineFor("idle"), undefined, { typewriter: true, maxDuration: 1320 });
    }
  }, 3600);
}

async function showFinalJankenEntry() {
  state.busy = true;
  setButtonsEnabled(false);
  stopChanceMessages();
  setSelectedButton();

  setCharacter("excited");
  clearCinematicCutIn();
  AudioManager.playSound("chance");
  AudioManager.switchBgm("final");
  showMessage("さいごのじゃんけん！", "is-result is-draw player-draw is-final-entry", {
    typewriter: true,
    maxDuration: 1250,
  });
  await wait(980);

  if (!state.started || state.ended || !state.finalJanken) {
    return;
  }

  AudioManager.playSound("caution");
  showMessage("ここからノーヒント", "is-result is-final-entry is-cue-caution", {
    typewriter: true,
    maxDuration: 1320,
  });
  await wait(1080);

  if (!state.started || state.ended || !state.finalJanken) {
    return;
  }

  setCharacter("excited");
  renderHand(playerHand, null);
  renderHand(cpuHand, null);
  setResultLabel();
  state.finalConfirmHand = null;
  showMessage("てを えらんで");
  state.busy = false;
  setButtonsEnabled(true);
}

function clearResultLabelTimer() {
  if (resultLabelTimer) {
    window.clearTimeout(resultLabelTimer);
    resultLabelTimer = null;
  }
}

function clearResultLabel() {
  clearResultLabelTimer();
  resultLabel.classList.remove("is-visible", "is-win", "is-lose", "is-draw", "is-double", "is-final", "is-hiding");
  resultLabel.textContent = "";
}

function setResultLabel(result, bonus = 1, isFinal = false) {
  clearResultLabelTimer();
  resultLabel.classList.remove("is-visible", "is-win", "is-lose", "is-draw", "is-double", "is-final", "is-hiding");

  if (!result) {
    resultLabel.textContent = "";
    return;
  }

  const showJackpot = !isFinal && Number(bonus) > BASE_メダル;
  const showFinal = isFinal && result !== "draw";

  if (showFinal) {
    resultLabel.textContent = result === "win" ? "さいごに かった！" : "さいごに とられた";
  } else if (result === "draw") {
    resultLabel.textContent = showJackpot ? "2ばい！" : "ふえた！";
  } else if (result === "win") {
    resultLabel.textContent = "とった！";
  } else if (result === "lose") {
    resultLabel.textContent = "とられた";
  } else {
    resultLabel.textContent = "";
  }

  resultLabel.classList.add("is-visible", `is-${result}`);

  if (showFinal) {
    resultLabel.classList.add("is-final");
  } else if (showJackpot) {
    resultLabel.classList.add("is-double");
  }

  const holdMs = showFinal ? 1500 : showJackpot ? 1200 : 950;
  resultLabelTimer = window.setTimeout(() => {
    resultLabel.classList.add("is-hiding");
    resultLabelTimer = window.setTimeout(() => {
      clearResultLabel();
    }, 160);
  }, holdMs);
}

function flattenImageSources(value) {
  if (!value) {
    return [];
  }

  if (!Array.isArray(value)) {
    return [value];
  }

  return value.flatMap((item) => flattenImageSources(item));
}

function normalizeImageGroups(value) {
  if (!value) {
    return [];
  }

  if (!Array.isArray(value)) {
    return [[value]];
  }

  if (value.some((item) => Array.isArray(item))) {
    return value.map((item) => (Array.isArray(item) ? item.filter(Boolean) : [item].filter(Boolean))).filter((group) => group.length);
  }

  return value.filter(Boolean).map((item) => [item]);
}

function shuffledImageGroups(value) {
  const groups = normalizeImageGroups(value).slice();

  for (let index = groups.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [groups[index], groups[swapIndex]] = [groups[swapIndex], groups[index]];
  }

  return groups;
}

function collectImageSources(sourceMap) {
  return [...new Set(Object.values(sourceMap).flatMap((value) => flattenImageSources(value)).filter(Boolean))];
}

function prepareRuntimeImage(image, priority = "low") {
  if (!image) {
    return;
  }

  image.decoding = "async";
  image.loading = priority === "high" ? "eager" : "lazy";
  try {
    image.fetchPriority = priority;
  } catch (error) {
    // fetchPriority is optional.
  }
}


function preloadImage(src) {
  if (!src) {
    return Promise.resolve(null);
  }

  const resolvedSrc = assetPath(src);
  const failedUntil = imageFailCache.get(resolvedSrc) || 0;
  if (failedUntil && failedUntil > Date.now()) {
    return Promise.resolve(null);
  }
  if (failedUntil) {
    imageFailCache.delete(resolvedSrc);
  }

  if (imageCache.has(resolvedSrc)) {
    return imageCache.get(resolvedSrc);
  }

  const promise = new Promise((resolve) => {
    const img = new Image();
    img.decoding = "async";
    img.loading = "eager";
    try {
      img.fetchPriority = LOW_POWER_MODE ? "low" : "auto";
    } catch (error) {
      // fetchPriority is optional.
    }

    img.onload = async () => {
      try {
        if (img.decode) {
          await img.decode();
        }
      } catch (error) {
        // Decoding can fail on some browsers even after load; keep the loaded image.
      }

      resolve(img);
    };

    img.onerror = () => {
      console.warn("Image not found:", resolvedSrc);
      imageCache.delete(resolvedSrc);
      imageFailCache.set(resolvedSrc, Date.now() + IMAGE_FAIL_CACHE_MS);
      resolve(null);
    };

    img.src = resolvedSrc;
  });

  imageCache.set(resolvedSrc, promise);
  return promise;
}

function preloadImages(sourceMap) {
  collectImageSources(sourceMap).forEach((src) => {
    preloadImage(src);
  });
}

function loadFirstAvailableSource(value) {
  const groups = Array.isArray(value) && value.some((item) => Array.isArray(item))
    ? value
    : normalizeImageGroups(value);
  const candidates = groups.flatMap((group) => group).filter(Boolean);
  let index = 0;

  return new Promise((resolve) => {
    const tryNext = () => {
      const src = candidates[index];
      index += 1;

      if (!src) {
        resolve(null);
        return;
      }

      preloadImage(src).then((img) => {
        if (img) {
          resolve({ img, src: assetPath(src) });
          return;
        }

        tryNext();
      });
    };

    tryNext();
  });
}

function preloadCharacterImages() {
  if (LOW_POWER_MODE) {
    return;
  }

  ["normal", "happy", "draw", "worried", "panic", "excited", "smug", "shocked"].forEach((mood) => {
    const firstGroup = normalizeImageGroups(characterImages[mood])[0];
    loadFirstAvailableSource(firstGroup);
  });
}

function preloadSceneImages() {
  if (LOW_POWER_MODE) {
    return;
  }

  preloadImages(sceneImages);
}

function preloadStartupAssets() {
  if (startupAssetsReady) {
    return startupAssetsReady;
  }

  const sources = LOW_POWER_MODE
    ? [
        commonCharacterFallbackSources()[0],
        imageSourceFor(characterImages, "normal"),
        hands.rock.image,
        hands.scissors.image,
        hands.paper.image,
      ]
    : [
        sceneImages.intro,
        imageSourceFor(characterImages, "normal"),
        imageSourceFor(characterImages, "happy"),
        hands.rock.image,
        hands.scissors.image,
        hands.paper.image,
      ];

  startupAssetsReady = Promise.allSettled(sources.filter(Boolean).map((src) => loadFirstAvailableSource(src)));
  return startupAssetsReady;
}

function imageSourceFor(sourceMap, key, fallbackKey = "normal") {
  const value = sourceMap[key] || sourceMap[fallbackKey];
  const groups = normalizeImageGroups(value);
  return groups[0] || [];
}


function shouldShowFeelingRuleText(feeling) {
  if (!feeling || !FEELING_LABELS[feeling]) {
    return false;
  }

  const progress = getアルバムProgress();

  // 1回目は普通のじゃんけんなので、気持ち表示自体を出しにくくする。
  if (!progress.normalWin && !progress.trueEndSeen) {
    return false;
  }

  // 2回目、チャンス回収までの練習では「きもち＋読み方」を出す。
  if (isGalleryTrainingMode(progress) && getGalleryTrainingStage(progress) === "basic") {
    return true;
  }

  // 3回目以降は、下段サポートを消して少し難しくする。
  return false;
}

function shouldShowMoodBadge(mood) {
  if (!state.started || state.ended) {
    return false;
  }

  // 1回目は普通のじゃんけんとして見せる。
  // 2回目以降は、表情と「きもち」を覚えるゲームなので常時表示する。
  if (isReadModeUnlocked()) {
    return true;
  }

  if (state.psychEvent) {
    return true;
  }

  if (state.finalJanken && (mood === "worried" || mood === "panic" || mood === "excited")) {
    return true;
  }

  return false;
}

function setMoodBadge(mood) {
  if (!moodBadge) {
    return;
  }

  if (!shouldShowMoodBadge(mood)) {
    moodBadge.hidden = true;
    moodBadge.textContent = "";
    moodBadge.dataset.mood = "";
    return;
  }

  const feeling = state.currentFeeling;
  const info = feeling && FEELING_LABELS[feeling] ? FEELING_LABELS[feeling] : null;
  const label = info ? info.label : MOOD_LABELS[mood] || MOOD_LABELS.normal;
  const showRule = shouldShowFeelingRuleText(feeling);
  const rule = showRule ? info?.rule || "" : "";
  moodBadge.textContent = "";
  moodBadge.classList.toggle("is-rule-hidden", Boolean(info && !showRule));
  if (rule) {
    const main = document.createElement("span");
    const small = document.createElement("small");
    main.textContent = label;
    small.textContent = rule;
    moodBadge.append(main, small);
  } else {
    moodBadge.textContent = label;
  }
  moodBadge.hidden = false;
  moodBadge.dataset.mood = feeling || mood;
  moodBadge.dataset.rule = rule ? "show" : "hide";
}

function setCharacter(mood, feeling = null, context = null) {
  const characterMood = characterImages[mood] ? mood : "normal";
  state.currentFeeling = feeling;
  const requestId = ++characterRequestId;

  characterFrame.dataset.mood = characterMood;
  setMoodBadge(characterMood);

  const presentation = chooseCharacterPresentation(characterMood, context);
  applyCharacterPresentation(presentation);

  loadImageDirectlyWithFallback(
    characterImage,
    characterFallback,
    presentation.sources,
    {
      priority: "high",
      isCurrent: () => requestId === characterRequestId,
    }
  );
}

function setSceneCharacter(mood) {
  const requestId = ++sceneCharacterRequestId;
  const characterMood = characterImages[mood] ? mood : "normal";
  sceneOverlay.classList.remove("has-illustration");
  sceneIllustration.hidden = true;

  loadImageDirectlyWithFallback(
    sceneCharacterImage,
    sceneCharacterFallback,
    characterSourcesForMood(characterMood),
    {
      priority: "low",
      isCurrent: () => requestId === sceneCharacterRequestId,
    }
  );
}

function commonCharacterFallbackSources() {
  return [
    "assets/images/character_draw_01.png",
    "assets/images/character_normal_01.png",
    "assets/images/character_happy_01.png",
    "assets/images/character_worried_01.png",
    "assets/images/character_excited_01.png",
    "assets/images/character_draw_01.png.png",
    "assets/images/character_normal_01.png.png",
  ];
}


function uniqueImageSources(sources) {
  return [...new Set((sources || []).flat().filter(Boolean))];
}

function loadImageDirectlyWithFallback(imgElement, fallbackElement, sources, options = {}) {
  if (!imgElement || !fallbackElement) {
    return;
  }

  const candidates = uniqueImageSources(sources);
  const priority = options.priority || "high";
  const isCurrent = typeof options.isCurrent === "function" ? options.isCurrent : () => true;
  let index = 0;

  prepareRuntimeImage(imgElement, priority);
  imgElement.onload = null;
  imgElement.onerror = null;

  const failToFallback = () => {
    if (!isCurrent()) {
      return;
    }

    imgElement.hidden = true;
    imgElement.removeAttribute("src");
    fallbackElement.hidden = false;
  };

  const tryNext = () => {
    if (!isCurrent()) {
      return;
    }

    const src = candidates[index];
    index += 1;

    if (!src) {
      failToFallback();
      return;
    }

    const resolvedSrc = assetPath(src);
    imgElement.onload = () => {
      if (!isCurrent()) {
        return;
      }

      imgElement.hidden = false;
      fallbackElement.hidden = true;
    };
    imgElement.onerror = () => {
      if (!isCurrent()) {
        return;
      }

      tryNext();
    };

    // DOM上の画像で直接読み込む。preloadImageのlazy/キャッシュ都合で表示されない事故を避ける。
    imgElement.hidden = true;
    fallbackElement.hidden = false;
    imgElement.src = resolvedSrc;
  };

  tryNext();
}

function characterSourcesForMood(mood) {
  const presentation = chooseCharacterPresentation(mood, null);
  return uniqueImageSources([...(presentation.sources || []), ...commonCharacterFallbackSources()]);
}

function showLoadedCharacterImage(imgElement, fallbackElement, src, priority = "high") {
  prepareRuntimeImage(imgElement, priority);
  imgElement.src = src;
  imgElement.hidden = false;
  fallbackElement.hidden = true;
}

function useFallbackCharacter() {
  // 画像名の一部が欠けている場合でも、共通の立ち絵だけは出す。
  loadFirstAvailableSource(commonCharacterFallbackSources()).then((loaded) => {
    if (loaded) {
      showLoadedCharacterImage(characterImage, characterFallback, loaded.src, "high");
      return;
    }

    characterFrame.dataset.mood = "fallback";
    characterImage.hidden = true;
    characterFallback.hidden = false;
  });
}

function useFallbackSceneCharacter() {
  loadFirstAvailableSource(commonCharacterFallbackSources()).then((loaded) => {
    if (loaded) {
      showLoadedCharacterImage(sceneCharacterImage, sceneCharacterFallback, loaded.src, "low");
      return;
    }

    sceneCharacterImage.hidden = true;
    sceneCharacterFallback.hidden = false;
  });
}

function retryVisibleCharactersSoon() {
  // 旧版の短周期リトライは、画像欠け時にスマホで負荷になるため停止。
}

["visibilitychange", "focus", "online", "pageshow"].forEach((eventName) => {
  window.addEventListener(eventName, () => retryVisibleCharactersSoon(120), { passive: true });
});

function fallbackSceneIllustration() {
  const mood = sceneOverlay.dataset.fallbackMood || "normal";
  sceneOverlay.classList.remove("has-illustration");
  sceneIllustration.hidden = true;
  setSceneCharacter(mood);
}

function setSceneIllustration(sceneType, fallbackMood = "normal", fallbackSceneType = null) {
  const src = imageSourceFor(sceneImages, sceneType, sceneType);
  const fallbackSrc = fallbackSceneType ? imageSourceFor(sceneImages, fallbackSceneType, "playerWin") : null;
  const requestId = ++sceneIllustrationRequestId;
  sceneOverlay.dataset.fallbackMood = fallbackMood;

  if (!src || (Array.isArray(src) && src.length === 0)) {
    fallbackSceneIllustration();
    return;
  }

  sceneOverlay.classList.add("has-illustration");
  sceneCharacterImage.hidden = true;
  sceneCharacterFallback.hidden = true;

  loadFirstAvailableSource(src).then((loaded) => {
    if (requestId !== sceneIllustrationRequestId) {
      return;
    }

    if (!loaded) {
      if (fallbackSrc) {
        console.warn("Scene image fallback:", src);
        loadFirstAvailableSource(fallbackSrc).then((fallbackLoaded) => {
          if (requestId !== sceneIllustrationRequestId) {
            return;
          }

          if (!fallbackLoaded) {
            fallbackSceneIllustration();
            return;
          }

          prepareRuntimeImage(sceneIllustration, "low");
          sceneIllustration.src = fallbackLoaded.src;
          sceneIllustration.hidden = false;
        });
        return;
      }

      fallbackSceneIllustration();
      return;
    }

    prepareRuntimeImage(sceneIllustration, "low");
    sceneIllustration.src = loaded.src;
    sceneIllustration.hidden = false;
  });
}

function cancelSceneTyping() {
  if (sceneTypingTimer) {
    window.clearTimeout(sceneTypingTimer);
    sceneTypingTimer = null;
  }

  sceneTypingId += 1;

  if (sceneTypingResolve) {
    const resolve = sceneTypingResolve;
    sceneTypingResolve = null;
    resolve();
  }
}

function setSceneNextVisible(visible) {
  if (!sceneNextButton) {
    return;
  }

  sceneNextButton.hidden = !visible;
}

function resetSceneDialogState() {
  cancelSceneTyping();
  if (sceneAdvanceResolve) {
    const resolve = sceneAdvanceResolve;
    sceneAdvanceResolve = null;
    resolve();
  }
  sceneDialogActive = false;
  sceneCurrentFullText = "";
  sceneCurrentDone = false;
  setSceneNextVisible(false);
}

function typeSceneLine(text) {
  return new Promise((resolve) => {
    if (!sceneMessage) {
      resolve();
      return;
    }

    cancelSceneTyping();

    const fullText = String(text || "");
    const currentId = sceneTypingId;
    const speed = fullText.length > 28 ? 36 : 46;
    let index = 0;

    sceneTypingResolve = resolve;
    sceneCurrentFullText = fullText;
    sceneCurrentDone = false;
    sceneMessage.textContent = "";
    setSceneNextVisible(false);

    function finish() {
      if (sceneTypingResolve === resolve) {
        sceneTypingResolve = null;
      }
      sceneTypingTimer = null;
      sceneCurrentDone = true;
      setSceneNextVisible(true);
      resolve();
    }

    function tick() {
      if (currentId !== sceneTypingId) {
        return;
      }

      index += 1;
      sceneMessage.textContent = fullText.slice(0, index);

      const char = fullText[index - 1];
      if (index % 2 === 0 && char && ![" ", "　", "\n", "。", "、", "…"].includes(char)) {
        AudioManager.playSound("textBlip");
      }

      if (index >= fullText.length) {
        finish();
        return;
      }

      sceneTypingTimer = window.setTimeout(tick, speed);
    }

    tick();
  });
}

function waitForSceneAdvance() {
  return new Promise((resolve) => {
    sceneAdvanceResolve = resolve;
  });
}

function advanceSceneDialog(event) {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }

  if (!sceneDialogActive || !sceneOverlay || sceneOverlay.hidden) {
    return;
  }

  if (!sceneCurrentDone) {
    if (sceneTypingTimer) {
      window.clearTimeout(sceneTypingTimer);
      sceneTypingTimer = null;
    }
    sceneTypingId += 1;
    sceneMessage.textContent = sceneCurrentFullText;
    sceneCurrentDone = true;
    setSceneNextVisible(true);

    if (sceneTypingResolve) {
      const resolve = sceneTypingResolve;
      sceneTypingResolve = null;
      resolve();
    }
    return;
  }

  if (sceneAdvanceResolve) {
    const resolve = sceneAdvanceResolve;
    sceneAdvanceResolve = null;
    setSceneNextVisible(false);
    resolve();
  }
}

async function playSceneDialog(lines) {
  const sequence = lines.filter(Boolean);

  for (const line of sequence.length ? sequence : [""]) {
    await typeSceneLine(line);
    if (!sceneDialogActive) {
      break;
    }
    await waitForSceneAdvance();
    if (!sceneDialogActive) {
      break;
    }
  }
}

async function showCharacterScene(mood, text, duration = 2200) {
  stopChanceMessages();
  setButtonsEnabled(false);
  setSceneCharacter(mood);
  sceneMessage.textContent = text || "またね！";
  sceneOverlay.hidden = false;
  cabinet.classList.add("is-scene");

  await wait(duration);

  sceneOverlay.hidden = true;
  cabinet.classList.remove("is-scene");
}

async function showIllustrationScene(sceneType, text, duration = 3500, fallbackMood = "normal", fallbackSceneType = null) {
  await showSceneSequence({
    sceneType,
    fallbackSceneType,
    mood: fallbackMood,
    lines: [text || ""],
    duration,
    autoAdvance: true,
  });
}

async function showSceneSequence({
  sceneType,
  fallbackSceneType = "playerWin",
  mood = "happy",
  lines = [],
  duration = 2400,
  autoAdvance = false,
}) {
  const sequenceId = ++sceneSequenceId;
  stopChanceMessages();
  setButtonsEnabled(false);
  hideInputGuide(false);
  state.busy = true;
  sceneDialogActive = !autoAdvance;
  setSceneNextVisible(false);
  setSceneIllustration(sceneType, mood, fallbackSceneType);
  sceneOverlay.hidden = false;
  cabinet.classList.add("is-scene", `scene-${sceneType}`);

  try {
    const sequence = lines.filter(Boolean);

    if (autoAdvance) {
      for (const line of sequence.length ? sequence : [""]) {
        cancelSceneTyping();
        sceneMessage.textContent = line;
        setSceneNextVisible(false);
        await wait(duration);
      }
    } else {
      await playSceneDialog(sequence);
    }
  } finally {
    if (sequenceId !== sceneSequenceId) {
      return;
    }

    resetSceneDialogState();
    sceneOverlay.hidden = true;
    sceneOverlay.classList.remove("has-illustration");
    sceneIllustration.hidden = true;
    cabinet.classList.remove("is-scene", `scene-${sceneType}`);
    state.busy = false;
  }
}

function getCurrentClearRoute() {
  if (state.routeReachedFinal || state.finalJanken) {
    return "finalWin";
  }

  if (state.routeReachedChance || state.chance) {
    return "chanceWin";
  }

  return "normalWin";
}

function sceneTypeForClearRoute(routeId) {
  if (routeId === "chanceWin") {
    return "chanceWin";
  }

  if (routeId === "finalWin") {
    return "finalWin";
  }

  return "playerWin";
}

function getProgressAfterRouteUnlock(currentRouteId) {
  return sanitizeアルバムProgress({
    ...getアルバムProgress(),
    [currentRouteId]: true,
  });
}

function getNextGoalHintLine(currentRouteId) {
  const progress = getProgressAfterRouteUnlock(currentRouteId);
  const missingRoutes = getMissingアルバムRoutes(progress);

  if (missingRoutes.length === 0) {
    if (!progress.trueEndSeen) {
      return "ぜんぶ見てくれたんだね。\n少しだけ、話したいことがあるの。";
    }

    return "また最初のあいこから、\n一緒に遊ぼう。";
  }

  if (missingRoutes.includes("normalWin")) {
    return "普通に勝った時の顔も、\nまだ見せてないかも。";
  }

  if (missingRoutes.includes("chanceWin")) {
    return "あいこが続くと、\nチャンスが来るかも。";
  }

  if (missingRoutes.includes("finalWin")) {
    return "もっと長く続いたら、\n最後の一回が来るよ。";
  }

  if (missingRoutes.includes("gameOver")) {
    return "負けた時の私も、\n少しだけ見てほしいかも。";
  }

  return "まだ見ていない思い出が\nどこかにあるよ。";
}

function endingLinesForRoute(routeId) {
  if (state.trueEndingQueued) {
    return TRUE_END_UNLOCK_LINES;
  }

  if (routeId === "normalWin") {
    return [
      "今日は、あなたの勝ちだね。",
      "でもね、あいこだと\nもう少し一緒にいられるの。",
      "私の「きもち」も、\n少しだけ見てみて。",
      "あわせたい時は、\n同じ手で待ってるね。",
      "すなおな時は、\n言った手をそのまま出すよ。",
      getNextGoalHintLine(routeId),
    ];
  }

  if (routeId === "chanceWin") {
    return [
      "チャンスまで来てくれたね。\nちょっと嬉しい。",
      "でも時々、迷ったり、\n試したりしちゃう。",
      "迷った時は、\nあとに言った方が本音。",
      "試してる時は、\n見せた手にひっかからないで。",
      getNextGoalHintLine(routeId),
    ];
  }

  if (routeId === "finalWin") {
    return [
      "最後の一回まで\n付き合ってくれたんだね。",
      "ここまで読んでくれたの、\nちゃんと分かったよ。",
      "勝ち負けより、\n続いた時間がうれしかった。",
      "また、最初のあいこから\n始めてくれる？",
      getNextGoalHintLine(routeId),
    ];
  }

  return ["今日はあなたの勝ちだね。", getNextGoalHintLine(routeId)];
}

async function showRouteEnding(routeId) {
  const sceneType = sceneTypeForClearRoute(routeId);
  await showSceneSequence({
    sceneType,
    fallbackSceneType: "playerWin",
    mood: routeId === "finalWin" ? "worried" : "happy",
    lines: endingLinesForRoute(routeId),
  });
}

async function showTrueEnding({ replay = false } = {}) {
  const progress = getアルバムProgress();
  state.showingTrueEnding = true;
  AudioManager.switchBgm("trueEnd");

  if (!replay) {
    progress.trueEndSeen = true;
    state.galleryProgress = progress;
    saveアルバムProgress(progress);
    state.trueEndingQueued = false;
  }

  try {
    AudioManager.playSound("youwin");
    await showSceneSequence({
      sceneType: "trueEnd",
      fallbackSceneType: "playerWin",
      mood: "happy",
      lines: TRUE_END_LINES,
      duration: 2300,
    });
  } finally {
    state.showingTrueEnding = false;
    AudioManager.stopBgm();
    updateアルバムButton();
  }
}


function clearPreRevealedHands() {
  playerHand?.closest(".hand-card")?.classList.remove("is-pre-revealed");
  cpuHand?.closest(".hand-card")?.classList.remove("is-pre-revealed");
}

function showPanicPreReveal(cue) {
  if (!cue || cue.feeling !== "panic" || !cue.cpuHand) {
    return;
  }

  renderHand(playerHand, null);
  renderHand(cpuHand, cue.cpuHand);
  cpuHand?.closest(".hand-card")?.classList.add("is-pre-revealed");
}

function isPostTrueCompleteRun(scoreChange) {
  return Boolean(scoreChange?.postTrueCompleted);
}

function postTrueCompleteResultLine(scoreChange) {
  const draws = scoreChange?.completedDraws || state.draw || POST_TRUE_COMPLETE_DRAW_COUNT;
  const medal = formatScoreValue(scoreChange?.medalRecordCurrent || state.pot);
  return `完走！\n${draws}回 / ${medal}メダル`;
}

function renderHand(target, handKey) {
  const hand = hands[handKey];
  const handCard = target.closest(".hand-card");
  cancelClassAnimation(handCard, "is-hand-pop-frame");
  cancelClassAnimation(target, "is-hand-pop");
  target.classList.remove("has-hand-image");
  target.replaceChildren();

  if (!hand) {
    target.textContent = "?";
    return;
  }

  const image = document.createElement("img");
  prepareRuntimeImage(image, "low");
  image.src = assetPath(hand.image);
  image.alt = hand.label;
  image.className = "hand-result-image";
  image.addEventListener(
    "error",
    () => {
      cancelClassAnimation(handCard, "is-hand-pop-frame");
      cancelClassAnimation(target, "is-hand-pop");
      target.classList.remove("has-hand-image");
      target.textContent = hand.symbol;
    },
    { once: true }
  );

  target.classList.add("has-hand-image");
  target.append(image);
}

function resetRoundView() {
  stopPsychCueMotion();
  clearPreRevealedHands();
  renderHand(playerHand, null);
  renderHand(cpuHand, null);
  setSelectedButton();
  clearResultLabel();
  setStageMood();
  updateCharacterByScore();
}

function randomCpuHand() {
  const keys = Object.keys(hands);
  return keys[Math.floor(Math.random() * keys.length)];
}

function getDrawAssistRate() {
  if (state.finalJanken) {
    return 0;
  }

  const progress = getアルバムProgress();
  const trueEndSeen = progress.trueEndSeen === true;

  if (trueEndSeen) {
    return state.draw >= 8 ? 0.38 : state.draw >= 4 ? 0.28 : 0.16;
  }

  const targetRoute = getNextTargetRoute();

  if (targetRoute === "chanceWin" || targetRoute === "finalWin") {
    return state.draw >= 8 ? 0.28 : state.draw >= 4 ? 0.18 : 0.08;
  }

  return state.draw >= 5 ? 0.08 : 0;
}

function cpuHandForForcedResult(player, result) {
  if (result === "win") {
    return hands[player].beats;
  }

  if (result === "lose") {
    return Object.keys(hands).find((key) => hands[key].beats === player) || randomCpuHand();
  }

  return randomCpuHand();
}

function chooseCpuHand(player, activeEvent = null) {
  if (state.debugForceNextResult) {
    const forcedResult = state.debugForceNextResult;
    state.debugForceNextResult = null;
    state.psychEvent = null;
    const forcedCpu = cpuHandForForcedResult(player, forcedResult);
    state.debugAnswer = {
      kind: "note",
      text: [
        "デバッグ固定",
        `あなた：${handName(player)}`,
        `あいて：${handName(forcedCpu)}`,
        `結果：${forcedResult === "win" ? "あなた勝ち" : forcedResult === "lose" ? "あいて勝ち" : "ランダム"}`,
      ].join("\n"),
    };
    updateDebugAnswerPanel();
    return forcedCpu;
  }

  const event = activeEvent || state.psychEvent;

  if (event) {
    let cpuHand = event.cpuHand;
    const dynamicMode = event.dynamicMode ||
      (event.feeling === "bait" ? "avoid" : event.feeling === "mirror" ? "mirror" : event.feeling === "hesitate" ? "sway" : "");

    if (dynamicMode === "mirror") {
      cpuHand = player;
      event.dynamicMode = "mirror";
      event.resolvedPlayerHand = player;
      event.resolvedCpuHand = cpuHand;
    } else if (dynamicMode === "avoid") {
      const avoidHand = event.avoidHand || event.dynamicAvoidHand || event.wordHand || event.saidHand || event.predictedHand;
      event.dynamicMode = "avoid";
      event.avoidHand = avoidHand;
      event.dynamicAvoidHand = avoidHand;
      event.resolvedPlayerHand = player;

      if (avoidHand && player && player !== avoidHand) {
        // 見せ手を外せたら、必ず相手が合わせてあいこにする。
        cpuHand = player;
      } else if (avoidHand && player === avoidHand) {
        // 見せ手に引っかかった時だけ、相手に取られる。
        cpuHand = handThatBeats(player) || randomCpuHand();
      } else if (player) {
        // 念のため avoidHand が取れない場合も、理不尽なランダム勝敗にしない。
        cpuHand = player;
      } else {
        cpuHand = randomCpuHand();
      }

      event.resolvedCpuHand = cpuHand;
    } else if (dynamicMode === "sway") {
      const activeHand = event.activeHand || event.cpuHand || event.wordHand || randomCpuHand();
      const previousHand = event.previousHand || null;
      const changedAt = Number(event.changedAt || 0);
      const justChanged = changedAt && performance.now() - changedAt <= 260;
      const accepted = player === activeHand || (justChanged && previousHand && player === previousHand);

      event.dynamicMode = "sway";
      event.resolvedPlayerHand = player;

      if (accepted) {
        // 表示中の手に合わせられたら、必ずあいこ。
        cpuHand = player;
      } else {
        // 表示を読み違えた時だけ失敗。
        cpuHand = handThatBeats(player) || randomCpuHand();
      }

      event.resolvedCpuHand = cpuHand;
      event.cpuHand = cpuHand;
    }

    state.debugAnswer = buildDebugAnswerFromPsychEvent(event, event.line || state.debugAnswer?.line || "");
    state.psychEvent = null;
    updateDebugAnswerPanel();
    return cpuHand || randomCpuHand();
  }

  const drawAssistRate = getDrawAssistRate();
  if (drawAssistRate > 0 && Math.random() < drawAssistRate) {
    return player;
  }

  return randomCpuHand();
}

function judge(player, cpu) {
  if (player === cpu) {
    return "draw";
  }

  return hands[player].beats === cpu ? "win" : "lose";
}

function cpuMoodForResult(result) {
  if (result === "win") {
    return "lose";
  }

  if (result === "lose") {
    return "win";
  }

  return "draw";
}

function resultText(result) {
  if (result === "win") {
    return lineFor("cpuLose");
  }

  if (result === "lose") {
    return lineFor("cpuWin");
  }

  return lineFor("draw");
}

function stopCountdown() {
  if (state.countdownTimer) {
    window.clearInterval(state.countdownTimer);
    state.countdownTimer = null;
  }
}

function cancelEndFlow() {
  state.flowId += 1;
  stopCountdown();
  stopChanceMessages();
}

function resetScore() {
  clearPendingChoice();
  stopPsychCueMotion();
  clearCinematicCutIn();
  state.win = 0;
  state.lose = 0;
  state.draw = 0;
  state.pot = BASE_メダル;
  state.drawWarningShown = false;
  state.finalConfirmHand = null;
  state.routeReachedChance = false;
  state.routeReachedFinal = false;
  state.trueEndingQueued = false;
  state.psychEvent = null;
  state.nextCallMode = "normal";
  state.postTrueRecordAnnounced = false;
  state.postTrueNewRecordShownFor = 0;
  state.bestMedalRecord = loadBestMedalRecord();
  state.medalNewRecord = false;
  state.medalNewRecordValue = 0;
  state.lastLine = "";
  setFinalJankenMode(false);
  setChanceMode(false);
  updateScore();
}

function cleanupForTitle() {
  clearPendingChoice();
  stopPsychCueMotion();
  stopCountdown();
  stopChanceMessages();
  clearCinematicCutIn();
  resetSceneDialogState();
  cancelMessageTyping();
  clearResultLabel();
  clearCharacterBeat();
  hideInputGuide(false);
  state.finalConfirmHand = null;
  state.showingTrueEnding = false;
  setSelectedButton();
  setButtonsEnabled(false);
  clearPreRevealedHands();
  renderHand(playerHand, null);
  renderHand(cpuHand, null);
  setStageMood();

  endOverlay.hidden = true;
  sceneOverlay.hidden = true;
  sceneOverlay.classList.remove("has-illustration");
  sceneIllustration.hidden = true;
  closeアルバム(false);
  cabinet.classList.remove("is-scene", "scene-intro", "scene-playerWin", "scene-playerLose", "is-playing", "is-ended", "end-win", "end-lose", "is-post-true-complete");
}

function showTitle() {
  AudioManager.stopBgm();
  state.started = false;
  state.busy = false;
  state.ended = false;
  state.psychEvent = null;
  state.nextCallMode = "normal";
  startButton.hidden = false;
  startButton.disabled = false;
  cleanupForTitle();
  resetScore();
  setCharacter("normal");
  showMessage("タップしてね");
  updateアルバムButton();
}

async function returnToTitleWithBlackout() {
  const flowId = ++state.flowId;
  stopCountdown();
  stopChanceMessages();
  setButtonsEnabled(false);
  sceneOverlay.hidden = true;
  cabinet.classList.remove("is-scene");
  AudioManager.playSound("blackout");
  cabinet.classList.add("is-blackout");

  await wait(750);

  if (flowId !== state.flowId) {
    return;
  }

  showTitle();
  await wait(90);

  if (flowId === state.flowId) {
    cabinet.classList.remove("is-blackout");
  }
}

async function showGameOverThenTitle() {
  const flowId = ++state.flowId;
  stopCountdown();
  stopChanceMessages();
  setButtonsEnabled(false);
  AudioManager.playSound("gameover");
  finalTitle.textContent = "おしまい";
  finalMessage.textContent = "また挑戦してね";
  retryButton.hidden = true;
  const countdownWrap = countdown ? countdown.closest(".countdown") : null;
  if (countdownWrap) {
    countdownWrap.hidden = true;
  }
  endOverlay.hidden = false;
  cabinet.classList.remove("end-win");
  cabinet.classList.add("end-lose");
  setCharacter("win");
  showMessage(randomLine(dialogue.cpuLeadBig.cpuWin), "is-result is-win", { typewriter: true });

  await wait(1200);

  if (flowId !== state.flowId) {
    return;
  }

  await showSceneSequence({
    sceneType: "playerLose",
    fallbackSceneType: "playerLose",
    mood: "happy",
    lines: ["ここまで遊んでくれてありがとう。", "また来てくれたら、うれしいな。"],
  });

  if (flowId !== state.flowId) {
    return;
  }

  unlockアルバムRoute("gameOver");

  if (isアルバムComplete() && !getアルバムProgress().trueEndSeen) {
    state.trueEndingQueued = true;
  }

  if (state.trueEndingQueued) {
    await showTrueEnding();

    if (flowId === state.flowId) {
      returnToTitleWithBlackout();
    }
    return;
  }

  if (flowId === state.flowId) {
    returnToTitleWithBlackout();
  }
}

function startContinueCountdown() {
  let remaining = CONTINUE_SECONDS;
  countdown.textContent = remaining;

  stopCountdown();
  state.countdownTimer = window.setInterval(() => {
    remaining -= 1;
    countdown.textContent = remaining;

    if (remaining <= 0) {
      showGameOverThenTitle();
    }
  }, 1000);
}

function handleアルバムUnlockForEnding(result) {
  let routeId = null;

  if (result === "win") {
    routeId = getCurrentClearRoute();
  }

  if (!routeId) {
    return null;
  }

  unlockアルバムRoute(routeId);

  if (isアルバムComplete() && !getアルバムProgress().trueEndSeen) {
    state.trueEndingQueued = true;
  }

  return routeId;
}


async function endPostTrueCompletion(result, scoreChange) {
  cancelEndFlow();
  const flowId = state.flowId;
  state.ended = true;
  state.busy = false;
  state.psychEvent = null;
  state.nextCallMode = "normal";
  stopChanceMessages();
  stopPsychCueMotion();
  clearPendingChoice();
  clearPreRevealedHands();
  setSelectedButton();
  setButtonsEnabled(false);
  cabinet.classList.add("is-ended", "is-post-true-complete", `end-${result}`);
  cabinet.classList.remove(result === "win" ? "end-lose" : "end-win");

  const countdownWrap = countdown ? countdown.closest(".countdown") : null;
  retryButton.hidden = true;
  if (countdownWrap) {
    countdownWrap.hidden = true;
  }

  finalTitle.textContent = "完走！";
  finalMessage.textContent = `${scoreChange?.completedDraws || POST_TRUE_COMPLETE_DRAW_COUNT}回 あいこ`;
  endOverlay.hidden = false;

  AudioManager.switchBgm("final");
  AudioManager.playSound("chance");
  setCharacter(result === "win" ? "shocked" : "smug");
  renderHand(playerHand, null);
  renderHand(cpuHand, null);
  showMessage("完走…\n最後は見えない一手", "is-result is-final-entry is-cue-caution is-complete-run", {
    typewriter: true,
    maxDuration: 1700,
  });

  await wait(1700);

  if (flowId !== state.flowId) {
    return;
  }

  AudioManager.playSound(result === "win" ? "youwin" : "lose");
  showMessage(
    result === "win" ? "最後の一手、\nあなたの勝ち" : "最後の一手、\nあいての勝ち",
    `is-result is-${cpuMoodForResult(result)} player-${result} is-complete-run`,
    { typewriter: true, maxDuration: 1500 }
  );

  await wait(2100);

  if (flowId === state.flowId) {
    returnToTitleWithBlackout();
  }
}

async function endGame(result) {
  cancelEndFlow();
  const flowId = state.flowId;
  state.ended = true;
  state.busy = false;
  setSelectedButton();
  setButtonsEnabled(false);
  cabinet.classList.add("is-ended", `end-${result}`);
  retryButton.hidden = result === "win";
  countdown.parentElement.hidden = result === "win";
  finalTitle.textContent = result === "win" ? "かち！" : "つづける？";
  finalMessage.textContent = result === "win" ? "また あそんでね" : "もういっかい？";
  retryButton.textContent = "もういっかい";
  endOverlay.hidden = false;
  const routeId = handleアルバムUnlockForEnding(result);

  if (result === "win") {
    AudioManager.playSound("youwin");
    setCharacter("panic");
    showMessage("あなたのかち！", "is-result is-lose", { typewriter: true });
    await wait(1500);

    if (flowId !== state.flowId) {
      return;
    }

    await showRouteEnding(routeId);

    if (flowId !== state.flowId) {
      return;
    }

    if (state.trueEndingQueued) {
      await showTrueEnding();
    }

    if (flowId === state.flowId) {
      returnToTitleWithBlackout();
    }
    return;
  }

  setCharacter("smug");
  AudioManager.playSound("continue");
  showMessage("あいてのかち！", "is-result is-win", { typewriter: true });
  startContinueCountdown();
}

function restartMatch() {
  AudioManager.unlockAudio();
  AudioManager.initAudio();
  AudioManager.switchBgm("normal");
  AudioManager.playSound("start");
  cancelEndFlow();
  clearCinematicCutIn();
  resetSceneDialogState();
  cancelMessageTyping();
  clearResultLabel();
  clearCharacterBeat();
  hideInputGuide(false);
  state.finalConfirmHand = null;
  closeアルバム(false);
  endOverlay.hidden = true;
  sceneOverlay.hidden = true;
  sceneOverlay.classList.remove("has-illustration");
  sceneIllustration.hidden = true;
  state.started = true;
  state.busy = false;
  state.ended = false;
  cabinet.classList.remove("is-scene", "scene-intro", "scene-playerWin", "scene-playerLose", "is-ended", "end-win", "end-lose");
  updateアルバムButton();
  resetScore();
  showIntroThenReady();
}

function addRoundScore(result) {
  const scoreChange = {
    bonus: 1,
    points: 0,
    potBefore: state.pot,
    warningStarted: false,
    chanceStarted: false,
    finalStarted: false,
    finalResolved: false,
    finalResult: null,
    postTrueNewRecord: false,
    medalNewRecord: false,
    postTrueCompleted: false,
    postTrueCompleteResult: null,
    completedDraws: 0,
    medalRecordPrevious: getBestMedalRecord(),
    medalRecordCurrent: state.pot,
  };

  if (result === "draw") {
    state.draw += 1;
    state.pot = Math.min(MAX_メダル, state.pot * JACKメダル_MULTIPLIER);
    scoreChange.points = state.pot;
    const medalRecord = maybeUpdateBestMedalRecord(state.pot);
    scoreChange.medalNewRecord = medalRecord.announce;
    scoreChange.medalRecordPrevious = medalRecord.previous;
    scoreChange.medalRecordCurrent = medalRecord.current;
    scoreChange.postTrueNewRecord = checkPostTrueDrawRecord();

    if (getアルバムProgress().trueEndSeen === true && state.draw >= POST_TRUE_COMPLETE_DRAW_COUNT) {
      scoreChange.postTrueCompleted = true;
      scoreChange.postTrueCompleteResult = Math.random() < 0.5 ? "win" : "lose";
      scoreChange.completedDraws = state.draw;
    }

    if (state.draw >= getDrawWarningCount() && !state.drawWarningShown) {
      state.drawWarningShown = true;
      scoreChange.warningStarted = true;
    }

    if (state.draw >= getChanceDrawCount() && !state.chance) {
      setChanceMode(true);
      state.routeReachedChance = true;
      scoreChange.chanceStarted = true;
    }

    if (state.draw >= getFinalDrawCount() && !state.finalJanken && getアルバムProgress().trueEndSeen !== true) {
      setFinalJankenMode(true);
      state.routeReachedFinal = true;
      if (!state.chance) {
        setChanceMode(true);
        state.routeReachedChance = true;
      }
      scoreChange.finalStarted = true;
    }

    return scoreChange;
  }

  const payout = state.pot;
  scoreChange.bonus = payout;
  scoreChange.points = payout;
  const medalRecord = maybeUpdateBestMedalRecord(payout);
  scoreChange.medalNewRecord = medalRecord.announce;
  scoreChange.medalRecordPrevious = medalRecord.previous;
  scoreChange.medalRecordCurrent = medalRecord.current;

  if (state.finalJanken) {
    scoreChange.finalResolved = true;
    scoreChange.finalResult = result;
    if (result === "win") {
      state.win += payout;
    } else if (result === "lose") {
      state.lose += payout;
    }
    state.pot = BASE_メダル;
    state.draw = 0;
    return scoreChange;
  }

  state[result] += payout;
  state.pot = BASE_メダル;
  state.draw = 0;
  state.drawWarningShown = false;
  return scoreChange;
}

async function startGame() {
  if (state.started || state.busy) {
    return;
  }

  if (DEBUG_MODE) {
    console.time("startGame");
  }

  const flowId = ++state.flowId;
  state.busy = true;
  startButton.disabled = true;
  closeアルバム(false);
  if (galleryButton) {
    galleryButton.hidden = true;
    galleryButton.classList.remove("is-new");
  }
  if (relationResetButton) {
    relationResetButton.hidden = true;
  }
  endOverlay.hidden = true;
  sceneOverlay.hidden = true;
  sceneOverlay.classList.remove("has-illustration");
  sceneIllustration.hidden = true;
  clearCinematicCutIn();
  resetSceneDialogState();
  cancelMessageTyping();
  clearResultLabel();
  clearCharacterBeat();
  hideInputGuide(false);
  state.finalConfirmHand = null;
  setSelectedButton();
  setButtonsEnabled(false);
  updateアルバムButton();

  AudioManager.unlockAudio();
  AudioManager.initAudio();
  AudioManager.playSound("start");
  if (!LOW_POWER_MODE) {
    AudioManager.prepareForGameplay();
  }

  await Promise.race([startupAssetsReady || preloadStartupAssets(), wait(LOW_POWER_MODE ? 180 : 400)]);
  await wait(LOW_POWER_MODE ? 20 : 60);

  if (flowId !== state.flowId) {
    return;
  }

  state.started = true;
  state.ended = false;
  cabinet.classList.add("is-playing");
  updateアルバムButton();
  window.setTimeout(() => {
    if (state.started && !state.ended) {
      AudioManager.switchBgm("normal");
    }
  }, 120);
  showIntroThenReady();

  if (DEBUG_MODE) {
    console.timeEnd("startGame");
  }
}

async function playRound(player) {
  if (!state.started || state.busy || state.ended) {
    return;
  }

  if (DEBUG_MODE) {
    console.time("playRound");
  }

  const endPlayRoundTimer = () => {
    if (DEBUG_MODE) {
      console.timeEnd("playRound");
    }
  };

  clearPendingChoice();
  state.busy = true;
  const flowId = state.flowId;
  // 表示中の心理イベントを、ラウンド開始時点で確実に確保する。
  // resetRoundView() やキャラ更新の影響でイベントが消えても、このラウンドだけは同じ判定を使う。
  const activePsychEvent = state.psychEvent ? { ...state.psychEvent } : null;
  stopPsychCueMotion();
  state.finalConfirmHand = null;
  cabinet.classList.remove("is-final-confirm");
  stopChanceMessages();
  resetRoundView();
  AudioManager.playSound("select");
  setSelectedButton(player);
  setButtonsEnabled(false);

  const callMode = state.nextCallMode;
  // じゃんけんの掛け声は、あいこが続くほど少しずつ速くする。
  // 判定後ではなく、今回のラウンド開始時点のあいこ数で決める。
  const jankenTempo = getJankenTempo(state.draw);
  cabinet.dataset.tempoLevel = String(jankenTempo.level);
  const cpu = chooseCpuHand(player, activePsychEvent);
  const result = judge(player, cpu);
  const scoreChange = addRoundScore(result);

  // 掛け声のリズムを3拍で統一する。
  // じゃん / けん / ぽん！
  // あいこ / で / しょ！
  // 表示文字は変えず、「あいこでしょ」を分割して同じテンポにする。
  const calls = callMode === "draw" ? ["あいこ", "で"] : ["じゃん", "けん"];
  const revealCall = callMode === "draw" ? "しょ！" : "ぽん！";

  for (const [index, call] of calls.entries()) {
    const callSound = index === 0 ? "call1" : "call2";
    const beatClass = index === 0 ? "is-beat-1" : "is-beat-2";
    showMessage(call, "is-calling");
    AudioManager.playJankenCallSfx(callSound);
    playCharacterBeat(beatClass);
    await wait(jankenTempo.callStep);
    if (flowId !== state.flowId) {
      endPlayRoundTimer();
      return;
    }
  }

  showMessage(revealCall, "is-calling");
  AudioManager.playJankenCallSfx("call3");
  playCharacterBeat("is-beat-3");
  await wait(jankenTempo.revealToHand);
  if (flowId !== state.flowId) {
    endPlayRoundTimer();
    return;
  }

  renderHand(playerHand, player);
  renderHand(cpuHand, cpu);
  AudioManager.playSound("handPop");
  await wait(jankenTempo.handPause);
  if (flowId !== state.flowId) {
    endPlayRoundTimer();
    return;
  }

  updateScore();
  const cpuMood = cpuMoodForResult(result);
  if (result === "win") {
    setCharacter(state.win - state.lose >= 12 ? "panic" : "worried");
  } else if (result === "lose") {
    setCharacter(state.lose - state.win >= 12 ? "smug" : "happy");
  } else {
    setCharacter(state.chance ? "excited" : "draw");
  }
  setResultLabel(result, scoreChange.points || scoreChange.bonus, scoreChange.finalResolved);

  if (scoreChange.postTrueCompleted) {
    AudioManager.switchBgm("final");
    AudioManager.playSound("chance");
    setCharacter("shocked");
    renderHand(playerHand, null);
    renderHand(cpuHand, null);
    showMessage(postTrueCompleteResultLine(scoreChange), "is-result is-draw player-draw is-complete-run", {
      typewriter: true,
      maxDuration: 1500,
    });
  } else if (scoreChange.finalResolved) {
    const finalLine = result === "win"
      ? randomLine(dialogue.final.cpuLose)
      : randomLine(dialogue.final.cpuWin);
    AudioManager.playSound(result === "win" ? "win" : "lose");
    showMessage(finalLine, `is-result is-${cpuMood} player-${result} is-final-entry`, { typewriter: true });
  } else if (scoreChange.finalStarted) {
    state.nextCallMode = "draw";
    await showFinalJankenEntry();
    endPlayRoundTimer();
    return;
  } else if (scoreChange.chanceStarted) {
    state.chanceMessageIndex = 0;
    setCharacter("excited");
    clearCinematicCutIn();
    AudioManager.playSound("chance");
    AudioManager.switchBgm("chance");
    showMessage(randomLine(CHANCE_ENTRY_LINES), "is-result is-draw player-draw is-chance-entry", { typewriter: true });
  } else if (scoreChange.warningStarted) {
    setCharacter("worried");
    AudioManager.playSound("draw");
    showMessage(randomLine(DRAW_WARNING_LINES), "is-result is-draw player-draw is-draw-warning", { typewriter: true });
  } else if (result === "win") {
    AudioManager.playSound("win");
    showMessage(randomLine(["メダルを とった！", "やった！", "いいね！"]), "is-result is-lose player-win is-double", { typewriter: true });
  } else if (result === "lose") {
    AudioManager.playSound("lose");
    showMessage(randomLine(["メダルを とられた", "まだいける！", "つぎ！"]), "is-result is-win player-lose is-double", { typewriter: true });
  } else if (scoreChange.medalNewRecord && result === "draw") {
    setCharacter(state.draw >= getChanceDrawCount() ? "excited" : "happy");
    AudioManager.playSound("draw");
    showMessage(medalNewRecordLine(scoreChange), "is-result is-draw player-draw is-new-record", {
      typewriter: true,
      maxDuration: 920,
    });
  } else if (scoreChange.postTrueNewRecord) {
    setCharacter(state.draw >= 10 ? "excited" : "happy");
    AudioManager.playSound("draw");
    showMessage(postTrueNewRecordLine(), "is-result is-draw player-draw", {
      typewriter: true,
      maxDuration: 760,
    });
  } else if (state.finalJanken && result === "draw") {
    AudioManager.playSound("draw");
    showMessage(randomLine(FINAL_JANKEN_IDLE_LINES), "is-result is-draw player-draw is-final-entry", { typewriter: true });
  } else if (result === "draw") {
    AudioManager.playSound("draw");
    const drawLine = state.chance
      ? randomLine(["あいこ！\nメダル 2ばい！", "メダル大！", "まだつづく！"])
      : randomLine(["あいこ！\nメダル 2ばい！", "もういっかい！", "ぴったり！"]);
    showMessage(drawLine, "is-result is-draw player-draw", { typewriter: true });
  } else {
    AudioManager.playSound(result);
    showMessage(resultText(result), `is-result is-${cpuMood} player-${result}`, { typewriter: true });
  }

  state.nextCallMode = result === "draw" ? "draw" : "normal";

  const roundEndsMatch = scoreChange.finalResolved || scoreChange.postTrueCompleted || state.win >= MATCH_POINT || state.lose >= MATCH_POINT;
  const resultPauseBase = roundEndsMatch
    ? 2300
    : scoreChange.chanceStarted
      ? 1850
      : scoreChange.warningStarted
        ? 1750
        : 1580;
  const resultPause = Math.round(resultPauseBase * RESULT_PAUSE_SCALE);

  await wait(resultPause);

  if (flowId !== state.flowId) {
    endPlayRoundTimer();
    return;
  }

  if (roundEndsMatch) {
    clearPendingChoice();
    if (scoreChange.postTrueCompleted) {
      await endPostTrueCompletion(scoreChange.postTrueCompleteResult || "lose", scoreChange);
    } else {
      endGame(scoreChange.finalResolved ? scoreChange.finalResult : state.win >= MATCH_POINT ? "win" : "lose");
    }
    endPlayRoundTimer();
    return;
  }

  state.busy = false;
  state.finalConfirmHand = null;
  setSelectedButton();
  setButtonsEnabled(true);

  if (!consumePendingChoice()) {
    updateCharacterByScore();
    showNextInputPrompt();
  }

  endPlayRoundTimer();
}

characterImage.addEventListener("error", useFallbackCharacter);
sceneCharacterImage.addEventListener("error", useFallbackSceneCharacter);
sceneIllustration.addEventListener("error", fallbackSceneIllustration);
startButton.addEventListener("click", startGame);
retryButton.addEventListener("click", restartMatch);
galleryButton?.addEventListener("click", openアルバム);
relationResetButton?.addEventListener("click", () => {
  resetアルバムProgress();
  updateアルバムButton();
  updateRelationResetButton();
  showTitle();
});
galleryCloseButton?.addEventListener("click", () => closeアルバム());
galleryPrevButton?.addEventListener("click", () => moveアルバム(-1));
galleryNextButton?.addEventListener("click", () => moveアルバム(1));
galleryImage?.addEventListener("click", replayTrueEndFromアルバム);
sceneOverlay?.addEventListener("pointerup", advanceSceneDialog);
sceneNextButton?.addEventListener("click", advanceSceneDialog);
document.addEventListener("keydown", handleKeyboardShortcut);
muteButton.addEventListener("click", () => {
  AudioManager.initAudio();
  if (trackDebugToggleTap()) {
    AudioManager.playSound("select");
    return;
  }

  AudioManager.toggleMute();
  AudioManager.playSound("select");
});

choiceButtons.forEach((button) => {
  const isLocked = () => isChoiceInputLocked(button);

  function cancelInputEvent(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  function activateFromPointer(event) {
    cancelInputEvent(event);

    if (isLocked()) {
      if (bufferChoiceInput(button.dataset.hand)) {
        button.classList.add("is-pressing");
        window.setTimeout(() => clearChoicePressState(button), 110);
      } else {
        clearChoicePressState(button);
      }
      return;
    }

    const now = performance.now();
    if (now - lastChoiceActivationAt < CHOICE_ACTIVATION_GUARD_MS) {
      return;
    }

    lastChoiceActivationAt = now;
    button.classList.add("is-pressing");
    handleChoiceButtonClick(button.dataset.hand);
  }

  button.addEventListener("pointerdown", activateFromPointer);

  button.addEventListener("pointerup", (event) => {
    cancelInputEvent(event);
    clearChoicePressState(button);
  });

  button.addEventListener("pointercancel", (event) => {
    cancelInputEvent(event);
    clearChoicePressState(button);
  });

  button.addEventListener("pointerleave", (event) => {
    if (event.buttons) {
      cancelInputEvent(event);
    }

    clearChoicePressState(button);
  });

  button.addEventListener("click", (event) => {
    const now = performance.now();
    if (now - lastChoiceActivationAt < CHOICE_POINTER_ACTIVATION_SUPPRESS_MS) {
      cancelInputEvent(event);
      return;
    }

    if (isLocked()) {
      bufferChoiceInput(button.dataset.hand);
      cancelInputEvent(event);
      return;
    }

    lastChoiceActivationAt = now;
    handleChoiceButtonClick(button.dataset.hand);
  });
});

document.querySelectorAll(".choice-hand-image").forEach((image) => {
  image.addEventListener(
    "error",
    () => {
      const button = image.closest(".choice");
      const hand = hands[button?.dataset.hand];
      if (hand) {
        image.replaceWith(document.createTextNode(hand.symbol));
      }
    },
    { once: true }
  );
});

useFallbackCharacter();
applyPerformanceModeClass();
preloadStartupAssets();
scheduleDelayedIdleTask(() => {
  preloadCharacterImages();
}, LOW_POWER_MODE ? 1200 : 700);
scheduleDelayedIdleTask(() => {
  if (!LOW_POWER_MODE) {
    preloadSceneImages();
  }
}, LOW_POWER_MODE ? 3500 : 1400);
setCharacter("normal");
function unlockAudioFromFirstGesture() {
  AudioManager.unlockAudio();
}

["pointerdown", "touchstart", "keydown"].forEach((eventName) => {
  document.addEventListener(eventName, unlockAudioFromFirstGesture, { once: true, passive: true });
});

AudioManager.loadMutedPreference();
if (!LOW_POWER_MODE) {
  scheduleDelayedIdleTask(() => {
    AudioManager.initAudio();
  }, 1800);
}
AudioManager.updateMuteButton();
if (galleryButton) {
  galleryButton.hidden = true;
  galleryButton.classList.remove("is-new");
}
updateアルバムButton();
if (DEBUG_MODE) {
  toggleDebugMode(true);
}
setButtonsEnabled(false);
updateScore();
