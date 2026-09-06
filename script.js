/* ============================================================
   UNWIND — script.js
   Vanilla JS. No frameworks. No build step.
   All screens, state, mini-games, and persistence live here.
   ============================================================ */

'use strict';

/* ════════════════════════════════════════════════════════════
   1. DATA — Questions, messages, mini-game content
════════════════════════════════════════════════════════════ */

const QUESTION_BANK = [
  {
    id: 'q1',
    type: 'mc',
    text: 'Which hormone floods your body during acute stress?',
    choices: ['Insulin', 'Cortisol', 'Melatonin', 'Serotonin'],
    answer: 1,   // index of correct choice
    explanation: 'Cortisol is your main stress hormone — helpful in short bursts, but rough when it stays elevated for weeks.'
  },
  {
    id: 'q2',
    type: 'mc',
    text: '"Fight, flight, or freeze" is controlled by which branch of your nervous system?',
    choices: ['Parasympathetic', 'Sympathetic', 'Enteric', 'Somatic'],
    answer: 1,
    explanation: 'The sympathetic nervous system is the gas pedal. The parasympathetic is the brake — breathing exercises activate it.'
  },
  {
    id: 'q3',
    type: 'mc',
    text: 'Which breathing pattern calms you down faster?',
    choices: ['Longer inhale', 'Equal inhale and exhale', 'Longer exhale', 'Holding your breath'],
    answer: 2,
    explanation: 'A longer exhale stimulates the vagus nerve and physically slows your heart rate. Try a 4-in, 6-out pattern anytime.'
  },
  {
    id: 'q4',
    type: 'mc',
    text: 'Box breathing uses which count for each phase?',
    choices: ['2-2-2-2', '3-3-3-3', '4-4-4-4', '5-5-5-5'],
    answer: 2,
    explanation: 'Four counts in, hold four, four out, hold four. It\'s used by athletes and military personnel to reset under pressure.'
  },
  {
    id: 'q5',
    type: 'mc',
    text: 'What is "eustress"?',
    choices: [
      'Stress caused by exams',
      'Positive stress that motivates you',
      'Chronic long-term stress',
      'Stress that causes physical pain'
    ],
    answer: 1,
    explanation: 'Not all stress is the enemy. Eustress is the energising kind — like excitement before a performance or a deadline that gets you moving.'
  },
  {
    id: 'q6',
    type: 'mc',
    text: 'Which sleep habit most helps regulate stress long-term?',
    choices: [
      'Sleeping 10+ hours every night',
      'Taking a nap every afternoon',
      'A consistent wake-up time each day',
      'Going to bed before 9pm'
    ],
    answer: 2,
    explanation: 'A consistent wake-up time anchors your circadian rhythm better than a consistent bedtime — even on weekends.'
  },
  {
    id: 'q7',
    type: 'mc',
    text: 'Caffeine\'s half-life is ~5–6 hours. A 4pm coffee means…',
    choices: [
      'It\'s fully gone by 7pm',
      'Half of it is still in you around 10pm',
      'It only affects you for one hour',
      'It helps you sleep better'
    ],
    answer: 1,
    explanation: 'Half-life means half remains after 5–6 hours. That 4pm coffee is still partly active at bedtime, disrupting sleep quality.'
  },
  {
    id: 'q8',
    type: 'mc',
    text: '"I failed one quiz, so I\'ll definitely fail out of school." This thinking pattern is called…',
    choices: ['Mindfulness', 'Catastrophizing', 'Reframing', 'Grounding'],
    answer: 1,
    explanation: 'Catastrophizing means jumping to the worst-case scenario. Noticing it is the first step to reframing it.'
  },
  {
    id: 'q9',
    type: 'mc',
    text: 'The 5-4-3-2-1 grounding technique works by engaging…',
    choices: ['Your memory', 'Your five senses', 'Your breathing only', 'Your imagination'],
    answer: 1,
    explanation: 'Noticing what you can see, touch, hear, smell, and taste pulls your attention into the present moment and out of anxious thoughts.'
  },
  {
    id: 'q10',
    type: 'mc',
    text: 'Research suggests procrastination is mostly a problem with…',
    choices: ['Poor time management', 'Laziness', 'Emotion regulation', 'Low intelligence'],
    answer: 2,
    explanation: 'Procrastination is usually about avoiding uncomfortable feelings, not managing time. Addressing the emotion first helps more than a better schedule.'
  },
  {
    id: 'q11',
    type: 'mc',
    text: 'The Pomodoro technique involves…',
    choices: [
      '10 minutes work, 10 minutes break',
      '25 minutes work, 5 minutes break',
      '50 minutes work, 20 minutes break',
      '1 hour work, 15 minutes break'
    ],
    answer: 1,
    explanation: 'Short focused sprints with built-in breaks reduce mental fatigue and make big tasks feel more manageable.'
  },
  {
    id: 'q12',
    type: 'mc',
    text: 'Progressive muscle relaxation asks you to…',
    choices: [
      'Stretch for 30 minutes',
      'Tense a muscle group, then release it',
      'Massage each muscle slowly',
      'Avoid moving until calm'
    ],
    answer: 1,
    explanation: 'Deliberately tensing then releasing muscle groups teaches your body the contrast between tension and relaxation — a powerful stress tool.'
  },
  {
    id: 'q13',
    type: 'mc',
    text: 'Doomscrolling when stressed…',
    choices: [
      'Always makes stress worse immediately',
      'Has no effect on stress levels',
      'Relieves stress short-term but increases it overall',
      'Is a healthy coping strategy'
    ],
    answer: 2,
    explanation: 'It feels soothing in the moment (novelty, distraction) but the content and passive posture tend to increase anxiety over time.'
  },
  {
    id: 'q14',
    type: 'type',
    text: 'Name one thing that is actually within your control when you\'re stressed about an exam.',
    keywords: ['sleep', 'start', 'help', 'breath', 'office', 'study', 'notes', 'schedule', 'ask', 'review', 'practice', 'eat', 'rest', 'plan', 'prepare'],
    explanation: 'Focusing on what you can control — like when you start studying or asking for help — reduces helplessness and builds momentum.'
  },
  {
    id: 'q15',
    type: 'type',
    text: 'In one sentence, describe a healthy way to respond when a friend says they\'re overwhelmed.',
    keywords: ['listen', 'hear', 'ask', 'support', 'there', 'help', 'care', 'check', 'talk', 'understand', 'feel', 'need', 'space', 'together'],
    explanation: 'Often the most helpful thing is simply listening and asking what they need — not rushing to fix it.'
  },
  {
    id: 'q16',
    type: 'type',
    text: 'Name one physical sign your body gives you when you\'re stressed.',
    keywords: ['heart', 'shoulder', 'jaw', 'breath', 'sweat', 'headache', 'stomach', 'tight', 'tense', 'shake', 'tremble', 'clench', 'chest', 'neck', 'fast', 'racing', 'nausea'],
    explanation: 'Physical stress signals are your body\'s early-warning system. Noticing them early gives you a chance to respond before stress escalates.'
  },
];

