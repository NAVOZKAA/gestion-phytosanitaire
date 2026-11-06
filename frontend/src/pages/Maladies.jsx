import { useState } from "react";
import "./Maladies.css";

function Maladies() {
  const [maladies, setMaladies] = useState([
    {
      id: 1,
      nom: "Mildiou",
      description: "Maladie causée par un champignon",
      symptomes: "Taches brunes sur les feuilles"
    },
    {
      id: 2,
      nom: "Oïdium",
      description: "Maladie causée par un champignon parasite",
      symptomes: "Poudre blanche sur les feuilles"
    }
  ]);

  const [nom, setNom] = useState("");
  const [description, setDescription] = useState("");
  const [symptomes, setSymptomes] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [submittedSearch, setSubmittedSearch] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!nom.trim() || !description.trim() || !symptomes.trim()) {
      alert(" veuillez remplir tous les champs");
      return;
    }

    if (editingId === null) {
      const newMaladie = {
        id: Date.now(),
        nom: nom,
        description: description,
        symptomes: symptomes
      };
      setMaladies([...maladies, newMaladie]);
    } else {
      const updatemaladie = maladies.map((maladie) => {
        if (maladie.id === editingId) {
          return {
            ...maladie,
            nom: nom,
            description: description,
            symptomes: symptomes
          };
        }
        return maladie;
      });
      setMaladies(updatemaladie);
    }

    setEditingId(null);
    setNom("");
    setDescription("");
    setSymptomes("");
  }

  function handleEdit(id) {
    const maladie = maladies.find((maladie) => maladie.id === id);
    setNom(maladie.nom);
    setDescription(maladie.description);
    setSymptomes(maladie.symptomes);
    setEditingId(id);
  }

  function handleCancelEdit() {
    setEditingId(null);
    setNom("");
    setDescription("");
    setSymptomes("");
  }

  function handleDelete(id) {
    setMaladies(maladies.filter((maladie) => maladie.id !== id));
    if (editingId === id) {
      handleCancelEdit();
    }
  }

  const filtredMaladie = maladies.filter((maladie) =>
    maladie.nom.toLowerCase().includes(submittedSearch.toLowerCase())
  );

  function handlesearch() {
    return setSubmittedSearch(searchTerm.trim());
  }

  return (
    <div className="maladies-page">
      <div className="maladies-header">
        <div>
          <h1 className="maladies-title">Gestion des maladies</h1>
          <p className="maladies-subtitle">
            Recensement et diagnostic des affections phytosanitaires
          </p>
        </div>
      </div>

      <div className="maladies-content">
        {/* Table Card */}
        <div className="maladies-card">
          <div className="card-header">
            <h2>Liste des maladies recensées</h2>
            <span className="card-caption">
              Identification des symptômes et descriptions pathologiques
            </span>
          </div>

          <div className="search-container">
            <div className="maladies-search-bar">
              <input
                type="text"
                placeholder="Rechercher une maladie par nom..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="btn-search" onClick={handlesearch}>
                Rechercher
              </button>
            </div>
          </div>

          <div className="table-responsive">
            <table className="maladies-table">
              <thead>
                <tr>
                  <th>Nom</th>
                  <th>Description</th>
                  <th>Symptômes</th>
                  <th className="th-actions">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtredMaladie.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="empty-state">
                      Aucune maladie trouvée.
                    </td>
                  </tr>
                ) : (
                  filtredMaladie.map((maladie) => (
                    <tr
                      key={maladie.id}
                      className={editingId === maladie.id ? "row-editing" : ""}
                    >
                      <td className="cell-maladie-nom">
                        <span className="maladie-indicator"></span>
                        {maladie.nom}
                      </td>
                      <td className="cell-description">{maladie.description}</td>
                      <td>
                        <span className="badge-symptome">{maladie.symptomes}</span>
                      </td>
                      <td className="cell-actions">
                        <button
                          className="edit-button"
                          onClick={() => handleEdit(maladie.id)}
                        >
                          Modifier
                        </button>
                        <button
                          className="delete-button"
                          onClick={() => handleDelete(maladie.id)}
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
        <div className="maladies-form-card">
          <div className="card-header">
            <h2>
              {editingId === null ? "Ajouter une maladie" : "Modifier la maladie"}
            </h2>
            <span className="card-caption">
              {editingId === null
                ? "Renseignez les détails pathologiques"
                : "Mettez à jour les informations"}
            </span>
          </div>

          <form className="maladies-form" onSubmit={handleSubmit}>
            <div className="form-groupe">
              <label htmlFor="nom">Nom de la maladie</label>
              <input
                id="nom"
                type="text"
                placeholder="Ex: Mildiou, Oïdium..."
                value={nom}
                onChange={(e) => setNom(e.target.value)}
              />
            </div>

            <div className="form-groupe">
              <label htmlFor="description">Description de la maladie</label>
              <input
                id="description"
                type="text"
                placeholder="Ex: Maladie fongique..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="form-groupe">
              <label htmlFor="symptomes">Symptômes</label>
              <input
                id="symptomes"
                type="text"
                placeholder="Ex: Taches brunes, poudre blanche..."
                value={symptomes}
                onChange={(e) => setSymptomes(e.target.value)}
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
ZA          </form>
        </div>
      </div>
    </div>
  );
}

export default Maladies;
