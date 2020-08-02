import React from 'react';
import { EditorWrapper } from '@editor/components/EditorWrapper';
import { EditorToolbar } from '@editor/components/EditorToolbar';

export const Page: React.FC<any> = (props) => {
  return (
    <>
      <EditorToolbar />
      <EditorWrapper />
    </>
  );
};

export default Page;
