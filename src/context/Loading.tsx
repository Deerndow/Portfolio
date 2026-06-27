import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";

interface LoadingCtx {
  /** Navigate to a route, showing the buq loading screen in between. */
  go: (route: string) => void;
}

const Ctx = createContext<LoadingCtx>({ go: () => {} });

export const useLoading = () => useContext(Ctx);

const LOADING_MS = 2200;
const INITIAL_MIN_MS = 850;
const INITIAL_MAX_MS = 3500;

const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`;
const HOME_ASSETS = [
  asset("art/bg.png"),
  asset("art/tree1.png"),
  asset("art/tree2.png"),
  asset("art/tree3.png"),
  asset("art/tree4.png"),
  asset("art/logo.png"),
  asset("art/logo-load.png"),
];

const preloadImage = (src: string) =>
  new Promise<void>((resolve) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => resolve();
    img.src = src;
  });

export function LoadingProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const started = performance.now();
    let cancelled = false;

    const finish = () => {
      if (cancelled) return;
      const elapsed = performance.now() - started;
      window.setTimeout(
        () => {
          if (!cancelled) setLoading(false);
        },
        Math.max(0, INITIAL_MIN_MS - elapsed)
      );
    };

    const timeout = window.setTimeout(finish, INITIAL_MAX_MS);
    Promise.all(HOME_ASSETS.map(preloadImage)).then(() => {
      window.clearTimeout(timeout);
      finish();
    });

    return () => {
      cancelled = true;
      window.clearTimeout(timeout);
    };
  }, []);

  const go = useCallback(
    (route: string) => {
      if (loading) return;
      setLoading(true);
      window.setTimeout(() => {
        navigate(route);
        setLoading(false);
      }, LOADING_MS);
    },
    [loading, navigate]
  );

  return (
    <Ctx.Provider value={{ go }}>
      {children}
      {loading && <LoadingScreen />}
    </Ctx.Provider>
  );
}
