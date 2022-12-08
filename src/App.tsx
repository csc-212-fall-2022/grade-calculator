import './App.css';
import 'bulma/css/bulma.min.css';
import {Calculator} from './Calculator';
import { Container, Heading } from 'react-bulma-components';

function App() {
  return (
    <Container>
      <Heading>Grade Calculator</Heading>
    <Calculator/>
    </Container>
    );
}

export default App;
