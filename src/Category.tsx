import React from "react";
import { Box, Form } from "react-bulma-components";
import Item, { IItem } from "./Item";
import Score from "./Score";

export interface ICategory {
  id: number;
  items: number[];
  name: string;
  totalPoints: number;
  score?: number;
}

interface CategoryProps {
  category: ICategory;
  items: Record<number, IItem>;
  calculateCategory: () => void;
  onScoreChange: (id: number, points: number) => void;
}

export const Category: React.FC<CategoryProps> = (props: CategoryProps) => {
  const items = props.category.items.map((itemId) => {
    const item = props.items[itemId];
    return (
      <Item
        key={item.name}
        {...item}
        onChangeHandler={(score: number) => {
          props.onScoreChange(item.id, score);
          props.calculateCategory();
        }}
      />
    );
  });

  return (
    <Box id={"category-" + props.category.name} renderAs="fieldset">
      <Form.Field horizontal={false} kind="group" multiline={true}>
        {items}
      </Form.Field>
      <b>
        {props.category.name} Total: <Score score={props.category.score || 0}/>/{props.category.totalPoints}
      </b>
    </Box>
  );
};
