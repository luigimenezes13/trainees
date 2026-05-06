import { AstronautStatus } from "../../domain/entities/Astronaut.js";

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

export interface SupplyRow {
  id: number;
  item: string;
  categoria: string;
  estoque: number;
  created_at: Date;
  updated_at: Date;
}

export interface MissionRow {
  id: number;
  titulo: string;
  astronauta_id: number;
  supply_id: number;
  created_at: Date;
  updated_at: Date;
}
