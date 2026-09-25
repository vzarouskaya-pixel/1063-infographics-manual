/* ================================================================
   ТЕСТЫ: проверка ответа на вопрос
   ================================================================ */
function checkAnswer(button, isCorrect) {
    const parent = button.parentElement;
    parent.querySelectorAll('.quiz-option').forEach(btn => {
        btn.classList.remove('correct', 'wrong');
        btn.disabled = true;
    });

    if (isCorrect) {
        button.classList.add('correct');
    } else {
        button.classList.add('wrong');
        parent.querySelectorAll('.quiz-option').forEach(btn => {
            if (btn.getAttribute('onclick').includes('true')) {
                btn.classList.add('correct');
            }
        });
    }
}

/* ================================================================
   ПОИСК ПО САЙТУ
   ================================================================
   Живой фильтр по ключевым словам. Работает без сервера.
   Поддерживает поиск технических терминов и латиницей, и кириллицей.
   ================================================================ */

const searchIndex = [
    // ===== Раздел 1: Общие правила =====
    { title: "Общие правила: язык и алфавит", page: "tz.html", anchor: "#sec-1", keywords: "кириллица латиница алфавит язык пул правило большинства умлады иероглифы арабский хинди" },
    { title: "Как определять алфавит", page: "tz.html", anchor: "#sec-1", keywords: "правило большинства буквы алфавит клавиатура раскладка українській müxtəlif" },

    // ===== Раздел 2: Критерии отбора =====
    { title: "Что такое инфографика", page: "tz.html", anchor: "#sec-2", keywords: "инфографика определение визуализация данные структура блоки связанность наглядность график схема" },
    { title: "Что НЕ является инфографикой", page: "tz.html", anchor: "#sec-2", keywords: "мем реклама постер сплошной текст фотография плашка не берём юмор открытка" },
    { title: "Идеальный контент для сбора", page: "tz.html", anchor: "#sec-2", keywords: "многоуровневая структура смешение модальностей плотность композиция форматы стили языки баланс текста связи" },

    // ===== Раздел 3: Технические требования =====
    { title: "Качество и разрешение", page: "tz.html", anchor: "#sec-3", keywords: "1080 пикселей читаемость артефакты сжатие блочность шум размытие пикселизация блюр" },
    { title: "Композиция и кадрирование", page: "tz.html", anchor: "#sec-3", keywords: "чистота кадра водяные знаки вотермарка рамки обрезка целостность контекст скриншот рендер" },
    { title: "Горизонт и ориентация", page: "tz.html", anchor: "#sec-3", keywords: "горизонтальная вертикальная ориентация наклон поля отступы рамки" },
    { title: "Контраст и читаемость", page: "tz.html", anchor: "#sec-3", keywords: "контраст фон текст читаемость серый светло-серый" },
    { title: "Требования к фотографии", page: "tz.html", anchor: "#sec-3", keywords: "освещение блики тени дисторсия бочка подушка объектив" },
    { title: "Формат файла", page: "tz.html", anchor: "#sec-3", keywords: "PNG JPEG JPG формат сохранение" },

    // ===== Раздел 4: Артефакты =====
    { title: "Критичные артефакты", page: "tz.html", anchor: "#sec-4", keywords: "распад цвета блочность критично брак чек-лист сразу в артефакт" },
    { title: "Пять критериев оценки шума", page: "tz.html", anchor: "#sec-4", keywords: "критичность расположение процент площади контрастность яркость монитор шум полосатость 20 процентов" },
    { title: "Список недопустимых артефактов", page: "tz.html", anchor: "#sec-4", keywords: "постпродакшн вотермарка рамки айдентика пятна пленка пыль матрица коллаж фокус шум пикселизация ИИ генерация экспозиция нечитаемый" },

    // ===== Раздел 5: Категории инфографики =====
    { title: "Графики и диаграммы данных", page: "tz.html", anchor: "#sec-5", keywords: "столбчатая линейная круговая точечная диаграмма bar line pie scatter таблица график дашборд" },
    { title: "Схемы процессов и структур", page: "tz.html", anchor: "#sec-5", keywords: "блок-схема flowchart пайплайн pipeline орг структура org chart дерево" },
    { title: "Mind maps, roadmaps, инструкции", page: "tz.html", anchor: "#sec-5", keywords: "mind map roadmap concept map интеллект-карта пошаговая инструкция гайд граф зависимостей dependency" },
    { title: "Презентационные слайды", page: "tz.html", anchor: "#sec-5", keywords: "title bullets слайды буллиты презентация бизнес образовательная mission statement" },
    { title: "Плакаты и лонгриды", page: "tz.html", anchor: "#sec-5", keywords: "плакат one-pager лонгрид вертикальный постер пояснительное полотно" },
    { title: "Таблицы и сравнения", page: "tz.html", anchor: "#sec-5", keywords: "сравнительная таблица матрица характеристик pros cons за и против comparison" },
    { title: "Инструкции и гайды", page: "tz.html", anchor: "#sec-5", keywords: "инструкция пошаговый гайд техническая схема сборка установка медицинская бытовая производственная how-to" },
    { title: "Навигационные схемы", page: "tz.html", anchor: "#sec-5", keywords: "метро помещения локации карта yandex google maps subway room location" },
    { title: "Чек-листы с визуальной структурой", page: "tz.html", anchor: "#sec-5", keywords: "чек-лист structured checklists визуальная структура safe unsafe" },

    // ===== Раздел 6: Пошаговая инструкция =====
    { title: "Шаг 1. Определение типа инфографики", page: "tz.html", anchor: "#sec-6", keywords: "шаг 1 тип пул название инфографика определить" },
    { title: "Шаг 2. Поиск источника", page: "tz.html", anchor: "#sec-6", keywords: "шаг 2 источник поиск изображений" },
    { title: "Шаг 3. Сохранение изображения", page: "tz.html", anchor: "#sec-6", keywords: "шаг 3 сохранение качество оригинал обрезка размер" },
    { title: "Шаг 4. Загрузка и заполнение", page: "tz.html", anchor: "#sec-6", keywords: "шаг 4 загрузка платформа вопросы категория подкатегория тема предметная область алфавит согласованность понятность насыщенность числа таблица график стрелки последовательность секции смешение брендирование" },

    // ===== Раздел 7: Примеры =====
    { title: "Примеры разметки", page: "examples.html", anchor: "", keywords: "пример видеореклама россия панама canal chicken rolls разметка кейс" },

    // ===== Разделы страницы Примеры =====
    { title: "Что НЕ берём — контрпримеры", page: "examples.html", anchor: "#ex-no", keywords: "мем реклама постер сплошной текст не берём контрпример" },
    { title: "Что берём — примеры", page: "examples.html", anchor: "#ex-ok", keywords: "берём примеры roadmap caldo бизнес-слайд" },
    { title: "Разобранные кейсы", page: "examples.html", anchor: "#ex-cases", keywords: "кейс видеореклама панама chicken rolls разбор" },
    { title: "Примеры по категориям", page: "examples.html", anchor: "#ex-categories", keywords: "категории примеры диаграммы схемы mind map слайды плакаты таблицы инструкции навигация чек-листы" },
    { title: "Брендирование", page: "examples.html", anchor: "#ex-branding", keywords: "брендирование логотип фирменный стиль freepik альфа-банк" },

    // ===== Частые ошибки (страница errors.html) =====
    { title: "Вид 1: Плохое качество инфографики", page: "errors.html", anchor: "#err-1", keywords: "ошибка качество плохое разрешение 1080 пикселизация размытие" },
    { title: "Вид 2: Мелкий нечитаемый текст", page: "errors.html", anchor: "#err-2", keywords: "ошибка мелкий текст нечитаемый при 100% читаемость" },
    { title: "Вид 3: Прозрачный фон в PNG", page: "errors.html", anchor: "#err-3", keywords: "ошибка png прозрачный фон альфа рамка коллаж белый чёрный" },
    { title: "Вид 4: Неверный язык пула + вотермарка", page: "errors.html", anchor: "#err-4", keywords: "ошибка язык пула кириллица украинский немецкий не тот язык вотермарка" },
    { title: "Вид 5: Вотермарки", page: "errors.html", anchor: "#err-5", keywords: "ошибка вотермарка водяной знак авторство почты защита запрещено артефакт" },
    { title: "Вид 6: Генерации ИИ", page: "errors.html", anchor: "#err-6", keywords: "ошибка ии нейросеть генерация слипшийся текст искажённый тг" },
    { title: "Вид 7: Спорное качество, низкая комплексность", page: "errors.html", anchor: "#err-7", keywords: "ошибка спорное качество низкая комплексность не берём" },
    { title: "Вид 8: Сильная блочность", page: "errors.html", anchor: "#err-8", keywords: "ошибка блочность блоки сжатие не подходит" },
    { title: "Вид 9: Снимок экрана: пикселизация, блочность", page: "errors.html", anchor: "#err-9", keywords: "ошибка снимок экрана пикселизация блочность плохое качество комплексность" },
    { title: "Вид 10: Сильная постеризация, блочность", page: "errors.html", anchor: "#err-10", keywords: "ошибка постеризация блочность плохое качество" },
    { title: "Вид 11: Плохое качество, нечёткий текст, рамки", page: "errors.html", anchor: "#err-11", keywords: "ошибка плохое качество нечёткий текст рамки апгрейд лессенка" },
    { title: "Вид 12: Блочность, низкое качество, нечитаемый текст", page: "errors.html", anchor: "#err-12", keywords: "ошибка блочность низкое качество нечитаемый текст" },
    { title: "Вид 13: Сильная мыльность, пикселизация", page: "errors.html", anchor: "#err-13", keywords: "ошибка мыльность пикселизация плохое качество" },
    { title: "Вид 14: Сильная постеризация, очень плохое качество", page: "errors.html", anchor: "#err-14", keywords: "ошибка постеризация очень плохое качество" },
    { title: "Вид 15: Неорганичный коллаж, скучная инфографика", page: "errors.html", anchor: "#err-15", keywords: "ошибка коллаж неорганичный скучная инфографика" }
];/* ---------- Нормализация латиницы ↔ кириллицы ----------
   Позволяет искать CC08 и СС08 (кириллицей), DPD и ДПД,
   U2U и U2U (в обоих алфавитах) и т.д.
   Применяется ТОЛЬКО к коротким строкам, чтобы не портить
   обычные русские слова (например, «срок»).
---------------------------------------------------------- */
const CYR_TO_LAT_MAP = {
    'с': 'c', 'а': 'a', 'е': 'e', 'о': 'o', 'р': 'p',
    'х': 'x', 'у': 'y', 'к': 'k', 'в': 'b', 'н': 'h',
    'м': 'm', 'т': 't'
};

