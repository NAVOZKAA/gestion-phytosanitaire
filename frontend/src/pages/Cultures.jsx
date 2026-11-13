import { useEffect, useState } from "react";
import "./Cultures.css";
import api from "../services/api";
function Cultures() {
  const [editingId, setEditingId] = useState(null);
  const [cultures, setCultures] = useState([]);
  const [nom, setNom] = useState("");
  const [type, setType] = useState("");
  const [superficie, setSuperficie] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadCultures() {
      try {
        const response = await api.get("/cultures");
        if (!cancelled) {
          setCultures(response.data);
          setError("");
        }
      } catch (err) {
        if (!cancelled) {
          setError("Impossible de charger les cultures.");
          console.error(err);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadCultures();

    return () => {
      cancelled = true;
    };
  }, []);


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
      const nouvelleCulture = {
        id: Date.now(),
        nom: nom,
        type: type,
        superficie: Number(superficie)
      };

      setCultures([...cultures, nouvelleCulture]);
    } else {
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


  function handledelete(id) {
    setCultures(cultures.filter((culture) => culture.id !== id));

    if (editingId === id) {
      handleCancelEdit();
    }
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
  if (loading) {
    return <p>Chargement des cultures...</p>;
  }
  return (
    <div className="cultures-page">
      <div className="cultures-header">
        <div>
          <h1 className="cultures-title">Gestion des cultures</h1>
          <p className="cultures-subtitle">Suivi des parcelles et cultures agricoles</p>
        </div>
      </div>

      <div className="cultures-content">
        {error && <p role="alert">{error}</p>}
        <div className="cultures-table-card">
          <div className="card-header">
            <h2>Liste des cultures</h2>
            <span className="card-caption">Aperçu et gestion de vos parcelles</span>
          </div>

          <div className="table-responsive">
            <table className="cultures-table">
              <thead>
                <tr>
                  <th>Culture</th>
                  <th>Type</th>
                  <th>Superficie</th>
                  <th className="th-actions">Actions</th>
                </tr>
              </thead>

              <tbody>
                {cultures.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="empty-state">
                      Aucune culture enregistrée pour le moment.
                    </td>
                  </tr>
                ) : (
                  cultures.map((culture) => (
                    <tr
                      key={culture.id}
                      className={editingId === culture.id ? "row-editing" : ""}
                    >
                      <td className="cell-nom">
                        <span className="crop-indicator"></span>
                        {culture.nom}
                      </td>
                      <td>
                        <span className="badge-type">{culture.type}</span>
                      </td>
                      <td className="cell-superficie">
                        <strong>{culture.superficie}</strong>{" "}
                        <span className="unit">ha</span>
                      </td>
                      <td className="cell-actions">
                        <button
                          type="button"
                          className="btn-action btn-edit"
                          onClick={() => handleEdit(culture.id)}
                        >
                          modifier
                        </button>
                        <button
                          type="button"
                          className="btn-action btn-delete"
                          onClick={() => handledelete(culture.id)}
                        >
                          supprimer
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="cultures-form-card">
          <div className="card-header">
            <h2>
              {editingId === null ? "Ajouter une culture" : "Modifier la culture"}
            </h2>
            <span className="card-caption">
              {editingId === null
                ? "Remplissez le formulaire ci-dessous"
                : "Ajustez les informations de la culture"}
            </span>
          </div>

          <form className="cultures-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="nom">Nom de la culture</label>
              <input
                id="nom"
                type="text"
                placeholder="Ex: Tomate, Olivier..."
                value={nom}
                onChange={(e) => setNom(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="type">Type de culture</label>
              <input
                id="type"
                type="text"
                placeholder="Ex: Légume, Arbre fruitier..."
                value={type}
                onChange={(e) => setType(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="superficie">Superficie (ha)</label>
              <input
                id="superficie"
                type="number"
                placeholder="Ex: 5"
                value={superficie}
                onChange={(e) => setSuperficie(e.target.value)}
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-submit">
                {editingId === null ? "Ajouter" : "Modifier"}
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

export default Cultures;
