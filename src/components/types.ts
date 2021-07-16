export interface ImageNode {
  uri: string;
  filename: string | null;
  height: number | null;
  width: number | null;
  fileSize: number | null;
  playableDuration?: number | null;
}

export interface EdgeNode {
  group_name: string;
  image: ImageNode;
  location: {
    latitude: number;
    longitude: number;
    altitude: number;
    heading: number;
    speed: number;
  } | null;
  timestamp: number;
  type: string;
}

export interface CameraRollData {
  edges: EdgeNode[];
  page_info: {
    has_next_page: boolean;
    start_cursor: string;
    end_cursor: string;
  };
}