function normalizeShort(str) {
    return str.replace(/[саеорхуквнмт]/g, ch => CYR_TO_LAT_MAP[ch] || ch);
}

/* Приводит строку к виду, пригодному для сравнения:
   - нижний регистр
   - убирает лишние пробелы
   - для коротких строк (≤ 6 символов) нормализует кириллицу */
function makeSearchString(str) {
    const cleaned = str.toLowerCase().trim().replace(/\s+/g, ' ');
    if (cleaned.length <= 6) {
        return normalizeShort(cleaned);
    }
    return cleaned;
}

function initSearch() {
    const input = document.getElementById('site-search');
    const results = document.getElementById('search-results');
    if (!input || !results) return;

    // Заранее готовим нормализованные ключи для всех элементов индекса
    const preparedIndex = searchIndex.map(item => ({
        ...item,
        _titleNorm: makeSearchString(item.title),
        _keywordsNorm: makeSearchString(item.keywords),
        _titleRaw: item.title.toLowerCase(),
        _keywordsRaw: item.keywords.toLowerCase()
    }));

    input.addEventListener('input', () => {
        const raw = input.value.trim();
        const q = makeSearchString(raw);
        const qRaw = raw.toLowerCase().trim().replace(/\s+/g, ' ');

        results.innerHTML = '';

        if (q.length < 2) {
            results.classList.remove('visible');
            return;
        }

        // Двойной поиск:
        // 1) по нормализованной строке (CC08 → СС08)
        // 2) по исходной строке «как есть» (КГТ → КГТ)
        const found = preparedIndex.filter(item =>
            item._titleNorm.includes(q) ||
            item._keywordsNorm.includes(q) ||
            item._titleRaw.includes(qRaw) ||
            item._keywordsRaw.includes(qRaw)
        ).slice(0, 10);

        if (found.length === 0) {
            results.classList.add('visible');
            results.innerHTML = '<li class="search-empty">Ничего не найдено. Попробуйте другой запрос.</li>';
            return;
        }

        results.classList.add('visible');
        found.forEach(item => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = item.page + item.anchor;
            a.textContent = item.title;
            li.appendChild(a);
            results.appendChild(li);
        });
    });

    // Скрываем результаты при клике мимо
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-box')) {
            results.classList.remove('visible');
        }
    });

    // Показать снова при фокусе, если есть ввод
    input.addEventListener('focus', () => {
        if (input.value.trim().length >= 2 && results.children.length > 0) {
            results.classList.add('visible');
        }
    });
}

