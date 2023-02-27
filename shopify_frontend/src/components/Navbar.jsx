
import {
  Badge,
  ButtonGroup,
  FullscreenBar,
  Button,
  Text,
} from '@shopify/polaris';
import {useState, useCallback} from 'react';

import {useNavigate} from "react-router-dom"

function Navbar(props) {
  
  let navigate = useNavigate()

  const handleActionClick = useCallback(() => {
    navigate(`/`)
    
    }, []);
  
    const fullscreenBarMarkup = (
      <FullscreenBar onAction={handleActionClick}>
        <div
          style={{
            display: 'flex',
            flexGrow: 1,
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingLeft: '1rem',
            paddingRight: '1rem',
          }}
        >
          <Badge status="info">Ok</Badge>
          <div style={{marginLeft: '1rem', flexGrow: 1}}>
            <Text variant="headingLg" as="p">
              Milind Ravikant Patil internship task
            </Text>
          </div>
          <ButtonGroup>
            <Button primary onClick={handleActionClick}>
              home
            </Button>
          </ButtonGroup>
        </div>
      </FullscreenBar>
    );
  
    return (
      <div style={{ width: '100%'}}>
        {fullscreenBarMarkup}

        </div>
      
    );
  }


export default Navbar;
