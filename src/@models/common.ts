export type DocumentEventMapKey = keyof DocumentEventMap;
export type TEvents = {
  [key in DocumentEventMapKey]?: EventListenerOrEventListenerObject;
};

export interface IProps {
  events?: TEvents,
  [key: string]: unknown;
}