/* ── Varied encouragement messages (8+ each, no repeats within session) ── */
const CORRECT_MSGS = [
  '🌟 Yes! That\'s exactly right.',
  '💚 Nailed it! You\'re building real skills here.',
  '🎯 Spot on! Sunny is doing a little happy dance.',
  '✨ Right! That one\'s worth remembering.',
  '🦥 Sunny approves! Great thinking.',
  '💡 Correct! You\'re getting sharper every question.',
  '🌿 That\'s the one. Keep going!',
  '🔥 Right answer — and your streak is climbing!',
  '👏 Exactly! This stuff genuinely helps in real life.',
];

const WRONG_MSGS = [
  '💙 Not quite this time — here\'s the key idea:',
  '🌱 That one\'s tricky! Here\'s what to know:',
  '💛 Good try — this concept surprises a lot of people:',
  '🤍 Not this one, but that\'s okay. Here\'s why:',
  '🦥 Sunny says: every answer teaches you something!',
  '💜 Missed it — but now you\'ll remember it. Here\'s the reason:',
  '🌸 That\'s a common mix-up! Here\'s the distinction:',
  '☁️ Not quite — no worries. Here\'s the full picture:',
];

/* Track which messages have been used this session */
let usedCorrect = [];
let usedWrong   = [];

function pickMsg(arr, usedArr) {
  // Reset if all used
  if (usedArr.length >= arr.length) usedArr.length = 0;
  let idx;
  do { idx = Math.floor(Math.random() * arr.length); }
  while (usedArr.includes(idx));
  usedArr.push(idx);
  return arr[idx];
}

/* ── Sunny greeting pool ── */
const GREETINGS = [
  'Hey! Ready to unwind? 🌿',
  'Welcome back! Let\'s learn something useful.',
  'Good to see you. Your brain will thank you. 🧠',
  'Sunny\'s been waiting! Let\'s do this. 🦥',
  'Take a breath — you\'ve got this. 💚',
];

