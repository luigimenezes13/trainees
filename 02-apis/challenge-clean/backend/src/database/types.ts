export type AstronautStatus = "active" | "inactive";

export interface AstronautRow {
  id: number;
  name: string;
  role: string;
  nationality: string;
  status: AstronautStatus;
  deleted_at: Date | null;
  created_at: Date;
  updated_at: Date;
}

export interface SupplyRow{
  id: number,
  item: string,
  category: string,
  stock: number,
  quantity:number
}

export interface MissionRow{
  id: number,
  astronautId: number,
  supplyId: number
}