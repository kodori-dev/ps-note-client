'use client';

import Link from 'next/link';

interface Props {
  solutionId: string;
}

function EditSection({ solutionId }: Props) {
  return (
    <div className="flex gap-5">
      <Link href={`/solution/${solutionId}/edit`}>
        <button className="hover:border-primary text-primary border-b text-14">✏️수정하기</button>
      </Link>
      <button className="hover:border-red hover:text-red text-gray-2 border-b text-14">🗑️삭제하기</button>
    </div>
  );
}

export default EditSection;