/* ── Reframe It content ── */
const REFRAME_SCENARIOS = [
  {
    thought: '"I completely blanked on that presentation. Everyone must think I\'m incompetent."',
    model: 'One rough moment doesn\'t define my ability. Everyone has off days, and I can learn from this one.'
  },
  {
    thought: '"I have so much to do I don\'t even know where to start. I\'m going to fail everything."',
    model: 'This feels overwhelming right now. I can pick just one small task to start, and the rest will feel more manageable.'
  },
  {
    thought: '"I\'m the only one who doesn\'t understand this. Everyone else gets it."',
    model: 'It\'s easy to assume others have it figured out, but most people have gaps too. Asking for help is a strength, not a weakness.'
  },
  {
    thought: '"I stayed up too late again. I have no self-control. I\'ll never get my life together."',
    model: 'One late night doesn\'t erase my progress. Tonight I can try a small change — like setting a phone-down reminder.'
  },
  {
    thought: '"I texted them three days ago and they haven\'t replied. They must hate me."',
    model: 'People get busy and distracted. Their silence is probably about their own life, not about me.'
  },
];

const REFRAME_SUNNY_RESPONSES = [
  'That\'s a genuinely thoughtful shift. 💚',
  'Look at that — you found a kinder perspective. 🌿',
  'That reframe took real effort. Sunny is proud. 🦥',
  'That\'s the kind of thinking that builds resilience over time. ✨',
  'You just did something your future self will thank you for. 💛',
];

/* ── 5-4-3-2-1 Grounding steps ── */
const GROUNDING_STEPS = [
  { icon: '👀', sense: 'See',   count: 5, prompt: 'Name 5 things you can see right now.' },
  { icon: '🖐️', sense: 'Touch', count: 4, prompt: 'Name 4 things you can physically feel or touch.' },
  { icon: '👂', sense: 'Hear',  count: 3, prompt: 'Name 3 things you can hear right now.' },
  { icon: '👃', sense: 'Smell', count: 2, prompt: 'Name 2 things you can smell, or two smells you like.' },
  { icon: '👅', sense: 'Taste', count: 1, prompt: 'Name 1 thing you can taste, or a taste you enjoy.' },
];

const GROUNDING_REFLECTIONS = [
  (ans) => `You noticed: "${ans}". Good — you\'re here. 🌿`,
  (ans) => `"${ans}" — your senses are anchoring you right now. 💚`,
  (ans) => `Nice. "${ans}" is real and present. That\'s the whole point. ✨`,
  (ans) => `"${ans}" — you\'re more grounded than you think. 🦥`,
  (ans) => `"${ans}" — and just like that, you\'re in the present moment. 🌱`,
];

/* ── Stress Myth Buster content ── */
const MYTH_STATEMENTS = [
  {
    statement: 'All stress is harmful and should be eliminated.',
    answer: 'myth',
    explanation: 'Some stress (eustress) is motivating and even healthy. The goal is managing it, not eliminating it.'
  },
  {
    statement: 'Deep, slow breathing can physically slow your heart rate.',
    answer: 'fact',
    explanation: 'Slow exhalation activates the vagus nerve, triggering a genuine physiological calming response.'
  },
  {
    statement: 'Procrastination is mainly caused by poor time management.',
    answer: 'myth',
    explanation: 'Research shows procrastination is mostly an emotion-regulation problem — we avoid tasks that feel bad.'
  },
  {
    statement: 'Exercise can reduce cortisol and other stress hormones in your body.',
    answer: 'fact',
    explanation: 'Physical activity metabolises stress hormones and releases endorphins that genuinely improve mood.'
  },
  {
    statement: 'Talking about your stress always makes it worse.',
    answer: 'myth',
    explanation: 'Sharing stress with a trusted person usually reduces it. Isolation tends to amplify anxious thinking.'
  },
];

/* ── Levels ── */
const LEVELS = [
  { name: 'Sprout',     emoji: '🌱', minXP: 0   },
  { name: 'Steady',     emoji: '🪴', minXP: 100 },
  { name: 'Grounded',   emoji: '🌳', minXP: 250 },
  { name: 'Anchored',   emoji: '⚓', minXP: 500 },
  { name: 'Zen',        emoji: '☯️', minXP: 800 },
  { name: 'Zen Master', emoji: '☯️✨', minXP: 1200 },
];

/* ════════════════════════════════════════════════════════════
   2. STATE — Everything the app needs to remember
════════════════════════════════════════════════════════════ */

/* Persistent state (saved to localStorage) */
let saved = {
  xp:              0,
  lessonsCompleted: 0,
  bestStreak:      0,
  miniGamesPlayed: [],   // array of game IDs
  lastPlayed:      null, // ISO date string
};

/* Session state (resets each lesson) */
let session = {
  questions:    [],   // shuffled subset of 10
  currentIndex: 0,
  score:        0,
  streak:       0,
  bestStreak:   0,
  xpEarned:     0,
  answered:     false,
};

/* ════════════════════════════════════════════════════════════
   3. PERSISTENCE — localStorage helpers
════════════════════════════════════════════════════════════ */

const STORAGE_KEY = 'unwind_v1';

function saveProgress() {
  saved.lastPlayed = new Date().toISOString();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
}

function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) saved = { ...saved, ...JSON.parse(raw) };
  } catch (e) {
    console.warn('Could not load saved progress:', e);
  }
}

