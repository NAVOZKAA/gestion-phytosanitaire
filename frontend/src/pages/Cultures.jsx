import { useState } from "react";
function Cultures() {


  const [cultures, setCultures] = useState([
    {
      id: 1,
      nom: "Tomate",
      type: "Légume",
      superficie: 2
    },
    {
      id: 2,
      nom: "Olivier",
      type: "Arbre fruitier",
      superficie: 5
    }
  ]);
  function handleSubmit(e) {
    e.preventDefault();
    if (nom === "" | type === "" | superficie === "") {
      alert(" veuillez remplir tous les champs");
      return;
    }
    if (Number(superficie) <= 0) {
      alert("La superficie doit être supérieure à zéro");
      return;
    }
    const nouvelleCulture = {
      id: Date.now(),
      nom: nom,
      type: type,
      superficie: Number(superficie)
    };

    setCultures([...cultures, nouvelleCulture]);

    setNom("");
    setType("");
    setSuperficie("");
  }
  // formulaire
  const [nom, setNom] = useState("");
  const [type, setType] = useState("");
  const [superficie, setSuperficie] = useState("");
  // supprimer culture
function handledelete(id){
  setCultures(
    cultures.filter((culture)=>culture.id!==id))
  
}
  return (
    <div>
      <h1>Gestion des cultures</h1>

      <table>
        <thead>
          <tr>
            <th>Culture</th>
            <th>Type</th>
            <th>Superficie</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {cultures.map((culture) => (
            <tr key={culture.id}>
              <td>{culture.nom}</td>
              <td>{culture.type}</td>
              <td>{culture.superficie} ha</td>
              <td>
                <button onClick={()=>handledelete(culture.id)}>
                  supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <form action="" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nom de la culture"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
        />

        <input
          type="text"
          placeholder="Type de culture"
          value={type}
          onChange={(e) => setType(e.target.value)}
        />

        <input
          type="number"
          placeholder="Superficie en hectares"
          value={superficie}
          onChange={(e) => setSuperficie(e.target.value)}
        />


        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
}

export default Cultures;
