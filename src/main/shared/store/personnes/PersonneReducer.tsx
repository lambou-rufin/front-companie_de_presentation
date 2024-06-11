import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Personne {
  pers_id: number;
  nom: string;
  prenom: string;
  email: string;
  adress: string;
}

interface PersonneState {
  personnes: Personne[];
  loading: boolean;
  error: string | null;
  success: string | null;
}

const initialState: PersonneState = {
  personnes: [],
  loading: false,
  error: null,
  success: null
};

const personneSlice = createSlice({
  name: 'personnes',
  initialState,
  reducers: {
    fetchPersonnesStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchPersonnesSuccess(state, action: PayloadAction<Personne[]>) {
      state.loading = false;
      state.personnes = action.payload;
    },
    fetchPersonnesFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    addPersonne(state, action: PayloadAction<Personne>) {
      state.personnes.push(action.payload);
    },
    updatePersonne(state, action: PayloadAction<Personne>) {
      const index = state.personnes.findIndex(personne => personne.pers_id === action.payload.pers_id);
      if (index !== -1) {
        state.personnes[index] = action.payload;
      }
    },
    deletePersonne(state, action: PayloadAction<number>) {
      state.personnes = state.personnes.filter(personne => personne.pers_id !== action.payload);
    },
  },
});

export const {
  fetchPersonnesStart,
  fetchPersonnesSuccess,
  fetchPersonnesFailure,
  addPersonne,
  updatePersonne,
  deletePersonne,
} = personneSlice.actions;

export default personneSlice.reducer;
