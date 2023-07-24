// App.jsx / App.tsx

import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { SingleDataFromFirebase } from '../../../firebase/function';
import { useState } from 'react';
import { useEffect } from 'react';
/* eslint-disble */
const Editor = ({ OnDataChange }) => {
  const [AboutData, setAaboutData] = useState({});
  function getAboutData() {
    SingleDataFromFirebase('about', 'about-id').then((res) => {
      // console.log(res.data());
      setAaboutData({ id: res.id, ...res.data() });
    });
  }

  useEffect(() => {
    getAboutData();
  }, []);

  return (
    <div className="App">
      <CKEditor
        editor={ClassicEditor}
        data={AboutData?.about || ''}
        //   style={{ height: '600px' }}
        onReady={(editor) => {
          // You can store the "editor" and use when it is needed.
          console.log('Editor is ready to use!', editor);
        }}
        onChange={OnDataChange}
        onBlur={(event, editor) => {
          console.log('Blur.', editor);
        }}
        onFocus={(event, editor) => {
          console.log('Focus.', editor);
        }}
      />
    </div>
  );
};

export default Editor;
