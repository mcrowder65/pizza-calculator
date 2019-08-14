import React from "react";
import MuiTextField from "@material-ui/core/TextField";
import styled from "styled-components";
import PropTypes from "prop-types";
import useWindowSize from "@rehooks/window-size";

import { useLocalStorageSetState } from "mooks";

const Text = styled.p`
  margin-bottom: 30px;
`;
const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const SubContainer = styled.div`
  display: flex;
  justify-content: space-around;
  height: 60%
  width: 80%;
  flex-direction: ${props => (props.windowSize.innerWidth < 800 ? "column" : "row")};
`;

SubContainer.propTypes = {
  windowSize: PropTypes.shape({
    innerWidth: PropTypes.number
  })
};
const TextField = props => {
  return <MuiTextField {...props} variant="outlined" />;
};
function App() {
  const [rsvps, setRsvps] = useLocalStorageSetState(0, "rsvps");
  const [slicesPerPerson, setSlicesPerPerson] = useLocalStorageSetState(2, "slicesPerPerson");
  const [percentOfPeopleThatShow, setPercentOfPeopleThatShow] = useLocalStorageSetState(0.4, "percentOfPeopleThatShow");
  const [slicesPerPizza, setSlicesPerPizza] = useLocalStorageSetState(8, "slicesPerPizza");
  const [count, setCount] = React.useState(0);

  React.useEffect(
    () => {
      setCount(Math.ceil((rsvps * percentOfPeopleThatShow * slicesPerPerson) / slicesPerPizza));
    },
    [rsvps, slicesPerPizza, percentOfPeopleThatShow, slicesPerPerson]
  );
  const windowSize = useWindowSize();
  const onChange = setter => e => setter(e.target.value);

  return (
    <Container>
      <Text>
        Math.ceil((
        {rsvps} * {percentOfPeopleThatShow}) * {slicesPerPerson} / {slicesPerPizza}) ={count}
        <h1>{count} pizzas</h1>
      </Text>

      <SubContainer windowSize={windowSize}>
        <TextField onChange={onChange(setRsvps)} value={rsvps} label="RSVPs" />
        <TextField onChange={onChange(setSlicesPerPerson)} value={slicesPerPerson} label="Slices per person" />
        <TextField
          onChange={onChange(setPercentOfPeopleThatShow)}
          value={percentOfPeopleThatShow}
          label="Percent of people that show"
        />
        <TextField onChange={onChange(setSlicesPerPizza)} value={slicesPerPizza} label="Slices per pizza" />
      </SubContainer>
    </Container>
  );
}

export default App;
