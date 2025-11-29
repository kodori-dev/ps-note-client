import {getUserSession} from '@/utils/getUserSession';
import Link from 'next/link';
import {redirect} from 'next/navigation';

async function Validate({params: {id}}: { params: { id: string } }) {
    const session = await getUserSession();
    const memberId = session.userId;
    if (!session.isLogin || !memberId) redirect('/login');
    if (!session.isAdmin) redirect('/404');

    const validateSolution = async () => {
        try {
            const res = await fetch(`${process.env.INTERNAL_SERVER_URL}/solutions/validate?solution_id=${id}`, {
                method: 'POST',
                headers: memberId ? {'X-Member-Id': memberId.toString()} : {},
                cache: 'no-store',
            });
            const result = await res.json();
            if (res.ok) {
                return result.result ? '성공' : '실패';
            } else throw Error(`${result.message}`);
        } catch (err: any) {
            return `에러 발생: ${err.message}`;
        }
    };

    const validateResult = await validateSolution();

    return (
        <div className="flex flex-col gap-1 items-center">
            <div>재검증결과</div>
            <div>{validateResult}</div>
            <Link className="text-primary underline" href={'/admin'}>
                admin 돌아가기
            </Link>
        </div>
    );
}

export default Validate;
