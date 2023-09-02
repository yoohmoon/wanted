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
  applicantReward: string;
  reward: string;
  recommenderReward: string;
  companyname: string;
  companyId: number;
  tech: string[];
  imgUrls: string[];
}

export interface JobDetailResponse {
  resultCode: string;
  message: string;
  result: JobDetail;
}
