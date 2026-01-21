export interface User {
  name: string;
  email: string;
  messageCount: number;
  lastAccessIp: string;
  lastAccessDate: string;
}

export interface MailFolder {
  name: string;
  count: number;
  isActive?: boolean;
}

export interface EmailAddress {
  name: string;
  email: string;
}

export interface Email {
  id: string;
  date: string;
  subject: string;
  sender: EmailAddress;
  recipient: EmailAddress;
  cc?: EmailAddress[];
  body: string;
  tableData?: TableRow[];
}

export interface TableRow {
  item: string;
  aggregationStatus: 'O' | 'X';
  extractionAvailability: string;
}

export interface Signature {
  name: string;
  position: string;
  department: string;
  phone: string;
  fax: string;
  email: string;
}
