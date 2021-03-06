import React from 'react';
import download from 'downloadjs';
import { toPng } from 'html-to-image';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const HtmlToImage = React.forwardRef<HTMLDivElement>(
  (_props, ref): JSX.Element => {
    async function captureComponent() {
      if (!ref || typeof ref === 'function') return;
      if (!ref.current) return;

      const params = {
        backgroundColor: 'white',
        style: { margin: '0' },
      };

      const link = await toPng(ref.current, params);
      download(link, 'CV.png');
    }

    return (
      <button
        aria-label="Download as image"
        type="button"
        onClick={() => captureComponent()}
      >
        Download as image
      </button>
    );
  }
);

export default HtmlToImage;
