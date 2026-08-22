import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        <li>Note 1</li>
        <li>Note 2</li>
        <li>Note 3</li>
      </ul>
    </div>
  );
}

export default App;
