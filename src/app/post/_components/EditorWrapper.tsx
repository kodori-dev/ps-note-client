'use client';

import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import 'prismjs/themes/prism.css';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
// import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight-all.js';
import { ForwardedRef } from 'react';

interface Props {
  forwardRef: ForwardedRef<Editor>;
}

function EditorWrapper({ forwardRef }: Props) {
  return <Editor ref={forwardRef} height="400px" placeholder="WA의 경우, 접근법을 상세히 기록해요." initialEditType="markdown" plugins={[colorSyntax]} />;
}

export default EditorWrapper;
