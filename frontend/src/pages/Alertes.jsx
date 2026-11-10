import { useState } from "react";

function Alertes() {

    const [alertes, setAlertes] = useState([]);

    const [titre, setTitre] = useState("");
    const [message, setMessage] = useState("");
    const [type, setType] = useState("Manuelle");
    const [dateAlerte, setDateAlerte] = useState("");
    function handleSubmit(e) {
        e.preventDefault();

        if (!titre.trim() || !message.trim() || !dateAlerte) {
            alert("Veuillez remplir tous les champs obligatoires.");
            return;
        }

        const nouvelleAlerte = {
            id: Date.now(),
            titre,
            message,
            type,
            dateAlerte,
            lue: false
        };

        setAlertes([...alertes, nouvelleAlerte]);

        setTitre("");
        setMessage("");
        setType("Manuelle");
        setDateAlerte("");
    }
    function handleMarkAsRead(id) {
    setAlertes(
        alertes.map((alerte) =>
            alerte.id === id
                ? { ...alerte, lue: true }
                : alerte
        )
    );
}

function handleDelete(id) {
    if (window.confirm("Supprimer cette alerte ?")) {
        setAlertes(alertes.filter((alerte) => alerte.id !== id));
    }
}
    return (
        <div>
            <h1>Gestion des alertes</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="titre">Titre</label>
                <input
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
                <td>{alerte.dateAlerte}</td>
                <td>{alerte.lue ? "Lue" : "Non lue"}</td>
                <td>
                    {!alerte.lue && (
                        <button
                            onClick={() => handleMarkAsRead(alerte.id)}
                        >
                            Marquer comme lue
                        </button>
                    )}

                    <button
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