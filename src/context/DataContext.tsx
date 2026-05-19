import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import { fetchMenu, fetchDrinks, fetchWines } from '../services/api';
import type { ApiMenuSection, ApiDrinkSection, ApiWineSection } from '../services/api';

interface DataState {
  menu: ApiMenuSection[];
  drinks: ApiDrinkSection[];
  wines: ApiWineSection[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

const DataContext = createContext<DataState>({
  menu: [],
  drinks: [],
  wines: [],
  loading: true,
  error: null,
  refetch: () => {},
});

export function useData(): DataState {
  return useContext(DataContext);
}

const POLL_INTERVAL = 30_000;

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [menu, setMenu] = useState<ApiMenuSection[]>([]);
  const [drinks, setDrinks] = useState<ApiDrinkSection[]>([]);
  const [wines, setWines] = useState<ApiWineSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const appStateRef = useRef<AppStateStatus>(AppState.currentState);

  const load = useCallback(async () => {
    try {
      const [m, d, w] = await Promise.all([fetchMenu(), fetchDrinks(), fetchWines()]);
      setMenu(m);
      setDrinks(d);
      setWines(w);
      setError(null);
    } catch (e: any) {
      setError(e?.message ?? 'Verbindungsfehler');
    } finally {
      setLoading(false);
    }
  }, []);

  const scheduleNext = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(async () => {
      if (appStateRef.current === 'active') {
        await load();
        scheduleNext();
      }
    }, POLL_INTERVAL);
  }, [load]);

  useEffect(() => {
    load().then(scheduleNext);

    const sub = AppState.addEventListener('change', (next: AppStateStatus) => {
      const prev = appStateRef.current;
      appStateRef.current = next;
      if (prev !== 'active' && next === 'active') {
        if (timerRef.current) clearTimeout(timerRef.current);
        load().then(scheduleNext);
      }
    });

    return () => {
      sub.remove();
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [load, scheduleNext]);

  const refetch = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    load().then(scheduleNext);
  }, [load, scheduleNext]);

  return (
    <DataContext.Provider value={{ menu, drinks, wines, loading, error, refetch }}>
      {children}
    </DataContext.Provider>
  );
}
