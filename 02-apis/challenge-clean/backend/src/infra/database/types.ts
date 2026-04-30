export type AstronautStatus = "active" | "inactive";

export interface AstronautRow {
  id: string;
  name: string;
  role: string;
  nationality: string;
  status: AstronautStatus;
  deleted_at: Date | null;
  created_at: Date;
  updated_at: Date;
}

export interface SupplyRow{
  id: string,
  item: string,
  category: string,
  stock: number,
  quantity:number
}

export interface MissionRow {
  id: string;
  created_at: Date;
}