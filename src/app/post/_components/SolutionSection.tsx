'use client';
import PostSectionLayout from '@/components/Layout/PostSectionLayout';
import { useCallback } from 'react';
import CodeMirror, { basicSetup } from '@uiw/react-codemirror';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import { cpp } from '@codemirror/lang-cpp';
import { java } from '@codemirror/lang-java';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { rust } from '@codemirror/lang-rust';
import { LANGUAGE } from '@/constants/language';
import { LanguageSupport } from '@codemirror/language';
import { useFormContext } from 'react-hook-form';
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from '@/components/ui/menu';
import { Button } from '@chakra-ui/react';

function SolutionSection() {
  const { register, setValue, watch } = useFormContext();
  const { source_lang, source_code } = watch();
  const handleCodeChange = useCallback(
    (val: string, viewUpdate: any) => {
      setValue('source_code', val);
    },
    [setValue]
  );

  const matchLangTheme = (lang: string) => {
    switch (lang) {
      case 'C++':
      case 'C':
      default:
        return cpp();
      case 'Java':
      case 'Kotlin':
        return java();
      case 'JavaScript':
        return javascript();
      case 'Python':
        return python();
      case 'Rust':
        return rust();
    }
  };

  return (
    <PostSectionLayout
      title="Solution"
      description="정답 코드를 기록해 보세요."
    >
      <div className="flex flex-col gap-5">
        <MenuRoot>
          <MenuTrigger asChild>
            <Button
              // rightIcon={<ChevronDownIcon w={6} h={6} />}

              width="373px"
              size="lg"
              rounded={'16px'}
              h={54}
              as={Button}
            >
              {source_lang}
            </Button>
          </MenuTrigger>
          <MenuContent>
            {LANGUAGE.map((lang) => (
              <MenuItem
                value={lang}
                key={lang}
                onClick={() => setValue('source_lang', lang)}
              >
                {lang}
              </MenuItem>
            ))}
          </MenuContent>
        </MenuRoot>
        <CodeMirror
          value={source_code}
          width="668px"
          height="330px"
          onChange={handleCodeChange}
          theme={vscodeDark}
          lang="java"
          extensions={[
            basicSetup(),
            matchLangTheme(source_lang) as LanguageSupport,
          ]}
        />
        <input hidden {...register('source_lang')} />
        <input hidden {...register('source_code')} />
      </div>
    </PostSectionLayout>
  );
}

export default SolutionSection;
