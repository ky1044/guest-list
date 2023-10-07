export type CredentialType = {
  id: number;
  email: string;
  password?: string;
  environment?: string;
  notes?: string;
  created: Date;
};

export function getCredentialField(
  obj: CredentialType,
  fieldName: keyof CredentialType
): any {
  return obj[fieldName];
}
