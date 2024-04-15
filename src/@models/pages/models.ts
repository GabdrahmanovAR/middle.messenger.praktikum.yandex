export interface ILoginPageProps {
  validate: Record<string, unknown>,
  onLogin: (event: Event) => void;
  onCreateAccount: (event: Event) => void;
}
