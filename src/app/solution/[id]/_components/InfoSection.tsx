import { LanguageType } from '@/types/api/solution';
import Link from 'next/link';

interface Props {
  nickname: string;
  sourceLang: LanguageType;
  solutionId: string;
  isVerified: boolean;
  submittedAt: string;
}

function InfoSection({ nickname, sourceLang, solutionId, isVerified, submittedAt }: Props) {
  const SOLUTION_INFO_LIST = [
    { icon: null, label: '사람', value: nickname, type: 'string' },
    { icon: null, label: '풀이 언어', value: sourceLang, type: 'string' },
    { icon: null, label: 'BOJ 제출 URL', value: `https://www.acmicpc.net/source/${solutionId}`, type: 'link' },
    { icon: null, label: 'BOJ 연동 여부', value: isVerified, type: 'checkbox' },
    { icon: null, label: '제출일', value: submittedAt, type: 'string' },
  ];
  return (
    <ul className="flex flex-col gap-3">
      {SOLUTION_INFO_LIST.map(({ icon, label, value, type }) => (
        <li key={label} className="flex gap-9 items-center">
          {icon}
          <p className="w-[102px] text-gray-3">{label}</p>
          {type === 'string' && <p>{value}</p>}
          {type === 'link' && (
            <Link href={value as string} className="text-gray-2 w-fit border-b border-gray-2">
              {value}
            </Link>
          )}
          {type === 'checkbox' && <input className="w-4 h-4" type="checkbox" defaultChecked={Boolean(value)} disabled />}
        </li>
      ))}
    </ul>
  );
}

export default InfoSection;
