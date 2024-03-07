import "./App.css";
import { Button } from "./components/ui/button";
function App() {
  return (
    <>
      <div className="flex items-center gap-4 p-4">
        <Button
          variant={"default"}
          onClick={() => {
            alert("Hello");
          }}
        >
          Enroll in the following course
        </Button>
      </div>
    </>
  );
}

export default App;
