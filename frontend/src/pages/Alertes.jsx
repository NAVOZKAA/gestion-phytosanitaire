import { useState, useEffect } from "react";
import api from "../services/api";

function Alertes() {
    const [alertes, setAlertes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [titre, setTitre] = useState("");
    const [message, setMessage] = useState("");
    const [type, setType] = useState("Manuelle");
    const [dateAlerte, setDateAlerte] = useState("");

    const fetchAlertes = async () => {
        try {
            const response = await api.get("/alertes");
            setAlertes(response.data);
            setError("");
        } catch (err) {
            setError("Impossible de charger les alertes.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAlertes();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!titre.trim() || !message.trim() || !dateAlerte) {
            alert("Veuillez remplir tous les champs obligatoires.");
            return;
        }

        const data = {
            titre,
            message,
            type,
            date_alerte: dateAlerte
        };

        try {
            await api.post("/alertes", data);

            setTitre("");
            setMessage("");
            setType("Manuelle");
            setDateAlerte("");

            await fetchAlertes();
        } catch (err) {
            console.error(err);
            alert("Erreur lors de l'enregistrement de l'alerte.");
        }
    };

    const handleMarkAsRead = async (id) => {
        try {
            await api.patch(`/alertes/${id}/read`);
            await fetchAlertes();
        } catch (err) {
            console.error(err);
            alert("Erreur lors de la mise à jour de l'alerte.");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Supprimer cette alerte ?")) {
            try {
                await api.delete(`/alertes/${id}`);
                await fetchAlertes();
            } catch (err) {
                console.error(err);
                alert("Erreur lors de la suppression.");
            }
        }
    };

    if (loading) {
        return <p>Chargement des alertes...</p>;
    }

    return (
        <div>
            <h1>Gestion des alertes</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="titre">Titre</label>
                <input
                    id="titre"
                    type="text"
                    value={titre}
                    onChange={(e) => setTitre(e.target.value)}
                />

                <label>Message</label>
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />

                <label>Type d'alerte</label>
                <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                >
                    <option value="Manuelle">Manuelle</option>
                    <option value="Automatique">Automatique</option>
                </select>

                <label>Date de l'alerte</label>
                <input
                    type="date"
                    value={dateAlerte}
                    onChange={(e) => setDateAlerte(e.target.value)}
                />

                <button type="submit">Créer une alerte</button>
            </form>
            <h2>Liste des alertes</h2>

            <table>
                <thead>
                    <tr>
                        <th>Titre</th>
                        <th>Message</th>
                        <th>Type</th>
                        <th>Date</th>
                        <th>Statut</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {alertes.map((alerte) => (
                        <tr key={alerte.id}>
                            <td>{alerte.titre}</td>
                            <td>{alerte.message}</td>
                            <td>{alerte.type}</td>
                            <td>{alerte.date_alerte || alerte.dateAlerte}</td>
                            <td>{alerte.lue ? "Lue" : "Non lue"}</td>
                            <td>
                                {!alerte.lue && (
                                    <button
                                        type="button"
                                        onClick={() => handleMarkAsRead(alerte.id)}
                                    >
                                        Marquer comme lue
                                    </button>
                                )}

                                <button
                                    type="button"
                                    onClick={() => handleDelete(alerte.id)}
                                >
                                    Supprimer
                                </button>
                            </td>
                        </tr>
                    ))}

                    {alertes.length === 0 && (
                        <tr>
                            <td colSpan="6">Aucune alerte disponible.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default Alertes;