function confirmReset() {
  if (window.confirm('Reset all progress? This cannot be undone.')) {
    localStorage.removeItem(STORAGE_KEY);
    saved = { xp: 0, lessonsCompleted: 0, bestStreak: 0, miniGamesPlayed: [], lastPlayed: null };
    closeSettings();
    updateHome();
    alert('Progress reset. Fresh start! 🌱');
  }
}

/* ════════════════════════════════════════════════════════════
   4. SCREEN ROUTER — show/hide screens with a crossfade
════════════════════════════════════════════════════════════ */

function goTo(screenId) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const target = document.getElementById(screenId);
  if (target) {
    // Tiny delay so the CSS transition fires properly
    requestAnimationFrame(() => {
      requestAnimationFrame(() => target.classList.add('active'));
    });
  }
}

/* ════════════════════════════════════════════════════════════
   5. HOME SCREEN
════════════════════════════════════════════════════════════ */

function getLevelIndex(xp) {
  let lvl = 0;
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (xp >= LEVELS[i].minXP) { lvl = i; break; }
  }
  return lvl;
}

function updateHome() {
  const lvlIdx  = getLevelIndex(saved.xp);
  const level   = LEVELS[lvlIdx];
  const nextLvl = LEVELS[lvlIdx + 1];

  // XP ring
  const circumference = 326.7;
  let pct = 0;
  if (nextLvl) {
    pct = (saved.xp - level.minXP) / (nextLvl.minXP - level.minXP);
    pct = Math.min(1, Math.max(0, pct));
  } else {
    pct = 1; // max level
  }
  const offset = circumference - pct * circumference;
  document.getElementById('ring-fill').style.strokeDashoffset = offset;

  // Text fields
  document.getElementById('home-xp').textContent         = saved.xp;
  document.getElementById('home-level-emoji').textContent = level.emoji;
  document.getElementById('home-level-name').textContent  = level.name;
  document.getElementById('home-lessons').textContent     = saved.lessonsCompleted;
  document.getElementById('home-streak').textContent      = saved.bestStreak;
  document.getElementById('home-games').textContent       = saved.miniGamesPlayed.length;

  if (nextLvl) {
    document.getElementById('home-xp-label').textContent =
      `${saved.xp} / ${nextLvl.minXP} XP to ${nextLvl.name}`;
  } else {
    document.getElementById('home-xp-label').textContent = 'Max level reached! 🎉';
  }

  // Sunny greeting
  document.getElementById('home-greeting').textContent =
    GREETINGS[Math.floor(Math.random() * GREETINGS.length)];
}

/* ════════════════════════════════════════════════════════════
   6. SETTINGS
════════════════════════════════════════════════════════════ */

document.getElementById('settings-btn').addEventListener('click', () => {
  document.getElementById('settings-overlay').classList.remove('hidden');
});

function closeSettings() {
  document.getElementById('settings-overlay').classList.add('hidden');
}

// Close overlay when clicking outside the card
document.getElementById('settings-overlay').addEventListener('click', (e) => {
  if (e.target === document.getElementById('settings-overlay')) closeSettings();
});

/* ════════════════════════════════════════════════════════════
   7. LESSON ENGINE
════════════════════════════════════════════════════════════ */

function shuffle(arr) {
  // Fisher-Yates shuffle — returns a new shuffled array
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function startLesson() {
  // Reset session
  session = {
    questions:    shuffle(QUESTION_BANK).slice(0, 10),
    currentIndex: 0,
    score:        0,
    streak:       0,
    bestStreak:   0,
    xpEarned:     0,
    answered:     false,
  };
  usedCorrect = [];
  usedWrong   = [];

  goTo('screen-lesson');
  renderQuestion();
}

function exitLesson() {
  if (window.confirm('Leave this lesson? Your progress will be lost.')) {
    goTo('screen-home');
    updateHome();
  }
}

function renderQuestion() {
  const q = session.questions[session.currentIndex];
  session.answered = false;

  // Progress bar
  const pct = (session.currentIndex / 10) * 100;
  document.getElementById('lesson-progress-fill').style.width = pct + '%';
  document.getElementById('lesson-progress-bar-wrap').setAttribute('aria-valuenow', session.currentIndex);

  // Counter + streak
  document.getElementById('q-counter').textContent =
    `${session.currentIndex + 1} / 10`;
  document.getElementById('lesson-streak-num').textContent = session.streak;

  // Question text
  document.getElementById('q-text').textContent = q.text;

  // Clear feedback
  const feedbackZone = document.getElementById('feedback-zone');
  feedbackZone.classList.add('hidden');
  document.getElementById('feedback-banner').textContent      = '';
  document.getElementById('feedback-banner').className        = 'feedback-banner';
  document.getElementById('feedback-explanation').textContent = '';

  // Sunny inline message (clear between questions)
  document.getElementById('lesson-sunny-msg').textContent = '';

  // Show correct input type
  const mcWrap   = document.getElementById('mc-choices');
  const typeWrap = document.getElementById('type-wrap');

  if (q.type === 'mc') {
    typeWrap.classList.add('hidden');
    mcWrap.innerHTML = '';
    const letters = ['A', 'B', 'C', 'D'];
    q.choices.forEach((choice, i) => {
      const btn = document.createElement('button');
      btn.className = 'choice-btn';
      btn.setAttribute('aria-label', `Choice ${letters[i]}: ${choice}`);
      btn.innerHTML = `<span class="choice-letter">${letters[i]}</span>${choice}`;
      btn.addEventListener('click', () => answerMC(i));
      mcWrap.appendChild(btn);
    });
  } else {
    mcWrap.innerHTML = '';
    typeWrap.classList.remove('hidden');
    const input = document.getElementById('type-input');
    input.value = '';
    input.className = 'type-input';
    input.disabled = false;
    document.getElementById('type-submit-btn').disabled = false;
    // Allow Enter key to submit (Shift+Enter for new line)
    input.onkeydown = (e) => {
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); submitTyped(); }
    };
    setTimeout(() => input.focus(), 300);
  }
}

