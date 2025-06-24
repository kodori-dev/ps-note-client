"use client";
import PostSectionLayout from "@/components/Layout/PostSectionLayout";
import { useCallback } from "react";
import CodeMirror, { basicSetup } from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { cpp } from "@codemirror/lang-cpp";
import { java } from "@codemirror/lang-java";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { rust } from "@codemirror/lang-rust";
import { LanguageSupport } from "@codemirror/language";
import { useFormContext } from "react-hook-form";
import { SelectContent, SelectItem, SelectLabel, SelectRoot, SelectTrigger, SelectValueText } from "@chakra-ui/react";
import { LANGUAGE_LIST } from "@/constants/language";

function SolutionSection() {
  const { register, setValue, watch } = useFormContext();
  const { source_lang, source_code } = watch();
  const handleCodeChange = useCallback(
    (val: string, viewUpdate: any) => {
      setValue("source_code", val);
    },
    [setValue],
  );

  const matchLangTheme = (lang: string) => {
    switch (lang) {
      case "C++":
      case "C":
      default:
        return cpp();
      case "Java":
      case "Kotlin":
        return java();
      case "JavaScript":
        return javascript();
      case "Python":
        return python();
      case "Rust":
        return rust();
    }
  };

  return (
    <PostSectionLayout title="Solution" description="정답 코드를 기록해 보세요.">
      <div className="flex flex-col gap-5">
        <SelectRoot maxWidth={372} collection={LANGUAGE_LIST}>
          <SelectLabel>풀이 언어</SelectLabel>
          <SelectTrigger>
            <SelectValueText placeholder="풀이 언어 선택" />
          </SelectTrigger>
          <SelectContent>
            {LANGUAGE_LIST.items.map((lang) => (
              <SelectItem item={lang} key={lang.value} onClick={() => setValue("source_lang", lang.value)}>
                {lang.label}
              </SelectItem>
            ))}
          </SelectContent>
        </SelectRoot>

        {/* 코드 입력 창 */}
        <CodeMirror
          value={source_code}
          className="w-[668px] tablet:w-full"
          height="480px"
          onChange={handleCodeChange}
          theme={vscodeDark}
          lang="java"
          extensions={[basicSetup(), matchLangTheme(source_lang) as LanguageSupport]}
        />
        <input hidden {...register("source_lang")} />
        <input hidden {...register("source_code")} />
      </div>
    </PostSectionLayout>
  );
}

export default SolutionSection;
