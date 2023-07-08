export enum Orientation {
  left,
  right,
}

export type Item = {
  id: number | string;
  url: string;
  title?: string;
  description?: string;
};

export const padItems = (items: Item[]): Item[] => {
  if (items.length === 1)
    return Array.from(Array(4).keys()).map((item) => ({
      ...items[0],
      id: item,
    }));
  else if (items.length < 4)
    return items
      .map<Item>((item) => ({ ...item, id: `padding-left-${item.id}` }))
      .concat(items)
      .concat(
        items.map<Item>((item) => ({
          ...item,
          id: `padding-right-${item.id}`,
        }))
      );

  return items;
};
