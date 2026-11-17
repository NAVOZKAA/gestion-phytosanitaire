import { useState, useEffect } from "react";
import api from "../services/api";

function Historique() {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchApplications = async () => {
        try {
            const response = await api.get("/applications");
            setApplications(response.data);
            setError("");
        } catch (err) {
            setError("Impossible de charger l'historique.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchApplications();
    }, []);

    if (loading) {
        return <p>Chargement de l'historique...</p>;
    }

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
                            <td>{application.culture?.nom || "Culture #" + application.culture_id}</td>
                            <td>{application.maladie?.nom || "Maladie #" + application.maladie_id}</td>
                            <td>{application.traitement?.nom || "Traitement #" + application.traitement_id}</td>
                            <td>{application.date_application || application.dateApplication}</td>
                            <td>{application.date_suivi || application.dateSuivi || "-"}</td>
                            <td>{application.observations || "-"}</td>
                            <td>{application.resultat || "À évaluer"}</td>
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
