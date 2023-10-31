import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface MetricProps {
  imgURL: string;
  alt: string;
  value: number | string;
  title: string;
  href?: string;
  textStyles?: string;
  isAuthor?: boolean;
}

const Metric = ({
  imgURL,
  alt,
  value,
  title,
  href,
  textStyles,
  isAuthor,
}: MetricProps) => {
  const MetricContent = (
    <div className="flex items-center gap-1">
      <Image src={imgURL} alt={alt} width={16} height={16} />
      <p className={`${textStyles} flex items-center gap-1`}>
        {value}{' '}
        <span
          className={`small-regular line-clamp-1 ${
            isAuthor ? 'max-sm:hidden' : ''
          }`}
        >
          {title}
        </span>
      </p>
    </div>
  );

  if (href) {
    return <Link href={href}>{MetricContent}</Link>;
  }

  return <div className="flex-center flex-wrap gap-1">{MetricContent}</div>;
};

export default Metric;
