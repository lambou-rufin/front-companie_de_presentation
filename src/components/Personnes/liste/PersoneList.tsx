import React, { useEffect, useState } from "react";
import getPersonneList from "../../../services/personne";


    const PersoneList: React.FC<any> = () => {
        const [personnes, setPersonnes] = useState<any>(null);
        const [error, setError] = useState<string | null>(null);
      
        useEffect(() => {
          const fetchData = async () => {
            try {
              const data = await getPersonneList();
              setPersonnes(data);
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
            {personnes ? <pre>{JSON.stringify(personnes, null, 2)}</pre> : <p>No personnes available</p>}
          </div>
        );
      }

export default PersoneList;
