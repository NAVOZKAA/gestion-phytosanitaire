import { useState } from "react";
import "./Maladies.css";

function Maladies() {
  const [maladies, setMaladies] = useState([
    {
      id: 1,
      nom: "Mildiou",
      description: "Maladie causée par un champignon",
      symptomes: "Taches brunes sur les feuilles"
    },
    {
      id: 2,
      nom: "Oïdium",
      description: "Maladie causée par un champignon parasite",
      symptomes: "Poudre blanche sur les feuilles"
    }
  ]);

  return (
    <div className="maladies-page">
      <div className="maladies-header">
        <div>
          <h1 className="maladies-title">Gestion des maladies</h1>
          <p className="maladies-subtitle">
            Recensement et diagnostic des affections phytosanitaires
          </p>
        </div>
      </div>

      <div className="maladies-card">
        <div className="card-header">
          <h2>Liste des maladies recensées</h2>
          <span className="card-caption">
            Identification des symptômes et descriptions pathologiques
          </span>
        </div>

        <div className="table-responsive">
          <table className="maladies-table">
            <thead>
              <tr>
                <th>Nom</th>
                <th>Description</th>
                <th>Symptômes</th>
              </tr>
            </thead>
            <tbody>
              {maladies.map((maladie) => (
                <tr key={maladie.id}>
                  <td className="cell-maladie-nom">
                    <span className="maladie-indicator"></span>
                    {maladie.nom}
                  </td>
                  <td className="cell-description">{maladie.description}</td>
                  <td>
                    <span className="badge-symptome">{maladie.symptomes}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Maladies;
