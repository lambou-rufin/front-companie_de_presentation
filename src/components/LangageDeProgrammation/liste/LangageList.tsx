import React, { useEffect, useState } from "react";
import getLangageDeProgrammationList from "../../../services/langageDeProgrammation";


    const LangageList: React.FC<any> = () => {
        const [langages, setLangages] = useState<any>(null);
        const [error, setError] = useState<string | null>(null);
      
        useEffect(() => {
          const fetchData = async () => {
            try {
              const data = await getLangageDeProgrammationList();
              setLangages(data);
            } catch (err) {
              setError('Failed to fetch langages');
            }
          };
      
          fetchData();
        }, []);
      
        if (error) return <div>Error: {error}</div>;
      
        return (
          <div>
            <h1>Langage</h1>
            {/* Render langages or a message if no data */}
            {langages ? <pre>{JSON.stringify(langages, null, 2)}</pre> : <p>No langages available</p>}
          </div>
        );
      }

export default LangageList;
