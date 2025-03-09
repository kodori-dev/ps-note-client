import { createListCollection } from "@chakra-ui/react";

export const LANGUAGE_LIST = createListCollection({
  items: [
    { label: "C", value: "C" },
    { label: "C++", value: "C++" },
    { label: "Python", value: "Python" },
    { label: "Java", value: "Java" },
    { label: "JavaScript", value: "JavaScript" },
    { label: "Kotlin", value: "Kotlin" },
    { label: "Rust", value: "Rust" },
    { label: "Brainf**k", value: "Brainf**k" },
  ],
});

export const LANGUAGE_FOR_MD = {
  c: "c",
  "c++": "cpp",
  java: "java",
  kotlin: "java",
  javascript: "js",
  python: "python",
  rust: "rust",
  "Brainf**k": "brainfuck",
};
