import "./Dashboard.css";
function Dashboard() {
  return (
    <div className="dashboard">
      <div className="dashboard-heading">
        <h2>Tableau de bord</h2>
        <p>Vue générale de la gestion phytosanitaire</p>
      </div>

      <div className="dashboard-cards">
        <div className="dashboard-card cultures">
          <h3>Cultures</h3>
          <p className="card-number">12</p>
          <span>Total des cultures</span>
        </div>

        <div className="dashboard-card maladies">
          <h3>Maladies</h3>
          <p className="card-number">5</p>
          <span>Maladies recensées</span>
        </div>

        <div className="dashboard-card traitements">
          <h3>Traitements</h3>
          <p className="card-number">8</p>
          <span>Traitements enregistrés</span>
        </div>

        <div className="dashboard-card alertes">
          <h3>Alertes</h3>
          <p className="card-number">3</p>
          <span>Alertes actives</span>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
