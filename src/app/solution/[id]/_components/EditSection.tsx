'use client';

import Button from '@/components/Button';
import Link from 'next/link';

interface Props {
  solutionId: string;
}

function EditSection({ solutionId }: Props) {
  return (
    <div className="flex gap-6 mb-6">
      <Link href={`/solution/${solutionId}/edit`}>
        <Button theme="secondary" heightSize="sm" roundSize="lg" customStyle="px-5 text-14">
          ✏️수정
        </Button>
      </Link>
      <Button theme="secondary" heightSize="sm" roundSize="lg" customStyle="px-5 text-14">
        🗑️ 삭제
      </Button>
    </div>
  );
}

export default EditSection;