/* ── Multiple choice answer ── */
function answerMC(chosenIndex) {
  if (session.answered) return;
  session.answered = true;

  const q    = session.questions[session.currentIndex];
  const btns = document.querySelectorAll('.choice-btn');

  // Lock all buttons
  btns.forEach(b => b.disabled = true);

  const isCorrect = chosenIndex === q.answer;
  btns[q.answer].classList.add('correct');
  if (!isCorrect) btns[chosenIndex].classList.add('wrong');

  showFeedback(isCorrect, q.explanation);
}

/* ── Type-answer submission ── */
function submitTyped() {
  if (session.answered) return;
  const input = document.getElementById('type-input');
  const val   = input.value.trim().toLowerCase();
  if (!val) return;

  session.answered = true;
  input.disabled = true;
  document.getElementById('type-submit-btn').disabled = true;

  const q         = session.questions[session.currentIndex];
  const isCorrect = q.keywords.some(kw => val.includes(kw));

  input.classList.add(isCorrect ? 'correct' : 'wrong');

  // Personalise feedback with what they typed
  const personalised = isCorrect
    ? `"${input.value.trim()}" — yes, exactly. `
    : `Thanks for trying — here's the fuller picture. `;

  showFeedback(isCorrect, personalised + q.explanation);
}

/* ── Shared feedback renderer ── */
function showFeedback(isCorrect, explanation) {
  const q = session.questions[session.currentIndex];

  if (isCorrect) {
    session.score++;
    session.streak++;
    session.xpEarned += 10;
    session.bestStreak = Math.max(session.bestStreak, session.streak);

    // Pulse the streak number
    const numEl = document.getElementById('lesson-streak-num');
    numEl.textContent = session.streak;
    numEl.classList.remove('pulse');
    void numEl.offsetWidth; // force reflow
    numEl.classList.add('pulse');
    setTimeout(() => numEl.classList.remove('pulse'), 300);

    checkStreakMilestone(session.streak);
  } else {
    session.streak = 0;
    document.getElementById('lesson-streak-num').textContent = 0;
  }

  // Sunny message
  const sunnyMsg = isCorrect
    ? pickMsg(CORRECT_MSGS, usedCorrect)
    : pickMsg(WRONG_MSGS,   usedWrong);
  document.getElementById('lesson-sunny-msg').textContent = '🦥 ' + sunnyMsg.replace(/^[^\s]+\s/, '');

  // Feedback banner
  const banner = document.getElementById('feedback-banner');
  banner.textContent = sunnyMsg;
  banner.className   = 'feedback-banner ' + (isCorrect ? 'correct' : 'wrong');

  document.getElementById('feedback-explanation').textContent = explanation;

  const feedbackZone = document.getElementById('feedback-zone');
  feedbackZone.classList.remove('hidden');
}

/* ── Advance to next question ── */
function nextQuestion() {
  session.currentIndex++;
  if (session.currentIndex >= 10) {
    finishLesson();
  } else {
    renderQuestion();
  }
}

/* ── Streak milestone celebrations ── */
function checkStreakMilestone(streak) {
  if (streak === 3) {
    showToast('🔥 3 in a row! +5 XP bonus!');
    session.xpEarned += 5;
  } else if (streak === 5) {
    showToast('🎉 5 in a row! +10 XP bonus!');
    session.xpEarned += 10;
    launchConfetti();
  } else if (streak === 10) {
    showToast('🏆 PERFECT RUN! 10 in a row! +25 XP!');
    session.xpEarned += 25;
    launchConfetti();
  }
}

