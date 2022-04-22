export interface IContact {
  id: string;
  name: string;
  surname: string;
  phoneNumber: string;
  birthDate: string;
  email: string;
  address: string;
}

export type contactList = IContact[];
