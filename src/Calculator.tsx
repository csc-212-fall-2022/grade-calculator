import React, { ReactElement, ReactNode, useState } from "react";
import { Button, Form } from "react-bulma-components";
import { Category } from "./Category";
import { categoryData, itemData } from "./data";
import { IItem } from "./Item";
import Score from "./Score";

const EXAM_CATEGORY_ID = 2;
const FINAL_ITEM_ID = 5;

export const Calculator: React.FC = () => {
  const zeroScores = (its: Record<number, IItem>) => {
    for (const key in its) {
      const it = its[key];
      it.points = 0;
    }
    return its;
  };

  const initialItems = zeroScores(itemData);

  const [categories, setCategories] = useState(categoryData);
  const [items, setItems] = useState(initialItems);
  const [total, setTotal] = useState(0);

  const reset = () => {
    const newItems = zeroScores(items);
    setItems(newItems);
  };

  const calculateCategory = (id: number) => {
    const cat = categories[id];
    const catItems: IItem[] = cat.items.map((id: number) => items[id]);
    const percentages = catItems.map(
      (item) => (item.points || 0) / item.pointsPossible
    );
    const categoryPoints = percentages.reduce((acc, curr) => acc + curr, 0);
    const score = (categoryPoints / catItems.length) * cat.totalPoints;
    const updated = { ...cat, score: score };
    setCategories({ ...categories, [id]: updated });
  };

  const calculateCategoryScoreWithReplacement = (
    id: number,
    replacer: IItem
  ) => {
    const cat = categories[id];
    const catItems: IItem[] = cat.items.map((id: number) => items[id]);
    const percentages = catItems.map(
      (item) => (item.points || 0) / item.pointsPossible
    );
    const replacerPercentage = (replacer.points || 0) / replacer.pointsPossible;
    const finalPercentages = percentages
      .concat(replacerPercentage)
      .sort()
      .filter((_, i) => i);
    return (
      (finalPercentages.reduce((acc, curr) => acc + curr, 0) /
        finalPercentages.length) *
      cat.totalPoints
    );
  };

  // This is just a helper function to loop over the categories and build a fragment containing
  // their components
  function buildCategoryFragment(): ReactElement {
    var categoryComponents: ReactNode[] = [];
    for (const key in categories) {
      const category = categories[key];
      const categoryElement = (
        <Form.Control key={category.name}>
          <Category
            category={category}
            items={items}
            calculateCategory={() => calculateCategory(category.id)}
            onScoreChange={updateItemScore}
          />
        </Form.Control>
      );
      categoryComponents.push(categoryElement);
    }
    return <React.Fragment>{categoryComponents}</React.Fragment>;
  }

  // submit callback handler
  // calculate the total score and update the state
  const calculate: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    var score = 0;
    for (const key in categories) {
      const category = categories[key];
      // check if we have the exam category
      if (category.id == EXAM_CATEGORY_ID) {
        const scoreWithReplacement = calculateCategoryScoreWithReplacement(
          category.id,
          items[FINAL_ITEM_ID]
        );
        score += Math.max(category.score || 0, scoreWithReplacement);
      } else {
        score += category.score || 0;
      }
    }
    setTotal(score);
  };

  const updateItemScore = (id: number, score: number) => {
    const updated = { ...items[id], points: score };
    setItems({ ...items, [id]: updated });
  };

  const categoryFragment: ReactElement = buildCategoryFragment();

  return (
    <div>
      <form onSubmit={calculate}>
        {categoryFragment}
        <Form.Field kind="group">
          <Form.Control>
            <Button type="submit" color="primary">
              Submit
            </Button>
          </Form.Control>
          <Form.Control>
            <Button color="light" onClick={reset}>
              Reset
            </Button>
          </Form.Control>
        </Form.Field>
      </form>
      <b>
        Total Score: <Score score={total} />/100
      </b>
    </div>
  );
};
