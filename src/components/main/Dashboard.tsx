import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Spinner } from 'react-bootstrap';
import { Doughnut } from 'react-chartjs-2'; // Importation du graphique Doughnut
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js'; // Importation des composants nécessaires
import getLangageDeProgrammationList from 'services/langageDeProgrammation';
import getPersonneList from 'services/personne';
import getTutorialList from 'services/tutorial';
import './Dashboard.css'; // Assurez-vous d'importer le fichier CSS

// Enregistrement des composants nécessaires pour le Doughnut chart
ChartJS.register(ArcElement, Tooltip, Legend, Title);

const Dashboard: React.FC = () => {
  const [personnes, setPersonnes] = useState<any[]>([]); 
  const [langages, setLangages] = useState<any[]>([]); 
  const [tutorials, setTutorials] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const personnesData = await getPersonneList();
        setPersonnes(personnesData);

        const langagesData = await getLangageDeProgrammationList();
        setLangages(langagesData);

        const tutorialData = await getTutorialList();
        setTutorials(tutorialData);

      } catch (err) {
        console.error("Erreur lors du chargement des données", err);
      } finally {
        setLoading(false);
      }
    }

    // Appel de fetchData uniquement lors du montage du composant
    fetchData();
  }, []); // Tableau des dépendances vide pour éviter la boucle infinie

  // Définir les données des cartes dans un tableau
  const cardData = [
    {
      title: 'Personnes',
      count: personnes.length,
      className: 'card-personnes'
    },
    {
      title: 'Langages de Programmation',
      count: langages.length,
      className: 'card-langages'
    },
    {
      title: 'Tutoriels',
      count: tutorials.length,
      className: 'card-tutoriels'
    },
  ];

  // Données pour le graphique circulaire
  const chartData = {
    labels: ['Personnes', 'Langages', 'Tutoriels'], // Labels pour chaque catégorie
    datasets: [
      {
        label: 'Répartition des Totaux',
        data: [personnes.length, langages.length, tutorials.length], // Les données pour chaque catégorie
        backgroundColor: ['#007bff', '#28a745', '#ffc107'], // Couleurs du graphique
        borderWidth: 1,
      }
    ]
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <h1>Dashboard</h1>
        {loading ? (
          <Spinner animation="border" variant="primary" />
        ) : (
          <Row className="g-4">
            {/* Boucle pour générer les cartes */}
            {cardData.map((data, index) => (
              <Col md={4} key={index}>
                <Card className={data.className}>
                  <Card.Body>
                    <Card.Title>{data.title}</Card.Title>
                    <Card.Text>{data.count} {data.title}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}

            {/* Graphique des Totaux sous forme de Doughnut */}
            <Col md={12}>
              <Card>
                <Card.Body>
                  <Card.Title>Répartition des Totaux</Card.Title>
                  <div style={{ height: '300px' }}>
                    <Doughnut data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
