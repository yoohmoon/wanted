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
  themeTags: ThemeTag[];
  employmentTitle: string;
  employmentContents: string;
  addressShort: string;
  address: string;
  deadline: string;
  applicantReward: number;
  reward: string;
  recommenderReward: number;
  companyname: string;
  companyId: number;
  tech: string[];
  imgUrls: string[];
  likeNum: number;
}

export interface JobDetailResponse {
  resultCode: string;
  message: string;
  result: JobDetail;
}
