import { useState } from "react";
function Applications(){

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

  

const [applications,setApplications]=useState([])
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
if(editingId===null){

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
}if (editingId === null) {
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
}}
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
        <h1>Gestion des applications de traitements</h1>

        <form onSubmit={handleSubmit}>
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

            <label>Date d'application</label>
            <input
                type="date"
                value={dateApplication}
                onChange={(e) => setDateApplication(e.target.value)}
            />

            <label>Date de suivi</label>
            <input
                type="date"
                value={dateSuivi}
                onChange={(e) => setDateSuivi(e.target.value)}
            />

            <label>Observations</label>
            <textarea
                value={observations}
                onChange={(e) => setObservations(e.target.value)}
            />

            <button type="submit">{editingId===null?"Enregistrer l'application" : "Modifier l'application"}</button>
            {editingId !== null && (
    <button type="button" onClick={handleCancelEdit}>
        Annuler
    </button>
            )}

            
        </form>
        <h2>Historique des applications</h2>

<table>
    <thead>
        <tr>
            <th>Culture</th>
            <th>Maladie</th>
            <th>Traitement</th>
            <th>Date d'application</th>
            <th>Date de suivi</th>
            <th>Observations</th>
            <th>Résultat</th>
            <th>Actions</th>
        </tr>
    </thead>

    <tbody>
        {applications.map((application) => (
            <tr key={application.id}>
                <td>
                    {cultures.find(c => c.id === Number(application.cultureId))?.nom}
                </td>
                <td>
                    {maladies.find(m => m.id === Number(application.maladieId))?.nom}
                </td>
                <td>
                    {traitements.find(t => t.id === Number(application.traitementId))?.nom}
                </td>
                <td>{application.dateApplication}</td>
                <td>{application.dateSuivi}</td>
                <td>{application.observations || "-"}</td>
                <td>{application.resultat}</td>
                <td>
    <button type="button" onClick={() => handleEdit(application)}>
        Modifier
    </button>

    <button type="button" onClick={() => handleDelete(application.id)}>
        Supprimer
    </button>
</td>
            </tr>
        ))}
    </tbody>
</table>
    </div>
);
}export default Applications;