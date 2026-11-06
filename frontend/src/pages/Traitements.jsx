
import { useState } from "react";
import "./Traitements.css";

function Traitements() {
  const [traitements, setTraitements] = useState([
    {
      id: 1,
      nom: "Traitement antifongique",
      description: "Contre les maladies fongiques",
      produit: "Produit antifongique",
      dosage: "2 g/L"
    },
    {
      id: 2,
      nom: "Traitement insecticide",
      description: "Contre les insectes nuisibles",
      produit: "Produit insecticide",
      dosage: "1 ml/L"
    }
  ]);

  const [nom, setNom] = useState("");
  const [description, setDescription] = useState("");
  const [produit, setProduit] = useState("");
  const [dosage, setDosage] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [submittedSearch, setSubmittedSearch] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!nom.trim() || !description.trim() || !produit.trim() || !dosage.trim()) {
      alert("Veuillez remplir tous les champs");
      return;
    }

    if (editingId === null) {
      const newTraitement = {
        id: Date.now(),
        nom,
        description,
        produit,
        dosage
      };

      setTraitements([...traitements, newTraitement]);
    } else {
      const updatedTraitements = traitements.map((traitement) => {
        if (traitement.id === editingId) {
          return {
            ...traitement,
            nom,
            description,
            produit,
            dosage
          };
        }
        return traitement;
      });

      setTraitements(updatedTraitements);
    }

    handleCancelEdit();
  }

  function handleEdit(id) {
    const traitement = traitements.find((traitement) => traitement.id === id);

    setNom(traitement.nom);
    setDescription(traitement.description);
    setProduit(traitement.produit);
    setDosage(traitement.dosage);
    setEditingId(id);
  }

  function handleCancelEdit() {
    setEditingId(null);
    setNom("");
    setDescription("");
    setProduit("");
    setDosage("");
  }

  function handleDelete(id) {
    setTraitements(traitements.filter((traitement) => traitement.id !== id));

    if (editingId === id) {
      handleCancelEdit();
    }
  }

  function handleSearch() {
    setSubmittedSearch(searchTerm.trim());
  }

  const filteredTraitements = traitements.filter((traitement) =>
    traitement.nom.toLowerCase().includes(submittedSearch.toLowerCase())
  );

  return (
    <div className="traitements-page">
      <div className="traitements-header">
        <h1>Gestion des traitements</h1>
        <p>Gestion des traitements phytosanitaires prédéfinis</p>
      </div>

      <div className="traitements-card">
        <div className="card-header">
          <h2>Liste des traitements</h2>
        </div>

        <div className="search-container">
          <input
            type="text"
            placeholder="Rechercher un traitement..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="button" onClick={handleSearch}>
            Rechercher
          </button>
        </div>

        <div className="table-responsive">
          <table className="traitements-table">
            <thead>
              <tr>
                <th>Nom</th>
                <th>Description</th>
                <th>Produit</th>
                <th>Dosage</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredTraitements.map((traitement) => (
                <tr key={traitement.id}>
                  <td>{traitement.nom}</td>
                  <td>{traitement.description}</td>
                  <td>{traitement.produit}</td>
                  <td>{traitement.dosage}</td>
                  <td>
                    <button
                      type="button"
                      onClick={() => handleEdit(traitement.id)}
                    >
                      Modifier
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(traitement.id)}
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}

              {filteredTraitements.length === 0 && (
                <tr>
                  <td colSpan="5">Aucun traitement trouvé.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <form onSubmit={handleSubmit}>
          <h2>
            {editingId === null ? "Ajouter un traitement" : "Modifier le traitement"}
          </h2>

          <div className="traitements-form">
            <div className="form-groupe">
              <label htmlFor="nom">Nom du traitement</label>
              <input
                id="nom"
                type="text"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
              />
            </div>

            <div className="form-groupe">
              <label htmlFor="description">Description</label>
              <input
                id="description"
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="form-groupe">
              <label htmlFor="produit">Produit</label>
              <input
                id="produit"
                type="text"
                value={produit}
                onChange={(e) => setProduit(e.target.value)}
              />
            </div>

            <div className="form-groupe">
              <label htmlFor="dosage">Dosage</label>
              <input
                id="dosage"
                type="text"
                value={dosage}
                onChange={(e) => setDosage(e.target.value)}
              />
            </div>
          </div>

          <button type="submit">
            {editingId === null ? "Ajouter un traitement" : "Modifier le traitement"}
          </button>

          {editingId !== null && (
            <button type="button" onClick={handleCancelEdit}>
              Annuler
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default Traitements;