/* ════════════════════════════════════════════════════════════
   8. RESULTS SCREEN
════════════════════════════════════════════════════════════ */

function finishLesson() {
  const prevXP  = saved.xp;
  const prevLvl = getLevelIndex(prevXP);

  // Commit XP
  saved.xp += session.xpEarned;
  saved.lessonsCompleted++;
  saved.bestStreak = Math.max(saved.bestStreak, session.bestStreak);
  saveProgress();

  const newLvl  = getLevelIndex(saved.xp);
  const accuracy = Math.round((session.score / 10) * 100);

  // Populate results screen
  document.getElementById('results-score-big').textContent =
    `${session.score} / 10`;
  document.getElementById('res-xp-earned').textContent  = `+${session.xpEarned}`;
  document.getElementById('res-streak').textContent     = session.bestStreak;
  document.getElementById('res-accuracy-pct').textContent = accuracy + '%';
  document.getElementById('res-xp-total').textContent   = saved.xp;

  // Headline + Sunny message
  const headlines = [
    'Lesson complete! 🌿',
    'You did it! ✨',
    'Session done! 💚',
  ];
  document.getElementById('results-headline').textContent =
    headlines[Math.floor(Math.random() * headlines.length)];

  const sunnyResults = [
    'Every question you answered is a real skill you\'re building. 🦥',
    'Showing up for yourself today takes courage. 💚',
    'This stuff actually works in real life. Keep going. 🌿',
    'Sunny is genuinely proud of you right now. 🦥✨',
  ];
  document.getElementById('results-sunny-msg').textContent =
    sunnyResults[Math.floor(Math.random() * sunnyResults.length)];

  // Accuracy bar (animate after a short delay so transition fires)
  setTimeout(() => {
    document.getElementById('res-accuracy-bar').style.width = accuracy + '%';
  }, 100);

  // Level-up banner
  const banner = document.getElementById('levelup-banner');
  if (newLvl > prevLvl) {
    const newLevel = LEVELS[newLvl];
    document.getElementById('levelup-emoji').textContent = newLevel.emoji;
    document.getElementById('levelup-msg').textContent =
      `You reached ${newLevel.name}! ${newLevel.emoji}`;
    banner.classList.remove('hidden');
    launchConfetti();
  } else {
    banner.classList.add('hidden');
  }

  goTo('screen-results');
  updateHome();
}

/* ════════════════════════════════════════════════════════════
   9. MINI-GAMES — XP award helper
════════════════════════════════════════════════════════════ */

function awardMiniGame(gameId) {
  // Only award XP once per game per save state
  // (remove this guard if you want unlimited replays to earn XP)
  if (!saved.miniGamesPlayed.includes(gameId)) {
    saved.xp += 25;
    saved.miniGamesPlayed.push(gameId);
    saveProgress();
    updateHome();
    showToast(`+25 XP earned! 🌟`);
  } else {
    showToast('Already earned XP for this one! 🦥');
  }
}

/* ════════════════════════════════════════════════════════════
   10. BOX BREATHING
════════════════════════════════════════════════════════════ */

const BREATH_PHASES = [
  { label: 'Inhale',     color: '#6B9080', duration: 4 },
  { label: 'Hold',       color: '#E8A33D', duration: 4 },
  { label: 'Exhale',     color: '#5B8A9A', duration: 4 },
  { label: 'Hold',       color: '#E8A33D', duration: 4 },
];

let breathState = {
  running:    false,
  round:      0,
  phaseIndex: 0,
  count:      0,
  intervalId: null,
  timeoutId:  null,
};

function startBreathing() {
  document.getElementById('breath-start-btn').style.display = 'none';
  document.getElementById('breath-done').classList.add('hidden');
  breathState = { running: true, round: 0, phaseIndex: 0, count: 0, intervalId: null, timeoutId: null };
  runBreathPhase();
}

function stopBreathing() {
  breathState.running = false;
  clearInterval(breathState.intervalId);
  clearTimeout(breathState.timeoutId);
  // Reset UI for next visit
  document.getElementById('breath-start-btn').style.display = '';
  document.getElementById('breath-done').classList.add('hidden');
  const ring = document.getElementById('breath-ring');
  ring.style.transition = 'none';
  ring.style.strokeDashoffset = '565.5';
}

