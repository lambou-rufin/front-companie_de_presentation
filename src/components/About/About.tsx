import React from 'react'
import { Accordion, Button } from 'react-bootstrap';
import Icon from '../../shared/components/Icon/Icon';

const About:React.FC = () => {
  return (
    <>
    <div><h1 className="text-center mt-3">About</h1>
    <div className="data-table-top mt-3">
        <div>
          <Button variant="success" size="sm" >
            <Icon name="plus"></Icon>
            <span>Ajouter département</span>
          </Button>
          <Button variant="success" className="ms-2" size="sm" >
            <Icon name="plus"></Icon>
            <span>Ajouter équipe</span>
          </Button>
          <Button variant="success" className="ms-2" size="sm" >
            <Icon name="plus"></Icon>
            <span>Ajouter poste</span>
          </Button>
          <Button variant="success" className="ms-2" size="sm">
            <Icon name="plus"></Icon>
            <span>Ajouter volontaire</span>
          </Button>
        </div>
      </div>
    <Accordion>
      
    </Accordion>
    </div>
    </>
  )
}

export default About;