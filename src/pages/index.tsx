import axios from "axios";

export default function Home() {
  const deleteTest = async () => {
    const response = await axios.delete("/api/test");

    console.log(response);
  };

  return (
    <div>
      <h1 className="font-black text-2xl">Inter</h1>
      <button onClick={() => deleteTest()}>Eliminar datos</button>
    </div>
  );
}
