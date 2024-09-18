export interface inputType {
  label: string;
  placeholder: string;
  description?: string;
  id: string;
  rules: any;
}

export interface PostFormType {
  submitted_at: string;
  boj_id: string;
  is_correct_answer: '' | 'AC' | 'WA';
  isStar: boolean;
  source_lang: string;
  source_code: string;
  pid: string;
  comment: string;
}
