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
        <div>
          <h1 className="traitements-title">Gestion des traitements</h1>
          <p className="traitements-subtitle">
            Protocoles et posologies des traitements phytosanitaires
          </p>
        </div>
      </div>

      <div className="traitements-content">
        {/* Table Card */}
        <div className="traitements-card">
          <div className="card-header">
            <h2>Liste des traitements</h2>
            <span className="card-caption">
              Aperçu des protocoles, produits phytosanitaires et dosages
            </span>
          </div>

          <div className="search-container">
            <div className="traitements-search-bar">
              <input
                type="text"
                placeholder="Rechercher un traitement par nom..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                type="button"
                className="btn-search"
                onClick={handleSearch}
              >
                Rechercher
              </button>
            </div>
          </div>

          <div className="table-responsive">
            <table className="traitements-table">
              <thead>
                <tr>
                  <th>Nom</th>
                  <th>Description</th>
                  <th>Produit</th>
                  <th>Dosage</th>
                  <th className="th-actions">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredTraitements.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="empty-state">
                      Aucun traitement trouvé.
                    </td>
                  </tr>
                ) : (
                  filteredTraitements.map((traitement) => (
                    <tr
                      key={traitement.id}
                      className={editingId === traitement.id ? "row-editing" : ""}
                    >
                      <td className="cell-traitement-nom">
                        <span className="traitement-indicator"></span>
                        {traitement.nom}
                      </td>
                      <td className="cell-description">{traitement.description}</td>
                      <td>
                        <span className="badge-produit">{traitement.produit}</span>
                      </td>
                      <td>
                        <span className="badge-dosage">{traitement.dosage}</span>
                      </td>
                      <td className="cell-actions">
                        <button
                          type="button"
                          className="edit-button"
                          onClick={() => handleEdit(traitement.id)}
                        >
                          Modifier
                        </button>
                        <button
                          type="button"
                          className="delete-button"
                          onClick={() => handleDelete(traitement.id)}
                        >
                          Supprimer
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Form Card */}
        <div className="traitements-form-card">
          <div className="card-header">
            <h2>
              {editingId === null
                ? "Ajouter un traitement"
                : "Modifier le traitement"}
            </h2>
            <span className="card-caption">
              {editingId === null
                ? "Renseignez le protocole et dosage"
                : "Ajustez les informations du traitement"}
            </span>
          </div>

          <form className="traitements-form" onSubmit={handleSubmit}>
            <div className="form-groupe">
              <label htmlFor="nom">Nom du traitement</label>
              <input
                id="nom"
                type="text"
                placeholder="Ex: Traitement antifongique..."
                value={nom}
                onChange={(e) => setNom(e.target.value)}
              />
            </div>

            <div className="form-groupe">
              <label htmlFor="description">Description</label>
              <input
                id="description"
                type="text"
                placeholder="Ex: Contre les maladies foliaires..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="form-groupe">
              <label htmlFor="produit">Produit phytosanitaire</label>
              <input
                id="produit"
                type="text"
                placeholder="Ex: Bouillie bordelaise..."
                value={produit}
                onChange={(e) => setProduit(e.target.value)}
              />
            </div>

            <div className="form-groupe">
              <label htmlFor="dosage">Dosage recommandé</label>
              <input
                id="dosage"
                type="text"
                placeholder="Ex: 2 g/L, 100 ml/ha..."
                value={dosage}
                onChange={(e) => setDosage(e.target.value)}
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-submit">
                {editingId === null ? "Ajouter" : "Enregistrer"}
              </button>

              {editingId !== null && (
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={handleCancelEdit}
                >
                  Annuler
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Traitements;
