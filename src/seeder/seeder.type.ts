export type SeederUser = {
  username: string;
  password: string;
  name: string;
  contacts?: SeederContact[];
};

export type SeederContact = {
  first_name: string;
  last_name?: string;
  email?: string;
  phone?: string;
  addresses?: SeederAddress[];
};

export type SeederAddress = {
  street?: string;
  city?: string;
  province?: string;
  country: string;
  postal_code: string;
};

export type SeederData = {
  users: SeederUser[];
};
