import { useState } from "react";
function Cultures() {

  const [editingId, setEditingId] = useState(null);
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
    if (nom === "" || type === "" || superficie === "") {
      alert(" veuillez remplir tous les champs");
      return;
    }
    if (Number(superficie) <= 0) {
      alert("La superficie doit être supérieure à zéro");
      return;
    }
    if (editingId === null) {
      //   add  culture
      const nouvelleCulture = {
        id: Date.now(),
        nom: nom,
        type: type,
        superficie: Number(superficie)
    };

    setCultures([...cultures, nouvelleCulture]);

    } else {
      //  modify   culture
       const updatedCultures = cultures.map((culture) => {
        if (culture.id === editingId) {
            return {
                ...culture,
                nom: nom,
                type: type,
                superficie: Number(superficie)
            };
        }

        return culture;
    });

    setCultures(updatedCultures);
}

setEditingId(null);

    setNom("");
    setType("");
    setSuperficie("");
  }
  // formulaire
  const [nom, setNom] = useState("");
  const [type, setType] = useState("");
  const [superficie, setSuperficie] = useState("");
  // supprimer culture
  function handledelete(id) {
    setCultures(
      cultures.filter((culture) => culture.id !== id))

  }

    function handleEdit(id) {
      const culture = cultures.find((culture) => culture.id === id);

      setNom(culture.nom);
      setType(culture.type);
      setSuperficie(String(culture.superficie));

      setEditingId(id);
    }
function handleCancelEdit() {
  setEditingId(null);
  setNom("");
  setType("");
  setSuperficie("");
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
                <button onClick={() => handledelete(culture.id)}>
                  supprimer
                </button>
              </td>
              <td>
                <button onClick={() => handleEdit(culture.id)}>
                  modifier
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


<button type="submit">
    {editingId === null ? "Ajouter" : "Modifier"}
</button>    
{
  editingId !== null && (
  <button type="button" onClick={handleCancelEdit}>
    Annuler
  </button>
)}
</form>
    </div>
  );
}

export default Cultures;
