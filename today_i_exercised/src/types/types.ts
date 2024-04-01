export type RootStackParamList = {
  Splash: undefined;
  MainTab: undefined;
  SearchResult: { keyword: string } | undefined;
  Chat: undefined;
  NewPostDetailPage: { images: ImageType[] } | undefined;
};

export type RootBottomTabParamList = {
  홈: undefined;
  검색: undefined;
  기록하기: undefined;
  캘린더: undefined;
  마이페이지: undefined;
};

export type FeedType = {
  id: number;
  name: string;
  profileImg: string;
  feedImg: string[];
  contents: string | undefined;
  hashTag: string[];
  createdAt: number;
  like: number;
  likeUsers: number[];
  comments?: CommentType[];
};

export type CommentType = {
  userName: string;
  comment: string;
  createdAt: number;
};

export type ImageType = {
  filename: string | null;
  filepath: string | null;
  extension: string | null;
  uri: string;
  height: number;
  width: number;
  fileSize: number | null;
  playableDuration: number;
  orientation: number | null;
};