document.addEventListener('DOMContentLoaded', initSearch);/* ================================================================
   ТЕСТЫ: интерактивная логика со счётчиком и разбором
   ================================================================
   Работает для tests.html. Активна только если на странице есть
   элементы с классом .quiz и id="quiz-progress".
   ================================================================ */

const QUIZ_TOTAL = 10;

/* Храним ответы пользователя по каждому вопросу */
const quizState = {
    answers: {}, // { вопросIndex: { chosenText, isCorrect, correctText, note } }
    total: 0,
    right: 0
};

function initQuiz() {
    const progress = document.getElementById('quiz-progress');
    if (!progress) return; // на этой странице тестов нет

    // Обход всех вопросов
    const quizzes = document.querySelectorAll('.quiz');

    quizzes.forEach((quiz, index) => {
        const buttons = quiz.querySelectorAll('.quiz-option');
        const noteEl = quiz.querySelector('.quiz-review-note');

        buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                // если уже отвечено — ничего не делаем
                if (quiz.dataset.answered === 'true') return;

                const isCorrect = btn.dataset.correct === 'true';
                const chosenText = btn.textContent.trim();

                // найти правильный вариант
                let correctText = '';
                let note = '';
                buttons.forEach(b => {
                    if (b.dataset.correct === 'true') {
                        correctText = b.textContent.trim();
                    }
                });
                if (noteEl) note = noteEl.textContent.trim();

                // подсветить всё
                buttons.forEach(b => {
                    b.disabled = true;
                    if (b.dataset.correct === 'true') {
                        b.classList.add('correct');
                    }
                });

                if (isCorrect) {
                    btn.classList.add('chosen-right');
                    quizState.right++;
                } else {
                    btn.classList.add('chosen-wrong');
                }

                // запомнить ответ
                quizState.answers[index] = {
                    chosenText,
                    isCorrect,
                    correctText,
                    note
                };
                quiz.dataset.answered = 'true';
                quizState.total++;

                updateProgress();
            });
        });
    });

    // Сброс
    const resetBtn = document.getElementById('quiz-reset');
    if (resetBtn) {
        resetBtn.addEventListener('click', resetQuiz);
    }
}

