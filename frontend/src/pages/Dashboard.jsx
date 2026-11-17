import { useEffect, useState } from "react";
import "./Dashboard.css";
import api from "../services/api";

function Dashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function fetchDashboard() {
      try {
        const response = await api.get("/dashboard");
        if (!cancelled) {
          setDashboard(response.data);
          setError("");
        }
      } catch (err) {
        if (!cancelled) {
          setError("Impossible de charger les données du tableau de bord.");
          console.error(err);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchDashboard();

    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return <p>Chargement du tableau de bord...</p>;
  }

  if (error) {
    return <p role="alert">{error}</p>;
  }

  const stats = [
    { key: "cultures", title: "Cultures", value: dashboard.total_cultures, description: "Total des cultures" },
    { key: "maladies", title: "Maladies", value: dashboard.total_maladies, description: "Maladies recensées" },
    { key: "traitements", title: "Traitements", value: dashboard.total_traitements, description: "Traitements enregistrés" },
    { key: "applications", title: "Applications", value: dashboard.total_applications, description: "Applications enregistrées" },
    { key: "alertes", title: "Alertes", value: dashboard.total_alertes, description: "Total des alertes" },
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-heading">
        <h2>Tableau de bord</h2>
        <p>Vue générale de la gestion phytosanitaire</p>
      </div>

      <div className="dashboard-cards">
        {stats.map((stat) => (
          <div className={`dashboard-card ${stat.key}`} key={stat.key}>
            <h3>{stat.title}</h3>
            <p className="card-number">{stat.value}</p>
            <span>{stat.description}</span>
          </div>
        ))}
      </div>

      <div className="dashboard-recent">
        <section className="dashboard-section">
          <h3>Applications récentes</h3>
          {dashboard.recent_applications.length === 0 ? (
            <p>Aucune application enregistrée.</p>
          ) : (
            <ul>
              {dashboard.recent_applications.map((application) => (
                <li key={application.id}>
                  <strong>{application.culture?.nom || "Culture inconnue"}</strong>
                  {" — "}
                  {application.maladie?.nom || "Maladie inconnue"}
                  {" — "}
                  {application.traitement?.nom || "Traitement inconnu"}
                  <span>{application.date_application}</span>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="dashboard-section">
          <h3>Alertes récentes</h3>
          {dashboard.recent_alertes.length === 0 ? (
            <p>Aucune alerte enregistrée.</p>
          ) : (
            <ul>
              {dashboard.recent_alertes.map((alerte) => (
                <li key={alerte.id}>
                  <strong>{alerte.titre}</strong>
                  <span>{alerte.date_alerte}</span>
                  <p>{alerte.message}</p>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}

export default Dashboard;
