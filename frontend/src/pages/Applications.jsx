import { useState, useEffect } from "react";
import "./Applications.css";
import api from "../services/api";

function Applications() {
  const [applications, setApplications] = useState([]);
  const [cultures, setCultures] = useState([]);
  const [maladies, setMaladies] = useState([]);
  const [traitements, setTraitements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [cultureId, setCultureId] = useState("");
  const [maladieId, setMaladieId] = useState("");
  const [traitementId, setTraitementId] = useState("");
  const [dateApplication, setDateApplication] = useState("");
  const [dateSuivi, setDateSuivi] = useState("");
  const [observations, setObservations] = useState("");
  const [editingId, setEditingId] = useState(null);

  const fetchData = async () => {
    try {
      const [resApps, resCultures, resMaladies, resTraitements] = await Promise.all([
        api.get("/applications"),
        api.get("/cultures"),
        api.get("/maladies"),
        api.get("/traitements")
      ]);
      setApplications(resApps.data);
      setCultures(resCultures.data);
      setMaladies(resMaladies.data);
      setTraitements(resTraitements.data);
      setError("");
    } catch (err) {
      setError("Impossible de charger les données.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !cultureId ||
      !maladieId ||
      !traitementId ||
      !dateApplication ||
      !dateSuivi
    ) {
      alert("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    if (dateSuivi < dateApplication) {
      alert("La date de suivi doit être après la date d'application.");
      return;
    }

    const data = {
      culture_id: Number(cultureId),
      maladie_id: Number(maladieId),
      traitement_id: Number(traitementId),
      date_application: dateApplication,
      date_suivi: dateSuivi,
      observations: observations,
      resultat: "À évaluer",
      utilisateur_id: 1
    };

    try {
      if (editingId === null) {
        await api.post("/applications", data);
      } else {
        await api.put(`/applications/${editingId}`, data);
      }

      handleCancelEdit();
      await fetchData();
    } catch (err) {
      console.error(err);
      alert("Erreur lors de l'enregistrement de l'application.");
    }
  };

  function handleEdit(application) {
    setEditingId(application.id);
    setCultureId(String(application.culture_id || application.cultureId));
    setMaladieId(String(application.maladie_id || application.maladieId));
    setTraitementId(String(application.traitement_id || application.traitementId));
    setDateApplication(application.date_application || application.dateApplication || "");
    setDateSuivi(application.date_suivi || application.dateSuivi || "");
    setObservations(application.observations || "");
  }

  function handleCancelEdit() {
    setEditingId(null);
    setCultureId("");
    setMaladieId("");
    setTraitementId("");
    setDateApplication("");
    setDateSuivi("");
    setObservations("");
  }

  const handleDelete = async (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer cette application ?")) {
      try {
        await api.delete(`/applications/${id}`);
        await fetchData();
      } catch (err) {
        console.error(err);
        alert("Erreur lors de la suppression.");
      }
    }
  };

  if (loading) {
    return <p>Chargement des applications...</p>;
  }

  return (
    <div className="applications-container">
      <div className="applications-header">
        <div>
          <h1 className="applications-title">Gestion des applications de traitements</h1>
          <p className="applications-subtitle">Suivi et enregistrement des interventions sur les parcelles</p>
        </div>
      </div>

      <div className="applications-form-card">
        <div className="card-header">
          <h2>{editingId === null ? "Enregistrer une application" : "Modifier l'application"}</h2>
          <span className="card-caption">Renseignez les détails de l'intervention phytosanitaire</span>
        </div>

        <form className="applications-form" onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label>Culture</label>
              <select
                value={cultureId}
                onChange={(e) => setCultureId(e.target.value)}
              >
                <option value="">Choisir une culture</option>
                {cultures.map((culture) => (
                  <option key={culture.id} value={culture.id}>
                    {culture.nom}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Maladie</label>
              <select
                value={maladieId}
                onChange={(e) => setMaladieId(e.target.value)}
              >
                <option value="">Choisir une maladie</option>
                {maladies.map((maladie) => (
                  <option key={maladie.id} value={maladie.id}>
                    {maladie.nom}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Traitement</label>
              <select
                value={traitementId}
                onChange={(e) => setTraitementId(e.target.value)}
              >
                <option value="">Choisir un traitement</option>
                {traitements.map((traitement) => (
                  <option key={traitement.id} value={traitement.id}>
                    {traitement.nom}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Date d'application</label>
              <input
                type="date"
                value={dateApplication}
                onChange={(e) => setDateApplication(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Date de suivi</label>
              <input
                type="date"
                value={dateSuivi}
                onChange={(e) => setDateSuivi(e.target.value)}
              />
            </div>

            <div className="form-group form-group-full">
              <label>Observations</label>
              <textarea
                placeholder="Remarques, conditions météorologiques, état de la culture..."
                value={observations}
                onChange={(e) => setObservations(e.target.value)}
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-submit">
              {editingId === null ? "Enregistrer l'application" : "Modifier l'application"}
            </button>
            {editingId !== null && (
              <button type="button" className="btn-cancel" onClick={handleCancelEdit}>
                Annuler
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="applications-card">
        <div className="card-header">
          <h2>Historique des applications</h2>
          <span className="card-caption">Liste de toutes les interventions enregistrées</span>
        </div>

        <div className="table-responsive">
          <table className="applications-table">
            <thead>
              <tr>
                <th>Culture</th>
                <th>Maladie</th>
                <th>Traitement</th>
                <th>Date d'application</th>
                <th>Date de suivi</th>
                <th>Observations</th>
                <th>Résultat</th>
                <th className="th-actions">Actions</th>
              </tr>
            </thead>

            <tbody>
              {applications.length === 0 ? (
                <tr>
                  <td colSpan="8" className="empty-state">
                    Aucune application de traitement enregistrée pour le moment.
                  </td>
                </tr>
              ) : (
                applications.map((application) => (
                  <tr
                    key={application.id}
                    className={editingId === application.id ? "row-editing" : ""}
                  >
                    <td>
                      <span className="badge-culture">
                        {application.culture?.nom || cultures.find((c) => c.id === Number(application.culture_id || application.cultureId))?.nom || "Culture #" + (application.culture_id || application.cultureId)}
                      </span>
                    </td>
                    <td>
                      <span className="badge-maladie">
                        {application.maladie?.nom || maladies.find((m) => m.id === Number(application.maladie_id || application.maladieId))?.nom || "Maladie #" + (application.maladie_id || application.maladieId)}
                      </span>
                    </td>
                    <td>
                      <span className="badge-traitement">
                        {application.traitement?.nom || traitements.find((t) => t.id === Number(application.traitement_id || application.traitementId))?.nom || "Traitement #" + (application.traitement_id || application.traitementId)}
                      </span>
                    </td>
                    <td className="cell-date">{application.date_application || application.dateApplication}</td>
                    <td className="cell-date">{application.date_suivi || application.dateSuivi || "-"}</td>
                    <td className="cell-obs">{application.observations || "-"}</td>
                    <td>
                      <span className="badge-resultat">{application.resultat || "À évaluer"}</span>
                    </td>
                    <td className="cell-actions">
                      <button
                        type="button"
                        className="btn-action-edit"
                        onClick={() => handleEdit(application)}
                      >
                        Modifier
                      </button>
                      <button
                        type="button"
                        className="btn-action-delete"
                        onClick={() => handleDelete(application.id)}
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
    </div>
  );
}

export default Applications;
