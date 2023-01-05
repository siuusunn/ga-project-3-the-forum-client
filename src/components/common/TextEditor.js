import React, { useState } from 'react';
import { createEditor } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';

const initialValue = [
  {
    type: 'paragraph',
    children: [{ text: '...Write your content here...' }]
  }
];

export default function TextEditor() {
  const [content, setContent] = useState({
    type: 'paragraph',
    children: [{ text: '' }]
  });
  const [editor] = useState(() => withReact(createEditor()));

  const handleChange = (event) => {
    setContent({
      ...content,
      [content.children]: { [content.children.text]: event.target.value }
    });
    console.log(content);
  };

  return (
    <Slate editor={editor} value={initialValue}>
      <Editable value={content} onChange={handleChange} />
    </Slate>
  );
}
