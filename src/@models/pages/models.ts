export interface ILoginPageProps {
}

export interface ILoginField {
  label: string;
  type: string;
  required: boolean;
  name: string;
  validate?: (value: string) => string,
}
export interface IRegistrationPageProps {
  fields: ILoginField[],
  fieldComponents: string;
  fieldKeys: string[];
  registrationFieldsKeys: string[];
}
