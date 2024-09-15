import React, { useEffect, useState } from "react";
import getTutorialList from "../../../services/tutorial";


    const TutorialList: React.FC<any> = () => {
        const [tutorials, setTutorials] = useState<any>(null);
        const [error, setError] = useState<string | null>(null);
      
        useEffect(() => {
          const fetchData = async () => {
            try {
              const data = await getTutorialList();
              setTutorials(data);
            } catch (err) {
              setError('Failed to fetch personnes');
            }
          };
      
          fetchData();
        }, []);
      
        if (error) return <div>Error: {error}</div>;
      
        return (
          <div>
            <h1>Personnes</h1>
            {/* Render personnes or a message if no data */}
            {tutorials ? <pre>{JSON.stringify(tutorials, null, 2)}</pre> : <p>No personnes available</p>}
          </div>
        );
      }

export default TutorialList;
