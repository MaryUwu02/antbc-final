import { ref } from 'vue';

const isDark = ref(
  localStorage.getItem('theme') === 'dark' ||
  (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
);

function updateTheme() {''
  if (typeof document !== 'undefined') {
    if (isDark.value) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
}

// Ejecutar al cargar
updateTheme();

export function useTheme() {
  const toggleTheme = () => {
    isDark.value = !isDark.value;
    localStorage.setItem('theme', isDark.value ? 'dark' : 'light');
    updateTheme();
  };

  // ➔ Agregamos esta función para poder cambiar explícitamente a 'light' o 'dark'
  const setTheme = (mode) => {
    isDark.value = mode === 'dark';
    localStorage.setItem('theme', mode);
    updateTheme();
  };

  return {
    isDark,
    toggleTheme,
    setTheme
  };
}