import React from "react";
import { Form } from "react-bulma-components";

export interface IItem {
  id: number;
  name: string;
  points?: number;
  pointsPossible: number;
  frozen: boolean;
}

interface ItemProps extends IItem {
  onChangeHandler: (score: number) => void;
}

const Item: React.FC<ItemProps> = (props) => {
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    props.onChangeHandler(+e.target.value);
  };

  return (
    <Form.Control>
      <Form.Label>{props.name}</Form.Label> {props.pointsPossible} points <br/>
      <Form.Input size="small" value={props.points} onChange={handleChange} onBlur={handleChange} />
    </Form.Control>
  );
};

export default Item;