function updateProgress() {
    const counter = document.getElementById('quiz-counter');
    if (counter) {
        counter.textContent = quizState.right;
    }

    const totalEl = document.getElementById('quiz-answered');
    if (totalEl) {
        totalEl.textContent = quizState.total;
    }

    // Если ответили на все — показать финал
    if (quizState.total === QUIZ_TOTAL) {
        showFinalReview();
    }
}

function showFinalReview() {
    const container = document.getElementById('quiz-review');
    if (!container) return;

    let html = '';
    html += '<div class="quiz-final">';
    html += '<h2>🏁 Тест завершён</h2>';
    html += '<p class="quiz-final-score">Правильно: <strong>' + quizState.right + ' из ' + QUIZ_TOTAL + '</strong></p>';

    let verdict = '';
    if (quizState.right === QUIZ_TOTAL) {
        verdict = 'Идеально! Все ответы верны — вы готовы к разметке. 🎉';
    } else if (quizState.right >= 8) {
        verdict = 'Отличный результат. Перечитайте разбор ошибок ниже — и в путь.';
    } else if (quizState.right >= 6) {
        verdict = 'Хороший результат, но стоит перечитать ТЗ и примеры по темам, где были ошибки.';
    } else {
        verdict = 'Рекомендуем вернуться к ТЗ и примерам — материал стоит повторить.';
    }
    html += '<p class="quiz-final-verdict">' + verdict + '</p>';
    html += '</div>';

    html += '<h2 style="font-family: \'Playfair Display\', Georgia, serif; font-size: 22px; color: #4a2c14; margin: 24px 0 12px;">Разбор ответов</h2>';

    // Пробегаем по всем вопросам по порядку
    document.querySelectorAll('.quiz').forEach((quiz, index) => {
        const titleEl = quiz.querySelector('h3');
        const title = titleEl ? titleEl.textContent.trim() : ('Вопрос ' + (index + 1));
        const ans = quizState.answers[index];

        if (!ans) return;

        html += '<div class="quiz-review">';
        html += '<h3>' + title + '</h3>';
        html += '<p class="quiz-review-row"><span class="quiz-review-label">Ваш ответ: </span>' +
                (ans.isCorrect ? '<span class="quiz-review-right">' + escapeHtml(ans.chosenText) + ' ✓</span>' :
                                 '<span class="quiz-review-wrong">' + escapeHtml(ans.chosenText) + ' ✗</span>') +
                '</p>';

        if (!ans.isCorrect) {
            html += '<p class="quiz-review-row"><span class="quiz-review-label">Правильный ответ: </span>' +
                    '<span class="quiz-review-right">' + escapeHtml(ans.correctText) + '</span></p>';
        }

        if (ans.note) {
            html += '<div class="quiz-review-note">' + escapeHtml(ans.note) + '</div>';
        }

        html += '</div>';
    });

    container.innerHTML = html;
    container.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function resetQuiz() {
    // Сбросить состояние
    quizState.answers = {};
    quizState.total = 0;
    quizState.right = 0;

    // Обход вопросов — снять подсветку
    document.querySelectorAll('.quiz').forEach(quiz => {
        quiz.dataset.answered = 'false';
        quiz.querySelectorAll('.quiz-option').forEach(btn => {
            btn.disabled = false;
            btn.classList.remove('correct', 'wrong', 'chosen-right', 'chosen-wrong');
        });
    });

    // Очистить финальный блок
    const review = document.getElementById('quiz-review');
    if (review) review.innerHTML = '';

    updateProgress();
}

/* Простая защита от XSS при выводе текста */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

document.addEventListener('DOMContentLoaded', initQuiz);
