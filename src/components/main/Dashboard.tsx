import React, { useState, useEffect } from "react";
import { Card, Row, Col, Spinner } from "react-bootstrap";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { FaUser, FaCode, FaBook } from "react-icons/fa";
import getLangageDeProgrammationList from "services/langageDeProgrammation";
import getPersonneList from "services/personne";
import getTutorialList from "services/tutorial";
import "./Dashboard.css";

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
    fetchData();
  }, []);

  const cardData = [
    {
      icon: <FaUser style={{ fontSize: "30px" }} />,
      count: personnes.length,
      className: "card-personnes",
      bgColor: "#4265D6",
      color: "#000000"
    },
    {
      icon: <FaCode style={{ fontSize: "30px" }} />,
      count: langages.length,
      className: "card-langages",
      bgColor: "#4741A6",
      color: "#000000"
    },
    {
      icon: <FaBook style={{ fontSize: "30px" }} />,
      count: tutorials.length,
      className: "card-tutoriels",
      bgColor: "#F2AC20",
      color: "#000000"
    },
  ];

  const chartData = {
    labels: ["Personnes", "Langages", "Tutoriels"],
    datasets: [
      {
        label: "Répartition des Totaux",
        data: [personnes.length, langages.length, tutorials.length],
        backgroundColor: ["#4265D6", "#4741A6", "#F2AC20"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <h1 className="w-100 text-start">Dashboard</h1>
        {loading ? (
          <Spinner animation="border" variant="primary" />
        ) : (
          <Row className="g-4">
            {cardData.map((data, index) => (
              <Col md={4} key={index}>
                <Card
                  className={data.className}
                  style={{ height: "200px", backgroundColor: data.bgColor, color:data.color }}
                >
                  {" "}
                  {/* Ajuste la hauteur ici */}
                  <Card.Body className="text-center d-flex flex-column justify-content-center">
                    {data.icon}
                    <Card.Text>{data.count}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}

            <Col md={12}>
              <Card>
                <Card.Body>
                  <Card.Title>Répartition des Totaux</Card.Title>
                  <div style={{ height: "400px" }}>
                    <Doughnut
                      data={chartData}
                      options={{ responsive: true, maintainAspectRatio: false }}
                    />
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
