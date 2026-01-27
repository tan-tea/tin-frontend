'use client'

import {
    FC,
    ComponentProps,
} from 'react';

type BlobProps = ComponentProps<'svg'>;

const Blob: FC<BlobProps> = (props: BlobProps) => {
    const {
        width = 0,
        height = 0,
        fill = 'none',
        className,
        ...rest
    } = props;

    return (
        <svg
            {...rest}
            width={width}
            height={height}
            viewBox="0 0 900 600"
            fill={fill}
            className={className}
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink='http://www.w3.org/1999/xlink'
            version='1.1'
        >
            <g transform="translate(464.36064043826866 309.5913213005366)">
                <path d="M267.3 -264.1C322.5 -212.1 326.7 -106.1 325.9 -0.8C325.1 104.4 319.2 208.8 264 255.7C208.8 302.6 104.4 291.9 8.7 283.2C-87 274.5 -173.9 267.7 -240.8 220.8C-307.6 173.9 -354.3 87 -354.7 -0.4C-355 -87.7 -309 -175.4 -242.2 -227.4C-175.4 -279.4 -87.7 -295.7 9.2 -304.9C106.1 -314.1 212.1 -316.1 267.3 -264.1" fill='inherit'></path>
            </g>
        </svg>
    );
};

export default Blob;
