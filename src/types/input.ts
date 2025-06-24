export interface inputType {
  label: string;
  placeholder: string;
  description?: string;
  id: string;
  rules: any;
}

export interface PostFormType {
  oj_type: "" | "boj" | "programmers";
  submitted_at: string;
  oj_id: string;
  is_correct_answer: "" | "AC" | "WA";
  isStar: boolean;
  source_lang: string;
  source_code: string;
  pid: string;
  comment: string;
}
