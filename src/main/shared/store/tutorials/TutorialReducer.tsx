import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Tutorial {
  id: number;
  title: string;
  description: string;
  published: boolean;
}

interface TutorialState {
  tutorials: Tutorial[];
  loading: boolean;
  error: string | null;
}

const initialState: TutorialState = {
  tutorials: [],
  loading: false,
  error: null,
};

const tutorialSlice = createSlice({
  name: 'tutorials',
  initialState,
  reducers: {
    fetchTutorialsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchTutorialsSuccess(state, action: PayloadAction<Tutorial[]>) {
      state.loading = false;
      state.tutorials = action.payload;
    },
    fetchTutorialsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    addTutorial(state, action: PayloadAction<Tutorial>) {
      state.tutorials.push(action.payload);
    },
    updateTutorial(state, action: PayloadAction<Tutorial>) {
      const index = state.tutorials.findIndex(tutorial => tutorial.id === action.payload.id);
      if (index !== -1) {
        state.tutorials[index] = action.payload;
      }
    },
    deleteTutorial(state, action: PayloadAction<number>) {
      state.tutorials = state.tutorials.filter(tutorial => tutorial.id !== action.payload);
    },
  },
});

export const {
  fetchTutorialsStart,
  fetchTutorialsSuccess,
  fetchTutorialsFailure,
  addTutorial,
  updateTutorial,
  deleteTutorial,
} = tutorialSlice.actions;

export default tutorialSlice.reducer;
