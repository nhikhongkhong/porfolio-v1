interface TabListProps {
  data: Array<TabItem>;
}

interface TabItem {
  title: string;
  content: TabContentProps;
}

interface TabContentProps {
  title: string;
  subTitle: string;
  listInfo: Array<string>;
  show?: boolean;
}

export type {TabListProps, TabItem, TabContentProps};