function runBreathPhase() {
  if (!breathState.running) return;

  const phase = BREATH_PHASES[breathState.phaseIndex];
  const ring  = document.getElementById('breath-ring');
  const circumference = 565.5;

  // Update labels
  document.getElementById('breath-phase-text').textContent = phase.label;
  document.getElementById('breath-round-label').textContent =
    `Round ${breathState.round + 1} of 4`;
  ring.style.stroke = phase.color;

  // Animate ring: inhale = fill, exhale = empty, hold = no change
  ring.style.transition = 'none';
  if (phase.label === 'Inhale') {
    ring.style.strokeDashoffset = circumference.toString();
    requestAnimationFrame(() => requestAnimationFrame(() => {
      ring.style.transition = `stroke-dashoffset ${phase.duration}s linear`;
      ring.style.strokeDashoffset = '0';
    }));
  } else if (phase.label === 'Exhale') {
    ring.style.strokeDashoffset = '0';
    requestAnimationFrame(() => requestAnimationFrame(() => {
      ring.style.transition = `stroke-dashoffset ${phase.duration}s linear`;
      ring.style.strokeDashoffset = circumference.toString();
    }));
  }
  // For Hold phases, ring stays where it is

  // Countdown
  breathState.count = phase.duration;
  document.getElementById('breath-count-text').textContent = breathState.count;

  breathState.intervalId = setInterval(() => {
    breathState.count--;
    document.getElementById('breath-count-text').textContent = Math.max(0, breathState.count);
    if (breathState.count <= 0) {
      clearInterval(breathState.intervalId);
      advanceBreathPhase();
    }
  }, 1000);
}

function advanceBreathPhase() {
  if (!breathState.running) return;
  breathState.phaseIndex++;
  if (breathState.phaseIndex >= BREATH_PHASES.length) {
    breathState.phaseIndex = 0;
    breathState.round++;
    if (breathState.round >= 4) {
      // Done!
      breathState.running = false;
      document.getElementById('breath-done').classList.remove('hidden');
      return;
    }
  }
  breathState.timeoutId = setTimeout(runBreathPhase, 400);
}

/* ════════════════════════════════════════════════════════════
   11. REFRAME IT
════════════════════════════════════════════════════════════ */

let currentReframe = null;

function initReframe() {
  currentReframe = REFRAME_SCENARIOS[Math.floor(Math.random() * REFRAME_SCENARIOS.length)];
  document.getElementById('reframe-thought').textContent = currentReframe.thought;
  document.getElementById('reframe-input').value = '';
  document.getElementById('reframe-input').className = 'type-input';
  document.getElementById('reframe-input').disabled = false;
  document.getElementById('reframe-submit-btn').disabled = false;
  document.getElementById('reframe-result').classList.add('hidden');
}

function submitReframe() {
  const val = document.getElementById('reframe-input').value.trim();
  if (val.length < 8) {
    document.getElementById('reframe-input').style.borderColor = 'var(--coral)';
    return;
  }

  document.getElementById('reframe-input').disabled = true;
  document.getElementById('reframe-submit-btn').disabled = true;

  // Sunny response
  const msg = REFRAME_SUNNY_RESPONSES[Math.floor(Math.random() * REFRAME_SUNNY_RESPONSES.length)];
  document.getElementById('reframe-sunny-msg').textContent = msg;
  document.getElementById('reframe-model').textContent = currentReframe.model;
  document.getElementById('reframe-result').classList.remove('hidden');
}

/* ════════════════════════════════════════════════════════════
   12. 5-4-3-2-1 GROUNDING
════════════════════════════════════════════════════════════ */

let groundingIndex = 0;

function initGrounding() {
  groundingIndex = 0;
  renderGroundingStep();
  document.getElementById('grounding-done').classList.add('hidden');
  document.getElementById('grounding-next-btn').style.display = '';
  renderGroundingDots();
}

function renderGroundingStep() {
  const step = GROUNDING_STEPS[groundingIndex];
  document.getElementById('grounding-icon').textContent   = step.icon;
  document.getElementById('grounding-prompt').textContent = step.prompt;
  document.getElementById('grounding-input').value        = '';
  document.getElementById('grounding-input').disabled     = false;
  document.getElementById('grounding-input').className    = 'type-input';
  document.getElementById('grounding-reflection').classList.add('hidden');
  document.getElementById('grounding-reflection').textContent = '';
  setTimeout(() => document.getElementById('grounding-input').focus(), 300);
}

function renderGroundingDots() {
  const wrap = document.getElementById('grounding-dots');
  wrap.innerHTML = '';
  GROUNDING_STEPS.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.className = 'dot';
    if (i < groundingIndex)  dot.classList.add('done');
    if (i === groundingIndex) dot.classList.add('current');
    wrap.appendChild(dot);
  });
}

function groundingNext() {
  const input = document.getElementById('grounding-input');
  const val   = input.value.trim();
  if (!val) {
    input.style.borderColor = 'var(--coral)';
    input.placeholder = 'Please write something first…';
    return;
  }

  // Show warm reflection
  const reflFn = GROUNDING_REFLECTIONS[groundingIndex % GROUNDING_REFLECTIONS.length];
  const refl   = document.getElementById('grounding-reflection');
  refl.textContent = reflFn(val);
  refl.classList.remove('hidden');
  input.disabled = true;

  // Short pause before moving on
  setTimeout(() => {
    groundingIndex++;
    if (groundingIndex >= GROUNDING_STEPS.length) {
      document.getElementById('grounding-next-btn').style.display = 'none';
      document.getElementById('grounding-done').classList.remove('hidden');
    } else {
      renderGroundingStep();
      renderGroundingDots();
    }
  }, 1200);
}

