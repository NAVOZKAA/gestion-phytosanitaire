function Historique({ applications }) {

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

    return (
        <div>
            <h1>Historique des traitements</h1>

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
                            <td>{cultures.find(c => c.id === Number(application.cultureId))?.nom}</td>
                            <td>{maladies.find(m => m.id === Number(application.maladieId))?.nom}</td>
                            <td>{traitements.find(t => t.id === Number(application.traitementId))?.nom}</td>
                            <td>{application.dateApplication}</td>
                            <td>{application.dateSuivi}</td>
                            <td>{application.observations || "-"}</td>
                            <td>{application.resultat}</td>
                        </tr>
                    ))}

                    {applications.length === 0 && (
                        <tr>
                            <td colSpan="7">Aucune application enregistrée.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default Historique;