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

            <button type="submit">Enregistrer l'application</button>
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
            </tr>
        ))}
    </tbody>
</table>
    </div>
);
}export default Applications;