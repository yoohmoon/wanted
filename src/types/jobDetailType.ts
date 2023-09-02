export interface Image {
  id: number;
  src: string;
}

export interface ThemeTag {
  id: number;
  title: string;
}

export interface JobDetail {
  images: Image[];
  // hashtagName: ThemeTag[];
  hashtagName: string[];
  employmentTitle: string;
  employmentContent: string;
  // addressShort: string;
  region: string;
  address: string;
  deadline: string;
  applicantReward: string;
  // applicantReward: number;
  // reward: string;
  recommenderReward: string;
  // recommenderReward: number;
  companyName: string;
  companyId: number;
  skillStack: string[];
  imgUrls: string[];
  likeNum: number;
}

export interface JobDetailResponse {
  resultCode: string;
  message: string;
  result: JobDetail;
}
