// Map API Types
export interface Map {
  map_id: string;
  creator_user_id: string;
  creator_username?: string;
  title: string;
  price_gems: number;
  price_coins: number;
  revenue_gems: number;
  revenue_coins: number;
  likes_count: number;
  play_count: number;
  created_at_epoch: number;
  preview_s3_key?: string;
  preview_url?: string;
  json_s3_key?: string;
  json_url?: string;
  visibility?: string;
  version?: number;
}

export interface MapListResponse {
  statusCode: number;
  body: {
    items: Map[];
    lastKey?: any;
  };
}

export interface MapDetailResponse {
  statusCode: number;
  body: Map;
}

export interface CreatorPulseSummary {
  statusCode: number;
  body: {
    totals: {
      revenue_gems: number;
      revenue_coins: number;
      likes: number;
      plays: number;
    };
    deltas: {
      revenue_gems: number;
      revenue_coins: number;
      likes: number;
      plays: number;
    };
    window7d: {
      revenue_gems: number;
      revenue_coins: number;
    };
    top_map?: {
      map_id: string;
      title: string;
      preview_s3_key?: string;
      revenue_gems_7d: number;
      revenue_coins_7d: number;
    };
    has_new_income: boolean;
  };
}
