export interface ILoginPageProps {
  validate: Record<string, unknown>,
  onLogin: (event: Event) => void;
  onCreateAccount: (event: Event) => void;
}

export interface IRegistrationPageProps {
  validate: Record<string, unknown>,
  onSubmit: (event: Event) => void;
  onLogin: (event: Event) => void;
}
