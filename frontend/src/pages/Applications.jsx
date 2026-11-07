import { useState } from "react";
import "./Applications.css";

function Applications({applications,setApplications}) {
  const cultures = [
    { id: 1, nom: "Tomate" },
    { id: 2, nom: "Olivier" }
  ];

  const maladies = [
    { id: 1, nom: "Mildiou" },
    { id: 2, nom: "Oïdium" }
  ];

  const traitements = [
    { id: 1, nom: "Traitement antifongique" },
    { id: 2, nom: "Traitement insecticide" }
  ];

//   const [applications, setApplications] = useState([]);
  const [cultureId, setCultureId] = useState("");
  const [maladieId, setMaladieId] = useState("");
  const [traitementId, setTraitementId] = useState("");
  const [dateApplication, setDateApplication] = useState("");
  const [dateSuivi, setDateSuivi] = useState("");
  const [observations, setObservations] = useState("");
  const [editingId, setEditingId] = useState(null);

  function handleSubmit(e) {
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

    if (editingId === null) {
      const nouvelleApplication = {
        id: Date.now(),
        cultureId,
        maladieId,
        traitementId,
        dateApplication,
        dateSuivi,
        observations,
        resultat: "À évaluer"
      };

      setApplications([...applications, nouvelleApplication]);

      setCultureId("");
      setMaladieId("");
      setTraitementId("");
      setDateApplication("");
      setDateSuivi("");
      setObservations("");
    }

    if (editingId === null) {
      const nouvelleApplication = {
        id: Date.now(),
        cultureId,
        maladieId,
        traitementId,
        dateApplication,
        dateSuivi,
        observations,
        resultat: "À évaluer"
      };

      setApplications([...applications, nouvelleApplication]);
    } else {
      const applicationsModifiees = applications.map((application) =>
        application.id === editingId
          ? {
              ...application,
              cultureId,
              maladieId,
              traitementId,
              dateApplication,
              dateSuivi,
              observations
            }
          : application
      );

      setApplications(applicationsModifiees);
    }
  }

  function handleEdit(application) {
    setEditingId(application.id);
    setCultureId(String(application.cultureId));
    setMaladieId(String(application.maladieId));
    setTraitementId(String(application.traitementId));
    setDateApplication(application.dateApplication);
    setDateSuivi(application.dateSuivi);
    setObservations(application.observations);
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

  function handleDelete(id) {
    if (window.confirm("Voulez-vous vraiment supprimer cette application ?")) {
      setApplications(
        applications.filter((application) => application.id !== id)
      );
    }
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
                        {cultures.find((c) => c.id === Number(application.cultureId))?.nom}
                      </span>
                    </td>
                    <td>
                      <span className="badge-maladie">
                        {maladies.find((m) => m.id === Number(application.maladieId))?.nom}
                      </span>
                    </td>
                    <td>
                      <span className="badge-traitement">
                        {traitements.find((t) => t.id === Number(application.traitementId))?.nom}
                      </span>
                    </td>
                    <td className="cell-date">{application.dateApplication}</td>
                    <td className="cell-date">{application.dateSuivi}</td>
                    <td className="cell-obs">{application.observations || "-"}</td>
                    <td>
                      <span className="badge-resultat">{application.resultat}</span>
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
