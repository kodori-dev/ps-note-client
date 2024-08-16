'use client';
import { useCheckLogin } from '@/hooks/useCheckLogin';

export default function Home() {
  const login = useCheckLogin();

  return <div>안녕하세요</div>;
}
