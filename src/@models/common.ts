export type DocumentEventMapKey = keyof DocumentEventMap;
export type TEvents = {
  // [key in DocumentEventMapKey]?: (event: DocumentEventMap[key]) => void;
  // [key in DocumentEventMapKey]?: (event: Event) => void;
  [key in DocumentEventMapKey]?: EventListenerOrEventListenerObject;
};

export interface IProps {
  events?: TEvents,
  [key: string]: unknown;
}
