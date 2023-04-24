import axios from "axios";

export default function Home() {
  const deleteTest = async () => {
    const response = await axios.delete("/api/test");

    console.log(response);
  };

  return (
    <div>
      THIS IS A TEST WITH CORS
      <button onClick={() => deleteTest()}>Eliminar datos</button>
    </div>
  );
}
