import {
  createContext,
  useCallback,
  useContext,
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

export function LoadingProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

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
