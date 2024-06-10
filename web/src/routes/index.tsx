import { useNavigate } from "react-router-dom";
import { Button } from "~/components/ui/button";
import { useKeyListener } from "~/hooks/useKeyListener";
import { useNuiEvent } from "~/hooks/useNuiEvent";
import { useCounterNuiStore, useVisibilityNuiStore } from "~/hooks/useNuiStore";
import { fetchNui } from "~/utils/fetchNui";

export function Component() {
  const { value: visible } = useVisibilityNuiStore();
  const { value: counter, setValue: setCounter } = useCounterNuiStore();
  const navigate = useNavigate();

  useKeyListener(["Escape", "Backspace"], () => {
    fetchNui("setVisible", !visible);
  });

  useNuiEvent("setPath", (path) => {
    navigate({
      pathname: path as unknown as string
    });
  })

  return (
    <>
      {visible && (
        <div className="w-screen h-screen flex items-center justify-center">
          <div className="w-1/3 h-1/3 bg-background rounded-xl border p-4 flex flex-col gap-1">
            <span>Counter: {counter}</span>
            <Button onClick={() => setCounter(counter + 1)}>Increment</Button>
          </div>
        </div>
      )}
    </>
  );
}
