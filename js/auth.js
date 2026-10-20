/* ================================================================
   ЗАЩИТА МАНУАЛА ПАРОЛЕМ (JS-пароль)
   ================================================================
   Пароль хранится в коде. Это защита «от случайных глаз»,
   а не от хакеров. Не используйте для секретных данных.
   ================================================================ */

(function () {
    // ==== НАСТРОЙКИ ====
    const PASSWORD = '10Vfyefk63'; // ← поменяй, если нужно
    const STORAGE_KEY = 'manual_1063_auth';
    const FORM_TITLE = '🔒 Мануал. Введите пароль для доступа';
    const FORM_HINT = 'Если у вас нет пароля — напишите руководителю.';
    // ===================

    // Если уже вошли в этой сессии — ничего не делаем
    if (sessionStorage.getItem(STORAGE_KEY) === 'true') {
        return;
    }

    // Прячем всё содержимое страницы
    document.documentElement.style.visibility = 'hidden';

    // Ждём загрузки DOM и показываем форму
    document.addEventListener('DOMContentLoaded', () => {
        // Создаём оверлей
        const overlay = document.createElement('div');
        overlay.className = 'auth-overlay';
        overlay.innerHTML = `
            <div class="auth-card">
                <h2 class="auth-title">${FORM_TITLE}</h2>
                <p class="auth-hint">${FORM_HINT}</p>
                <input type="password" id="auth-input" class="auth-input" placeholder="Пароль" autocomplete="current-password">
                <button id="auth-submit" class="auth-button">Войти</button>
                <p id="auth-error" class="auth-error"></p>
            </div>
        `;

        // Вставляем форму в body
        document.body.appendChild(overlay);
        document.documentElement.style.visibility = 'visible';

        // Блокируем прокрутку фона
        document.body.style.overflow = 'hidden';

        const input = document.getElementById('auth-input');
        const button = document.getElementById('auth-submit');
        const error = document.getElementById('auth-error');

        input.focus();

        // Проверка пароля
        function tryLogin() {
            if (input.value === PASSWORD) {
                sessionStorage.setItem(STORAGE_KEY, 'true');
                overlay.remove();
                document.body.style.overflow = '';
            } else {
                error.textContent = 'Неверный пароль. Попробуйте ещё раз.';
                input.value = '';
                input.focus();
            }
        }

        button.addEventListener('click', tryLogin);
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                tryLogin();
            }
        });
    });
})();
