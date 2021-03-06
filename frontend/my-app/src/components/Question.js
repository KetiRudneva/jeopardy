import React from "react";
import Button from '@material-ui/core/Button';
import { wsContext } from '../App';
import {useSelector} from 'react-redux';

function Question({ price, state, title }) {
  const ws = React.useContext(wsContext);
  const isAuth = useSelector((store)=>store.isAuth);
  const handleClick = async () => {
    if (state) {
      const response = await fetch(`http://localhost:3100/game/${title}`, {
        method: 'GET'
      });
      const data = await response.json();
      const index = data.question.findIndex((el) => el.price === price);
      const obj = { question: data.question[index].title, answer: data.question[index].answer };
      ws.send(JSON.stringify({ func: 'startGame', args: { ...obj, title, price } }));
    }
  }

  return (
    // store is a reserved word!!!!

    <Button onClick={handleClick} disabled={!isAuth} >{state && price}</Button>

  );
}

export default Question;
