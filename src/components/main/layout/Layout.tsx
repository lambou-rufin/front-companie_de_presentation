// Layout.tsx
import React, { FC, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import SideNav from "../Sidenav";
import Footer from "./Footer";
import './Layout.css'; // Assurez-vous que votre fichier CSS est importé
import Spinner from "shared/components/Spinner/Spinner";

const Layout: FC = () => {
    const [isSideNavOpen, setIsSideNavOpen] = useState(false); // État pour gérer l'ouverture du Sidenav
    const [loading, setLoading] = useState(false); // État pour gérer le spinner
    const location = useLocation(); // Pour détecter les changements de route

    const toggleSideNav = () => {
        setIsSideNavOpen(prev => !prev); // Fonction pour basculer l'état du Sidenav
    };

    const handleRouteChange = () => {
        setLoading(true); // Démarre le spinner avant de naviguer
        // Simulation d'un délai de chargement
        setTimeout(() => {
            setLoading(false); // Arrête le spinner après un délai
        }, 500); // Délai réduit à 500 millisecondes
    };

    // Détection des changements de route
    React.useEffect(() => {
        handleRouteChange(); // Appel de la fonction lorsque la route change
    }, [location.pathname]); // Dépendance sur la route actuelle

    return (
        <div className="layout">
            <Header toggleSideNav={toggleSideNav} isSideNavOpen={isSideNavOpen} />
            <div className={`container ${isSideNavOpen ? 'sidenav-open' : ''}`}>
                <SideNav className={isSideNavOpen ? 'open' : 'closed'} />
                <main className={`main-content ${isSideNavOpen ? 'sidenav-open' : ''}`}>
                    {loading ? (
                        <Spinner loading={loading} /> // Affichage du spinner
                    ) : (
                        <Outlet /> // Affichage des routes enfants lorsque le chargement est terminé
                    )}
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default Layout;
