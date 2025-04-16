import { Spinner } from "@chakra-ui/react";
import Link from "next/link";

interface Props {
  nickname: string;
  sourceLang: string;
  solutionId?: string | null;
  isVerified: boolean | null;
  submittedAt: string;
}

function InfoSection({ nickname, sourceLang, solutionId = null, isVerified, submittedAt }: Props) {
  const SOLUTION_INFO_LIST = [
    { icon: null, label: "사람", value: nickname, type: "string" },
    { icon: null, label: "풀이 언어", value: sourceLang, type: "string" },
    { icon: null, label: "검증 여부", value: isVerified, type: "checkbox" },
    { icon: null, label: "제출일", value: submittedAt, type: "string" },
  ];

  const childrenForType = (type: string, value: any) => {
    switch (type) {
      case "string":
        return <p>{value}</p>;
      case "link":
        return (
          <Link target="_blank" href={value as string} className="text-gray-2 w-fit border-b border-gray-2">
            {value}
          </Link>
        );
      case "checkbox":
        return <input className="w-4 h-4" type="checkbox" defaultChecked={Boolean(value)} disabled />;
    }
  };

  return (
    <ul className="flex flex-col gap-3">
      {SOLUTION_INFO_LIST.map(({ icon, label, value, type }) => (
        <li key={label} className="flex gap-9 items-center">
          {icon}
          <p className="w-[102px] text-gray-3">{label}</p>
          {label.slice(0, 3) === "BOJ" && isVerified === null ? <Spinner color="blue.200" size="md" borderWidth="3px" /> : childrenForType(type, value)}
        </li>
      ))}
    </ul>
  );
}

export default InfoSection;