/* ════════════════════════════════════════════════════════════
   13. STRESS MYTH BUSTER
════════════════════════════════════════════════════════════ */

let mythAnsweredCount = 0;

function initMyth() {
  mythAnsweredCount = 0;
  document.getElementById('myth-done').classList.add('hidden');
  const wrap = document.getElementById('myth-cards-wrap');
  wrap.innerHTML = '';

  MYTH_STATEMENTS.forEach((item, idx) => {
    const card = document.createElement('div');
    card.className = 'myth-card';
    card.id = `myth-card-${idx}`;

    card.innerHTML = `
      <p class="myth-statement">${item.statement}</p>
      <div class="myth-btn-row">
        <button class="myth-btn" onclick="answerMyth(${idx}, 'myth')">🚫 Myth</button>
        <button class="myth-btn" onclick="answerMyth(${idx}, 'fact')">✅ Fact</button>
      </div>
      <p class="myth-explanation" id="myth-exp-${idx}"></p>
    `;
    wrap.appendChild(card);
  });
}

function answerMyth(idx, chosen) {
  const item    = MYTH_STATEMENTS[idx];
  const card    = document.getElementById(`myth-card-${idx}`);
  const btns    = card.querySelectorAll('.myth-btn');
  const expEl   = document.getElementById(`myth-exp-${idx}`);
  const isCorrect = chosen === item.answer;

  // Lock buttons and colour them
  btns.forEach(b => b.disabled = true);
  const mythBtn = btns[0]; // "Myth" button
  const factBtn = btns[1]; // "Fact" button

  if (item.answer === 'myth') {
    mythBtn.classList.add('correct');
    if (!isCorrect) factBtn.classList.add('wrong');
  } else {
    factBtn.classList.add('correct');
    if (!isCorrect) mythBtn.classList.add('wrong');
  }

  card.classList.add(isCorrect ? 'revealed-correct' : 'revealed-wrong');

  // Show explanation
  expEl.textContent = (isCorrect ? '✓ ' : '💙 ') + item.explanation;
  expEl.classList.add('visible');

  mythAnsweredCount++;
  if (mythAnsweredCount >= MYTH_STATEMENTS.length) {
    setTimeout(() => {
      document.getElementById('myth-done').classList.remove('hidden');
    }, 600);
  }
}

/* ════════════════════════════════════════════════════════════
   14. STREAK TOAST
════════════════════════════════════════════════════════════ */

let toastTimer = null;

function showToast(message) {
  const toast = document.getElementById('streak-toast');
  toast.textContent = message;
  toast.classList.add('visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('visible'), 2800);
}

/* ════════════════════════════════════════════════════════════
   15. CONFETTI — lightweight canvas burst, no libraries
════════════════════════════════════════════════════════════ */

function launchConfetti() {
  const canvas = document.getElementById('confetti-canvas');
  const ctx    = canvas.getContext('2d');

  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;

  // Palette matches the app
  const colors = ['#6B9080','#E8A33D','#D98E7A','#A8C5B5','#F5D49A','#FAF7F2'];

  const pieces = Array.from({ length: 130 }, () => ({
    x:     Math.random() * canvas.width,
    y:     Math.random() * -canvas.height * 0.5,
    r:     Math.random() * 7 + 3,
    d:     Math.random() * 80 + 60,
    color: colors[Math.floor(Math.random() * colors.length)],
    tilt:  Math.random() * 10 - 5,
    tiltAngle:      0,
    tiltAngleSpeed: Math.random() * 0.07 + 0.02,
  }));

  let frame = 0;

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pieces.forEach(p => {
      p.tiltAngle += p.tiltAngleSpeed;
      p.y += Math.cos(frame / p.d) + 1.8;
      p.x += Math.sin(frame / 50) * 0.9;
      p.tilt = Math.sin(p.tiltAngle) * 14;

      ctx.beginPath();
      ctx.lineWidth   = p.r;
      ctx.strokeStyle = p.color;
      ctx.moveTo(p.x + p.tilt + p.r / 2, p.y);
      ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r / 2);
      ctx.stroke();
    });
    frame++;
    if (frame < 220) {
      requestAnimationFrame(draw);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  requestAnimationFrame(draw);
}

/* ════════════════════════════════════════════════════════════
   16. INIT — runs when the page loads
════════════════════════════════════════════════════════════ */

(function init() {
  loadProgress();
  updateHome();
  goTo('screen-home');
})();
