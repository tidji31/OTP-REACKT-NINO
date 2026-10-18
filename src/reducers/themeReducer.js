import { TOGGLE_THEME, SET_THEME } from '../actions/theme';

const getInitialTheme = () => {
  const savedTheme = localStorage.getItem('otp_theme');
  if (savedTheme) return savedTheme;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const initialState = {
  mode: getInitialTheme(),
};

export default function themeReducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_THEME: {
      const newMode = state.mode === 'light' ? 'dark' : 'light';
      localStorage.setItem('otp_theme', newMode);
      return { ...state, mode: newMode };
    }
    case SET_THEME: {
      localStorage.setItem('otp_theme', action.payload);
      return { ...state, mode: action.payload };
    }
    default:
      return state;
  }
}