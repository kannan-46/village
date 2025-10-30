
export type ColumnType = 'text' | 'number';

export interface Column {
  id: string;
  name: string;
  type: ColumnType;
}

export interface LandRecord {
  id: string;
  [columnId: string]: any;
}

export interface Village {
  id: string;
  name: string;
  nameTamil: string;
  columns: Column[];
  records: LandRecord[];
  createdAt: string;
  updatedAt: string;
}
